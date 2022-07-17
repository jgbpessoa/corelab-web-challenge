import React, { useState, useEffect, useContext } from "react";
import { VehicleInterface } from "../../types/VehicleInterface";
import { ColorsInterface, colors } from "../../types/ColorsInterface";
import styles from "./Card.module.scss";
import Button from "../Button";
import { FaHeart, FaRegHeart, FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  addFavorite,
  deleteFavorite,
  deleteVehicle,
  fetchVehicles,
} from "../../lib/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { User } from "../../types/api/AuthResponse";

interface CardInterface {
  vehicle: VehicleInterface;
  setVehicles: React.Dispatch<React.SetStateAction<any>>;
  favorites: VehicleInterface[];
}

const Card = ({ vehicle, setVehicles, favorites }: CardInterface) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  let userId;
  let userToken = "";

  if (state) {
    userId = (state.user as User).id;
    userToken = state.token;
  }

  useEffect(() => {
    favorites.some((favorite) => favorite.id === vehicle.id) &&
      setIsFavorite(true);
  }, [favorites, vehicle.id]);

  let backgroundColor;
  let textColor;

  const getColorByBgColor = (bgColor: string) => {
    if (!bgColor) {
      return "";
    }
    return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2
      ? "#000"
      : "#fff";
  };

  for (const color in colors) {
    if (color === vehicle.color.toLowerCase()) {
      backgroundColor = colors[color as keyof ColorsInterface];
      textColor = getColorByBgColor(backgroundColor as string);
      if (backgroundColor === "#fff") {
        textColor = "#000";
      }
    }
  }

  const handleDelete = async (userToken: string, vehicleId: number) => {
    await deleteVehicle(userToken, vehicleId);
    const response = await fetchVehicles();
    if (response) {
      toast.success("Vehicle was deleted!");
      setVehicles(response.data.vehicles.data);
    }
  };

  const handleFavoriteAdd = async () => {
    if (!userToken) {
      navigate("/login");
      return;
    }

    await addFavorite(userToken, vehicle.id as number);
    setIsFavorite(true);
  };
  const handleFavoriteDelete = async () => {
    if (!userToken) {
      navigate("/login");
      return;
    }

    await deleteFavorite(userToken, vehicle.id as number);
    setIsFavorite(false);
  };

  return (
    <div
      style={{ backgroundColor: `${backgroundColor}`, color: `${textColor}` }}
      className={styles.Card}
    >
      <h2>{vehicle.name}</h2>
      <div className={styles.content}>
        <p>Brand: {vehicle.brand}</p>
        <p>Price: {vehicle.price}</p>
        <p>Description: {vehicle.description}</p>
        <p>Year: {vehicle.year}</p>
        <p>Color: {vehicle.color}</p>
        <p>Plate: {vehicle.plate}</p>
        <p>Owner: {vehicle.user?.name}</p>
        <p>Contact: {vehicle.user?.email}</p>
      </div>
      {isFavorite ? (
        <Button onClick={handleFavoriteDelete}>
          <FaHeart />
        </Button>
      ) : (
        <Button onClick={handleFavoriteAdd}>
          <FaRegHeart />
        </Button>
      )}
      {vehicle.user_id === userId && (
        <Link to="/edit-vehicle" state={vehicle}>
          <Button onClick={() => {}}>
            <FaEdit />
          </Button>
        </Link>
      )}
      {vehicle.user_id === userId && (
        <Button
          onClick={() => {
            handleDelete(userToken, vehicle.id as number);
          }}
        >
          <FaTrashAlt />
        </Button>
      )}
    </div>
  );
};

export default Card;

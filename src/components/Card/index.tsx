import React from "react";
import { VehicleInterface } from "../../types/VehicleInterface";
import { ColorsInterface, colors } from "../../types/ColorsInterface";
import styles from "./Card.module.scss";
import { text } from "stream/consumers";
import Button from "../Button";
import { FaHeart, FaRegHeart, FaEdit, FaTrashAlt } from "react-icons/fa";

interface CardInterface {
  vehicle: VehicleInterface;
}

const Card = ({ vehicle }: CardInterface) => {
  const user = localStorage.getItem("user");
  let userId;

  if (user) {
    userId = JSON.parse(user).data.user.id;
  }
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
      <Button onClick={() => {}}>
        <FaRegHeart />
      </Button>
      {vehicle.user_id === userId && (
        <Button onClick={() => {}}>
          <FaEdit />
        </Button>
      )}
      {vehicle.user_id === userId && (
        <Button onClick={() => {}}>
          <FaTrashAlt />
        </Button>
      )}
    </div>
  );
};

export default Card;

import React, { ReactNode } from "react";
import { VehicleInterface } from "../../types/VehicleInterface";
import styles from "./Card.module.scss";

interface CardInterface {
  vehicle: VehicleInterface;
}

const Card = ({ vehicle }: CardInterface) => {
  return (
    <div className={styles.Card}>
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
    </div>
  );
};

export default Card;

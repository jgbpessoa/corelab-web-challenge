import React, { ChangeEvent, FormEvent, useState } from "react";
import { VehicleInterface } from "../../types/VehicleInterface";
import { colors } from "../../types/ColorsInterface";
import { updateVehicle } from "../../lib/api";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function EditVehicle() {
  const navigate = useNavigate();
  const location = useLocation();

  const vehicleData = location.state as VehicleInterface;

  const editData = vehicleData ? vehicleData : {};

  const [formData, setFormData] = useState<VehicleInterface>(
    editData as VehicleInterface
  );

  const handleChange = (event: ChangeEvent) => {
    if (event.target.id === "year" || event.target.id === "price") {
      setFormData({
        ...formData,
        [(event.target as HTMLInputElement).id]: +(
          event.target as HTMLInputElement
        ).value,
      });
    } else {
      setFormData({
        ...formData,
        [(event.target as HTMLInputElement).id]: (
          event.target as HTMLInputElement
        ).value,
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formData.plate.match(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/)) {
      toast.error("Plate is not according to the Brazilian Format");
      return;
    }
    const { token } = JSON.parse(localStorage.getItem("user") as string).data
      .token;

    const update = async (
      vehicleData: VehicleInterface,
      token: string,
      vehicleId: number
    ) => {
      const response = await updateVehicle(vehicleId, vehicleData, token);

      if (response?.status === 200) {
        navigate("/");
      }
    };

    if (token) {
      update(
        formData,
        token,
        (location.state as VehicleInterface).id as number
      );
    }
  };

  return vehicleData === null ? (
    <div>Unauthorized Access</div>
  ) : (
    <>
      <section className="heading">
        <h1>Edit Vehicle Listing</h1>
        <p>Please fill out the info you want to update below</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Vehicle Name</label>
            <input
              name="name"
              id="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Vehicle Brand</label>
            <input
              name="brand"
              id="brand"
              type="text"
              className="form-control"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              name="year"
              id="year"
              type="number"
              className="form-control"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="plate">Plate</label>
            <input
              name="plate"
              id="plate"
              type="string"
              className="form-control"
              value={formData.plate}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <select
              name="color"
              id="color"
              value={formData.color}
              onChange={handleChange}
              required
            >
              {Object.keys(colors).map((key) => (
                <option
                  key={Math.random()}
                  value={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              id="price"
              type="number"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the Vehicle</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditVehicle;

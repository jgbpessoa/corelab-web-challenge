import { ChangeEvent, useEffect, useState } from "react";
import { fetchVehicles, searchAndFilter } from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { VehicleInterface } from "../../types/VehicleInterface";
import { TermsInterface } from "../../types/TermsInterface";
import { useNavigate } from "react-router-dom";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchVehicles();
      if (response) {
        setVehicles(response.vehicles.data);
      }
    };

    if (search) {
      const searchVehicle = async (term: TermsInterface) => {
        const response = await searchAndFilter(term);

        if (response) {
          setVehicles(response.vehicles.data);
        }
      };

      const delaySearch = setTimeout(() => {
        searchVehicle({ search });
      }, 1000);

      return () => clearTimeout(delaySearch);
    }

    fetch();
  }, [search]);

  const handleChange = (event: ChangeEvent) => {
    setSearch((event.target as HTMLInputElement).value);
  };

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <>
          <Search placeholder="Search" value={search} onChange={handleChange} />

          <Button
            text="Add new vehicle"
            onClick={() => {
              navigate("/new-vehicle");
            }}
          />

          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} vehicle={vehicle} />
          ))}

          {vehicles.length === 0 && <p>No vehicles were found ;C</p>}
        </>
      </main>
    </div>
  );
};

export default VehiclesPage;

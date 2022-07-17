import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  fetchVehicles,
  searchAndFilter,
  fetchFilterValues,
  fetchFavorites,
} from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { VehicleInterface } from "../../types/VehicleInterface";
import { TermsInterface } from "../../types/TermsInterface";
import { useNavigate } from "react-router-dom";
import { BsSliders } from "react-icons/bs";
import { Modal } from "react-responsive-modal";
import FilterForm from "../../components/FilterForm";
import AuthContext from "../../context/auth/AuthContext";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);
  const [favorites, setFavorites] = useState<VehicleInterface[]>([]);
  const [searchTerms, setSearchTerms] = useState<TermsInterface>({
    search: "",
    max_price: "",
    min_price: "",
    brand: "",
    color: "",
    year: "",
  });

  const { state } = useContext(AuthContext);

  //Modal
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const navigate = useNavigate();

  // Filter values available
  const [brandFilters, setBrandFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);
  const [yearFilters, setYearFilters] = useState([]);

  useEffect(() => {
    const fetchFav = async (userToken: string) => {
      const response = await fetchFavorites(userToken);
      setFavorites(response?.data.favorites);
    };

    if (state.token) {
      fetchFav(state.token);
    }
  }, [state]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchVehicles();
      if (response) {
        setVehicles(response.data.vehicles.data);
      }
    };

    const fetchFilters = async () => {
      const responseBrand = await fetchFilterValues("brand");
      setBrandFilters(responseBrand?.data.sort());
      const responseColor = await fetchFilterValues("color");
      setColorFilters(responseColor?.data.sort());
      const responseYear = await fetchFilterValues("year");
      setYearFilters(
        responseYear?.data.sort(function (a: number, b: number) {
          return b - a;
        })
      );
    };

    fetchFilters();

    if (searchTerms) {
      const searchVehicle = async (terms: TermsInterface) => {
        const response = await searchAndFilter(terms);

        if (response) {
          setVehicles(response.data.vehicles.data);
        }
      };

      const delaySearch = setTimeout(() => {
        searchVehicle(searchTerms);
      }, 1000);

      return () => clearTimeout(delaySearch);
    }

    fetch();
  }, [searchTerms]);

  const handleChange = (event: ChangeEvent) => {
    setSearchTerms({
      ...searchTerms,
      search: (event.target as HTMLInputElement).value,
    });
  };

  const filterValues = {
    brandFilters,
    colorFilters,
    yearFilters,
  };

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <>
          <Search
            placeholder="Search"
            value={searchTerms.search as string}
            onChange={handleChange}
          />

          <Button onClick={onOpenModal}>
            <BsSliders />
          </Button>
          <Modal open={open} onClose={onCloseModal} center>
            <FilterForm
              filterValues={filterValues}
              searchTerms={searchTerms}
              setSearchTerms={setSearchTerms}
            />
          </Modal>
          <Button
            text="Add new vehicle"
            onClick={() => {
              navigate("/new-vehicle");
            }}
          />

          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              vehicle={vehicle}
              setVehicles={setVehicles}
              favorites={favorites}
            />
          ))}
          {vehicles.length === 0 && <p>No vehicles were found ;C</p>}
        </>
      </main>
    </div>
  );
};

export default VehiclesPage;

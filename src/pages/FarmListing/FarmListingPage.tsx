import React, { useEffect, useState } from "react";
import {
  addFarm,
  deleteFarm,
  getCropTypes,
  getFarms,
} from "../../services/apiService";
import { CropType, Farm } from "../../types/Farm";
import FarmList from "../../components/FarmList/FarmList";
import Modal from "../../components/Modal/Modal";
import AddFarmForm from "../../components/AddFarmForm/AddFarmForm";
import "./FarmListingPage.scss";

const FarmListingPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const [cropTypes, setCropTypes] = useState<CropType[]>([]);

  const [farmsError, setFarmsError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [searchEntry, setSearchEntry] = useState<string>("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsList = await getFarms();
        setFarms(farmsList);
        setFarmsError(false);
      } catch (error) {
        console.error("Error fetching farms:", error);
        setFarmsError(true);
      }
    };

    fetchFarms();
  }, []);

  useEffect(() => {
    const fetchCropTypes = async () => {
      try {
        const cropTypesList = await getCropTypes();
        setCropTypes(cropTypesList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCropTypes();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async (newFarm: Omit<Farm, "id">) => {
    try {
      const createdFarm = await addFarm(newFarm);
      setFarms((prevFarms) => [...prevFarms, createdFarm]);
      closeModal();
    } catch (error) {
      console.error("Error creating farm:", error);
    }
  };

  const getUpdatedFarmList = async () => {
    const updatedFarmList = await getFarms();
    setFarms(updatedFarmList);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFarm(id);
      getUpdatedFarmList();
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  const filteredFarms = farms.filter((farm) =>
    farm.farmName?.toLowerCase().includes(searchEntry.toLowerCase())
  );

  return (
    <div className="container farm-listing">
      <h1>REGISTERED FARMS</h1>
      <div className="farm-listing-nav">
        <input
          type="search"
          placeholder="  Search for the farm name"
          className="farm-search w-25"
          value={searchEntry}
          onChange={(e) => setSearchEntry(e.target.value)}
        />
        <button type="button" className="btn" onClick={openModal}>
          Add new farm
        </button>
      </div>
      {farmsError ? (
        <div>Oops. Something is wrong here, but it will be back! </div>
      ) : (
        <FarmList
          farms={filteredFarms}
          cropTypes={cropTypes}
          onDelete={handleDelete}
        />
      )}
      <Modal show={showModal} onClose={closeModal} title="Register New Farm">
        <AddFarmForm cropTypes={cropTypes} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default FarmListingPage;

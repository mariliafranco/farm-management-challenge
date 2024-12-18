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
import FeedbackToast from "../../components/FeedbackToast/FeedbackToast";

const FarmListingPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const [cropTypes, setCropTypes] = useState<CropType[]>([]);

  const [farmsError, setFarmsError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [searchEntry, setSearchEntry] = useState<string>("");

  const [feedbackTitle, setFeedbackTitle] = useState<string>("");

  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const [isPositiveFeedback, setIsPositiveFeedback] = useState<boolean>(true);

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

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const generateFeedback = (
    isPositive: boolean,
    title: string,
    message: string
  ) => {
    setShowFeedback(true);
    setIsPositiveFeedback(isPositive);
    setFeedbackTitle(title);
    setFeedbackMessage(message);
  };

  const handleSubmit = async (newFarm: Omit<Farm, "id">) => {
    try {
      const createdFarm = await addFarm(newFarm);
      setFarms((prevFarms) => [...prevFarms, createdFarm]);
      closeModal();

      generateFeedback(true, "All Done", "New farm created");
    } catch (error) {
      console.error("Error creating farm:", error);
      generateFeedback(false, "Not a good deal", "New farm was not created");
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

      generateFeedback(true, "All done", "Farm was deleted!");
    } catch (error) {
      console.error("Error deleting farm:", error);
      generateFeedback(false, "Not a good deal", "Farm was not deleted");
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
      <FeedbackToast
        title={feedbackTitle}
        message={feedbackMessage}
        showFeedback={showFeedback}
        isPositive={isPositiveFeedback}
        closeFeedback={() => setShowFeedback(false)}
      />
    </div>
  );
};

export default FarmListingPage;

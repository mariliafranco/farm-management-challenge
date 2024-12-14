import React, { useEffect, useState } from "react";
import { getFarms } from "../../services/apiService";
import "./FarmListingPage.scss";
import FarmList from "../../components/FarmList/FarmList";
import { CropType, Farm } from "../../types/Farm";

const FarmListingPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const [cropTypes, setCropTypes] = useState<CropType[]>([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsList = await getFarms();
        setFarms(farmsList);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchFarms();
  }, []);

  return (
    <div className="container farm-listing">
      <h1>Farms Listing</h1>
      <FarmList farms={farms} />
    </div>
  );
};

export default FarmListingPage;

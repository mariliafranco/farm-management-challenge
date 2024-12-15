import React, { useEffect, useState } from "react";
import { getCropTypes, getFarms } from "../../services/apiService";
import "./FarmListingPage.scss";
import FarmList from "../../components/FarmList/FarmList";
import { CropType, Farm } from "../../types/Farm";

const FarmListingPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const [cropTypes, setCropTypes] = useState<CropType[]>([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsList = await getFFaarms();
        setFarms(farmsList);
      } catch (error) {
        console.error("Error fetching farms:", error);
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

  return (
    <div className="container farm-listing">
      <h1>Farms Listing</h1>
      <FarmList farms={farms} cropTypes={cropTypes} />
    </div>
  );
};

export default FarmListingPage;

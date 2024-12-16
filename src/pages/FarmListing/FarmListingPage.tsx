import React, { useEffect, useState } from "react";
import { getCropTypes, getFarms } from "../../services/apiService";
import { CropType, Farm } from "../../types/Farm";
import FarmList from "../../components/FarmList/FarmList";

const FarmListingPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const [cropTypes, setCropTypes] = useState<CropType[]>([]);

  const [farmsError, setFarmsError] = useState<Boolean>(false);

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

  return (
    <div className="container">
      <h1>Farms List</h1>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary btn-sm">
          Add new farm
        </button>
      </div>
      {farmsError ? (
        <div>Oops. Something is wrong here, but it will be back! </div>
      ) : (
        <FarmList farms={farms} cropTypes={cropTypes} />
      )}
    </div>
  );
};

export default FarmListingPage;

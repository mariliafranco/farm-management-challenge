import React from "react";
import { CropProduction, CropType } from "../../types/Farm";
import "./CropList.scss";

type CropProductionProps = {
  farmCrops: CropProduction[];
  cropTypes: CropType[];
};

const CropList: React.FC<CropProductionProps> = ({ farmCrops, cropTypes }) => {
  const getCropName = (cropTypeId: number): string => {
    const cropType = cropTypes.find((type) => type.id === String(cropTypeId));
    return cropType ? cropType.name : "Crop is not registered";
  };
  return (
    <div className="crop-list">
      <h5 className="row">Crop Production</h5>
      {farmCrops.map((crop) => (
        <div className="row crop-list-item" key={crop.id}>
          <div className="col-4 crop-name">{getCropName(crop.cropTypeId)}</div>
          <div className="col d-flex justify-content-end align-items-center">
            {" "}
            {crop.isIrrigated && (
              <div className="crop-detail">
                <i className="bi bi-droplet-half px-2"></i>
                Irrigated
              </div>
            )}
            {crop.isInsured && (
              <div className="crop-detail ms-3">
                <i className="bi bi-shield-fill-check"></i>
                Insured
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CropList;

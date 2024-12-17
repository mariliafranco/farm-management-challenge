import React from "react";
import "./FarmList.scss";
import { CropType, Farm } from "../../types/Farm";
import CropList from "../CropList/CropList";

type FarmListProps = {
  farms: Farm[];
  cropTypes: CropType[];
};

const FarmList: React.FC<FarmListProps> = ({ farms, cropTypes }) => {
  const sortedFarms = [...farms].sort(
    (a: Farm, b: Farm) => Number(b.id) - Number(a.id)
  );

  if (!farms.length) {
    return (
      <div className="text-center mt-4">
        <p className="alert alert-warning">No farms available.</p>
      </div>
    );
  }

  return (
    <div className="row farm-list">
      {sortedFarms.map((farm) => (
        <div key={farm.id} className="col-md-4 col-sm-4 col-xs-12 mb-4">
          <div className="farm-list-item">
            <h4>{farm?.farmName || ""}</h4>
            <p>
              {farm.landArea} {farm.landUnit}
            </p>
            <p>{farm?.farmAddress || ""}</p>
            {farm.cropProductions && farm.cropProductions.length > 0 ? (
              <CropList
                farmCrops={farm.cropProductions}
                cropTypes={cropTypes}
              />
            ) : (
              <p className="mt-3 text-muted">
                No crop productions available for this farm.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmList;

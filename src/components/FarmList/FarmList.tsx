import React from "react";
import "./FarmList.scss";
import { CropType, Farm } from "../../types/Farm";

type FarmListProps = {
  farms: Farm[];
  cropTypes: CropType[];
};

const FarmList: React.FC<FarmListProps> = ({ farms, cropTypes }) => {
  const sortedFarms = [...farms].sort(
    (a: Farm, b: Farm) => Number(b.id) - Number(a.id)
  );

  const getCropName = (cropTypeId: number): string => {
    const cropType = cropTypes.find((type) => type.id === String(cropTypeId));
    return cropType ? cropType.name : "Crop is not registered";
  };

  if (!farms.length) {
    return (
      <div className="text-center mt-4">
        <p className="alert alert-warning">No farms available.</p>
      </div>
    );
  }

  return (
    <div className="farm-list-container">
      {sortedFarms.map((farm) => (
        <div key={farm.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-primary">{farm.farmName}</h2>
            <p>
              <strong>Land Area:</strong> {farm.landArea} {farm.landUnit}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {farm.farmAddress || "No address provided"}
            </p>
            {farm.cropProductions && farm.cropProductions.length > 0 ? (
              <>
                <h3 className="mt-3">Crop Productions</h3>
                <ul className="list-group mt-2">
                  {farm.cropProductions.map((crop) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={crop.id}
                    >
                      <span>
                        <strong>Crop Type:</strong>{" "}
                        {getCropName(crop.cropTypeId)}
                      </span>
                      <span>
                        {crop.isIrrigated && (
                          <span className="badge bg-info text-dark me-2">
                            Irrigated
                          </span>
                        )}
                        {crop.isInsured && (
                          <span className="badge bg-success">Insured</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
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

import React from "react";
import "./FarmList.scss";

const FarmList = ({ farms }) => {
  if (!farms.length) {
    return (
      <div>
        <p>No farms available.</p>
      </div>
    );
  }
  return (
    <>
      <ul className="justify-content-md-center list-group farm-list">
        {farms.map((farm) => (
          <li key={farm.id} className="list-group-item farm-item">
            <h2>{farm.farmName}</h2>
            <p>
              Land area: {farm.landArea} {farm.landUnit}
            </p>
            <p>{farm.farmAddress}</p>
            {farm.cropProductions && (
              <>
                <h3>Crop Production</h3>
                <ul className="justify-content-md-center list-group farm-prodution-list">
                  {farm.cropProductions.map((crop) => (
                    <li className="list-group-item" key={crop.id}>
                      <p>Crop Type: {crop.cropTypeId}</p>
                      {crop.isIrrigated && <p>Irrigated</p>}
                      {crop.isInsured && <p>Insured</p>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FarmList;

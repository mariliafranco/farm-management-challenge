import React, { useState } from "react";
import "./FarmList.scss";
import { CropType, Farm } from "../../types/Farm";
import CropList from "../CropList/CropList";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

type FarmListProps = {
  farms: Farm[];
  cropTypes: CropType[];
  onDelete: (id: string) => void;
};

const FarmList: React.FC<FarmListProps> = ({ farms, cropTypes, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [deleteFarmId, setDeleteFarmId] = useState<string>("");

  const sortedFarms = [...farms].sort(
    (a: Farm, b: Farm) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!farms.length) {
    return (
      <div className="empty-list text-center">
        <p>There is no farm registered yet</p>
      </div>
    );
  }

  const openConfirmModal = (farmId: string) => {
    setDeleteFarmId(farmId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setDeleteFarmId("");
    setShowConfirmModal(false);
  };

  return (
    <div className="row farm-list">
      {sortedFarms.map((farm) => (
        <div key={farm.id} className="col-md-4 col-sm-4 col-xs-12 mb-4">
          <div className="farm-list-item">
            <div className="farm-delete-icon">
              <button type="button" onClick={() => openConfirmModal(farm.id)}>
                <i className="bi bi-trash3"></i>
              </button>
            </div>

            <div className="farm-content">
              <h4>{farm?.farmName || `Farm ${farm.id}`}</h4>
              <p>
                {farm.landArea} {farm.landUnit}
              </p>
              <p>
                {farm?.farmAddress || (
                  <small>
                    {" "}
                    <i className="bi bi-x me-3"></i>No address provided
                  </small>
                )}
              </p>
              {farm.cropProductions && farm.cropProductions.length > 0 ? (
                <CropList
                  farmCrops={farm.cropProductions}
                  cropTypes={cropTypes}
                />
              ) : (
                <p className="mt-3 text-muted">
                  No crop production registered for this farm.
                </p>
              )}
            </div>
          </div>
          <ConfirmModal
            isOpen={showConfirmModal}
            onCancel={closeConfirmModal}
            message={"Are you sure you want to delete this farm?"}
            confirmButton={"Yes, delete farm"}
            onConfirm={() => {
              onDelete(deleteFarmId);
              setShowConfirmModal(false);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FarmList;

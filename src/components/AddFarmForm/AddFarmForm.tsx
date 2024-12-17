import React, { useState } from "react";
import { CropProduction, CropType, Farm } from "../../types/Farm";
import "./AddFarmForm.scss";

type AddFarmProps = {
  cropTypes: CropType[];
  onSubmit: (newFarm: Omit<Farm, "id">) => void;
};

const AddFarmForm: React.FC<AddFarmProps> = ({ cropTypes, onSubmit }) => {
  const [farmDetails, setFarmDetails] = useState({
    farmName: "",
    landArea: 1,
    landUnit: "Acre",
    farmAddress: "",
  });

  const [cropProductions, setCropProductions] = useState<CropProduction[]>([
    {
      id: 1,
      cropTypeId: 1,
      isIrrigated: false,
      isInsured: false,
    },
  ]);

  const farmFormFields = [
    {
      inputType: "text",
      name: "farmName",
      label: "Farm Name",
      colSize: "12",
    },
    {
      inputType: "text",
      name: "farmAddress",
      label: "Farm Address",
      colSize: "12",
    },
    {
      inputType: "text",
      name: "landArea",
      label: "Land Area",
      required: true,
      colSize: "6",
    },
    {
      hasOptions: true,
      inputType: "select",
      name: "landUnit",
      label: "Land Unit",
      required: true,
      options: ["Acre", "Hectares", "Square Miles", "Bigha", "Are"],
      colSize: "6",
    },
  ];

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFarmDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCropChange = (
    index: number,
    field: keyof CropProduction,
    value: any
  ) => {
    const updatedCrops = [...cropProductions];
    updatedCrops[index][field] = value;
    setCropProductions(updatedCrops);
  };

  const addNewCrop = () => {
    const nextCropId = cropProductions.length + 1;
    setCropProductions([
      ...cropProductions,
      { id: nextCropId, cropTypeId: 1, isIrrigated: false, isInsured: false },
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFarm: Omit<Farm, "id"> = {
      ...farmDetails,
      cropProductions,
    };

    onSubmit(newFarm);
  };

  return (
    <form action="" className="row form-container px-3" onSubmit={handleSubmit}>
      {farmFormFields.map((field) => (
        <div key={field.name} className={`mb-2 col-${field.colSize}`}>
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          {field.hasOptions ? (
            <select
              className="form-select"
              name={field.name}
              value={farmDetails[field.name as keyof typeof farmDetails]}
              onChange={handleFieldChange}
              required={field.required}
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.inputType}
              className="form-control"
              name={field.name}
              value={farmDetails[field.name as keyof typeof farmDetails]}
              onChange={handleFieldChange}
              required={field.required}
              placeholder={`Enter ${field.label}`}
            />
          )}
        </div>
      ))}
      <p>Crop Productions</p>
      {cropProductions.map((crop, index) => (
        <div className="form-crop-items" key={crop.cropTypeId}>
          <div className="col-5">
            <label htmlFor={`crop-${crop.id}`}>Crop Name</label>
            <div key={crop.id}>
              <select
                id={`crop-${crop.id}`}
                className="form-select"
                value={crop.cropTypeId}
                onChange={(e) =>
                  handleCropChange(index, "cropTypeId", Number(e.target.value))
                }
              >
                {cropTypes.map((type) => (
                  <option key={type.id} value={Number(type.id)}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-6 form-crop-checkbox">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={crop.isIrrigated}
                onChange={(e) =>
                  handleCropChange(index, "isIrrigated", e.target.checked)
                }
              />
              <label className="form-check-label ms-2">Irrigated</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input ms-3"
                checked={crop.isInsured}
                onChange={(e) =>
                  handleCropChange(index, "isInsured", e.target.checked)
                }
              />
              <label className="form-check-label ms-2">Insured</label>
            </div>
          </div>
        </div>
      ))}
      <div className="form-crop-button">
        <button type="button" className="btn mb-3" onClick={addNewCrop}>
          ADD NEW CROP
        </button>
      </div>
      <div className="form-submit-button">
        <button type="submit" className="btn modal-save-button">
          Register
        </button>
      </div>
    </form>
  );
};

export default AddFarmForm;

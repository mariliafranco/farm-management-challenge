import React, { useRef, useState } from "react";
import { CropProduction, CropType, Farm } from "../../types/Farm";
import "./AddFarmForm.scss";

type AddFarmProps = {
  cropTypes: CropType[];
  onSubmit: (newFarm: Omit<Farm, "id">) => void;
};

const AddFarmForm: React.FC<AddFarmProps> = ({ cropTypes, onSubmit }) => {
  const [farmDetails, setFarmDetails] = useState({
    farmName: "",
    landArea: 0,
    landUnit: "",
    farmAddress: "",
  });

  const [farmCrops, setFarmCrops] = useState<CropProduction[]>([
    {
      id: 0,
      cropTypeId: 1,
      isIrrigated: false,
      isInsured: false,
    },
  ]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const nextCropId = useRef(1);

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
      inputType: "number",
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
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCropChange = (
    id: number,
    field: keyof CropProduction,
    value: CropProduction[keyof CropProduction]
  ) => {
    console.log("id:", id, "field", field, "value", value);
    console.log("farmCorps", farmCrops);
    setFarmCrops((prevCrops) =>
      prevCrops.map((crop) =>
        crop.id === id ? { ...crop, [field]: value } : crop
      )
    );
  };

  const addNewCrop = () => {
    setFarmCrops((prevCrops) => [
      ...prevCrops,
      {
        id: nextCropId.current,
        cropTypeId: cropTypes.length > 0 ? Number(cropTypes[0].id) : 0,
        isIrrigated: false,
        isInsured: false,
      },
    ]);
    nextCropId.current += 1;
  };

  const removeLastAddedCrop = (cropId: number) => {
    setFarmCrops(farmCrops.filter((crop) => crop.id !== cropId));
  };

  const validateRequiredFields = () => {
    const newErrors: Record<string, string> = {};
    farmFormFields.forEach((field) => {
      if (
        field.required &&
        !farmDetails[field.name as keyof typeof farmDetails]
      ) {
        newErrors[field.name] = `${field.name} is required`;
      }
    });

    setFormErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateRequiredFields()) return;

    const newFarm: Omit<Farm, "id"> = {
      ...farmDetails,
      createdAt: new Date().toISOString(),
      cropProductions: farmCrops,
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
              <option value="">Choose Unit</option>
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
              minLength={2}
              maxLength={100}
              min={1}
              step="any"
              name={field.name}
              value={farmDetails[field.name as keyof typeof farmDetails]}
              onChange={handleFieldChange}
              required={field.required}
              placeholder={`Enter ${field.label}`}
            />
          )}
          {formErrors[field.name] && (
            <small className="text-danger">{formErrors[field.name]}</small>
          )}
        </div>
      ))}
      <p>Crop Productions</p>
      {farmCrops.map((crop) => (
        <div className="form-crop-items" key={crop.id}>
          <div className="col-5">
            <label htmlFor={`crop-${crop.id}`}>Crop Name</label>
            <div key={crop.id}>
              <select
                id={`crop-${crop.id}`}
                className="form-select"
                value={crop.cropTypeId}
                onChange={(e) =>
                  handleCropChange(
                    crop.id,
                    "cropTypeId",
                    Number(e.target.value)
                  )
                }
              >
                <option value="">Choose Crop</option>
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
                  handleCropChange(crop.id, "isIrrigated", e.target.checked)
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
                  handleCropChange(crop.id, "isInsured", e.target.checked)
                }
              />
              <label className="form-check-label ms-2">Insured</label>
            </div>
          </div>
          {farmCrops.length > 1 && (
            <div className="form-remove-crop">
              <button
                className="btn"
                type="button"
                onClick={() => removeLastAddedCrop(crop.id)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="form-add-crop">
        <button
          type="button"
          className="btn mb-3"
          onClick={addNewCrop}
          disabled={farmCrops.length === cropTypes.length}
        >
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

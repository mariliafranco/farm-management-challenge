export type CropProduction = {
  id: number;
  cropTypeId: number;
  isIrrigated?: boolean;
  isInsured?: boolean;
};

export type CropType = {
  id: string;
  name: string;
};

export type Farm = {
  id: string;
  farmName?: string;
  landArea: number;
  landUnit: string;
  farmAddress?: string;
  cropProductions: CropProduction[];
};

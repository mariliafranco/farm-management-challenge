# Farm Management App

The main goal of this application is to register and manage farms with their associated crop productions. It is based on creating and deleting farms with nested crops production, while listing from the most recent to the oldest.

## Features

_Create a Farm:_ Add a new farm with details including name, land area, unit of measure, address, and associated crop productions.

_Delete a Farm:_ Remove an existing farm by its unique identifier.

_List Farms:_ Display all farms, ordered from the most recent to the oldest based on their creation date.

## Technologies Used

**Frontend:** React.js with TypeScript

**Build Tool:** Vite

**Backend:** JSON Server

**HTTP Client:** Axios

**Styling:** Bootstrap and SCSS

## Getting Started

Follow these instructions to set up and run the project locally.

**Prerequisites**

You will need the following installed on your system:

_Node.js (v14 or later)_

_npm (v6 or later)_

## Installation

###### Clone the Repository:

```
git clone https://github.com/mariliafranco/farm-management-challenge.git
cd farm-management-app
```

###### Install Dependencies:

```
npm install
```

## Set Up JSON Server:

_JSON Server is used to simulate a backend API._

###### Install JSON Server Globally:

```
npm install -g json-server
```

###### Create db.json file:

In the project root, create a db.json file with the following structure:

```
{
  "farms": [
    {
      "id": "1",
      "farmName": "Farm 1",
      "landArea": 100,
      "landUnit": "hectares",
      "cropProductions": [
        {
          "id": 1,
          "cropTypeId": 1,
          "isIrrigated": true,
          "isInsured": false
        },
        {
          "id": 2,
          "cropTypeId": 2,
          "isIrrigated": true,
          "isInsured": false
        }
      ]
    }
  ],
  "crop-types": [
    {
      "id": "1",
      "name": "RICE"
    },
    {
      "id": "2",
      "name": "BEANS"
    },
    {
      "id": "3",
      "name": "CORN"
    },
    {
      "id": "4",
      "name": "COFFEE"
    },
    {
      "id": "5",
      "name": "SOYBEAN"
    }
  ]
}
```

###### Start JSON Server:

In the project root, run:

```
json-server --watch db.json --port 3001
```

_This will start the JSON Server at http://localhost:3001_

## Start the React Application:

Open a new terminal in the project root and run:

```
npm run dev
```

The application will run at http://localhost:5173.

## Project Structure

```
farm-management-app/
├── public/
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   └── CropList
│   │       ├── CropList.tsx
│   │       └── CropList.scss
│   │
│   ├── pages/
│   │ └── FarmListingPage
│   │       ├── FarmListingPage.tsx
│   │       └── FarmListingPage.scss
│   │
│   ├── services/
│   │
│   ├── styles/
│   │
│   ├── types/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── db.json
├── tsconfig.json
├── package.json
├── vite.config.js
└── README.md
```

_public/_: Contains the favicon (static asset)

_assets/_: Contains the logo

_index.html_: Main HTML file

_package.json_: Project metadata and dependencies

_src/App.tsx_: The root React component

_src/main.tsx_: Entry point for the React application

_src/styles/_: Define Global and Mixins to be reusable as SCSS styles

_src/pages/_: Contains the main page and the Not Found Page

_src/components/_: Contains React components for the application

_src/services/apiService.ts_: Includes functions for API calls using Axios

_src/types/Farm.ts_: Defines TypeScript types and interfaces for the application

_db.json_: Simulated database for JSON Server

_tsconfig.json_: TypeScript configuration file

_vite.config.ts_: Vite configuration file

_README.md_: Project documentation

## TypeScript Integration

This project uses TypeScript to enhance code quality. Here is an example of Type Definition, used in _types/Farms.js_:

```
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
createdAt: string;
};
```

## API Endpoints

The application interacts with the following API endpoints provided by JSON Server:

_Farms:_

GET /farms: Retrieve all farms.

POST /farms: Create a new farm.

DELETE /farms/:id: Delete a farm by ID.

_Crop Types:_

GET /cropTypes: Retrieve all crop types.

## Future Enhancements

Next round of improvements for the application:

- Paginated results with dynamic page sizes.

- Implementing unit and end-to-end tests.

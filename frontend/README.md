## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Libraries Used](#libraries-used)
- [Installation](#installation)
- [Running the project](#running-the-project)
- [Implementation Logic](#implementation-logic)
- [Running tests](#running-tests)

## Introduction
- This is a Single Page React Application displaying an employee dataset in Table as well as Chart View where the salary is aggregated by `location`. (Aggregation used is `Mean` of Salary).
- The application also has `search` capability where only those locations matching the search query are shown. If search box empty, then all locations are shown in both table and chart.

## Libraries Used
1. UI - React.ts
2. Styling - Tailwindcss and [DaisyUI](https://daisyui.com/) for Tailwind based components like table, tab
3. State Management - React State and Props (no prop drilling, hence Global State Management library not used)
4. Charting - [React Chartjs 2](https://github.com/reactchartjs/react-chartjs-2).
5. Testing - React Testing Library
6. SearchBox - [React Select Library](https://react-select.com/home) - Since already had tailwindcss style setup, did not use Material UI component as it will also install other dependencies which are not really needed.

## Installation
1. Clone the repository:
```bash
    git clone https://github.com/raunak96/elchemy-interview
```
2. Install the dependencies
```bash
    npn install
```

## Running the project
```bash
    npm run start
```

## Implementation Logic
1. *Transforming Employee Dataset to usable form:* [Refer](src/utils.ts#L6)
   -  First converted dataset to a Map<String,Object> where key is `Location` and value is an Object having `total employees` and `total salary` for that location.
   -  Finally, the map is converted to an array of objects of the form {location, salary} where salary is `mean` salary we get by:
    ```javascript
        salary = total salary/total employees
    ``` 
2. *Search By Location:* 
 - Used `ReactSelect` component provided by `react-select` library which allows to select multiple filters at same time (in our case `locations`). [Refer](src/components/Header.tsx#L46)
 - If no locations are selected, we show table/chart view for all locations.
 - Whenever one or more locations are selected, we filter out employee data for those locations only and display them. [Refer](src/App.tsx#L12).

## Running tests
- Run the following command to test the App:
  ```bash
    npm run test
  ```
- Written Tests using `React Testing Library`.
- Since, it is a simple App with no routing and other complexities like API call/server interactions just did a simple component testing using this library.
- For end-to-end test for complex app, can use library like `Cypress`.
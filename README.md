## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Libraries Used](#libraries-used)
- [Installation](#installation)
- [Running the project](#running-the-project)
- [Implementation Logic](#implementation-logic)

## Introduction
- This is a Single Page React Application displaying an employee dataset in Table as well as Chart View where the salary is aggregated by `location`. (Aggregation used is `Mean` of Salary).
- The application also has `search` capability where only those locations matching the search query are shown. If search box empty, then all locations are shown in both table and chart.

## Libraries Used
1. UI - React.ts
2. Styling - Tailwindcss
3. UI Components (for table,tabs) - [DaisyUI](https://daisyui.com/) - Tailwindcss based component library
4. State Management - React State and Props (no prop drilling, hence Global State Management library not used)
5. Charting - [React Chartjs 2](https://github.com/reactchartjs/react-chartjs-2).

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
   - For searching, `sub-string` logic is used using `includes` javascript method i.e if search query is substring of location, it is selected.
   - The search input box is a `controlled` component (using react state). When user types in search box, `onChange` event is triggered where apart from setting the value of input box, `onSearch` method passed as props to it also runs which simply filters the employee by search query and stores it in state which is passed as `props` to both `Bar Chart` and `Table` as employees data. Please refer [App.tsx](src/App.tsx#L27) and [Header.tsx](src/components/Header.tsx#L49)
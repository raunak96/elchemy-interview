import { useState } from "react";
import EmployeeChart from "./components/EmployeeChart";
import EmployeeTable from "./components/EmployeeTable";
import Header from "./components/Header";
import { transformData } from "./utils";

function App() {
	const [employees] = useState<Employee[]>(transformData);
	const [selectedTab, setSelectedTab] = useState<number>(0);
	const [filteredEmployees, setFilteredEmployees] =
		useState<Employee[]>(employees);

	const onSearch = (location: string) => {
		if (location === "") {
			setFilteredEmployees(employees);
			return;
		}
		setFilteredEmployees(
			employees.filter(emp =>
				emp.location.toLowerCase().includes(location.toLowerCase())
			)
		);
	};

	return (
		<div className="container mx-auto p-4 flex flex-col space-y-5 h-screen">
			<Header
				onSearch={onSearch}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>
			{selectedTab === 0 && (
				<EmployeeTable employees={filteredEmployees} />
			)}
			{selectedTab === 1 && (
				<EmployeeChart employees={filteredEmployees} />
			)}
		</div>
	);
}

export default App;

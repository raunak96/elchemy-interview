import { useMemo, useState } from "react";
import EmployeeChart from "./components/EmployeeChart";
import EmployeeTable from "./components/EmployeeTable";
import Header from "./components/Header";
import { transformData } from "./utils";

function App() {
	const [employees] = useState<Employee[]>(transformData);
	const [selectedTab, setSelectedTab] = useState<number>(0);
	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

	const filteredEmployees: Employee[] = useMemo(() => {
		if (selectedLocations.length === 0) return employees;
		return employees.filter(emp =>
			selectedLocations.includes(emp.location)
		);
	}, [employees, selectedLocations]);

	return (
		<div className="container mx-auto p-4 flex flex-col space-y-5 h-screen">
			<Header
				employees={employees}
				selectedLocations={selectedLocations}
				setSelectedLocations={setSelectedLocations}
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

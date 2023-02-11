import { useState } from "react";
import EmployeeTable from "./components/EmployeeTable";
import Header from "./components/Header";
import Employees from "./data/EmployeeDataset.json";

function App() {
	const [employees] = useState<Employee[]>(() => {
		// First store Employees in Map where key is Location and key is Employee type ({totalEmployees,totalSalary})
		const empMap = Employees.reduce((acc, employee) => {
			const { totalEmployees, totalSalary } = acc.get(
				employee.location
			) ?? { totalEmployees: 0, totalSalary: 0.0 };
			acc.set(employee.location, {
				totalEmployees: totalEmployees + 1,
				totalSalary:
					totalSalary + parseFloat(employee.currSalary.slice(1)),
			});
			return acc;
		}, new Map<string, EmployeeMap>());

		// Finally we convert the map into array of type Employee ({location,salary})
		return Array.from(empMap).map(([loc, emp]) => ({
			location: loc,
			salary: emp.totalSalary / emp.totalEmployees,
		}));
	});
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
		<div className="container mx-auto p-4 flex flex-col space-y-5">
			<Header
				onSearch={onSearch}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>
			{selectedTab === 0 && (
				<EmployeeTable employees={filteredEmployees} />
			)}
		</div>
	);
}

export default App;

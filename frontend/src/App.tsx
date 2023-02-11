import { useState } from "react";
import Employees from "./data/EmployeeDataset.json";

function App() {
	const [employees, setEmployees] = useState<Employee[]>(() => {
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
			salary: (emp.totalSalary / emp.totalEmployees).toFixed(2),
		}));
	});
	return (
		<div className="container mx-auto p-4">
			<div>
				<div>
					<span>Location</span>
					<span>Salary</span>
				</div>
				{employees.map(({ location, salary }) => (
					<div key={location}>
						<span>{location}</span>
						<span>{salary}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;

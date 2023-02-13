import Employees from "./data/EmployeeDataset.json";

/**
 * @description Transforms the original Employee Data location wise with salary aggregated by mean
 */
export const transformData = (): Employee[] => {
	// First store Employees in Map where key is Location and key is Employee type ({totalEmployees,totalSalary})
	const empMap = Employees.reduce((acc, employee) => {
		const { totalEmployees, totalSalary } = acc.get(employee.location) ?? {
			totalEmployees: 0,
			totalSalary: 0.0,
		};

		acc.set(employee.location, {
			totalEmployees: totalEmployees + 1,
			totalSalary: totalSalary + parseFloat(employee.currSalary.slice(1)),
		});
		return acc;
	}, new Map<string, EmployeeMap>());

	// Finally we convert the map into array of type Employee ({location,salary})
	return Array.from(empMap).map(([loc, emp]) => ({
		location: loc,
		salary:
			Math.round(
				(emp.totalSalary / emp.totalEmployees + Number.EPSILON) * 100
			) / 100,
	}));
};

// Formatter for USD currency
const usdFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

/**
 * @description Formats number to US currency format
 */
export const convertToUSD = (value: number) => usdFormatter.format(value);

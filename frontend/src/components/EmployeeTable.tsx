import { useMemo, type FC } from "react";
import { formatter } from "../utils";

type Props = {
	employees: Employee[];
};
const EmployeeTable: FC<Props> = ({ employees }) => {
	const total = useMemo(() => {
		return employees.reduce((acc, employee) => acc + employee.salary, 0.0);
	}, [employees]);

	return (
		<table className="table w-full">
			<thead>
				<tr className="text-white">
					<th className="bg-[#04a599] text-lg capitalize">
						Location
					</th>
					<th className="bg-[#04a599] text-lg capitalize">Salary</th>
				</tr>
			</thead>
			<tbody>
				{employees.map(({ location, salary }) => (
					<tr key={location}>
						<td>{location}</td>
						<td>{formatter.format(salary)}</td>
					</tr>
				))}
				<tr>
					<td className="font-bold">Total</td>
					<td>{formatter.format(total)}</td>
				</tr>
			</tbody>
		</table>
	);
};
export default EmployeeTable;

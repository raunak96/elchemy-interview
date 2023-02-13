import { type FC } from "react";
import { convertToUSD } from "../utils";

type Props = {
	employees: Employee[];
};
const EmployeeTable: FC<Props> = ({ employees }) => {
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
						<td>{convertToUSD(salary)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default EmployeeTable;

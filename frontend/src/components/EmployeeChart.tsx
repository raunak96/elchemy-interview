import { useMemo, type FC } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
type Props = {
	employees: Employee[];
};
const EmployeeChart: FC<Props> = ({ employees }) => {
	const data: ChartData<"bar", number[], string> = useMemo(() => {
		const labels = employees.map(emp => emp.location);
		const datasets = [
			{
				data: employees.map(emp => emp.salary),
				backgroundColor: "rgba(53, 162, 235, 0.5)",
				label: "Mean Salary",
			},
		];
		return { labels, datasets };
	}, [employees]);

	return (
		<div className="flex-1 p-2 m-2">
			<Bar
				data={data}
				options={{
					responsive: true,
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
};
export default EmployeeChart;

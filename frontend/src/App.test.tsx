import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Employees from "./data/EmployeeDataset.json";

test("initial render of App shows search box and Table and Two Tabs", async () => {
	render(<App />);
	const searchBox: HTMLInputElement = screen.getByRole("combobox");
	const table: HTMLTableElement = screen.getByRole("table");
	const barChart = screen.queryByRole("img");

	expect(searchBox).toBeInTheDocument();
	expect(table).toBeInTheDocument();
	expect(barChart).not.toBeInTheDocument();

	const chartTab: HTMLButtonElement = screen.getByRole("button", {
		name: /chart view/i,
	});
	const tableTab: HTMLButtonElement = screen.getByRole("button", {
		name: /table view/i,
	});

	expect(chartTab).toBeInTheDocument();
	expect(tableTab).toBeInTheDocument();
});

test("Changing Tabs between Chart and Table shows the relevant elements", () => {
	render(<App />);

	const chartTab: HTMLButtonElement = screen.getByRole("button", {
		name: /chart view/i,
	});
	const barChart = screen.queryByRole("img");

	const table: HTMLTableElement = screen.getByRole("table");

	expect(table).toBeInTheDocument();
	expect(barChart).not.toBeInTheDocument();

	fireEvent.click(chartTab);

	expect(screen.getByRole("img")).toBeInTheDocument();
	expect(table).not.toBeInTheDocument();
});

test("Correct no of rows displayed in Table", () => {
	render(<App />);
	const rows: HTMLTableRowElement[] = screen.getAllByRole("row");
	const employeesLocations = Employees.reduce((acc, employee) => {
		if (acc.has(employee.location)) return acc;
		acc.set(employee.location, true);
		return acc;
	}, new Map<string, boolean>());

	// +1 because tableHead is also a row
	expect(rows).toHaveLength(employeesLocations.size + 1);
});

test("Search Filter working correctly for given search query", () => {
	render(<App />);

	const allLocations = Array.from(
		Employees.reduce(
			(acc, employee) => acc.add(employee.location),
			new Set<string>()
		)
	);
	const filterTexts = allLocations.slice(0, 3);

	const searchBox: HTMLInputElement = screen.getByRole("combobox");

	// Select 3 locations for filtering
	filterTexts.forEach(filterText => {
		fireEvent.change(searchBox, { target: { value: filterText } });
		fireEvent.keyDown(searchBox, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});
	});
	filterTexts.forEach(filterText => {
		const cell: HTMLTableCellElement = screen.getByRole("cell", {
			name: filterText,
			exact: false,
		});
		expect(cell).toBeInTheDocument();
		expect(cell).toHaveTextContent(filterText);
	});
	const rows: HTMLTableRowElement[] = screen.getAllByRole("row");

	expect(rows).toHaveLength(filterTexts.length + 1);
});

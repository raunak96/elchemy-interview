import { type FC, type Dispatch, type MouseEvent } from "react";
import ReactSelect from "react-select";

type Props = {
	selectedTab: number;
	setSelectedTab: Dispatch<React.SetStateAction<number>>;
	employees: Employee[];
	selectedLocations: string[];
	setSelectedLocations: Dispatch<React.SetStateAction<string[]>>;
};
const Header: FC<Props> = ({
	selectedTab,
	setSelectedTab,
	employees,
	selectedLocations,
	setSelectedLocations,
}) => {
	const handleTabChange = (
		_: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
		index: number
	) => {
		setSelectedTab(index);
	};

	return (
		<header className="flex justify-between space-x-2 items-center p-2">
			{/* Tabs */}
			<div className="tabs flex-1">
				<button
					className={`tab tab-bordered sm:tab-lg ${
						selectedTab === 0 ? "tab-active" : ""
					}`}
					onClick={e => handleTabChange(e, 0)}>
					Table View
				</button>
				<button
					className={`tab tab-bordered sm:tab-lg ${
						selectedTab === 1 ? "tab-active" : ""
					}`}
					onClick={e => handleTabChange(e, 1)}>
					Chart View
				</button>
			</div>

			{/* Search Box */}
			<ReactSelect
				className="flex-1 z-40"
				isMulti
				value={selectedLocations.map(loc => ({
					label: loc,
					value: loc,
				}))}
				options={employees.map(tag => ({
					value: tag.location,
					label: tag.location,
				}))}
				onChange={tags => {
					setSelectedLocations(tags.map(tag => tag.value));
				}}
				placeholder="Filter By Location"
			/>
		</header>
	);
};
export default Header;

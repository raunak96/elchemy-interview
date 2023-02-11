import {
	type ChangeEvent,
	useState,
	type FC,
	type Dispatch,
	type MouseEvent,
} from "react";

type Props = {
	onSearch: (location: string) => void;
	selectedTab: number;
	setSelectedTab: Dispatch<React.SetStateAction<number>>;
};
const Header: FC<Props> = ({ onSearch, selectedTab, setSelectedTab }) => {
	const [location, setLocation] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
		onSearch(e.target.value);
	};
	const handleTabChange = (
		e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
		index: number
	) => {
		setSelectedTab(index);
	};

	return (
		<header className="flex justify-between space-x-2 items-center">
			{/* Tabs */}
			<div className="tabs">
				<span
					className={`tab tab-bordered sm:tab-lg ${
						selectedTab === 0 ? "tab-active" : ""
					}`}
					onClick={e => handleTabChange(e, 0)}>
					Table View
				</span>
				<span
					className={`tab tab-bordered sm:tab-lg ${
						selectedTab === 1 ? "tab-active" : ""
					}`}
					onClick={e => handleTabChange(e, 1)}>
					Chart View
				</span>
			</div>

			{/* Search Box */}
			<input
				type="text"
				placeholder="Search Location"
				className="input input-accent input-sm sm:input-md lg:input-lg"
				value={location}
				onChange={handleChange}
			/>
		</header>
	);
};
export default Header;

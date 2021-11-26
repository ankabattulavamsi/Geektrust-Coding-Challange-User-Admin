import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
	const { searchFilter } = props;
	const onChangeHandler = (event) => {
		searchFilter(event.target.value);
	};
	return (
		<div className={styles["search-container"]}>
			<input
				className={styles["search-bar"]}
				type='text'
				placeholder='Type name to search'
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default SearchBar;
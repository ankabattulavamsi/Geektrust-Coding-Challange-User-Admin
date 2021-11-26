import React from "react";
import { useState } from "react";
import styles from "./SearchBar.module.css";

const Form = (props) => {
	const { editData, setTableData, tableData, setEditData } = props;
	const [name, setName] = useState(editData[0].name);
	const [email, setEmail] = useState(editData[0].email);

	const nameChangeHandler = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const onEmailChangeHandler = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const onSaveHandler = (event) => {
		event.preventDefault();

		const newData = editData[0];
		newData.name = name;
		newData.email = email;
		const updatedData = tableData.map((item) =>
			item.id !== newData.id ? item : newData
		);

		setTableData(updatedData);
		setEditData([]);
		setName("");
		setEmail("");
	};
	return (
		<form type='submit' className={styles["search-bar-container"]}>
			<div className={styles["container"]}>
			<div className={styles["search-bar-align"]}>
			<label htmlFor="name" className={styles["label"]}>Name </label>
			<input type='text' id="name" value={name} onChange={nameChangeHandler} />
			</div>

			<div className={styles["search-bar-align"]}>
			<label htmlFor="email"  className={styles["label"]}>Email </label>
			<input type='text' id="email" value={email} onChange={onEmailChangeHandler} />
			</div>
			</div>
			<button onClick={onSaveHandler}>Save</button>
		</form>
	);
};

export default Form;
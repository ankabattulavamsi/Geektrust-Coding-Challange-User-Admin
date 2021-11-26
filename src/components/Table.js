import React, { useEffect, useState } from "react";
import Form from "./Form";
import SearchBar from "./SearchBar";
import styles from "./Table.module.css";
import TableBody from "./TableBody";

const PREV = "<<";
const NEXT = ">>";
const PAGE_SIZE = 10;

const Table = (props) => {
	const [allData, setAllData] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [paginatedData, setPaginatedData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedRows, setSelectedRows] = useState([]);
	const [isCheckedAll, setIsCheckedAll] = useState(false);
	const [editData, setEditData] = useState([]);

	useEffect(() => {
		fetch(
			"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
		)
			.then((res) => res.json())
			.then((res) => {
				setTableData(res);
				setAllData(res);
				setPaginatedData(res.slice(0, PAGE_SIZE));
			});
	}, []);

	const pageCount = tableData ? Math.ceil(tableData.length / PAGE_SIZE) : 0;
	const numberOfPages = Array.from({ length: pageCount }, (_, i) => i + 1);

	const pagination = (pageNumber) => {
		setCurrentPage(pageNumber);
		const startIndex = (pageNumber - 1) * 10;
		setPaginatedData(tableData.slice(startIndex, startIndex + PAGE_SIZE));
	};

	const nextButtonHandler = () => {
		if (currentPage < pageCount) {
			setCurrentPage((prevState) => prevState + 1);
			const startIndex = currentPage * 10;
			setPaginatedData(tableData.slice(startIndex, startIndex + PAGE_SIZE));
			selectedRows([]);
		}
	};

	const prevButtonHandler = () => {
		if (currentPage > 1) {
			setCurrentPage((prevState) => prevState - 1);
			const startIndex = (currentPage - 2) * 10;
			setPaginatedData(tableData.slice(startIndex, startIndex + PAGE_SIZE));
			selectedRows([]);
		}
	};

	const onDeleteHandler = (val) => {
		const newArray = tableData.filter((value) => val !== value.id);
		setTableData(newArray);
		const startIndex = (currentPage - 1) * 10;
		setPaginatedData(newArray.slice(startIndex, startIndex + PAGE_SIZE));
	};

	const onSelectAllRowsHandler = (rows) => {
		if (isCheckedAll) {
			setSelectedRows([]);
			setIsCheckedAll(false);
		} else {
			setSelectedRows(rows.map((row) => row.name));
			setIsCheckedAll(true);
		}
	};

	const deleteSelectedRowsHandler = () => {
		const newArray = tableData.filter(
			(row) => !selectedRows.includes(row.name)
		);
		setTableData(newArray);
		const startIndex = (currentPage - 1) * 10;
		setPaginatedData(newArray.slice(startIndex, startIndex + PAGE_SIZE));
		setSelectedRows([]);
		setIsCheckedAll(false);
	};

	const searchFilter = (val) => {
		console.log("start");
		const newArray = allData.filter((data) =>
			data.name.toLowerCase().includes(val.toLowerCase())
		);
		setTableData(newArray);
		const startIndex = (currentPage - 1) * 10;
		setPaginatedData(newArray.slice(startIndex, startIndex + PAGE_SIZE));
		setSelectedRows([]);
		setIsCheckedAll(false);
	};

	const editRowHandler = (id) => {
		const data = tableData.filter((data) => data.id === id);
		setEditData(data);
	};

	return (
		<>
			<SearchBar searchFilter={searchFilter} />
			{editData.length > 0 ? (
				<Form
					editData={editData}
					setTableData={setTableData}
					tableData={tableData}
					setEditData={setEditData}
				/>
			) : (
				""
			)}
			<div className={styles["table-container"]}>
				<table>
					<thead>
						<tr>
							<th>
								<input
									type='checkbox'
									onChange={() => onSelectAllRowsHandler(paginatedData)}
									checked={isCheckedAll}
								/>
							</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<TableBody
							tableData={paginatedData}
							deleteSelectedRow={onDeleteHandler}
							setSelectedRows={setSelectedRows}
							selectedRows={selectedRows}
							editRowHandler={editRowHandler}
						/>
					</tbody>
				</table>

				<div className={styles.pagination}>
					<button
						className={styles["btn-delete"]}
						onClick={deleteSelectedRowsHandler}
					>
						Delete Selected
					</button>
					<span className={styles.pageBtn}>
						<button
							className={styles.btn}
							onClick={prevButtonHandler}
							disabled={+currentPage === 1}
						>
							{PREV}
						</button>
						{numberOfPages.map((page) => (
							<button
								key={page}
								className={
									page === currentPage ? `${styles.btns}` : `${styles.btn}`
								}
								onClick={() => pagination(page)}
							>
								{page}
							</button>
						))}
						<button
							className={styles.btn}
							onClick={nextButtonHandler}
							disabled={+currentPage === +pageCount}
						>
							{NEXT}
						</button>
					</span>
				</div>
			</div>
		</>
	);
};

export default Table;
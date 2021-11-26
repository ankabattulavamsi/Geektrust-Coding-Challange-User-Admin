import React from "react";
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import styles from "./TableBody.module.css";

const TableBody = (props) => {
	// const [selectedRows, setSelectedRows] = useState(["1", "2"]);
	// const onDeleteHandler = (event) => {
	//   props.deleteData(event);
	// };

	const { setSelectedRows, deleteSelectedRow, selectedRows, editRowHandler } =
		props;

	const onSelectRowHandler = (val) => {
		setSelectedRows((prevState) => [...prevState, val]);
	};

	return (
		<React.Fragment>
			{props.tableData.map((row) => (
				<tr key={row.id}>
					<td>
						<input
							type='checkbox'
							onChange={() => onSelectRowHandler(row.name)}
							checked={selectedRows.includes(row.name)}
						/>
					</td>
					<td>{row.name}</td>
					<td>{row.email}</td>
					<td>{row.role}</td>
					<td>
						<button
							className={`${styles["btn"]} ${styles["btn-edit"]}`}
							onClick={() => editRowHandler(row.id)}
						>
							<FaEdit />
						</button>
						<button
							className={`${styles["btn"]} ${styles["btn-delete"]}`}
							onClick={() => deleteSelectedRow(row.id)}
						>
							<MdDelete />
						</button>
					</td>
				</tr>
			))}
		</React.Fragment>
	);
};

export default TableBody;
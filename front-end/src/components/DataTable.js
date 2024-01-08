import React, { useState } from "react";
import "./datatable.css";

const DataTable = ({ data, onUpdate }) => {
  const [editCell, setEditCell] = useState({
    row: null,
    column: null,
    value: "",
  });

  const handleCellClick = (rowIndex, column, value) => {
    setEditCell({ row: rowIndex, column, value });
  };

  const handleInputChange = (e) => {
    setEditCell((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleInputBlur = () => {
    onUpdate(editCell.row, editCell.column, editCell.value);
    setEditCell({ row: null, column: null, value: "" });
  };

  const renderCell = (row, rowIndex, column) => {
    const value = row[column];
    const isEditing = editCell.row === rowIndex && editCell.column === column;
    const cellClass = isEditing ? "editing" : "";

    return (
      <td
        className={cellClass}
        onClick={() => handleCellClick(rowIndex, column, value)}
      >
        {isEditing ? (
          <input
            type="text"
            value={editCell.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        ) : (
          value
        )}
      </td>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Patient Name</th>
          <th>Message</th>
          <th>Phone Number</th>
          <th>Employee</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {renderCell(row, rowIndex, "date")}
            {renderCell(row, rowIndex, "patientName")}
            {renderCell(row, rowIndex, "message")}
            {renderCell(row, rowIndex, "phoneNumber")}
            {renderCell(row, rowIndex, "employee")}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

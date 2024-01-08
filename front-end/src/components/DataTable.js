import React, { useState } from "react";
import "./datatable.css";

const DataTable = ({ data, onUpdate }) => {
  const [editCell, setEditCell] = useState({ row: null, column: null });
  const [inputValue, setInputValue] = useState("");

  const handleCellClick = (rowIndex, column, value) => {
    setEditCell({ row: rowIndex, column });
    setInputValue(value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onUpdate(editCell.row, editCell.column, inputValue);
    setEditCell({ row: null, column: null });
  };

  const getColumnClass = (column) => {
    switch (column) {
      case "date":
        return "cell dateColumn";
      case "patientName":
        return "cell patientNameColumn";
      case "message":
        return "cell messageColumn";
      case "phoneNumber":
        return "cell phoneNumberColumn";
      case "employee":
        return "cell employeeColumn";
      default:
        return "cell";
    }
  };

  const renderCell = (row, rowIndex, column) => {
    const isEditing = editCell.row === rowIndex && editCell.column === column;
    const cellClass = getColumnClass(column);

    return (
      <div
        className={`${cellClass} ${isEditing ? "editing" : ""}`}
        onClick={() => handleCellClick(rowIndex, column, row[column])}
      >
        {isEditing ? (
          <input
            className="cellInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        ) : (
          row[column]
        )}
      </div>
    );
  };

  return (
    <div className="table-container">
      <div className="row">
        <div className="cell header dateColumn">Date</div>
        <div className="cell header patientNameColumn">Patient Name</div>
        <div className="cell header messageColumn">Message</div>
        <div className="cell header phoneNumberColumn">Phone Number</div>
        <div className="cell header employeeColumn">Employee</div>
      </div>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {renderCell(row, rowIndex, "date")}
          {renderCell(row, rowIndex, "patientName")}
          {renderCell(row, rowIndex, "message")}
          {renderCell(row, rowIndex, "phoneNumber")}
          {renderCell(row, rowIndex, "employee")}
        </div>
      ))}
    </div>
  );
};

export default DataTable;

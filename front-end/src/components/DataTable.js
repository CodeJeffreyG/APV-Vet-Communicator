import React, { useState } from "react";
import { formattedToday } from "../utils/date";
import "./datatable.css";

const DataTable = ({
  data,
  onUpdate,
  setData,
  onSelectionChange,
  currentSelection,
}) => {
  const [editCell, setEditCell] = useState({ row: null, column: null });
  const [inputValue, setInputValue] = useState("");

  const columnNames = [
    "date",
    "patientName",
    "message",
    "phoneNumber",
    "employee",
  ];

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

  const getColumnCount = (dataset) => {
    switch (dataset) {
      case "receptionist":
      case "tech":
        return 3; //  3 columns for receptionist and tech
      default:
        return 5; // Default number of columns for other datasets
    }
  };

  const handleKeyDown = (e, rowIndex, columnIndex) => {
    if (e.key === "Enter") {
      onUpdate(editCell.row, editCell.column, inputValue);
      setEditCell({ row: null, column: null });
    } else if (e.key === "Tab") {
      e.preventDefault(); // Prevent default tab behavior

      const columnCount = getColumnCount(currentSelection); // Get the number of columns based on the current dataset
      let nextColumnIndex = columnIndex + 1;

      // Skip the date column (assuming date column index is 0)
      if (nextColumnIndex === 0) {
        nextColumnIndex++;
      }

      const isLastColumn = nextColumnIndex >= columnCount; // Check if it's the last column based on columnCount
      const nextRowIndex = isLastColumn ? rowIndex + 1 : rowIndex;
      const nextCellColumn = isLastColumn ? 1 : nextColumnIndex; // Start with 1 to skip the date column for new rows

      if (nextRowIndex < data.length) {
        // Move to the next cell in the current or next row
        setEditCell({ row: nextRowIndex, column: columnNames[nextCellColumn] });
        setInputValue(data[nextRowIndex][columnNames[nextCellColumn]]);
      } else {
        // Add a new row if it's the last cell in the last row
        addNewRow();
      }
    }
  };

  const addNewRow = () => {
    const newRow = {
      date: formattedToday,
      patientName: "",
      message: "",
      phoneNumber: "",
      employee: "",
    };
    setData((data) => [...data, newRow]);
  };

  const renderCell = (row, rowIndex, column) => {
    const columnIndex = columnNames.indexOf(column);
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
            onKeyDown={(e) => handleKeyDown(e, rowIndex, columnIndex)}
            autoFocus
          />
        ) : (
          row[column]
        )}
      </div>
    );
  };

  const renderRow = () => {
    if (currentSelection === "messages") {
      return (
        <div className="table-container">
          <div className="row">
            <div className="cell header dateColumn">Date</div>
            <div className="cell header patientNameColumn">Patient Name</div>
            <div className="cell header messageColumn">
              <select value={currentSelection} onChange={onSelectionChange}>
                <option value="medsHere">Messages</option>
                <option value="medsHere">Meds Here</option>
                <option value="medsOnline">Meds Online</option>
                <option value="receptionist">Receptionist</option>
                <option value="tech">Tech</option>
                <div className="cell header phoneNumberColumn">
                  Phone Number
                </div>
                <div className="cell header employeeColumn">Employee</div>
              </select>
            </div>
            <div className="cell header phoneNumberColumn">Phone Number</div>
            <div className="cell header employeeColumn">Employee</div>
          </div>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {renderCell(row, rowIndex, "date", 0)}
              {renderCell(row, rowIndex, "patientName", 1)}
              {renderCell(row, rowIndex, "message", 2)}
              {renderCell(row, rowIndex, "phoneNumber", 3)}
              {renderCell(row, rowIndex, "employee", 4)}
            </div>
          ))}
          <div className="row add-row" onClick={addNewRow}>
            <div onClick={addNewRow} className="cell add-cell">
              +
            </div>
          </div>
        </div>
      );
    }
    if (currentSelection === "receptionist" || currentSelection === "tech") {
      return (
        <div className="table-container">
          <div className="row">
            <div className="cell header dateColumn">Date</div>
            <div className="cell header patientNameColumn">Employee: </div>
            <div className="cell header messageColumn">
              <select value={currentSelection} onChange={onSelectionChange}>
                <option value="messages">Messages</option>
                <option value="medsHere">Meds Here</option>
                <option value="medsOnline">Meds Online</option>
                <option value="receptionist">Receptionist</option>
                <option value="tech">Tech</option>
                <div className="cell header phoneNumberColumn">
                  Phone Number
                </div>
                <div className="cell header employeeColumn">Employee</div>
              </select>
            </div>
          </div>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {renderCell(row, rowIndex, "date", 0)}
              {renderCell(row, rowIndex, "patientName", 1)}
              {renderCell(row, rowIndex, "message", 2)}
            </div>
          ))}
          <div className="row add-row" onClick={addNewRow}>
            <div onClick={addNewRow} className="cell add-cell">
              +
            </div>
          </div>
        </div>
      );
    }
    if (currentSelection === "medsHere" || currentSelection == "medsOnline") {
      return (
        <div className="table-container">
          <div className="row">
            <div className="cell header dateColumn">Date</div>
            <div className="cell header patientNameColumn">Patient Name</div>
            <div className="cell header messageColumn">
              <select value={currentSelection} onChange={onSelectionChange}>
                <option value="messages">Messages</option>
                <option value="medsHere">Meds Here</option>
                <option value="medsOnline">Meds Online</option>
                <option value="receptionist">Receptionist</option>
                <option value="tech">Tech</option>
                <div className="cell header phoneNumberColumn">
                  Phone Number
                </div>
                <div className="cell header employeeColumn">Employee</div>
              </select>
            </div>
            <div className="cell header phoneNumberColumn">Today?</div>
            <div className="cell header employeeColumn">Employee</div>
          </div>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {renderCell(row, rowIndex, "date", 0)}
              {renderCell(row, rowIndex, "patientName", 1)}
              {renderCell(row, rowIndex, "message", 2)}
              {renderCell(row, rowIndex, "phoneNumber", 3)}
              {renderCell(row, rowIndex, "employee", 4)}
            </div>
          ))}
          <div className="row add-row" onClick={addNewRow}>
            <div onClick={addNewRow} className="cell add-cell">
              +
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{renderRow()}</>;
};

export default DataTable;

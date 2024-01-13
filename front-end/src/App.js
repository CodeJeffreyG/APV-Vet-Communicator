import { useState, useEffect } from "react";
import "./App.css";
import DataTable from "./components/DataTable";

function App() {
  const [currentSelection, setCurrentSelection] = useState({
    messages: [
      {
        date: "2024-01-01",
        patientName: "Messages",
        message: "Checkup",
        phoneNumber: "555-1234",
        employee: "JD",
      },
    ],
    medsHere: [
      {
        date: "2024-01-01",
        patientName: "medshere",
        message: "Checkup",
        phoneNumber: "555-1234",
        employee: "JD",
      },
    ],
    medsOnline: [
      {
        date: "2024-01-01",
        patientName: "thisISMedsOnline",
        message: "Checkup",
        phoneNumber: "555-1234",
        employee: "JD",
      },
    ],
  });

  const [rows, setRows] = useState(currentSelection["messages"]);

  const [currentDataset, setCurrentDataset] = useState("messages");

  useEffect(() => {
    setRows(currentSelection[currentDataset]);
  }, [currentDataset, currentSelection]);

  const handleSelectionChange = (event) => {
    setCurrentDataset(event.target.value);
  };

  const updateRowData = (rowIndex, column, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setRows(updatedRows);

    // Update currentSelection with the modified rows
    setCurrentSelection((current) => ({
      ...current,
      [currentDataset]: updatedRows,
    }));
  };

  const setData = (newData) => {
    setCurrentSelection((current) => ({
      ...current,
      [currentDataset]: newData,
    }));
  };

  return (
    <DataTable
      onUpdate={updateRowData}
      setData={setData} // Pass this function to DataTable
      data={rows} // Use rows state
      onSelectionChange={handleSelectionChange}
      currentSelection={currentDataset}
    />
  );
}

export default App;

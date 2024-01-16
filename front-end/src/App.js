import { useState, useEffect } from "react";

import "./App.css";
import DataTable from "./components/DataTable";
import { formattedToday } from "./utils/date";

function App() {
  const initalData = {
    date: formattedToday,
    patientName: "",
    message: "",
    phoneNumber: "",
    employee: "",
    done: false,
  };
  const [currentSelection, setCurrentSelection] = useState({
    messages: [initalData],
    medsHere: [initalData],
    medsOnline: [initalData],
    receptionist: [initalData],
    tech: [initalData],
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

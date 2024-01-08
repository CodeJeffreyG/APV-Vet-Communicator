import { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import { addRow, deleteRow, updateRow } from "./utils/tableUtils";

function App() {
  const [rows, setRows] = useState([
    {
      date: "2024-01-01",
      patientName: "Fluffy",
      message: "Checkup",
      phoneNumber: "555-1234",
      employee: "JD",
    },
    {
      date: "2024-01-02",
      patientName: "Rex",
      message: "Vaccination",
      phoneNumber: "555-5678",
      employee: "MG",
    },
  ]);

  const updateRowData = (rowIndex, column, value) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return <DataTable onUpdate={updateRowData} data={rows} />;
}

export default App;

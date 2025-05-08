import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    gender: "",
    location: "",
  });

  const [dataRows, setDataRows] = useState([]); // Store all submissions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add timestamp to the submission
    const timestamp = new Date().toLocaleString(); // Get current date and time
    const newRow = { ...formData, timestamp };

    // Update the data rows
    setDataRows((prevRows) => [...prevRows, newRow]);

    // Clear the form
    setFormData({ age: "", income: "", gender: "", location: "" });
  };

  const handleDownload = () => {
    // Create a workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    // Convert to binary and save
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "user_submissions.xlsx");
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <form onSubmit={handleSubmit}>
          <h1>User Scheme Finder</h1>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Income:
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        <button onClick={handleDownload} disabled={dataRows.length === 0}>
          Download Spreadsheet
        </button>

        <div className="submission-preview">
          <h3>Submissions:</h3>
          <ul>
            {dataRows.map((row, index) => (
              <li key={index}>
                {Object.entries(row).map(([key, value]) => (
                  <span key={key}>
                    <strong>{key}:</strong> {value}{" "}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
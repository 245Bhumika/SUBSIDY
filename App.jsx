import React, { useState } from "react";
import UserForm from "./components/UserForm";
import schemes from "./data/schemes.json";
import filterSchemes from "./utils/filterSchemes";

function App() {
  const [results, setResults] = useState([]);

  const handleFormSubmit = (formData) => {
    const filtered = filterSchemes(schemes, formData);
    setResults(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SubsidyFinder</h1>
      <UserForm onSubmit={handleFormSubmit} />

      <h2>Eligible Schemes:</h2>
      {results.length === 0 ? <p>No matches yet.</p> : (
        <ul>
          {results.map(scheme => (
            <li key={scheme.id}>
              <strong>{scheme.name}</strong>: {scheme.description} <br />
              <a href={scheme.link} target="_blank">More Info</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

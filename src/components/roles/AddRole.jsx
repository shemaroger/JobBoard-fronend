import React, { useState } from "react";
import axios from "../../services/api";

const AddRole = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/roles/add", { name })
      .then(() => {
        alert("Role added successfully!");
        setName("");
      })
      .catch((error) => {
        alert("Error adding role: " + error.message);
      });
  };

  return (
    <div>
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Role Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add Role</button>
      </form>
    </div>
  );
};

export default AddRole;

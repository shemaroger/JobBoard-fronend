import React, { useEffect, useState } from "react";
import axios from "../../services/api";

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get("/api/roles").then((response) => {
      setRoles(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Role List</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} - <a href={`/roles/${role.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;

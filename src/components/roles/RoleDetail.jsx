import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

const RoleDetail = () => {
  const { id } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/roles/${id}`)
      .then((response) => setRole(response.data))
      .catch(() => alert("Role not found."));
  }, [id]);

  if (!role) return <p>Loading role details...</p>;

  return (
    <div>
      <h2>Role Details</h2>
      <p>ID: {role.id}</p>
      <p>Name: {role.name}</p>
    </div>
  );
};

export default RoleDetail;

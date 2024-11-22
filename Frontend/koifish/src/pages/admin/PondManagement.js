import React, { useEffect, useState } from "react";
import "./FateManagement.scss";

const API_BASE_URL = "http://localhost:8083/api";

const PondManagement = ({ handleEdit, handleDelete }) => {
  const [ponds, setPonds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPonds();
  }, []);

  const fetchPonds = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/pond/all`, {
        headers: { Authorization: sessionStorage.getItem('authHeader') },
      });
      const pondData = await response.json();
      setPonds(pondData);
    } catch (error) {
      console.error("Error fetching ponds:", error);
    }
  };

  const filteredPonds = search
    ? ponds.filter((pond) => pond.element === search)
    : ponds;

  return (
    <div>
      <div className="fate__search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo mệnh"
        />
      </div>
      <button onClick={() => handleEdit(null)}>Thêm Hồ Mới</button>
      <ul>
        {filteredPonds.map((pond) => (
          <li key={pond.pondId}>
            {pond.element} - {pond.shape}
            <button onClick={() => handleEdit(pond)}>Chỉnh Sửa</button>
            <button onClick={() => handleDelete(pond.pondId)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PondManagement;

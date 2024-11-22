import React, { useEffect, useState } from "react";
import "./FateManagement.scss";

const API_BASE_URL = "http://localhost:8083/api";

const KoiManagement = ({ handleEdit, handleDelete }) => {
  const [kois, setKois] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchKois();
  }, []);

  const fetchKois = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/koi/all`, {
        headers: { Authorization: sessionStorage.getItem('authHeader') },
      });
      const koiData = await response.json();
      setKois(koiData);
    } catch (error) {
      console.error("Error fetching kois:", error);
    }
  };

  const filteredKois = search
    ? kois.filter((koi) => koi.species === search)
    : kois;

  return (
    <div>
      <div className="fate__search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo loài"
        />
      </div>
      <button onClick={() => handleEdit(null)}>Thêm Cá Mới</button>
      <ul>
        {filteredKois.map((koi) => (
          <li key={koi.koiId}>
            {koi.species} - {koi.quantity}
            <button onClick={() => handleEdit(koi)}>Chỉnh Sửa</button>
            <button onClick={() => handleDelete(koi.koiId)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KoiManagement;

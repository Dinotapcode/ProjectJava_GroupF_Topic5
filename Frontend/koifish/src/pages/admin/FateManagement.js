import React, { useEffect, useState } from "react";
import "./FateManagement.scss";

const API_BASE_URL = "http://localhost:8083/api/public";

function FateManagement() {
  const [kois, setKois] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("element");
  const [selectedType, setSelectedType] = useState("pond"); // 'pond' hoặc 'koi'

  const [formData, setFormData] = useState({
    id: "",
    element: "",
    species: "",
    shape: "",
    quantity: "",
    location: "",
    direction: "",
    image: null,
    description: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // Trạng thái hiển thị form

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [koiRes, pondRes] = await Promise.all([
        fetch(`${API_BASE_URL}/koi/all`),
        fetch(`${API_BASE_URL}/pond/all`),
      ]);

      const [koiData, pondData] = await Promise.all([
        koiRes.json(),
        pondRes.json(),
      ]);

      setKois(koiData);
      setPonds(pondData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddOrUpdate = async () => {
    const isPond = selectedType === "pond";
    const isEditing = !!formData.id;
    const url = `${API_BASE_URL}/${isPond ? "pond" : "koi"}/${isEditing ? "update" : "add"}`;
    const method = isEditing ? "PUT" : "POST";

    const payload = new FormData();
    if (isPond) {
      payload.append("pondId", formData.id || "");
      payload.append("element", formData.element);
      payload.append("shape", formData.shape);
      payload.append("location", formData.location);
      payload.append("direction", formData.direction);
    } else {
      payload.append("koiId", formData.id || "");
      payload.append("element", formData.element);
      payload.append("species", formData.species);
      payload.append("quantity", formData.quantity);
      payload.append("description", formData.description);
      if (formData.image) payload.append("file", formData.image);
    }

    try {
      await fetch(url, { method, body: payload });
      await fetchAllData();
      resetFormData();
      setIsFormVisible(false); // Ẩn form sau khi lưu thành công
      alert("Thao tác thành công!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async (id) => {
    const url = `${API_BASE_URL}/${selectedType}/${id}`;
    try {
      await fetch(url, { method: "DELETE" });
      await fetchAllData();
      alert("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item[selectedType === "pond" ? "pondId" : "koiId"],
      element: item.element,
      species: item.species || "",
      shape: item.shape || "",
      quantity: item.quantity || "",
      location: item.location || "",
      direction: item.direction || "",
      image: null, // Không thể hiển thị lại file gốc
      description: item.description || "",
    });
    setIsFormVisible(true); // Hiển thị form khi nhấn sửa
  };

  const handleAdd = () => {
    resetFormData();
    setIsFormVisible(true); // Hiển thị form khi nhấn thêm
  };

  const resetFormData = () => {
    setFormData({
      id: "",
      element: "",
      species: "",
      shape: "",
      quantity: "",
      location: "",
      direction: "",
      image: null,
      description: "",
    });
  };

  const handleClearFilter = () => {
    setSearch("");
  };

  const handleCancelForm = () => {
    setIsFormVisible(false); // Đóng form
    resetFormData(); // Reset lại dữ liệu form
  };

  const filteredData = search
    ? (selectedType === "pond" ? ponds : kois).filter(
        (item) => item[searchType] === search
      )
    : selectedType === "pond"
    ? ponds
    : kois;

  return (
    <div className="fate-management">
      {/* Buttons to toggle between Pond and Koi */}
      <div className="fate__control">
        <button onClick={() => setSelectedType("pond")} disabled={selectedType === "pond"}>
          Quản lý Hồ
        </button>
        <button onClick={() => setSelectedType("koi")} disabled={selectedType === "koi"}>
          Quản lý Cá
        </button>
      </div>

      {/* Search */}
      <div className="fate__search">
        <select value={search} onChange={(e) => setSearch(e.target.value)}>
          <option value="">-- Chọn --</option>
          {(selectedType === "pond" ? ponds : kois).map((item) => (
            <option
              key={item[selectedType === "pond" ? "pondId" : "koiId"]}
              value={item[searchType]}
            >
              {item[searchType]}
            </option>
          ))}
        </select>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="element">Mệnh</option>
          {selectedType === "pond" ? (
            <option value="shape">Hình dạng</option>
          ) : (
            <option value="species">Loài</option>
          )}
        </select>
        <button onClick={handleClearFilter}>Hủy Lọc</button>
      </div>

      {/* Nút thêm mới */}
      <button onClick={handleAdd}>Thêm Mới</button>

      {/* Form nhập liệu */}
      {isFormVisible && (
        <FormComponent
          formData={formData}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleAddOrUpdate={handleAddOrUpdate}
          handleCancelForm={handleCancelForm} // Truyền hàm hủy
        />
      )}

      {/* List */}
      <ListComponent
        data={filteredData}
        selectedType={selectedType}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

const FormComponent = ({
  formData,
  selectedType,
  handleInputChange,
  handleFileChange,
  handleAddOrUpdate,
  handleCancelForm,
}) => (
  <div style={{ position: "relative" }}>
    <h2>{selectedType === "pond" ? "Thêm/Sửa Hồ" : "Thêm/Sửa Cá"}</h2>

    {/* Nút Chéo để đóng form */}
    <button
      onClick={handleCancelForm}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        background: "transparent",
        border: "none",
        fontSize: "20px",
      }}
    >
      &times;
    </button>

    <input
      type="text"
      name="element"
      placeholder="Mệnh"
      value={formData.element}
      onChange={handleInputChange}
    />
    {selectedType === "pond" ? (
      <>
        <input
          type="text"
          name="shape"
          placeholder="Hình dạng"
          value={formData.shape}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Vị trí"
          value={formData.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="direction"
          placeholder="Hướng"
          value={formData.direction}
          onChange={handleInputChange}
        />
      </>
    ) : (
      <>
        <input
          type="text"
          name="species"
          placeholder="Loài"
          value={formData.species}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Số lượng"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleFileChange} />
      </>
    )}
    <button onClick={handleAddOrUpdate}>
      {formData.id ? "Cập nhật" : "Thêm mới"}
    </button>
  </div>
);

const ListComponent = ({ data, selectedType, handleEdit, handleDelete }) => (
  <div>
    <h2>{selectedType === "pond" ? "Danh sách Hồ" : "Danh sách Cá"}</h2>
    <table>
      <thead>
        <tr>
          <th>Mệnh</th>
          {selectedType === "pond" ? (
            <>
              <th>Hình dạng</th>
              <th>Vị trí</th>
              <th>Hướng</th>
            </>
          ) : (
            <>
              <th>Loài</th>
              <th>Số lượng</th>
              <th>Mô tả</th>
            </>
          )}
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item[selectedType === "pond" ? "pondId" : "koiId"]}>
            <td>{item.element}</td>
            {selectedType === "pond" ? (
              <>
                <td>{item.shape}</td>
                <td>{item.location}</td>
                <td>{item.direction}</td>
              </>
            ) : (
              <>
                <td>{item.species}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
              </>
            )}
            <td>
              <button onClick={() => handleEdit(item)}>Sửa</button>
              <button onClick={() => handleDelete(item[selectedType === "pond" ? "pondId" : "koiId"])}>
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FateManagement;

import React, { useEffect, useState } from "react";
import "./FateManagement.scss";

const API_BASE_URL = "http://localhost:8083/api/public";

function FateManagement() {
  // State quản lý dữ liệu
  const [kois, setKois] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("element");
  const [selectedType, setSelectedType] = useState("pond"); // 'pond' hoặc 'koi'
  const [formData, setFormData] = useState(initFormData());
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Hàm khởi tạo form mặc định
  function initFormData() {
    return {
      id: "",
      element: "",
      species: "",
      shape: "",
      quantity: "",
      location: "",
      direction: "",
      image: null,
      description: "",
    };
  }

  // Lấy dữ liệu từ API
  async function fetchAllData() {
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
  }

  // Xử lý nhập liệu cho form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Thêm hoặc cập nhật dữ liệu
  async function handleAddOrUpdate() {
    const isPond = selectedType === "pond";
    const isEditing = !!formData.id;
    const url = `${API_BASE_URL}/${isPond ? "pond" : "koi"}/${isEditing ? "update" : "add"}`;
    const method = isEditing ? "PUT" : "POST";

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") payload.append(key, value);
    });

    try {
      await fetch(url, { method, body: payload });
      await fetchAllData();
      resetFormData();
      setIsFormVisible(false);
      alert("Thao tác thành công!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  // Xóa dữ liệu
  async function handleDelete(id) {
    const url = `${API_BASE_URL}/${selectedType}/${id}`;
    try {
      await fetch(url, { method: "DELETE" });
      await fetchAllData();
      alert("Xóa thành công!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  // Sửa dữ liệu
  const handleEdit = (item) => {
    setFormData({
      id: item[selectedType === "pond" ? "pondId" : "koiId"],
      element: item.element || "",
      species: item.species || "",
      shape: item.shape || "",
      quantity: item.quantity || "",
      location: item.location || "",
      direction: item.direction || "",
      image: null,
      description: item.description || "",
    });
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    resetFormData();
    setIsFormVisible(true);
  };

  const resetFormData = () => {
    setFormData(initFormData());
  };

  // Bộ lọc dữ liệu
  const filteredData = search
    ? (selectedType === "pond" ? ponds : kois).filter(
        (item) => item[searchType] === search
      )
    : selectedType === "pond"
    ? ponds
    : kois;

  return (
    <div className="fate-management">
      {/* Điều khiển loại quản lý */}
      <div className="fate__control">
        <button onClick={() => setSelectedType("pond")} disabled={selectedType === "pond"}>
          Quản lý Hồ
        </button>
        <button onClick={() => setSelectedType("koi")} disabled={selectedType === "koi"}>
          Quản lý Cá
        </button>
      </div>

      {/* Thanh tìm kiếm */}
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
        <button onClick={() => setSearch("")}>Hủy Lọc</button>
      </div>

      <button onClick={handleAdd}>Thêm Mới</button>

      {/* Hiển thị form */}
      {isFormVisible && (
        <FormComponent
          formData={formData}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleAddOrUpdate={handleAddOrUpdate}
          handleCancelForm={() => setIsFormVisible(false)}
        />
      )}

      {/* Hiển thị danh sách */}
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
  <div className="form-container">
    <h2>{selectedType === "pond" ? "Thêm/Sửa Hồ" : "Thêm/Sửa Cá"}</h2>
    <button className="form-close-btn" onClick={handleCancelForm}>
      &times;
    </button>
    {/* Các input cho form */}
    <input
      type="text"
      name="element"
      placeholder="Mệnh"
      value={formData.element}
      onChange={handleInputChange}
    />
    {selectedType === "pond" ? (
      <>
        <input type="text" name="shape" placeholder="Hình dạng" value={formData.shape} onChange={handleInputChange} />
        <input type="text" name="location" placeholder="Vị trí" value={formData.location} onChange={handleInputChange} />
        <input type="text" name="direction" placeholder="Hướng" value={formData.direction} onChange={handleInputChange} />
      </>
    ) : (
      <>
        <input type="text" name="species" placeholder="Loài" value={formData.species} onChange={handleInputChange} />
        <input type="number" name="quantity" placeholder="Số lượng" value={formData.quantity} onChange={handleInputChange} />
        <textarea name="description" placeholder="Mô tả" value={formData.description} onChange={handleInputChange} />
        <input type="file" name="image" onChange={handleFileChange} />
      </>
    )}
    <button onClick={handleAddOrUpdate}>Lưu</button>
  </div>
);

const ListComponent = ({ data, selectedType, handleEdit, handleDelete }) => (
  <div className="list-container">
    <table>
      <thead>
        <tr>
          <th>STT</th>
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
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
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
              <button onClick={() => handleDelete(item[selectedType === "pond" ? "pondId" : "koiId"])}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FateManagement;

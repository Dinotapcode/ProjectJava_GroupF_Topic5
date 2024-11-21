import React, { useEffect, useState } from "react";
import "./FateManagement.scss";

const API_BASE_URL = "http://localhost:8083/api";

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

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [koiRes, pondRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/koi/all`, {
          headers: { Authorization: sessionStorage.getItem('authHeader') },
        }),
        fetch(`${API_BASE_URL}/admin/pond/all`, {
          headers: { Authorization: sessionStorage.getItem('authHeader') },
        }),
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
    const url = `${API_BASE_URL}/admin/${isPond ? "pond" : "koi"}/${isEditing ? `update/${formData.id}` : "add"}`;
    const method = isEditing ? "PUT" : "POST";

    let payload;

    if (isPond) {
      // Tạo payload dưới dạng JSON cho hồ
      payload = {
        pondId: formData.id || "",
        element: formData.element,
        shape: formData.shape,
        location: formData.location,
        direction: formData.direction
      };
    } else {
      // Tạo payload dưới dạng JSON cho cá koi
      payload = {
        koiId: formData.id || "",
        element: formData.element,
        species: formData.species,
        quantity: formData.quantity,
        description: formData.description
      };
      // Nếu có file hình ảnh, thêm vào FormData
      if (formData.image) {
        const formDataPayload = new FormData();
        for (const key in payload) {
          formDataPayload.append(key, payload[key]);
        }
        formDataPayload.append("file", formData.image);
        try {
          await fetch(url, {
            method,
            body: formDataPayload,
            headers: { Authorization: sessionStorage.getItem('authHeader') }
          });
          alert("Thao tác thành công!");
        } catch (error) {
          console.error("Error saving data with image:", error);
        }
        return;
      }
    }

    // Gửi JSON nếu không có hình ảnh
    try {
      await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',  // Đảm bảo là JSON
          'Authorization': sessionStorage.getItem('authHeader')
        },
      });

      await fetchAllData();
      resetFormData();
      setIsFormVisible(false);
      alert("Thao tác thành công!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  const handleDelete = async (id) => {
    const url = `${API_BASE_URL}/admin/${selectedType}/${id}`;
    try {
      await fetch(url, { method: "DELETE", headers: { Authorization: sessionStorage.getItem('authHeader') }, });
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
    setIsFormVisible(false);
    resetFormData();
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
      <div className="fate__control">
        <button onClick={() => setSelectedType("pond")} disabled={selectedType === "pond"}>
          Quản lý Hồ
        </button>
        <button onClick={() => setSelectedType("koi")} disabled={selectedType === "koi"}>
          Quản lý Cá
        </button>
      </div>

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

      <button onClick={handleAdd}>Thêm Mới</button>

      {isFormVisible && (
        <FormComponent
          formData={formData}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleAddOrUpdate={handleAddOrUpdate}
          handleCancelForm={handleCancelForm}
        />
      )}

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
          type="number"
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
              <th>Ảnh</th>
            </>
          )}
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {/* Số thứ tự */}
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
                <td>
                  <img src={item.image || ""} alt="Koi" width={50} />
                </td>
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

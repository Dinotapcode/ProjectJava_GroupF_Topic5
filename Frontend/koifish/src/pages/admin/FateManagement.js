import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lấy tệp ảnh người dùng chọn
    if (file) {
      const fileType = file.type;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Kiểm tra định dạng ảnh

      if (allowedTypes.includes(fileType)) {
        setFormData({
          ...formData,
          image: file, // Lưu tệp ảnh vào formData
        });
      } else {
        alert("Vui lòng chọn tệp ảnh hợp lệ (JPEG, PNG, GIF).");
      }
    }
  };



  const handleAddOrUpdate = async () => {
    const isPond = selectedType === "pond"; // Kiểm tra nếu là hồ
    const isEditing = !!formData.id; // Kiểm tra nếu là chỉnh sửa
    const url = `${API_BASE_URL}/admin/${isPond ? "pond" : "koi"}/${isEditing ? `update/${formData.id}` : "add"}`;
    const method = isEditing ? "PUT" : "POST";

    let payload = {};

    // Kiểm tra thông tin hồ
    if (isPond) {
      if (!formData.element || !formData.shape || !formData.location || !formData.direction) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      payload = {
        pondId: formData.id || "",
        element: formData.element,
        shape: formData.shape,
        location: formData.location,
        direction: formData.direction,
      };
    } else {
      // Kiểm tra các trường dữ liệu của cá
      if (!formData.element || !formData.species || !formData.quantity || !formData.description) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      // Chuẩn bị payload
      payload = {
        koiId: formData.id || "",
        element: formData.element,
        species: formData.species,
        quantity: formData.quantity,
        description: formData.description,
      };

      // Tạo FormData cho ảnh
      const formDataPayload = new FormData();
      for (const key in payload) {
        formDataPayload.append(key, payload[key]);
      }

      if (formData.image) {
        formDataPayload.append("file", formData.image); // Thêm ảnh vào FormData
      } else if (formData.currentImage) {
        formDataPayload.append("currentImage", formData.currentImage); // Thêm ảnh hiện tại nếu có
      }

      try {
        const response = await fetch(url, {
          method: method,
          body: formDataPayload,
          headers: {
            'Authorization': sessionStorage.getItem('authHeader'), // Xác thực
          },
        });

        if (response.ok) {
          alert("Thao tác thành công!");
          await fetchAllData(); // Cập nhật lại dữ liệu
          resetFormData(); // Reset form
          setIsFormVisible(false); // Ẩn form
        } else {
          const errorText = await response.text();
          console.error("Error:", errorText);
          alert(`Có lỗi xảy ra: ${errorText}`);
        }
      } catch (error) {
        console.error("Error saving data with image:", error);
        alert("Có lỗi xảy ra khi lưu dữ liệu với ảnh.");
      }
      return;
    }

    // Xử lý khi không phải là cá (chỉ có hồ)
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('authHeader'),
        },
      });

      if (response.ok) {
        await fetchAllData();
        resetFormData();
        setIsFormVisible(false);
        alert("Thao tác thành công!");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert(`Có lỗi xảy ra: ${errorText}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Có lỗi xảy ra khi lưu dữ liệu.");
    }
  };


  const handleDelete = async (id) => {
    // Hiển thị thông báo xác nhận
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá mục này?");
    
    if (confirmDelete) {
      const url = `${API_BASE_URL}/admin/${selectedType}/${id}`;
      try {
        await fetch(url, { method: "DELETE", headers: { Authorization: sessionStorage.getItem('authHeader') } });
        await fetchAllData();
        alert("Xóa thành công!");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
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
      <div className="fate__fuction">
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

        <button className="faction-add" onClick={handleAdd}>Thêm Mới</button>
      </div>
      <div className="fate__content">
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
}) => {
  const [koiSpeciesOptions, setKoiSpeciesOptions] = useState([]);
  const [pondShapeOptions, setPondShapeOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const koiSpeciesResponse = await fetch("http://localhost:8083/api/public/koiSpecies");
        const pondShapeResponse = await fetch("http://localhost:8083/api/public/pondShape");

        if (!koiSpeciesResponse.ok || !pondShapeResponse.ok) {
          throw new Error("Không thể truy cập API");
        }

        const koiSpeciesData = await koiSpeciesResponse.json();
        const pondShapeData = await pondShapeResponse.json();

        setKoiSpeciesOptions(koiSpeciesData);
        setPondShapeOptions(pondShapeData);
      } catch (err) {
        setError("Có lỗi xảy ra khi truy cập API.");
      }
    };

    fetchOptions();
  }, []);

  const elementOptions = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
  const koiQuantityOptions = ["Chẵn", "Lẻ"];
  const locationOptions = [
    "Bắc",
    "Nam",
    "Đông",
    "Tây",
    "Tây Bắc",
    "Đông Nam",
    "Đông Bắc",
    "Tây Nam",
  ];
  const directionOptions = [
    "Bắc",
    "Nam",
    "Đông",
    "Tây",
    "Đông Bắc",
    "Đông Nam",
    "Tây Bắc",
    "Tây Nam",
  ];

  const isPond = selectedType === "pond";

  return (
    <div className="form-container">
      <h2>{isPond ? "Thêm/Sửa Hồ" : "Thêm/Sửa Cá"}</h2>
      <button className="close-btn" onClick={handleCancelForm}>
        <IoClose className="close-icon" />
      </button>

      <div className="input__group">
        <label htmlFor="element">Mệnh:</label>
        <select
          id="element"
          name="element"
          value={formData.element}
          onChange={handleInputChange}
        >
          <option value="">-- Chọn --</option>
          {elementOptions.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>

      {isPond ? (
        <>
          <div className="input__group">
            <label htmlFor="shape">Hình dạng hồ:</label>
            <input
              type="text"
              id="shape"
              name="shape"
              value={formData.shape}
              onChange={handleInputChange}
            />
          </div>

          <div className="input__group">
            <label htmlFor="location">Vị trí:</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn --</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="input__group">
            <label htmlFor="direction">Hướng:</label>
            <select
              id="direction"
              name="direction"
              value={formData.direction}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn --</option>
              {directionOptions.map((dir) => (
                <option key={dir} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div className="input__group">
            <label htmlFor="species">Loài cá:</label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}              
              onChange={handleInputChange}
            />
          </div>

          <div className="input__group">
            <label htmlFor="quantity">Số lượng:</label>
            <select
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn --</option>
              {koiQuantityOptions.map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>

          <div className="input__group">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="input__group">
            <label htmlFor="image">Hình ảnh:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </>
      )}

      <button onClick={handleAddOrUpdate}>Lưu</button>
    </div>
  );
};

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
                  <img src={`uploads/img_tracuu/${item.image}`} alt="Koi" width={50} />
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

import React, { useState, useEffect } from 'react';
import './ProductManagement.scss';

const ProductManagement = ({ products, setProducts }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        item: "",
        type: "",
        price: "",
        img: null,
        description: "",
        info1: "",
        info2: "",
        info3: "",
    });

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Xử lý file ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct({ ...newProduct, img: file });
        }
    };

    // Thêm hoặc cập nhật sản phẩm
    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.item  || !newProduct.price) {
            alert('Vui lòng điền đầy đủ các trường bắt buộc!');
            return;
        }

        try {
            setIsLoading(true);
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing
                ? `http://localhost:8083/api/products/update/${products[editIndex].id}`
                : 'http://localhost:8083/api/products/add';

            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('item', newProduct.item);
            formData.append('type', newProduct.type);
            formData.append('price', newProduct.price);
            formData.append('description', newProduct.description);
            formData.append('info1', newProduct.info1);
            formData.append('info2', newProduct.info2);
            formData.append('info3', newProduct.info3);
            formData.append('image', newProduct.img);

            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (!response.ok) throw new Error('Không thể thêm hoặc cập nhật sản phẩm.');

            const product = await response.json();
            const updatedProducts = isEditing
                ? products.map((p, index) => (index === editIndex ? product : p))
                : [...products, product];

            setProducts(updatedProducts);
            setShowPopup(false);
            resetForm();
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            alert('Không thể thêm hoặc cập nhật sản phẩm.');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setNewProduct({
            name: "",
            item: "",
            type: "",
            price: "",
            img: null,
            description: "",
            info1: "",
            info2: "",
            info3: "",
        });
        setIsEditing(false);
        setEditIndex(null);
    };

    // Đóng popup
    const handleClosePopup = () => {
        setShowPopup(false);
        resetForm();
    };

    // Chỉnh sửa sản phẩm
    const handleEditProduct = (index) => {
        setNewProduct(products[index]);
        setShowPopup(true);
        setIsEditing(true);
        setEditIndex(index);
    };

    // Xóa sản phẩm
    const handleDeleteProduct = async (index) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

        const productToDelete = products[index];
        try {
            const response = await fetch(`http://localhost:8083/api/products/delete/${productToDelete.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter((_, i) => i !== index));
                alert('Sản phẩm đã được xóa thành công.');
            } else {
                alert('Không thể xóa sản phẩm.');
            }
        } catch (error) {
            console.error('Có lỗi khi xóa sản phẩm:', error);
            alert('Không thể kết nối đến server.');
        }
    };

    // Fetch sản phẩm khi component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8083/api/products/all');
                if (!response.ok) throw new Error('Không thể tải danh sách sản phẩm.');

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
                alert('Không thể tải danh sách sản phẩm.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [setProducts]);

    return (
        <div className="product-management">
            <div className="setting-add-product-btn">
                <h1>Quản lý sản phẩm</h1>
                <button className="btn-add" onClick={() => setShowPopup(true)}>Thêm sản phẩm</button>
            </div>

            {isLoading ? (
                <div className="loading">Đang tải dữ liệu...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Item</th>
                            <th>Loại</th>
                            <th>Tên</th>
                            <th>Ảnh</th>
                            <th>Nguồn gốc</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.item}</td>
                                <td>{product.type}</td>
                                <td>{product.name}</td>
                                <td>
                                    <img
                                        src={`/img_products/${product.img}`}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                </td>
                                <td>{product.info3}</td>
                                <td>
                                    <button className="btn-product" onClick={() => handleEditProduct(index)}>Sửa</button>
                                    <button className="btn-product" onClick={() => handleDeleteProduct(index)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showPopup && (
                <div className="popup" onClick={() => setShowPopup(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleClosePopup}>X</button>
                        <h2>{isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2>

                        <label>
                            Tên:
                            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Mô tả:
                            <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
                        </label>
                        <label>
                            Ảnh:
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <label>
                            Giá:
                            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
                        </label>

                        <label>
                            Item:
                            <select name="item" value={newProduct.item} onChange={handleInputChange}>
                                <option value="" disabled>Chọn loại sản phẩm</option>
                                <option value="fish">Cá</option>
                                <option value="aquarium">Hồ</option>
                            </select>
                        </label>

                        {/* Conditional fields based on 'item' */}
                        {newProduct.item === 'fish' && (
                            <>
                                <label>
                                    Loại cá:
                                    <select name="type" value={newProduct.type} onChange={handleInputChange}>
                                        <option disabled value="">Chọn loại cá</option>
                                        <option value="Cá Koi Showa">Cá Koi Showa</option>
                                        <option value="Cá Koi Asagi">Cá Koi Asagi</option>
                                        <option value="Cá Koi Kohaku">Cá Koi Kohaku</option>
                                        <option value="Cá Koi Shiro Utsuri">Cá Koi Shiro Utsuri</option>
                                        <option value="Cá Koi Sanke">Cá Koi Sanke</option>
                                    </select>
                                </label>
                                <label>
                                    Màu sắc:
                                    <input type="text" name="info1" value={newProduct.info1} onChange={handleInputChange} />
                                </label>
                                <label>
                                    Cân nặng:
                                    <input type="text" name="info2" value={newProduct.info2} onChange={handleInputChange} />
                                </label>
                                <label>
                                    Xuất xứ:
                                    <input type="text" name="info3" value={newProduct.info3} onChange={handleInputChange} />
                                </label>
                            </>
                        )}

                        {newProduct.item === 'aquarium' && (
                            <>
                                <label>
                                    Hình dạng hồ:
                                    <select name="type" value={newProduct.type} onChange={handleInputChange}>
                                        <option disabled value="">Chọn hình dạng hồ</option>
                                        <option value="Hồ hình vuông">Hồ hình vuông</option>
                                        <option value="Hồ hình tròn">Hồ hình tròn</option>
                                        <option value="Hồ hình bầu dục">Hồ hình bầu dục</option>
                                        <option value="Hồ hình chữ nhật">Hồ hình chữ nhật</option>
                                        <option value="Hồ vô định">Hồ vô định</option>
                                    </select>
                                </label>
                                <label>
                                    Màu sắc:
                                    <input type="text" name="info1" value={newProduct.info1} onChange={handleInputChange} />
                                </label>
                                <label>
                                    Kích thước:
                                    <input type="text" name="info2" value={newProduct.info2} onChange={handleInputChange} />
                                </label>
                                <label>
                                    Vật liệu:
                                    <input type="text" name="info3" value={newProduct.info3} onChange={handleInputChange} />
                                </label>
                            </>
                        )}
                        <div className='add-product'>
                        <button className="btn-save" onClick={handleAddProduct} disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : isEditing ? "Lưu thay đổi" : "Thêm sản phẩm"}
                        </button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;

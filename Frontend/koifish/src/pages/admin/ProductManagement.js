import React, { useState, useEffect } from 'react';
import './ProductManagement.scss';

const ProductManagement = ({ products, setProducts }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [newProduct, setNewProduct] = useState({
        item: "Cá",
        type: "",
        name: "",
        description: "",
        origin: "",
        color: "",
        weight: "",
        size: "",
        material: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setShowPopup(false);
        resetForm();
    };

    const resetForm = () => {
        setNewProduct({
            item: "Cá",
            type: "",
            name: "",
            description: "",
            origin: "",
            color: "",
            weight: "",
            size: "",
            material: "",
        });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        resetForm();
    };

    const handlePopupClick = (e) => {
        if (e.target.classList.contains('popup')) {
            handleClosePopup();
        }
    };

    const handleEditProduct = (index) => {
        const product = products[index];
        setNewProduct(product);
        setShowPopup(true);
    };

    const handleDeleteProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClosePopup();
            }
        };

        if (showPopup) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPopup]);

    return (
        <div className="product-management">
            <div className='setting-add-product-btn'>
                <h1>Quản lý sản phẩm</h1>
                <button className='btn-add' onClick={() => setShowPopup(true)}>Thêm sản phẩm</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Item</th>
                        <th>Loại</th>
                        <th>Tên</th>
                        <th>Ảnh</th>
                        <th>Nguồn gốc</th>
                        <th>Active</th>
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
                                    src={product.image || 'placeholder.jpg'}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </td>
                            <td>{product.origin}</td>
                            <td>
                                <button onClick={() => handleEditProduct(index)}>Sửa</button>
                                <button onClick={() => handleDeleteProduct(index)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPopup && (
                <div className="popup" onClick={handlePopupClick}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleClosePopup}>X</button>
                        <h2>Thêm sản phẩm</h2>
                        <label>
                            Tên:
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Mô tả:
                            <input
                                type="text"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Ảnh:
                            <input
                                type="text"
                                name="image"
                                value={newProduct.image || ''}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
    Item:
    <select name="item" value={newProduct.item} onChange={handleInputChange}>
        <option value="" selected >Chọn loại sản phẩm bạn muốn thêm</option>
        <option value="Cá">Cá</option>
        <option value="Hồ">Hồ</option>
    </select>
</label>


                        {newProduct.item === 'Cá' && (
                            <>
                                <label>
                                    Loại cá:
                                    <select name="type" value={newProduct.type} onChange={handleInputChange}>
                                        <option value="">Chọn loại cá</option>
                                        <option value="Cá Koi Showa">Cá Koi Showa</option>
                                        <option value="Cá Koi Asagi">Cá Koi Asagi</option>
                                        <option value="Cá Koi Kohaku">Cá Koi Kohaku</option>
                                        <option value="Cá Koi Shiro Utsuri">Cá Koi Shiro Utsuri</option>
                                        <option value="Cá Koi Sanke">Cá Koi Sanke</option>
                                    </select>
                                </label>
                                <label>
                                    Màu sắc:
                                    <input
                                        type="text"
                                        name="color"
                                        value={newProduct.color}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Cân nặng:
                                    <input
                                        type="text"
                                        name="weight"
                                        value={newProduct.weight}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Xuất xứ:
                                    <input
                                        type="text"
                                        name="origin"
                                        value={newProduct.origin}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </>
                        )}

                        {newProduct.item === 'Hồ' && (
                            <>
                                <label>
                                    Hình dạng hồ:
                                    <select name="type" value={newProduct.type} onChange={handleInputChange}>
                                        <option value="">Chọn hình dạng hồ</option>
                                        <option value="Hồ hình vuông">Hồ hình vuông</option>
                                        <option value="Hồ hình tròn">Hồ hình tròn</option>
                                        <option value="Hồ hình bầu dục">Hồ hình bầu dục</option>
                                        <option value="Hồ hình chữ nhật">Hồ hình chữ nhật</option>
                                        <option value="Hồ vô định">Hồ vô định</option>
                                    </select>
                                </label>
                                <label>
                                    Kích thước:
                                    <input
                                        type="text"
                                        name="size"
                                        value={newProduct.size}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Chất liệu:
                                    <input
                                        type="text"
                                        name="material"
                                        value={newProduct.material}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Xuất xứ:
                                    <input
                                        type="text"
                                        name="origin"
                                        value={newProduct.origin}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </>
                        )}

                        <div className="add-product">
                            <button id="add-product" onClick={handleAddProduct}>Thêm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;

package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Product;
import com.arjuncodes.studentsystem.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;  // Thêm import cho List

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Trả về Product trực tiếp hoặc ném exception nếu không tìm thấy
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Integer id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setItem(productDetails.getItem());
        product.setType(productDetails.getType());
        product.setDescription(productDetails.getDescription());
        product.setInfo1(productDetails.getInfo1());
        product.setInfo2(productDetails.getInfo2());
        product.setInfo3(productDetails.getInfo3());
        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}

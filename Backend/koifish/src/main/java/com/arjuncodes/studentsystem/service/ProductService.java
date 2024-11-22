package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Product;
import com.arjuncodes.studentsystem.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Lấy tất cả sản phẩm
    public List<Product> getAllProducts() {
        return productRepository.findAll();  // Trả về tất cả sản phẩm
    }

    // Lấy sản phẩm theo ID
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id)); // Kiểm tra xem sản phẩm có tồn tại không
    }

    public long countProducts() {
        return productRepository.count();
    }

    private static final String UPLOAD_DIR = "Frontend/koifish/public/img_products";



    public Product saveProduct(Product product, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            // Tạo tên file với mã định danh UUID
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();


            // Lưu file ảnh
            File file = new File(UPLOAD_DIR, fileName);
            image.transferTo(file);

            // Lưu tên file vào entity
            product.setImg(fileName);
        }

        return productRepository.save(product);
    }




    // Xóa sản phẩm theo ID
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id)); // Kiểm tra sản phẩm tồn tại
        productRepository.delete(product); // Xóa sản phẩm khỏi database
    }

    public List<String> getProductTypeOptions() {
        return productRepository.findTypeProductBy();
    }
}

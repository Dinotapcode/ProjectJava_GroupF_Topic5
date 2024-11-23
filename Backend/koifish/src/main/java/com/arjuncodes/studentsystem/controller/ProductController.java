package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Product;
import com.arjuncodes.studentsystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {


    @Autowired
    private ProductService productService;

    // Lấy tất cả sản phẩm
    @GetMapping("/public/product/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/admin/products/count")
    public ResponseEntity<Long> countProduct() {
        long count = productService.countProducts();
        return ResponseEntity.ok(count);
    }

    // Lấy sản phẩm theo ID
    @GetMapping("/public/product/detail")
    public Product getProductById(@RequestParam Integer id) {
        return productService.getProductById(id);
    }

    // Thêm sản phẩm mới kèm hình ảnh
    @PostMapping("/admin/product/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("name") String name,
            @RequestParam("item") String item,
            @RequestParam("type") String type,
            @RequestParam("price") BigDecimal price,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "info1", required = false) String info1,
            @RequestParam(value = "info2", required = false) String info2,
            @RequestParam(value = "info3", required = false) String info3
    ) {
        try {
            // Kiểm tra kích thước tệp ảnh nếu có


            Product product = new Product();
            product.setName(name);
            product.setItem(item);
            product.setType(type);
            product.setPrice(price);
            product.setDescription(description);
            product.setInfo1(info1);
            product.setInfo2(info2);
            product.setInfo3(info3);

            if (image != null && !image.isEmpty()) {
                String imageFilename = uploadImageFile(image);
                if (imageFilename != null) {
                    product.setImg(imageFilename);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(null); // Handle upload error
                }
            }
            // Lưu sản phẩm cùng với ảnh (nếu có)
            Product savedProduct = productService.saveProduct(product, null);
            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xử lý ảnh: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi thêm sản phẩm: " + e.getMessage());
        }
    }
    private String uploadImageFile(MultipartFile uploadfile) {
        String fileName = UUID.randomUUID() + "_" + uploadfile.getOriginalFilename();
        // Sử dụng đường dẫn tuyệt đối hoặc tương đối
        Path destinationPath = Paths.get("Frontend/koifish/public/uploads/img_products").resolve(fileName);

        try {
            // Tạo thư mục nếu nó không tồn tại
            Files.createDirectories(destinationPath.getParent());

            Files.copy(uploadfile.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
            return fileName; // Return the filename for saving in the user entity
        } catch (IOException e) {
            System.out.println("Upload Image Error: " + e.getMessage());
            return null; // Handle error appropriately
        }
    }
    @PutMapping("/admin/product/update/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Integer id,
            @RequestParam("name") String name,
            @RequestParam("item") String item,
            @RequestParam("type") String type,
            @RequestParam("price") BigDecimal price,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "info1", required = false) String info1,
            @RequestParam(value = "info2", required = false) String info2,
            @RequestParam(value = "info3", required = false) String info3
    ) {
        try {
            Product existingProduct = productService.getProductById(id);
            if (existingProduct == null) {
                return ResponseEntity.notFound().build();
            }

            existingProduct.setName(name);
            existingProduct.setItem(item);
            existingProduct.setType(type);
            existingProduct.setPrice(price);
            existingProduct.setDescription(description);
            existingProduct.setInfo1(info1);
            existingProduct.setInfo2(info2);
            existingProduct.setInfo3(info3);

            Product updatedProduct = productService.saveProduct(existingProduct, null);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi cập nhật sản phẩm: " + e.getMessage());
        }
    }

    // Xóa sản phẩm theo ID
    @DeleteMapping("/admin/product/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi xóa sản phẩm: " + e.getMessage());
        }
    }

    @GetMapping("/public/product/option/type")
    public List<String> getProductTypeOptions() {
        return productService.getProductTypeOptions();
    }
}

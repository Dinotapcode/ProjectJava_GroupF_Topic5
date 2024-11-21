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
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    private static final String UPLOAD_DIR = "Frontend/koifish/public/img_products";  // Đường dẫn lưu ảnh

    @Autowired
    private ProductService productService;

    // Lấy tất cả sản phẩm
    @GetMapping("/public/product/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Lấy sản phẩm theo ID
    @GetMapping("/public/product/detail")
    public Product getProductById(@RequestParam Integer id) {
        return productService.getProductById(id);
    }

    // Thêm sản phẩm mới kèm hình ảnh
    @PostMapping("/public/product/add")
    public ResponseEntity<Product> addProduct(
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
            Product product = new Product();
            product.setName(name);
            product.setItem(item);
            product.setType(type);
            product.setPrice(price);
            product.setDescription(description);
            product.setInfo1(info1);
            product.setInfo2(info2);
            product.setInfo3(info3);

            Product savedProduct = productService.saveProduct(product, image);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/public/product/update/{id}")
    public ResponseEntity<Product> updateProduct(
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

            Product updatedProduct = productService.saveProduct(existingProduct, image);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Xóa sản phẩm theo ID
    @DeleteMapping("/public/product/delete/{id}")
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

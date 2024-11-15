package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Product;
import com.arjuncodes.studentsystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/products")
public class ProductController {


    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get product by ID
    @GetMapping("/detail")
    public Product getProductById(@RequestParam Integer id) {
        return productService.getProductById(id);  // Trả về sản phẩm theo id
    }


    // Add a new product
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);  // Thêm sản phẩm mới
    }

    // Update an existing product by ID
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        return productService.updateProduct(id, product);  // Cập nhật sản phẩm theo id
    }

    // Delete a product by ID
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);  // Xóa sản phẩm theo id
    }
}

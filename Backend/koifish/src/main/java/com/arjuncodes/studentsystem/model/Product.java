package com.arjuncodes.studentsystem.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  // Kiểu Integer phù hợp với AUTO_INCREMENT

    private String name;  // varchar(255)
    private String item;  // varchar(100)
    private String type;  // varchar(100)
    private BigDecimal price;  // decimal(10,2) -> BigDecimal phù hợp với số thập phân chính xác
    private String img;  // varchar(255)
    private String description;  // text
    private String info1;  // text
    private String info2;  // text
    private String info3;  // text

    // Constructor, getters, and setters

    public Product() {}

    public Product(Integer id, String name, BigDecimal price, String img, String item, String type, String description, String info1, String info2, String info3) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.item = item;
        this.type = type;
        this.description = description;
        this.info1 = info1;
        this.info2 = info2;
        this.info3 = info3;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInfo1() {
        return info1;
    }

    public void setInfo1(String info1) {
        this.info1 = info1;
    }

    public String getInfo2() {
        return info2;
    }

    public void setInfo2(String info2) {
        this.info2 = info2;
    }

    public String getInfo3() {
        return info3;
    }

    public void setInfo3(String info3) {
        this.info3 = info3;
    }
}

package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT DISTINCT k.type FROM Product k")
    List<String> findTypeProductBy();
}

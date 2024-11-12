package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Pond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondRepository extends JpaRepository<Pond, Integer> {
    List<Pond> findByElement(String element);
    @Query("SELECT DISTINCT p.shape FROM Pond p")
    List<String> findDistinctShapeBy();
}

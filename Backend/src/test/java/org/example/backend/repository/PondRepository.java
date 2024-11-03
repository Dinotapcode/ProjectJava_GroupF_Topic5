package org.example.backend.repository;

import org.example.backend.model.Pond;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PondRepository extends JpaRepository<Pond, Integer> {
    List<Pond> findByElement(String element);
}
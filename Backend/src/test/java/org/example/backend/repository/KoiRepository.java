package org.example.backend.repository;

import org.example.backend.model.Koi;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KoiRepository extends JpaRepository<Koi, Integer> {
    List<Koi> findByElement(String element);
}
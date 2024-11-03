package org.example.backend.repository;

import org.example.backend.model.Element;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElementRepository extends JpaRepository<Element, String> {}

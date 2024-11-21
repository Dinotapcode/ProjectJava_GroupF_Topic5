package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Koi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KoiRepository extends JpaRepository<Koi, Integer> {
    @Query("SELECT DISTINCT k.species FROM Koi k")
    List<String> findDistinctSpeciesBy();

    List<Koi> findByElement(String element);
    List<Koi> findBySpecies(String species);

}

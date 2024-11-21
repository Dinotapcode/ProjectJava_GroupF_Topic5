package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Koi;
import com.arjuncodes.studentsystem.repository.KoiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KoiService {

    @Autowired
    private KoiRepository koiRepository;

    public Koi saveKoi(Koi koi) {
        return koiRepository.save(koi);
    }

    public List<Koi> getAllKois() {
        return koiRepository.findAll();
    }

    public Optional<Koi> getKoiById(int id) {
        return koiRepository.findById(id);
    }

    public void deleteKoi(int id) {
        koiRepository.deleteById(id);
    }

    public List<String> getKoiSpeciesOptions() {
        return koiRepository.findDistinctSpeciesBy();
    }

    public List<Koi> getKoiByElement(String element) {
        return koiRepository.findByElement(element);
    }

    public List<Koi> searchBySpecies(String species) {
        return koiRepository.findBySpecies(species);
    }
}

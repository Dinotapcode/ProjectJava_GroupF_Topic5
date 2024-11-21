package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Pond;
import com.arjuncodes.studentsystem.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PondService {

    @Autowired
    private PondRepository pondRepository;

    public Pond savePond(Pond pond) {
        return pondRepository.save(pond);
    }

    public List<Pond> getAllPonds() {
        return pondRepository.findAll();
    }

    public Optional<Pond> getPondById(int id) {
        return pondRepository.findById(id);
    }

    public void deletePond(int id) {
        pondRepository.deleteById(id);
    }

    public List<Pond> searchByElement(String element) {
        return pondRepository.findByElement(element);
    }

    public List<Pond> searchByShape(String shape) {
        return pondRepository.findByShape(shape);
    }
}

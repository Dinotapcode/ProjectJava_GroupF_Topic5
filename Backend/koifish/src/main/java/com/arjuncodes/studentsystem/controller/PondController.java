package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Pond;
import com.arjuncodes.studentsystem.service.PondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
public class PondController {

    @Autowired
    private PondService pondService;

    @GetMapping("/pond/all")
    public List<Pond> getAllPonds() {
        return pondService.getAllPonds();
    }

    @PostMapping("/pond/add")
    public ResponseEntity<Pond> addPond(@RequestBody Pond pond) {
        Pond savedPond = pondService.savePond(pond);
        return ResponseEntity.ok(savedPond);
    }


    @GetMapping("/pond/{id}")
    public ResponseEntity<Pond> getPondById(@PathVariable int id) {
        Optional<Pond> pond = pondService.getPondById(id);
        return pond.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/pond/{id}")
    public ResponseEntity<Void> deletePond(@PathVariable int id) {
        pondService.deletePond(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pond/search/element")
    public List<Pond> searchByElement(@RequestParam String element) {
        return pondService.searchByElement(element);
    }

    @GetMapping("/pond/search/shape")
    public List<Pond> searchByShape(@RequestParam String shape) {
        return pondService.searchByShape(shape);
    }
}

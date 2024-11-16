package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Koi;
import com.arjuncodes.studentsystem.model.Pond;
import com.arjuncodes.studentsystem.model.CompatibilityResult;
import com.arjuncodes.studentsystem.service.ElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class ElementController {

    @Autowired
    private ElementService elementService;

    @GetMapping("/fate")
    public Map<String, Object> getUserFate(@RequestParam String birthDate, @RequestParam String gender) {
        return elementService.calculateUserElement(birthDate, gender);
    }

    @GetMapping("/koiSpecies")
    public List<String> getKoiSpeciesOptions() {
        return elementService.getKoiSpeciesOptions();
    }

    @GetMapping("/pondShape")
    public List<String> getPondShapeOptions() {
        return elementService.getPondShapeOptions();
    }

    @GetMapping("/compatibility")
    public CompatibilityResult checkCompatibility(@RequestParam String birthDate, @RequestParam String gender,
                                                  @RequestParam String species, @RequestParam String quantity,
                                                  @RequestParam String pondShape, @RequestParam String location,
                                                  @RequestParam String direction) {
        return elementService.checkCompatibility(birthDate, gender, species, quantity, pondShape, location, direction);
    }
}

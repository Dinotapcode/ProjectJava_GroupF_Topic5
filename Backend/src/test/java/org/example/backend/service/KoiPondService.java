package org.example.backend.service;

import org.example.backend.model.Koi;
import org.example.backend.model.Pond;
import org.example.backend.repository.ElementRepository;
import org.example.backend.repository.KoiRepository;
import org.example.backend.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KoiPondService {
    @Autowired
    private ElementRepository elementRepository;
    @Autowired
    private KoiRepository koiRepository;
    @Autowired
    private PondRepository pondRepository;

    public List<Koi> getKoisBySupportedElement(String element) {
        String supportedElement = elementRepository.findById(element).map(e -> e.getSupport()).orElse(null);
        return supportedElement != null ? koiRepository.findByElement(supportedElement) : List.of();
    }

    public List<Pond> getPondsBySupportedElement(String element) {
        String supportedElement = elementRepository.findById(element).map(e -> e.getSupport()).orElse(null);
        return supportedElement != null ? pondRepository.findByElement(supportedElement) : List.of();
    }
}

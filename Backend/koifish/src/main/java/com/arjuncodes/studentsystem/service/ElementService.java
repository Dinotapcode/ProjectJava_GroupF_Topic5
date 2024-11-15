package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Element;
import com.arjuncodes.studentsystem.model.Koi;
import com.arjuncodes.studentsystem.model.Pond;
import com.arjuncodes.studentsystem.model.CompatibilityResult;
import com.arjuncodes.studentsystem.repository.ElementRepository;
import com.arjuncodes.studentsystem.repository.KoiRepository;
import com.arjuncodes.studentsystem.repository.PondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ElementService {

    @Autowired
    private ElementRepository elementRepository;
    @Autowired
    private KoiRepository koiRepository;
    @Autowired
    private PondRepository pondRepository;

    public Map<String, Object> calculateUserElement(String birthDate, String gender) {
        String userElement = calculateElement(birthDate, gender);  // Implementz logic for element calculation

        Element element = elementRepository.findById(userElement).orElse(null);
        if (element == null) return null;

        List<Koi> supportingKoi = koiRepository.findByElement(element.getSupport());
        List<Koi> conflictingKoi = koiRepository.findByElement(element.getConflict());

        List<Pond> supportingPond = pondRepository.findByElement(element.getSupport());
        List<Pond> conflictingPond = pondRepository.findByElement(element.getConflict());

        Map<String, Object> response = new HashMap<>();
        response.put("element", userElement);
        response.put("supportingKoi", supportingKoi);
        response.put("conflictingKoi", conflictingKoi);
        response.put("supportingPond", supportingPond);
        response.put("conflictingPond", conflictingPond);

        return response;
    }

    private static String calculateElement(String birthDate, String gender) {
        int birthYear = Integer.parseInt(birthDate.split("-")[0]);

        String[] elementCycle = {"Kim", "Thủy", "Mộc", "Hỏa", "Thổ"};

        int elementIndex = (birthYear % 10) % 5;

        if (gender.equals("male")) {
            return elementCycle[elementIndex];
        } else {
            return elementCycle[(elementIndex + 2) % 5];
        }
    }

    public List<String> getKoiSpeciesOptions() {
        return koiRepository.findDistinctSpeciesBy();
    }
    public List<String> getPondShapeOptions() {
        return pondRepository.findDistinctShapeBy();
    }


    public CompatibilityResult checkCompatibility(
            String birthDate, String gender, String species, String quantity, String pondShape, String location, String direction
    ) {
        Map<String, Object> userElementData = calculateUserElement(birthDate, gender);
        String element = (String) userElementData.get("element");
        List<Koi> supportingKoi = (List<Koi>) userElementData.get("supportingKoi");
        List<Koi> conflictingKoi = (List<Koi>) userElementData.get("conflictingKoi");
        List<Pond> supportingPond = (List<Pond>) userElementData.get("supportingPond");
        List<Pond> conflictingPond = (List<Pond>) userElementData.get("conflictingPond");

        int score = 0;
        String suggestion = "";
        String suggestionSpecies = "";
        String suggestionQuantity = "";
        String suggestionPondShape = "";
        String suggestionLocation = "";
        String suggestionDirection = "";

        // Kiểm tra tương thích giống cá
        if (supportingKoi.stream().anyMatch(k -> k.getSpecies().equals(species))) {
            score += 20;
            suggestionSpecies = "Ngũ hành " + element + " rất hợp với giống cá " + species +
                    ", điều này mang lại sự thịnh vượng và cân bằng năng lượng cho không gian sống.";
        } else if (conflictingKoi.stream().anyMatch(k -> k.getSpecies().equals(species))) {
            score += 0;
            suggestionSpecies = "Giống cá " + species + " xung khắc với ngũ hành " + element +
                    ". Bạn nên xem xét chọn một giống cá khác để tránh ảnh hưởng tiêu cực đến phong thủy.";
        } else {
            score += 10;
            suggestionSpecies = "Giống cá " + species + " không hoàn toàn tương thích với ngũ hành " + element +
                    ", có thể ảnh hưởng một phần đến sự cân bằng năng lượng, tuy nhiên không gây ra ảnh hưởng lớn.";
        }

        // Kiểm tra số lượng cá
        if (supportingKoi.stream().anyMatch(k -> k.getQuantity().equals(quantity))) {
            score += 20;
            suggestionQuantity = "Số lượng cá rất phù hợp với ngũ hành, giúp tăng cường vượng khí và mang lại sự hài hòa trong không gian.";
        } else {
            score += 10;
            suggestionQuantity = "Số lượng cá không tối ưu cho phong thủy, có thể dẫn đến mất cân bằng nhẹ trong vượng khí.";
        }

        // Kiểm tra hình dạng hồ cá
        if (supportingPond.stream().anyMatch(p -> p.getShape().equals(pondShape))) {
            score += 20;
            suggestionPondShape = "Hình dạng hồ cá rất hợp với ngũ hành, tạo ra sự lưu thông năng lượng thuận lợi và ổn định.";
        } else if (conflictingPond.stream().anyMatch(p -> p.getShape().equals(pondShape))) {
            score += 0;
            suggestionPondShape = "Hình dạng hồ cá xung khắc với ngũ hành " + element + ", hãy cân nhắc thay đổi để tạo sự hài hòa hơn.";
        } else {
            score += 10;
            suggestionPondShape = "Hình dạng hồ cá chưa tối ưu, có thể làm giảm sự lưu thông năng lượng tích cực trong khu vực.";
        }

        // Kiểm tra vị trí hồ cá
        if (supportingPond.stream().anyMatch(p -> p.getLocation().equals(location))) {
            score += 20;
            suggestionLocation = "Vị trí hồ cá rất tốt cho ngũ hành, đảm bảo nguồn năng lượng tốt sẽ được dẫn vào không gian sống của bạn.";
        } else if (conflictingPond.stream().anyMatch(p -> p.getLocation().equals(location))) {
            score += 0;
            suggestionLocation = "Vị trí hồ cá không nên ở " + location + " vì điều này có thể gây ảnh hưởng tiêu cực đến dòng chảy năng lượng.";
        } else {
            score += 10;
            suggestionLocation = "Vị trí hồ cá chưa hợp lí, nhưng vẫn có thể duy trì được sự ổn định trong dòng chảy năng lượng.";
        }

        // Kiểm tra hướng hồ cá
        if (supportingPond.stream().anyMatch(p -> p.getDirection().equals(direction))) {
            score += 20;
            suggestionDirection = "Hướng của hồ cá rất tốt cho ngũ hành, giúp đón nhận năng lượng tích cực từ các phương hướng thuận lợi.";
        } else if (conflictingPond.stream().anyMatch(p -> p.getDirection().equals(direction))) {
            score += 0;
            suggestionDirection = "Hướng của hồ cá không nên là " + direction + " vì điều này có thể dẫn đến xung khắc lớn về năng lượng.";
        } else {
            score += 10;
            suggestionDirection = "Hướng của hồ cá chưa phù hợp, nhưng không gây ra sự xung khắc lớn về năng lượng, có thể cân nhắc điều chỉnh để tối ưu hơn.";
        }

        suggestion = (score > 70) ?
                "Tổng thể rất tốt cho phong thủy hồ cá cá, bạn có thể hoàn toàn yên tâm về sự hài hòa và may mắn." :
                "Một vài yếu tố cần được xem xét và điều chỉnh để cải thiện phong thủy tổng thể, giúp tạo ra không gian sống cân bằng và thịnh vượng hơn.";

        return new CompatibilityResult(score, suggestionSpecies, suggestionQuantity, suggestionPondShape, suggestionLocation, suggestionDirection, suggestion);
    }
}
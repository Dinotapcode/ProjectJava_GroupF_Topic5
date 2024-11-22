package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Pond;
import com.arjuncodes.studentsystem.service.PondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PondController {

    @Autowired
    private PondService pondService;

    // Lấy tất cả các hồ
    @GetMapping("/admin/pond/all")
    public List<Pond> getAllPonds() {
        return pondService.getAllPonds();
    }

    // Thêm hồ mới
    @PostMapping("/admin/pond/add")
    public ResponseEntity<Pond> addPond(@RequestBody Pond pond) {
        Pond savedPond = pondService.savePond(pond);
        return ResponseEntity.ok(savedPond);
    }

    // Lấy hồ theo ID
    @GetMapping("/public/pond/{id}")
    public ResponseEntity<Pond> getPondById(@PathVariable int id) {
        Optional<Pond> pond = pondService.getPondById(id);
        return pond.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xoá hồ theo ID
    @DeleteMapping("/admin/pond/{id}")
    public ResponseEntity<Void> deletePond(@PathVariable int id) {
        pondService.deletePond(id);
        return ResponseEntity.noContent().build();
    }

    // Cập nhật thông tin hồ
    @PutMapping("/admin/pond/update/{id}")
    public ResponseEntity<Pond> updatePond(@PathVariable int id, @RequestBody Pond pond) {
        Optional<Pond> existingPond = pondService.getPondById(id);
        if (!existingPond.isPresent()) {
            return ResponseEntity.notFound().build();  // Trả về lỗi nếu không tìm thấy hồ
        }

        pond.setPondId(id);  // Đảm bảo ID được cập nhật đúng
        Pond updatedPond = pondService.savePond(pond);  // Lưu hồ đã sửa
        return ResponseEntity.ok(updatedPond);
    }

    // Lấy các lựa chọn hình dạng hồ
    @GetMapping("/public/pondShape")
    public List<String> getPondShapeOptions() {
        return pondService.getPondShapeOptions();
    }

    // Tìm hồ theo nguyên tố
    @GetMapping("/public/pond/search/element")
    public List<Pond> searchByElement(@RequestParam String element) {
        return pondService.searchByElement(element);
    }

    // Tìm hồ theo hình dạng
    @GetMapping("/public/pond/search/shape")
    public List<Pond> searchByShape(@RequestParam String shape) {
        return pondService.searchByShape(shape);
    }
}

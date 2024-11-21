package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Koi;
import com.arjuncodes.studentsystem.service.KoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class KoiController {

    @Autowired
    private KoiService koiService;

    private static final String UPLOAD_DIR = "Frontend/koifish/src/assets/admin/img_tracuu/";

    // Thêm mới Koi
    @PostMapping("/admin/koi/add")
    public ResponseEntity<Koi> addKoi(@RequestParam("koi") Koi koi,
                                      @RequestParam("file") MultipartFile file) {
        try {
            // Lưu ảnh và đổi tên file
            String fileName = saveImage(file);

            // Cập nhật đường dẫn ảnh vào đối tượng koi
            koi.setImage(fileName);

            // Lưu koi vào database
            Koi savedKoi = koiService.saveKoi(koi);
            return ResponseEntity.ok(savedKoi);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null); // Trả về lỗi nếu có ngoại lệ
        }
    }

    // Lưu ảnh lên server và trả về tên file đã đổi
    private String saveImage(MultipartFile file) throws IOException {
        // Lấy tên file và đổi tên để tránh trùng
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + fileExtension;

        // Lưu ảnh vào thư mục
        File dest = new File(UPLOAD_DIR + newFileName);
        file.transferTo(dest);

        return newFileName;
    }

    // Lấy danh sách tất cả các koi
    @GetMapping("/admin/koi/all")
    public List<Koi> getAllKois() {
        return koiService.getAllKois();
    }

    // Lấy thông tin koi theo ID
    @GetMapping("/public/koi/{id}")
    public ResponseEntity<Koi> getKoiById(@PathVariable int id) {
        Optional<Koi> koi = koiService.getKoiById(id);
        return koi.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xoá koi theo ID
    @DeleteMapping("/admin/koi/delete/{id}")
    public ResponseEntity<Void> deleteKoi(@PathVariable int id) {
        koiService.deleteKoi(id);
        return ResponseEntity.noContent().build();
    }

    // Cập nhật thông tin koi (sửa thông tin)
    @PutMapping("/admin/koi/update/{id}")
    public ResponseEntity<Koi> updateKoi(@PathVariable int id,
                                         @RequestParam("koi") Koi koi,
                                         @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Optional<Koi> existingKoi = koiService.getKoiById(id);
            if (!existingKoi.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            // Nếu có file ảnh mới, cập nhật ảnh
            if (file != null && !file.isEmpty()) {
                String fileName = saveImage(file);
                koi.setImage(fileName);
            } else {
                // Giữ nguyên ảnh cũ nếu không có file mới
                koi.setImage(existingKoi.get().getImage());
            }

            koi.setKoiId(id); // Cập nhật lại ID cho koi
            Koi updatedKoi = koiService.saveKoi(koi); // Lưu lại koi đã sửa
            return ResponseEntity.ok(updatedKoi);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Lấy các lựa chọn loài koi
    @GetMapping("/public/koiSpecies")
    public List<String> getKoiSpeciesOptions() {
        return koiService.getKoiSpeciesOptions();
    }

    // Tìm koi theo nguyên tố
    @GetMapping("/public/koi/search/element")
    public List<Koi> searchByElement(@RequestParam String element) {
        return koiService.getKoiByElement(element);
    }

    // Tìm koi theo loài
    @GetMapping("/public/koi/search/species")
    public List<Koi> searchBySpecies(@RequestParam String species) {
        return koiService.searchBySpecies(species);
    }
}

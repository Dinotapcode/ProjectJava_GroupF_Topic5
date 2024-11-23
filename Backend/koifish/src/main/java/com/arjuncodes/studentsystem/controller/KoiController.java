package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Koi;
import com.arjuncodes.studentsystem.service.KoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class KoiController {

    @Autowired
    private KoiService koiService;

    private static final String UPLOAD_DIR = "Frontend/koifish/public/uploads/img_tracuu/";

    // Thêm mới Koi
    @PostMapping("/admin/koi/add")
    public ResponseEntity<?> addKoi(@ModelAttribute Koi koi,
                                    @RequestParam("file") MultipartFile file) {
        try {
            // Lưu ảnh và lấy tên file đã lưu
            String fileName = saveImage(file);

            // Gán tên file ảnh cho đối tượng Koi
            koi.setImage(fileName);

            // Lưu đối tượng koi vào cơ sở dữ liệu
            Koi savedKoi = koiService.saveKoi(koi);
            return ResponseEntity.ok(savedKoi); // Trả về Koi đã được lưu thành công
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving Koi: " + e.getMessage()); // Trả về thông báo lỗi dạng String
        }
    }

    // Lưu ảnh lên server và trả về tên file đã đổi
    private String saveImage(MultipartFile uploadfile) {
        // Tạo tên file duy nhất với phần mở rộng của file gốc
        String fileName = UUID.randomUUID() + "_" + uploadfile.getOriginalFilename();

        // Định nghĩa đường dẫn lưu ảnh
        Path destinationPath = Paths.get(UPLOAD_DIR).resolve(fileName);

        try {
            // Tạo thư mục nếu chưa tồn tại
            Files.createDirectories(destinationPath.getParent());

            // Lưu ảnh vào đường dẫn đích
            Files.copy(uploadfile.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
            return fileName; // Trả về tên file đã được tạo
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error saving image: " + e.getMessage());
        }
    }

    // Cập nhật thông tin koi (sửa thông tin)
    @PutMapping("/admin/koi/update/{id}")
    public ResponseEntity<?> updateKoi(@PathVariable int id,
                                       @ModelAttribute Koi koi,
                                       @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Optional<Koi> existingKoi = koiService.getKoiById(id);
            if (!existingKoi.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Koi not found"); // Trả về thông báo lỗi nếu không tìm thấy koi
            }

            // Nếu có file ảnh mới, cập nhật ảnh
            if (file != null && !file.isEmpty()) {
                String fileName = saveImage(file);
                koi.setImage(fileName);
            } else {
                // Nếu không có file mới, giữ nguyên ảnh cũ
                koi.setImage(existingKoi.get().getImage());
            }

            koi.setKoiId(id); // Cập nhật lại ID cho koi
            Koi updatedKoi = koiService.saveKoi(koi); // Lưu lại koi đã sửa
            return ResponseEntity.ok(updatedKoi); // Trả về Koi đã được cập nhật
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating Koi: " + e.getMessage()); // Trả về thông báo lỗi dạng String
        }
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
    @DeleteMapping("/admin/koi/{id}")
    public ResponseEntity<Void> deletePond(@PathVariable int id) {
        koiService.deleteKoi(id);
        return ResponseEntity.noContent().build();
    }
    // Cập nhật thông tin koi (sửa thông tin)
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

package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Koi;
import com.arjuncodes.studentsystem.model.Pond;
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
@RequestMapping("/api/public")
public class KoiController {

    @Autowired
    private KoiService koiService;

    private static final String UPLOAD_DIR = "Frontend/koifish/src/assets/admin/img_tracuu/";

    @PostMapping("/koi/add")
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
            return ResponseEntity.status(500).build();
        }
    }

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

    @GetMapping("/koi/all")
    public List<Koi> getAllKois() {
        return koiService.getAllKois();
    }

    @GetMapping("/koi/{id}")
    public ResponseEntity<Koi> getKoiById(@PathVariable int id) {
        Optional<Koi> koi = koiService.getKoiById(id);
        return koi.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/koi/{id}")
    public ResponseEntity<Void> deleteKoi(@PathVariable int id) {
        koiService.deleteKoi(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/koi/search/element")
    public List<Koi> searchByElement(@RequestParam String element) {
        return koiService.getKoiByElement(element);
    }

    @GetMapping("/koi/search/spiece")
    public List<Koi> searchByShape(@RequestParam String species) {
        return koiService.searchBySpecies(species);
    }
}

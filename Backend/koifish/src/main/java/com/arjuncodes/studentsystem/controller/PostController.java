package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Post;
import com.arjuncodes.studentsystem.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.arjuncodes.studentsystem.service.PostService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.util.UUID;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {
    private static final String UPLOAD_DIR = "Frontend/koifish/src/assets/admin/img_blog";

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/add")
    public ResponseEntity<String> createPost(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam MultipartFile image,
            @RequestParam(required = false, defaultValue = "INACTIVE") String status,
            @RequestParam(required = false) Integer userId) {

        String originalFileName = image.getOriginalFilename();
        String fileExtension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String imageName = UUID.randomUUID().toString() + fileExtension;

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + File.separator + imageName));

            Post newPost = new Post();
            newPost.setTitle(title);
            newPost.setContent(content);
            newPost.setImage(imageName);
            newPost.setStatus(status);
            newPost.setUserId(userId);

            postRepository.save(newPost);

            return ResponseEntity.ok("Post created successfully with image: " + imageName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving the image");
        }
    }

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/get/{id}")
    public Post getPostById(@PathVariable int id) {
        return postService.getPostById(id);
    }
}

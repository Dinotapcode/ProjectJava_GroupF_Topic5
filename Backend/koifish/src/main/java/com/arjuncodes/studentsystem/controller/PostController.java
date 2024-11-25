package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Post;
import com.arjuncodes.studentsystem.repository.PostRepository;
import com.arjuncodes.studentsystem.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PostController {
    private static final String UPLOAD_DIR = "Frontend/koifish/public/uploads/img_blog";

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/public/post/add")
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

    @GetMapping("/admin/posts/count")
    public ResponseEntity<Long> countPost() {
        long count = postService.countPosts();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/public/post/all/active")
    public List<Post> getActivePosts() {
        return postService.getActivePosts();
    }

    @GetMapping("/admin/post/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/public/post/get/{id}")
    public Post getPostById(@PathVariable int id) {
        return postService.getPostById(id);
    }

    @PutMapping("/admin/post/update-status/{id}")
    public ResponseEntity<String> updatePostStatus(@PathVariable int id, @RequestParam String status) {
        try {
            Post post = postService.getPostById(id);
            post.setStatus(status);
            postRepository.save(post);

            return ResponseEntity.ok("Post status updated successfully to: " + status);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating post status: " + e.getMessage());
        }
    }


}

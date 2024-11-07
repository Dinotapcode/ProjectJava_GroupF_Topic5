package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Post;
import com.arjuncodes.studentsystem.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;  // Thêm import cho List

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/add")
    public String add(@RequestBody Post post) {
        postService.savePost(post);
        return "New post is added";
    }

    @GetMapping("/getAll")
    public List<Post> list() {   // Trả về List<Post>
        return postService.getAllPosts();
    }
}

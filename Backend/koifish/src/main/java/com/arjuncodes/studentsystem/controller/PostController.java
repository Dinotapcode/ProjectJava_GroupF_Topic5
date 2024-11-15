package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Post;
import com.arjuncodes.studentsystem.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Phương thức để lưu bài viết
    public void savePost(Post post) {
        postRepository.save(post);
    }

    // Phương thức để lấy tất cả bài viết
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Phương thức để lấy bài viết theo ID
    public Optional<Post> getPostById(Integer id) {
        return postRepository.findById(id);
    }
}

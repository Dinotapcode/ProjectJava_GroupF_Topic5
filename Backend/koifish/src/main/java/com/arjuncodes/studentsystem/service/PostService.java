package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Post;
import com.arjuncodes.studentsystem.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Return only posts with status "ACTIVE"
    public List<Post> getActivePosts() {
        return postRepository.findByStatus("ACTIVE");
    }
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(int id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found post with id: " + id));
    }

    public void updatePostStatus(int id, String status) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setStatus(status);
        postRepository.save(post);
    }

}

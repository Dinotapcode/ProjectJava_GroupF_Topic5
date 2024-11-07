package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Post;
import com.arjuncodes.studentsystem.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;  // Thêm import cho List

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {  // Trả về List<Post>
        return postRepository.findAll();
    }
}

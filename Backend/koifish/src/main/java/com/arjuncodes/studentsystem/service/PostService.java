package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Post;

import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getAllPosts();
}

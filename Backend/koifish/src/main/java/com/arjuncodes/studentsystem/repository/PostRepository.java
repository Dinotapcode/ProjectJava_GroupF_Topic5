package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}

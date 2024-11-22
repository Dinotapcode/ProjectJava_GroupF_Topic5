package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    // Method to find posts with status "ACTIVE"
    List<Post> findByStatus(String status);
    long count();

}

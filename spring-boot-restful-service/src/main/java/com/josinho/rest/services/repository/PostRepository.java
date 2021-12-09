package com.josinho.rest.services.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.josinho.rest.services.modals.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}

package com.josinho.rest.services.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.josinho.rest.services.modals.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}

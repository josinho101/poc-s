package com.josinho.rest.services.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.josinho.rest.services.modals.User;
import com.josinho.rest.services.repository.UserRepository;

@Component
public class UserDaoService {
	@Autowired
	private UserRepository userRepository;
	
	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	public User findOne(int id) {
		Optional<User> user = userRepository.findById(id);
		return user.get();
	}
	
	public void deleteById(int id) {
		userRepository.deleteById(id);
	}
}

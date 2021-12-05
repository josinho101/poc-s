package com.josinho.rest.services.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.josinho.rest.services.dao.UserDaoService;
import com.josinho.rest.services.modals.User;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserDaoService userService;

	@GetMapping
	public List<User> findAll(){
		return userService.findAll();
	}
	
	@GetMapping("/{id}")
	public User findOne(@PathVariable int id) {
		return userService.findOne(id);
	}
}

package com.josinho.rest.services.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.josinho.rest.services.dao.UserDaoService;
import com.josinho.rest.services.exceptions.UserNotFoundException;
import com.josinho.rest.services.modals.User;

@RestController
@RequestMapping("/api/users")
public class UsersController {

	@Autowired
	private UserDaoService userService;

	@GetMapping
	public List<User> findAll() {
		return userService.findAll();
	}

	@GetMapping("/{id}")
	public User findOne(@PathVariable int id) {
		User user = userService.findOne(id);
		if (user == null) {
			throw new UserNotFoundException("id - " + id);
		}

		return user;
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable int id) {
		userService.deleteById(id);
	}
	
	@PutMapping("/{id}")
	public void updateById(@Valid @RequestBody User user, @PathVariable int id) {
	}

	@PostMapping
	public ResponseEntity<Object> save(@Valid @RequestBody User user) {
		User newUser = userService.save(user);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newUser.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}
}

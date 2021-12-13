package com.josinho.springboot.microservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.josinho.springboot.microservices.bean.Limits;
import com.josinho.springboot.microservices.configuration.Configuration;

@RestController
public class LimitsController {

	@Autowired
	private Configuration configuration;

	@GetMapping("/limits")
	public Limits getLimits() {
		return new Limits(configuration.getMinimum(), configuration.getMaximum());
	}
}

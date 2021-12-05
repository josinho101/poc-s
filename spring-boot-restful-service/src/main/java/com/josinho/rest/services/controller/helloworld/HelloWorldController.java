package com.josinho.rest.services.controller.helloworld;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class HelloWorldController {

	@GetMapping(path = "/hello-world")
	private String helloWorld() {
		return "Hello World";
	}

	@GetMapping(path = "/hello-world-bean")
	private HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World");
	}

	@GetMapping(path = "/hello-world/{name}")
	private HelloWorldBean helloWorldPathVaraible(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World %s", name.toUpperCase()));
	}
}

package com.josinho.springboot.microservices.currencyexchangeservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;

@RestController
public class CircuteBreakerController {

	private Logger logger = LoggerFactory.getLogger(CircuteBreakerController.class);

	@GetMapping("/sample-api")
	@Retry(name = "sample-api",fallbackMethod = "hardcodedResponse")
	public String testApi() {
		// this will fail for sure as the url is a dummy api
		logger.info("Sample API called !!!");
		ResponseEntity<String> response = new RestTemplate().getForEntity("http://localhost:8080/some-url",
				String.class);
		return response.getBody();
	}
	
	@GetMapping("/sample-api2")
	@CircuitBreaker(name = "default",fallbackMethod = "hardcodedResponse")
	public String testApi2() {
		// this will fail for sure as the url is a dummy api
		logger.info("Sample API called !!!");
		ResponseEntity<String> response = new RestTemplate().getForEntity("http://localhost:8080/some-url",
				String.class);
		return response.getBody();
	}
	
	@GetMapping("/sample-api3")
	@RateLimiter(name = "default") // limits API calls in a configured time
	public String testApi3() {
		// this will fail for sure as the url is a dummy api
		logger.info("Sample API called !!!");
		return "Sample API 3";
	}
	
	private String hardcodedResponse(Exception e) {
		return "fallback-response";
	}
}

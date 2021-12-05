package com.josinho.rest.services.controller.helloworld;

public class HelloWorldBean {
	private String message;

	public HelloWorldBean(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "HelloWorldBean [message=" + message + "]";
	}
}

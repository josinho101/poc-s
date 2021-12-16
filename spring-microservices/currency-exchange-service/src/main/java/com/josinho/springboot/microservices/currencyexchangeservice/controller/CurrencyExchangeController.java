package com.josinho.springboot.microservices.currencyexchangeservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyExchangeController {

	@Autowired
	private CurrencyExchangeRepository currencyExchangeRepository;

	@Autowired
	private Environment environment;

	@GetMapping("currency-exchange/from/{from}/to/{to}")
	public CurrencyExchange getExchangeValue(@PathVariable String from, @PathVariable String to) {
		CurrencyExchange exchange = currencyExchangeRepository.findByFromAndTo(from, to);
		if (exchange == null) {
			throw new RuntimeException("Unable to find data from " + from + " to " + to);
		}
		
		String port = environment.getProperty("local.server.port");
		exchange.setEnvironment(port);

		return exchange;
	}
}

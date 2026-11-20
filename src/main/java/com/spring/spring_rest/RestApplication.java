package com.spring.spring_rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Spring REST application.
 */
@SpringBootApplication
public class RestApplication {

	/**
	 * Starts the Spring application.
	 *
	 * @param args command-line arguments passed to Spring Boot
	 */
	public static void main(String[] args) {
		SpringApplication.run(RestApplication.class, args);
	}

}

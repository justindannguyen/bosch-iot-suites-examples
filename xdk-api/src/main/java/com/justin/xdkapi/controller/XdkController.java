/**
 * Copyright (C) 2019, Justin Nguyen
 */
package com.justin.xdkapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author justin.dan.nguyen@gmail.com
 */
@RestController
@RequestMapping("/xdk")
public class XdkController {
	// 0 no command
	// 1 switch status
	private Integer lightStatus = 0;

	@GetMapping("/lightStatus")
	public Integer getLightStatus() {
		try {
			return lightStatus;
		} finally {
			lightStatus = 0;
		}
	}

	@PostMapping("/lightStatus")
	public void switchLightStatus() {
		lightStatus = 1;
	}
}
/**
 * Copyright (C) 2019, Justin Nguyen
 */
package com.justin.xdkapi;

import static java.util.Arrays.asList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
/**
 * @author justin.dan.nguyen@gmail.com
 */
@Configuration
public class CorsConfig {
  @Bean
  public CorsFilter getCorsFilter() {
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    final CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedHeaders(asList("*"));
    config.setAllowedOrigins(asList("*"));
    config.setAllowedMethods(asList("*"));
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }
}
/**
 * Copyright (C) 2019, Justin Nguyen
 */
package com.justin.xdkapi;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author justin.dan.nguyen@gmail.com
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2).select()
                                                  .apis(RequestHandlerSelectors.basePackage(
                                                      "com.justin.xdkapi.controller"))
                                                  .paths(PathSelectors.any())
                                                  .build()
                                                  .apiInfo(apiInfo());
  }

  private ApiInfo apiInfo() {
    return new ApiInfo("XDK API",
        "Provide the APIs to control the XDK device", "1.0", "", new Contact("Justin Nguyen",
            "https://justindannguyen.github.io/", "tuan3.nguyen@gmail.com"),
        "", "", Collections.emptyList());
  }
}

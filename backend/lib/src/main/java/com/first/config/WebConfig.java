package com.first.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.List;

@Configuration
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true); // 쿠키 허용
        config.setAllowedOrigins(List.of("http://localhost:5173")); // Vite 서버 허용
        config.setAllowedHeaders(List.of("*")); // 모든 헤더 허용
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 HTTP 메서드

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

package com.spring.spring_rest.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication
        .configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders
        .HttpSecurity;
import org.springframework.security.config.annotation.web.configuration
        .EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers
        .AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors
        .UrlBasedCorsConfigurationSource;

/**
 * Configures Spring Security authentication and authorization.
 * Defines security filters, password encoding, and authentication.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

        /**
         * Builds the application security filter chain.
         *
         * @param security the HTTP security configuration
         * @return the configured security filter chain
         * @throws Exception if the filter chain cannot be built
         */
        @Bean
        public SecurityFilterChain filterChain(
                        HttpSecurity security
        ) throws Exception {
                return security
                        .cors(Customizer.withDefaults())
                        .csrf(AbstractHttpConfigurer::disable)
                        .sessionManagement(session -> session
                                .sessionCreationPolicy(
                                        SessionCreationPolicy.IF_REQUIRED
                                ))
                        .authorizeHttpRequests(auth -> auth
                                .requestMatchers(
                                        HttpMethod.OPTIONS,
                                        "/**"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/auth/**"
                                ).permitAll()
                                .requestMatchers(
                                        "/api/students/**"
                                ).hasAnyAuthority(
                                        "USER",
                                        "ADMIN"
                                )
                                .anyRequest()
                                .authenticated())
                        .httpBasic(Customizer.withDefaults())
                        .build();
        }

        /**
         * Retrieves the authentication manager.
         *
         * @param authenticationConfiguration authentication configuration
         * @return the configured authentication manager
         * @throws Exception if the manager cannot be retrieved
         */
        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration
                                        authenticationConfiguration
        ) throws Exception {
                return authenticationConfiguration
                                .getAuthenticationManager();
        }

        /**
         * Creates the password encoder bean.
         *
         * @return a BCrypt password encoder
         */
        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        /**
         * Creates the CORS configuration source.
         *
         * @return the CORS configuration source
         */
        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOriginPatterns(Arrays.asList(
                                "http://localhost:3000",
                                "http://127.0.0.1:3000"
                ));
                configuration.setAllowedMethods(Arrays.asList(
                                "GET", "POST", "PUT", "PATCH",
                                "DELETE", "OPTIONS"
                ));
                configuration.setAllowedHeaders(Arrays.asList(
                                "Authorization",
                                "Cache-Control",
                                "Content-Type"
                ));
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source =
                                new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}

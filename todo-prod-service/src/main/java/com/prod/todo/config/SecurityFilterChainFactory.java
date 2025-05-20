package com.prod.todo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityFilterChainFactory {

    private final Environment environment;

    public SecurityFilterChain create(HttpSecurity http) throws Exception {
        boolean securityEnabled = Boolean.parseBoolean(
            environment.getProperty("spring.security.enabled", "true")
        );

        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(Customizer.withDefaults());

        if (!securityEnabled) {
            return http
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .build();
        }

        return http
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/todo-service/public/**",
                    "/actuator/health",
                    "/actuator/info",
                        "/docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/webjars/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .build();
    }
}

package com.spring.spring_rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.spring_rest.entity.Auth_User;

/**
 * Repository for accessing authorized user entities.
 */
public interface AuthUserRepository
        extends JpaRepository<Auth_User, Long> {

    /**
     * Finds a user by username.
     *
     * @param theUsername the username
     * @return the matching user when present
     */
    Optional<Auth_User> findByUsername(String theUsername);

    /**
     * Checks whether a username already exists.
     *
     * @param theUsername the username
     * @return {@code true} if the username exists
     */
    Boolean existsByUsername(String theUsername);
}

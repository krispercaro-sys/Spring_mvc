package com.spring.spring_rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.spring_rest.entity.Auth_Role;

/**
 * Repository for accessing authorization role entities.
 */
public interface AuthRoleRepository
        extends JpaRepository<Auth_Role, Long> {

    /**
     * Finds a role by name.
     *
     * @param theName the role name
     * @return the matching role when present
     */
    Optional<Auth_Role> findByName(String theName);

    /**
     * Checks whether a role name already exists.
     *
     * @param theName the role name
     * @return {@code true} if the role exists
     */
    Boolean existsByName(String theName);
}
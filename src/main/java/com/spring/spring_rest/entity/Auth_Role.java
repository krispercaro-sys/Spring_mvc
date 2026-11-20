package com.spring.spring_rest.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

/**
 * Represents an authorization role stored in the database.
 */
@Entity
@Table(name = "auth_role")
public class Auth_Role {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    /**
     * Gets the role identifier.
     *
     * @return the role identifier
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the role identifier.
     *
     * @param id the role identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the role name.
     *
     * @return the role name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the role name.
     *
     * @param name the role name
     */
    public void setName(String name) {
        this.name = name;
    }
}

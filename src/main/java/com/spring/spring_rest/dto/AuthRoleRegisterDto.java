package com.spring.spring_rest.dto;

/**
 * Data transfer object for role registration.
 */
public class AuthRoleRegisterDto {

    private String name;

    /**
     * Constructs role registration data.
     *
     * @param name the role name
     */
    public AuthRoleRegisterDto(String name) {
        this.name = name;
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

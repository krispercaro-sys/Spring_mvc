package com.spring.spring_rest.dto;

/**
 * Data transfer object for user registration.
 */
public class AuthUserRegisterDto {

    private String username;
    private String password;

    /**
     * Constructs user registration data.
     *
     * @param username the username
     * @param password the password
     */
    public AuthUserRegisterDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Gets the username.
     *
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the username.
     *
     * @param username the username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Gets the password.
     *
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password.
     *
     * @param password the password
     */
    public void setPassword(String password) {
        this.password = password;
    }
}

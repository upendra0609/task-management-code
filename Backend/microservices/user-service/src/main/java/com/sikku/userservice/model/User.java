package com.sikku.userservice.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@Slf4j
public class User implements UserDetails {

	
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private Role role;
    
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	log.info("User()=> getAuthorities() role: {}", role);
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
    	log.info("User()=> getUsername() email: {}", email);
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
    	log.info("User()=> isAccountNonExpired()");
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
    	log.info("User()=> isAccountNonLocked()");
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
    	log.info("User()=> isCredentialsNonExpired()");
        return true;
    }

    @Override
    public boolean isEnabled() {
    	log.info("User()=> isEnabled()");
        return true;
    }

	@Override
	public String getPassword() {
		log.info("User()=> getPassword() password");
		return password;
	}

}

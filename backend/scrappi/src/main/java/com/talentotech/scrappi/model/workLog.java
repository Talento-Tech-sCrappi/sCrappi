package com.talentotech.scrappi.model;
import java.security.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name = "workLog")


public class workLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "workstation_id", nullable = false)
    private WorkStation workStation;

    @Column(nullable = false)
    private Timestamp hour_check_in;

    @Column(nullable = false)
    private Timestamp hour_check_out;

    @Column(nullable = false)
    private double longitude_in;

    @Column(nullable = false)
    private double latitude_out;

    @Column(nullable = false)
    private double longitude_out;

    @Column(nullable = false)
    private double latitude_in;

    @CreationTimestamp
    @Column(name="created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "update_at")
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private Boolean complete;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getHour_check_in() {
        return hour_check_in;
    }

    public void setHour_check_in(Timestamp hour_check_in) {
        this.hour_check_in = hour_check_in;
    }

    public double getLongitude_in() {
        return longitude_in;
    }

    public void setLongitude_in(double longitude_in) {
        this.longitude_in = longitude_in;
    }

    public double getLatitude_out() {
        return latitude_out;
    }

    public void setLatitude_out(double latitude_out) {
        this.latitude_out = latitude_out;
    }

    public double getLongitude_out() {
        return longitude_out;
    }

    public void setLongitude_out(double longitude_out) {
        this.longitude_out = longitude_out;
    }

    public double getLatitude_in() {
        return latitude_in;
    }

    public void setLatitude_in(double latitude_in) {
        this.latitude_in = latitude_in;
    }

    public Boolean getComplete() {
        return complete;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }




}

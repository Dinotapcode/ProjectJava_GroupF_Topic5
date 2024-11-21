package com.arjuncodes.studentsystem.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "consultations")
public class Consultations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer consultations_id;

    @Column(nullable = false)
    private Integer user_id;

    @Column(nullable = false)
    private Integer product_id;

    private String contact;
    private Date date;
    private String time;

    // Getters and Setters

    public Integer getConsultationsId() {
        return consultations_id;
    }

    public void setConsultations_id(Integer consultations_id) {
        this.consultations_id = consultations_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}

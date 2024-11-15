package com.arjuncodes.studentsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "element")
public class Element {
    @Id
    private String element;
    private String support;
    private String conflict;

    // Getters and Setters
    public String getElement() { return element; }
    public void setElement(String element) { this.element = element; }
    public String getSupport() { return support; }
    public void setSupport(String support) { this.support = support; }
    public String getConflict() { return conflict; }
    public void setConflict(String conflict) { this.conflict = conflict; }
}

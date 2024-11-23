package com.arjuncodes.studentsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "ponds")
public class Pond {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pondId;
    private String element;
    private String shape;
    private String location;
    private String direction;

    // Getters and Setters
    public int getPondId() { return pondId; }
    public void setPondId(int pondId) { this.pondId = pondId; }
    public String getElement() { return element; }
    public void setElement(String element) { this.element = element; }
    public String getShape() { return shape; }
    public void setShape(String shape) { this.shape = shape; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDirection() { return direction; }
    public void setDirection(String direction) { this.direction = direction; }
}

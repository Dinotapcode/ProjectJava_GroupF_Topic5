package org.example.backend.model;

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
    // Getters and setters

    public int getPondId() {
        return pondId;
    }

    public String getElement() {
        return element;
    }

    public String getShape() {
        return shape;
    }

    public String getLocation() {
        return location;
    }

    public String getDirection() {
        return direction;
    }

    public void setPondId(int pondId) {
        this.pondId = pondId;
    }

    public void setElement(String element) {
        this.element = element;
    }

    public void setShape(String shape) {
        this.shape = shape;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}

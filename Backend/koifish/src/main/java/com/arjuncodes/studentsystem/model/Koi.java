package com.arjuncodes.studentsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "koi")
public class Koi {
    @Id
    private int koiId;
    private String element;
    private String species;
    private String quantity;
    private String image;
    private String description;

    // Getters and Setters
    public int getKoiId() { return koiId; }
    public void setKoiId(int koiId) { this.koiId = koiId; }
    public String getElement() { return element; }
    public void setElement(String element) { this.element = element; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
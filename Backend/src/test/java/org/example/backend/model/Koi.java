package org.example.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "koi")
public class Koi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int koiId;
    private String element;
    private String species;
    private Integer quantity;
    private String image;
    private String description;
    // Getters and setters

    public int getKoiId() {
        return koiId;
    }

    public String getElement() {
        return element;
    }

    public String getSpecies() {
        return species;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public void setElement(String element) {
        this.element = element;
    }

    public void setKoiId(int koiId) {
        this.koiId = koiId;
    }
}

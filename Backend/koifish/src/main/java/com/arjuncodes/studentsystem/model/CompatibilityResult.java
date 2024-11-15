package com.arjuncodes.studentsystem.model;

public class CompatibilityResult {
    private int score;
    private String suggestionSpecies;
    private String suggestionQuantity;
    private String suggestionPondShape;
    private String suggestionLocation;
    private String suggestionDirection;
    private String suggestion;

    // Constructor
    public CompatibilityResult(int score, String suggestionSpecies, String suggestionQuantity,
                               String suggestionPondShape, String suggestionLocation,
                               String suggestionDirection, String suggestion) {
        this.score = score;
        this.suggestionSpecies = suggestionSpecies;
        this.suggestionQuantity = suggestionQuantity;
        this.suggestionPondShape = suggestionPondShape;
        this.suggestionLocation = suggestionLocation;
        this.suggestionDirection = suggestionDirection;
        this.suggestion = suggestion;
    }

    // Getters và setters

    public int getScore() {
        return score;
    }

    public String getSuggestionSpecies() {
        return suggestionSpecies;
    }

    public String getSuggestionQuantity() {
        return suggestionQuantity;
    }

    public String getSuggestionLocation() {
        return suggestionLocation;
    }

    public String getSuggestionPondShape() {
        return suggestionPondShape;
    }

    public String getSuggestionDirection() {
        return suggestionDirection;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setSuggestionSpecies(String suggestionSpecies) {
        this.suggestionSpecies = suggestionSpecies;
    }

    public void setSuggestionQuantity(String suggestionQuantity) {
        this.suggestionQuantity = suggestionQuantity;
    }

    public void setSuggestionPondShape(String suggestionPondShape) {
        this.suggestionPondShape = suggestionPondShape;
    }

    public void setSuggestionLocation(String suggestionLocation) {
        this.suggestionLocation = suggestionLocation;
    }

    public void setSuggestionDirection(String suggestionDirection) {
        this.suggestionDirection = suggestionDirection;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }
}

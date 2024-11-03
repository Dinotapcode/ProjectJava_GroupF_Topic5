package org.example.backend.model;

import javax.persistence.*;

// Đánh dấu lớp này là một thực thể JPA
@Entity
@Table(name = "element")
public class Element {

    // Đánh dấu trường này là khóa chính
    @Id
    private String element;

    // Các thuộc tính hỗ trợ và xung đột
    private String support;
    private String conflict;

    // Getter và setter cho thuộc tính element
    public String getElement() {
        return element;
    }

    public void setElement(String element) {
        this.element = element;
    }

    // Getter và setter cho thuộc tính support
    public String getSupport() {
        return support;
    }

    public void setSupport(String support) {
        this.support = support;
    }

    // Getter và setter cho thuộc tính conflict
    public String getConflict() {
        return conflict;
    }

    public void setConflict(String conflict) {
        this.conflict = conflict;
    }
}

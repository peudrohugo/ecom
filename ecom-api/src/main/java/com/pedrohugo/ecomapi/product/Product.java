package com.pedrohugo.ecomapi.product;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "price")
    private double price;

    @Column(name = "in_stock")
    private int inStock;

    @Column(name = "min_stock")
    private int minStock;

    @Column(name = "max_stock")
    private int maxStock;

    public Product() {}

    public Product(ProductDTO productObj) {
        this.name = productObj.getName();
        this.description = productObj.getDescription();
        this.imageUrl = productObj.getImageUrl();
        this.price = productObj.getPrice();
        this.inStock = productObj.getInStock();
        this.minStock = productObj.getMinStock();
        this.maxStock = productObj.getMaxStock();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getInStock() {
        return inStock;
    }

    public void setInStock(int inStock) {
        this.inStock = inStock;
    }

    public int getMinStock() {
        return minStock;
    }

    public void setMinStock(int minStock) {
        this.minStock = minStock;
    }

    public int getMaxStock() {
        return maxStock;
    }

    public void setMaxStock(int maxStock) {
        this.maxStock = maxStock;
    }

    public ProductDTO convertToDTO() {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(this.getId());
        productDTO.setName(this.getName());
        productDTO.setDescription(this.getDescription());
        productDTO.setImageUrl(this.getImageUrl());
        productDTO.setPrice(this.getPrice());
        productDTO.setInStock(this.getInStock());
        productDTO.setMinStock(this.getMinStock());
        productDTO.setMaxStock(this.getMaxStock());
        return productDTO;
    }
}

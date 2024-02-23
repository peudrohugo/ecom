package com.pedrohugo.ecomapi.product;

import com.pedrohugo.ecomapi.exception.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> list() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productsObjs = products.stream().map(product -> product.convertToDTO()).collect(Collectors.toList());
        return productsObjs;
    }

    public Product create(ProductDTO productObj) {
        return productRepository.save(new Product(productObj));
    }

    public Map<String, Product> delete(Long id) {
        Product productToDelete = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not exist with id: " + id));
        productRepository.delete(productToDelete);
        Map<String, Product> deletedProduct = new HashMap<>();
        deletedProduct.put("Product deleted: ", productToDelete);
        return deletedProduct;
    }
}

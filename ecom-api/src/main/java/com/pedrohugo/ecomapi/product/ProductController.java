package com.pedrohugo.ecomapi.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> list() throws Exception {
        List<ProductDTO> products = productService.list();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> get(@PathVariable Long id) {
        ProductDTO productObj = productService.get(id);
        return new ResponseEntity<>(productObj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody ProductDTO productObj) throws Exception {
        Product createdProduct = productService.create(productObj);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody ProductDTO productObj) {
        Product editedProduct = productService.update(id, productObj);
        return new ResponseEntity<>(editedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Product>> delete(@PathVariable Long id) {
        Map<String, Product> deletedProduct = productService.delete(id);
        return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
    }
}

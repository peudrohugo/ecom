package com.pedrohugo.ecomapi.client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clients")
public class Client {

    @Id
    private String cpf;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    public Client() {}

    public Client(ClientDTO clientObj) {
        this.cpf = clientObj.getCpf();
        this.name = clientObj.getName();
        this.phone = clientObj.getPhone();
        this.email = clientObj.getEmail();
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ClientDTO convertToDto() {
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setCpf(this.getCpf());
        clientDTO.setName(this.getName());
        clientDTO.setPhone(this.getPhone());
        clientDTO.setEmail(this.getEmail());
        return clientDTO;
    }
}

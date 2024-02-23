package com.pedrohugo.ecomapi.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientDTO>> list() throws Exception {
        List<ClientDTO> clients = clientService.list();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> get(@PathVariable String id) {
        ClientDTO clientObj = clientService.get(id);
        return new ResponseEntity<>(clientObj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Client> create(@RequestBody ClientDTO clientObj) throws Exception {
        Client createdClient = clientService.create(clientObj);
        return new ResponseEntity<>(createdClient, HttpStatus.CREATED);
    }
}

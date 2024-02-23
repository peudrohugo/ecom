package com.pedrohugo.ecomapi.client;

import com.pedrohugo.ecomapi.exception.ClientNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<ClientDTO> list() {
        List<Client> clients = clientRepository.findAll();
        return clients.stream().map(client -> client.convertToDto()).collect(Collectors.toList());
    }

    public ClientDTO get(String id) {
        return clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException("Client not exist with id: " + id)).convertToDto();
    }

    public Client create(ClientDTO clientObj) {
        return clientRepository.save(new Client(clientObj));
    }

    public Map<String, Client> delete(String id) {
        Client clientToDelete = clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException("Client not exist with id: " + id));
        clientRepository.delete(clientToDelete);
        Map<String, Client> deletedClient = new HashMap<>();
        deletedClient.put("Client deleted: ", clientToDelete);
        return deletedClient;
    }
}

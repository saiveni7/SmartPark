package com.smartpark.backend.service;

import com.smartpark.backend.entity.ParkingSlot;
import com.smartpark.backend.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository repository;

    public ParkingSlotService(ParkingSlotRepository repository) {
        this.repository = repository;
    }

    // GET ALL
    public List<ParkingSlot> getSlots() {
        return repository.findAll();
    }

    // GET BY ID
    public ParkingSlot getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
    }

    // SAVE / UPDATE
    public ParkingSlot saveSlot(ParkingSlot slot) {
        return repository.save(slot);
    }

    // DELETE (optional)
    public void deleteSlot(Long id) {
        repository.deleteById(id);
    }
}
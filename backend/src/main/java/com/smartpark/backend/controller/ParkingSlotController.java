package com.smartpark.backend.controller;

import com.smartpark.backend.entity.ParkingSlot;
import com.smartpark.backend.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/slots")
@CrossOrigin("*")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotService service;

    // GET ALL SLOTS
    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return service.getSlots();
    }

    // BOOK SLOT
    @PutMapping("/{id}")
    public ParkingSlot bookSlot(@PathVariable Long id, @RequestBody ParkingSlot slot) {

        ParkingSlot existing = service.getById(id);

        existing.setStatus("BOOKED");
        existing.setVehicleNumber(slot.getVehicleNumber());
        existing.setUserName(slot.getUserName());

        return service.saveSlot(existing);
    }

    // CANCEL BOOKING
    @PutMapping("/cancel/{id}")
    public ParkingSlot cancelBooking(@PathVariable Long id) {

        ParkingSlot slot = service.getById(id);

        slot.setStatus("AVAILABLE");
        slot.setVehicleNumber(null);
        slot.setUserName(null);

        return service.saveSlot(slot);
    }

    // ➕ ADD THIS METHOD (NEW FEATURE)
    
    @PostMapping("/add")
public ParkingSlot addSlot(@RequestBody ParkingSlot slot) {
    slot.setStatus("AVAILABLE");
    slot.setVehicleNumber(null);
    slot.setUserName(null);
    return service.saveSlot(slot);
}
}
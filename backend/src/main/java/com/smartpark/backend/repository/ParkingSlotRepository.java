package com.smartpark.backend.repository;

import com.smartpark.backend.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
}
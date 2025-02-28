import express from "express"
import VehicleController from "../controllers/vehicleController"

const router = express.Router()

// Localiser une voiture par plateNumber
router.get("/:vehicleId/location", VehicleController.getVehicleLocation)

// Enregistrer un véhicule dans une flotte
router.post("/register", VehicleController.registerVehicleToFleet)

// Enregistrer la localistaion d'un vehicule
router.post("/park", VehicleController.parkVehicle)

export default router

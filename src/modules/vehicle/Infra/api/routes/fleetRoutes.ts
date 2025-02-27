import express from "express";
import FleetController from "../controllers/fleetController";

const router = express.Router();

// Créer une flotte
router.post("/", FleetController.create);

export default router;

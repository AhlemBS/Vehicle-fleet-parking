import { PrismaClient } from "@prisma/client";
import { FleetVehicle } from "../../Domain/entities /FleetVehicle";
import IFleetVehicleRepository from "../../Domain/repositories/IFleetVehicleRepository";

const prisma = new PrismaClient();

class FleetVehicleRepository implements IFleetVehicleRepository {
  async save(fleetVehicle: FleetVehicle) {
    return await prisma.fleetVehicle.create({
      data: {
        vehicleId: fleetVehicle.vehicleId,
        fleetId: fleetVehicle.fleetId,
        registredAt: new Date(),
      },
    });
  }
  async find(fleetId: string, vehicleId: string) {
    return await prisma.fleetVehicle.findFirst({
      where: {
        fleetId: fleetId,
        vehicleId: vehicleId,
      },
    });
  }
}

export default FleetVehicleRepository;

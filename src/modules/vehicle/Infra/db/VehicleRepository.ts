import { PrismaClient } from "@prisma/client"
import { Vehicle } from "../../Domain/entities /Vehicle"
import IVehicleRepository from "../../Domain/repositories/IVehicleRepository"

const prisma = new PrismaClient()

export default class VehicleRepository implements IVehicleRepository {
  async register(vehicle: any): Promise<void> {
    await prisma.fleetVehicle.create({
      data: {
        vehicleId: vehicle.id,
        fleetId: vehicle.fleetId,
        registredAt: new Date(),
      },
    })
  }
  async park(vehicle: Vehicle): Promise<any> {
    return await prisma.vehicle.upsert({
      where: { id: vehicle.id },
      create: { id: vehicle.id, name: vehicle.name, plate: vehicle.plate },
      update: { location: vehicle.location },
    })
  }

  async findByPlateNumber(plateNumber: string): Promise<any> {
    const vehicle = await prisma.vehicle.findFirst({
      where: { plate: plateNumber },
    })
    return vehicle
  }
  async findById(id: string): Promise<any> {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } })
    return vehicle
  }
  async create(plate: string): Promise<any> {
    const vehicle = await prisma.vehicle.create({ data: { plate } })
    return vehicle
  }
}

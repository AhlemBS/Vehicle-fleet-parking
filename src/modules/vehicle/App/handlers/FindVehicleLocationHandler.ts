import { Vehicle } from "../../Domain/entities /Vehicle"
import IVehicleRepository from "../../Domain/repositories/IVehicleRepository"
import VehicleRepository from "../../Infra/db/VehicleRepository"
import { FindVehicleLocationQuery } from "../queries/FindVehicleLocationQuery"

export class FindVehicleLocationHandler {
  private vehicleRepository: IVehicleRepository

  constructor() {
    this.vehicleRepository = new VehicleRepository()
  }

  async handle(query: FindVehicleLocationQuery): Promise<any | null> {
    const vehicle = await this.vehicleRepository.findById(query.vehicleId)
    return vehicle ? { location: vehicle.location } : null
  }
}

import IFleetRepository from "../../Domain/repositories/IFleetRepository"
import IVehicleRepository from "../../Domain/repositories/IVehicleRepository"
import FleetRepository from "../../Infra/db/FleetRepository"
import VehicleRepository from "../../Infra/db/VehicleRepository"
import ParkVehicleCommand from "../commands/ParkVehicleCommand"

export default class ParkVehicleHandler {
  private vehicleRepository: IVehicleRepository
  private fleetRepository: IFleetRepository
  constructor() {
    this.vehicleRepository = new VehicleRepository()
    this.fleetRepository = new FleetRepository()
  }

  async handle(command: ParkVehicleCommand): Promise<void> {
    // Validate the command input if needed
    if (
      !command.fleetId ||
      !command.vehiclePlate ||
      !command.longitude ||
      !command.latitude
    ) {
      throw new Error("Missing required parameters")
    }
    const fleet = await this.fleetRepository.findById(command.fleetId)
    const vehicle = await this.vehicleRepository.findByPlateNumber(
      command.vehiclePlate,
    )
    if (!fleet) {
      throw new Error("Fleet not found")
    }
    if (!vehicle) {
      throw new Error("Vehicle not found")
    }
    // Here, we can simulate finding a vehicle in the repository and updating its parking info
    if (vehicle) {
      await this.vehicleRepository.park(vehicle)
      console.log(
        `Vehicle ${vehicle.id} has been parked at ${command.longitude}, ${command.latitude}`,
      )
    }
  }
}

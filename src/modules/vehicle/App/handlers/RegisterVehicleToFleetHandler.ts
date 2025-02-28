import { FleetVehicle } from "../../Domain/entities /FleetVehicle"
import IFleetRepository from "../../Domain/repositories/IFleetRepository"
import IFleetVehicleRepository from "../../Domain/repositories/IFleetVehicleRepository"
import IVehicleRepository from "../../Domain/repositories/IVehicleRepository"
import FleetRepository from "../../Infra/db/FleetRepository"
import FleetVehicleRepository from "../../Infra/db/FleetVehicleRepository"
import VehicleRepository from "../../Infra/db/VehicleRepository"
import RegisterVehicleToFleetCommand from "../commands/RegisterVehicleToFleetCommand"

export class RegisterVehicleToFleetHandler {
  private vehicleRepository: IVehicleRepository
  private fleetRepository: IFleetRepository
  private fleetVehicleRepository: IFleetVehicleRepository

  constructor() {
    this.vehicleRepository = new VehicleRepository()
    this.fleetRepository = new FleetRepository()
    this.fleetVehicleRepository = new FleetVehicleRepository()
  }

  async handle(command: RegisterVehicleToFleetCommand) {
    const { vehiclePlate, fleetId } = command

    let vehicle = await this.vehicleRepository.findByPlateNumber(vehiclePlate)
    const fleet = await this.fleetRepository.findById(fleetId)
    if (!vehicle) {
      // throw new Error('Vehicle not found');
      // if the vhicle does not existe we create it and then add it to the fleet
      const newVehicle = await this.vehicleRepository.create(vehiclePlate)
      vehicle = newVehicle
    }

    if (!fleet) {
      throw new Error("Fleet not found")
    }
    if (vehicle && fleetId) {
      const fleetVehicle = await this.fleetVehicleRepository.find(
        fleetId,
        vehicle.id,
      )
      if (fleetVehicle) {
        throw new Error("this Vehicle is already registred in this fleet")
      }
      const newFleetVehicle = new FleetVehicle(fleetId, vehicle.id)
      const newfleetVehicle =
        await this.fleetVehicleRepository.save(newFleetVehicle)
      return newfleetVehicle
    }
  }
}

export default RegisterVehicleToFleetHandler

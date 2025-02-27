import { Vehicle } from "../entities /Vehicle";

export default interface IVehicleRepository {
  create(vehiclePlate: string): Promise<Vehicle | null>;
  register(vehicle: Vehicle): Promise<void>;
  park(vehicle: Vehicle): Promise<void>;
  findByPlateNumber(plate: string): Promise<any>;
  findById(vehicleId: string): Promise<Vehicle | null>;
};;;;;;;;;;;;;;;;;;;;

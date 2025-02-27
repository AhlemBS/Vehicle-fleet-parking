import { FleetVehicle } from "../entities /FleetVehicle";

export default interface IFleetVehicleRepository {
  save(fleet: FleetVehicle): Promise<any>;
  find(fleetId: string, vehicleId: string): Promise<any>;
};;;;;;;;;;;;;;;;;;;;

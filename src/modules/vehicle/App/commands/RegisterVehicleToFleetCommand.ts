class RegisterVehicleToFleetCommand {
  vehiclePlate: string;
  fleetId: string;

  constructor(vehiclePlate: string, fleetId: string) {
    this.vehiclePlate = vehiclePlate;
    this.fleetId = fleetId;
  }
}

export default RegisterVehicleToFleetCommand;

class ParkVehicleCommand {
  vehiclePlate: string;
  longitude: string;
  latitude: string;
  altitude?: string;
  fleetId: string;
  constructor(
    fleetId: string,
    vehiclePlate: string,
    longitude: string,
    latitude: string,
    altitude?: string,
  ) {
    this.fleetId = fleetId;
    this.vehiclePlate = vehiclePlate;
    this.longitude = longitude;
    this.latitude = latitude;
    this.altitude = altitude;
  }
}

export default ParkVehicleCommand;

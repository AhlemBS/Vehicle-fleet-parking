export class FleetVehicle {
  constructor(
    public readonly fleetId: string,
    public readonly vehicleId: string,
    public registredAt?: Date,
  ) {}

  getRegistrationDate(): Date | undefined {
    return this.registredAt
  }
}

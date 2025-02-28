import { FleetVehicle } from "./FleetVehicle"

export class Fleet {
  private vehicles: Set<FleetVehicle> = new Set()
  private _id: string
  private _name: string
  private _userId: string
  constructor(userId: string) {
    this._userId = userId
  }
  // Getters for fleet
  get id(): string {
    return this._id
  }
  get userId(): string {
    return this._userId
  }
  get name(): string {
    return this._name
  }
}

export class Vehicle {
  private _id: string // Unique identifier for the vehicle
  private _name?: string
  private _type: VehicleType // Type of the vehicle (Car, Truck, Motorcycle, etc.)
  private _plate: string // Unique plate number for the vehicle
  private _location?: {
    latitude: string
    longitude: string
    altitude?: string
  }

  constructor(id: string, name: string, plate: string) {
    this._id = id
    this._name = name
    this._plate = plate
  }
  // Getters for vehicle details
  get name(): string | undefined {
    return this._name
  }
  get id(): string {
    return this._id
  }
  get location() {
    return this._location
  }

  get type(): VehicleType {
    return this._type
  }

  get plate(): string {
    return this._plate
  }
}

// Enum to define vehicle types
export enum VehicleType {
  Car = "Car",
  Truck = "Truck",
  Motorcycle = "Motorcycle",
  Bicycle = "Bicycle",
}

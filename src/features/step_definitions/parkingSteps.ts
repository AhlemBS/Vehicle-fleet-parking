import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "chai"
import ParkVehicleHandler from "../../modules/vehicle/App/handlers/ParkVehicleHandler"
import ParkVehicleCommand from "../../modules/vehicle/App/commands/ParkVehicleCommand"
import FleetRepository from "../../modules/vehicle/Infra/db/FleetRepository"
import VehicleRepository from "../../modules/vehicle/Infra/db/VehicleRepository"
import FleetVehicleRepository from "../../modules/vehicle/Infra/db/FleetVehicleRepository"

// Instantiate the real repositories
const fleetRepository = new FleetRepository()
const vehicleRepository = new VehicleRepository()
const fleetVehcileRepository = new FleetVehicleRepository()

let fleetId: string
let vehiclePlate: string
let longitude: string
let latitude: string
let parkedLocation: { longitude: string; latitude: string } | null = null
let lastError: string | null = null

Given("my fleet", function () {
  fleetId = "fleet-test" // this fleet ID  exist in my DB
})

Given("a vehicle", function () {
  vehiclePlate = "vehicle-test" // this vehcile existe  in my DB
})

Given("I have registered this vehicle into my fleet", async function () {
  const fleet = await fleetRepository.findById(fleetId)
  if (!fleet) {
    throw new Error("Fleet not found")
  }

  const vehicle = await vehicleRepository.findByPlateNumber(vehiclePlate)
  if (!vehicle) {
    throw new Error("Vehicle not found")
  }

  if (fleet && vehicle) {
    const fleetVehcile = await fleetVehcileRepository.find(fleet.id, vehicle.id)
  } else {
    throw new Error("this vehcile is not registred")
  }
})

Given("a location", function () {
  longitude = "10.0"
  latitude = "20.0"
})

When("I park my vehicle at this location", async function () {
  try {
    const command = new ParkVehicleCommand(
      fleetId,
      vehiclePlate,
      longitude,
      latitude,
    )
    const parkVehicleHandler = new ParkVehicleHandler()
    await parkVehicleHandler.handle(command)
    lastError = null // Reset the error if parking is successful
  } catch (error: any) {
    lastError = error.message
  }
})

When("I try to park my vehicle at this location", async function () {
  try {
    const command = new ParkVehicleCommand(
      fleetId,
      vehiclePlate,
      longitude,
      latitude,
    )
    const parkVehicleHandler = new ParkVehicleHandler()
    await parkVehicleHandler.handle(command)
    lastError = null // Reset the error if parking is successful
  } catch (error: any) {
    lastError = error.message
  }
})

Then(
  "the known location of my vehicle should verify this location",
  function () {
    expect(parkedLocation).to.deep.equal({ longitude, latitude })
  },
)

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    expect(lastError).to.equal("Vehicle is already parked at this location")
  },
)

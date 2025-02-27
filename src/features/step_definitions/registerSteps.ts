import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

// Import your actual Command Handlers and Query Handlers
import { RegisterVehicleToFleetHandler } from "../../modules/vehicle/App/handlers/RegisterVehicleToFleetHandler"; // Command Handler

let lastError: string | null = null;
let fleetId: string;
let vehiclePlate: string;

Given("my fleet", async function () {
  fleetId = "fleet-123";
});

Given("a vehicle", async function () {
  vehiclePlate = "vehicle-456";
});

Given("I have registered this vehicle into my fleet", async function () {
  try {
    const command = { vehiclePlate, fleetId };
    await new RegisterVehicleToFleetHandler().handle(command);
  } catch (error: any) {
    lastError = error.message;
  }
});

When("I register this vehicle into my fleet", async function () {
  try {
    const command = { vehiclePlate, fleetId };
    await new RegisterVehicleToFleetHandler().handle(command); // Register the vehicle again
    lastError = null;
  } catch (error: any) {
    lastError = error.message;
  }
});

Then(
  "I should be informed this vehicle has already been registered into my fleet",
  function () {
    expect(lastError).to.equal(
      `Vehicle ${vehiclePlate} is already registered in fleet ${fleetId}`,
    );
  },
);

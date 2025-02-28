import { RegisterVehicleToFleetHandler } from "../src/modules/vehicle/App/handlers/RegisterVehicleToFleetHandler"
import RegisterVehicleToFleetCommand from "../src/modules/vehicle/App/commands/RegisterVehicleToFleetCommand"
import { FleetVehicle } from "../src/modules/vehicle/Domain/entities /FleetVehicle"
import VehicleRepository from "../src/modules/vehicle/Infra/db/VehicleRepository"
import FleetRepository from "../src/modules/vehicle/Infra/db/FleetRepository"
import FleetVehicleRepository from "../src/modules/vehicle/Infra/db/FleetVehicleRepository"

jest.mock("../src/modules/vehicle/Infra/db/FleetRepository")
jest.mock("../src/modules/vehicle/Infra/db/VehicleRepository")
jest.mock("../src/modules/vehicle/Infra/db/FleetVehicleRepository")

describe("RegisterVehicleToFleetHandler", () => {
  let handler: RegisterVehicleToFleetHandler;
  let mockVehicleRepository: jest.Mocked<VehicleRepository>;
  let mockFleetRepository: jest.Mocked<FleetRepository>;
  let mockFleetVehicleRepository: jest.Mocked<FleetVehicleRepository>;

  beforeEach(() => {
    mockVehicleRepository = new VehicleRepository() as jest.Mocked<VehicleRepository>;
    mockFleetRepository = new FleetRepository() as jest.Mocked<FleetRepository>;
    mockFleetVehicleRepository = new FleetVehicleRepository() as jest.Mocked<FleetVehicleRepository>;
    handler = new RegisterVehicleToFleetHandler();
  });

  it("should register a new vehicle to an existing fleet", async () => {
    const command = new RegisterVehicleToFleetCommand("ABC123", "fleet1");
    mockVehicleRepository.findByPlateNumber.mockResolvedValue(null);
    mockFleetRepository.findById.mockResolvedValue({ id: "fleet1" });
    mockVehicleRepository.create.mockResolvedValue({ id: "vehicle1", plate: "ABC123" });
    mockFleetVehicleRepository.find.mockResolvedValue(null);
    mockFleetVehicleRepository.save.mockResolvedValue({
      fleetId: "fleet1",
      vehicleId: "vehicle1",
      registredAt: new Date(),
    });
    const result = await handler.handle(command);
    expect(mockVehicleRepository.findByPlateNumber).toHaveBeenCalledWith("ABC123");
    expect(mockVehicleRepository.create).toHaveBeenCalledWith("ABC123");
    expect(mockFleetRepository.findById).toHaveBeenCalledWith("fleet1");
    expect(mockFleetVehicleRepository.find).toHaveBeenCalledWith("fleet1", "vehicle1");
    expect(mockFleetVehicleRepository.save).toHaveBeenCalled();
    expect(result).toBeInstanceOf(FleetVehicle);
  });

  it("should throw an error if the fleet does not exist", async () => {
    const command = new RegisterVehicleToFleetCommand("ABC123", "fleet1");
    mockFleetRepository.findById.mockResolvedValue(null);  
    await expect(handler.handle(command)).rejects.toThrow("Fleet not found");
    expect(mockFleetRepository.findById).toHaveBeenCalledWith("fleet1");
  });

  it("should throw an error if the vehicle is already registered in the fleet", async () => {
    const command = new RegisterVehicleToFleetCommand("ABC123", "fleet1");
    mockVehicleRepository.findByPlateNumber.mockResolvedValue({ id: "vehicle1" });
    mockFleetRepository.findById.mockResolvedValue({ id: "fleet1" });
    mockFleetVehicleRepository.find.mockResolvedValue({ 
      fleetId: "fleet1",
      vehicleId: "vehicle1",
      registredAt: new Date(),
    });

    await expect(handler.handle(command)).rejects.toThrow("this Vehicle is already registred in this fleet");
  });
});


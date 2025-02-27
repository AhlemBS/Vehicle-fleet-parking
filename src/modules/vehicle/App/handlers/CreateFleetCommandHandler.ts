import { Fleet } from "../../Domain/entities /Fleet";
import IFleetRepository from "../../Domain/repositories/IFleetRepository";
import FleetRepository from "../../Infra/db/FleetRepository";
import CreateFleetCommand from "../commands/CreateFleetCommand";

export default class CreateFleetCommandHandler {
  private fleetRepository: IFleetRepository;

  constructor() {
    this.fleetRepository = new FleetRepository();
  }

  async handle(command: CreateFleetCommand): Promise<Fleet | null> {
    const { userId } = command;
    const fleet = await this.fleetRepository.save(userId);
    return fleet ? fleet : null;
  }
}

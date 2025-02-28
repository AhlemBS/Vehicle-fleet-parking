import { Fleet } from "../entities /Fleet"

export default interface IFleetRepository {
  save(fleet: Fleet | any): Promise<Fleet | any>
  findById(fleetId: string): Promise<Fleet | any>
}

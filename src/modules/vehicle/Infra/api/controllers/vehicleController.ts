import ParkVehicleCommand from "../../../App/commands/ParkVehicleCommand"
import RegisterVehicleToFleetCommand from "../../../App/commands/RegisterVehicleToFleetCommand"
import { FindVehicleLocationHandler } from "../../../App/handlers/FindVehicleLocationHandler"
import ParkVehicleHandler from "../../../App/handlers/ParkVehicleHandler"
import RegisterVehicleToFleetHandler from "../../../App/handlers/RegisterVehicleToFleetHandler"
import { FindVehicleLocationQuery } from "../../../App/queries/FindVehicleLocationQuery"
import { Request, Response } from "express"
class VehicleController {
  async registerVehicleToFleet(req: Request, res: Response) {
    const { vehiclePlateNumber, fleetId } = req.body

    const command = new RegisterVehicleToFleetCommand(
      vehiclePlateNumber,
      fleetId,
    )
    const handler = new RegisterVehicleToFleetHandler()
    try {
      const result = await handler.handle(command)
      res.json(result)
    } catch (error) {
      const typedError = error as Error
      res.status(400).json({ error: typedError.message })
    }
  }

  async parkVehicle(req: Request, res: Response) {
    const { fleetId, vehiclePlateNumber, longitude, latitude, altitude } =
      req.body
    console.log(
      "-----------",
      vehiclePlateNumber,
      longitude,
      latitude,
      altitude,
    )
    const command = new ParkVehicleCommand(
      fleetId,
      vehiclePlateNumber,
      longitude,
      latitude,
      altitude,
    )
    const handler = new ParkVehicleHandler()
    try {
      const result = await handler.handle(command)
      res.json(result)
    } catch (error) {
      const typedError = error as Error
      res.status(400).json({ error: typedError.message })
    }
  }

  async getVehicleLocation(req: Request, res: Response) {
    const { vehicleId } = req.params

    const query = new FindVehicleLocationQuery(vehicleId)
    const handler = new FindVehicleLocationHandler()
    try {
      const location = await handler.handle(query)
      res.json({ location })
    } catch (error) {
      const typedError = error as Error
      res.status(400).json({ error: typedError.message })
    }
  }
}

export default new VehicleController()

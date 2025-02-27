import CreateFleetCommand from "../../../App/commands/CreateFleetCommand";
import CreateFleetCommandHandler from "../../../App/handlers/CreateFleetCommandHandler";
import { Request, Response, NextFunction } from "express";

class FleetController {
  // Créer une flotte
  async create(req: Request, res: Response) {
    const { userId } = req.body;
    console.log("userId", userId);
    const command = new CreateFleetCommand(userId);
    const handler = new CreateFleetCommandHandler();
    try {
      const result = await handler.handle(command);
      res.json(result);
    } catch (error) {
      const typedError = error as Error;
      res.status(400).json({ error: typedError.message });
    }
  }
}

export default new FleetController();

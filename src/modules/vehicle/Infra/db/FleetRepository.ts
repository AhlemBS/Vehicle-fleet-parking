import { PrismaClient } from "@prisma/client"
import { Fleet } from "../../Domain/entities /Fleet"
import IFleetRepository from "../../Domain/repositories/IFleetRepository"

const prisma = new PrismaClient()

class FleetRepository implements IFleetRepository {
  async findById(fleetId: string): Promise<any> {
    const fleet = await prisma.fleet.findFirst({
      where: { id: fleetId },
    })
    return fleet
  }

  async save(userId: string) {
    const name = `Fleet-${userId}`
    return await prisma.fleet.create({
      data: { userId, name },
    })
  }
}

export default FleetRepository

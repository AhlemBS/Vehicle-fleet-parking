#!/usr/bin/env -S npx ts-node

import axios from "axios"
import { Command } from "commander"
import dotenv from "dotenv"

dotenv.config() // Load .env variables

const program = new Command()
const API_URL = process.env.API_URL || "http://localhost:3000/api"

program.version("1.0.0").description("CLI for testing fleet Management APIs")

// create a new fleet using my userID
program
  .command("create <userId>")
  .description("create a new fleet for the current user")
  .action(async (userId) => {
    try {
      const response = await axios.post(`${API_URL}/fleets`, { userId })
      console.log(
        `Your fleet is successfully created it will have the name Fleet-${userId}\n\n`,
        response.data,
      )
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message)
    }
  })

// Define the 'register-vehicle' command with fleetId and vehiclePlateNumber
program
  .command("register-vehicle <fleetId> <vehiclePlateNumber>") // '<fleetId>' and '<vehiclePlateNumber>' are required
  .description(
    "Register a vehicle with the provided fleetId and vehiclePlateNumber",
  )
  .action(async (fleetId, vehiclePlateNumber) => {
    try {
      const response = await axios.post(`${API_URL}/vehicles/register`, {
        fleetId,
        vehiclePlateNumber,
      })
      console.log(
        `Your vehicle ${vehiclePlateNumber} is successfully registred into the fleet ${fleetId}`,
        response.data,
      )
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message)
    }
  })

// park a vehicle
program
  .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]") // '<fleetId>', '<vehiclePlateNumber>', '<lat>', '<lng>' are required, '[alt]' is optional
  .description(
    "Localize a vehicle with the provided fleetId, vehiclePlateNumber, latitude, longitude, and optional altitude",
  )
  .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
    console.log(fleetId, vehiclePlateNumber, lat, lng, alt)
    try {
      const response = await axios.post(`${API_URL}/vehicles/park`, {
        fleetId,
        vehiclePlateNumber,
        longitude: lng,
        latitude: lat,
        altitude: alt,
      })
      console.log(
        `Your vehicle ${vehiclePlateNumber} is successfully parked  here :\n longitude : ${lng} \n latitude : ${lat} \n altitude : ${alt}`,
      )
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message)
    }
  })

// get location of a vehicule by its plateNumber

program
  .command("get-vehicle-location <plate>")
  .description("Get the location of the vehicle")
  .action(async (plate) => {
    try {
      //const response = await axios.get(`${API_URL}/vehicles`);
      console.log(`Vehicle ${plate}is located in : \n `)
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message)
    }
  })
program.parse(process.argv)

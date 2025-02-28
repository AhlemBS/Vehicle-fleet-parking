import express from "express"
import errorMiddleware from "./modules/vehicle/Infra/api/middlewares/errorMiddleware"
import fleetRoutes from "./modules/vehicle/Infra/api/routes/fleetRoutes"
import vehicleRoutes from "./modules/vehicle/Infra/api/routes/vehicleRoutes"

const app = express()

app.use(express.json())

// Définir les routes
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/fleets", fleetRoutes)

// Middleware pour la gestion des erreurs
app.use(errorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

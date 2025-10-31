import { Router } from "express";

import verifyToken from "../middleware/authMiddleware.js";
import { GetTopStatitics } from "../controllers/dashboardController.js";


const dashboardRouter=Router()
dashboardRouter.use(verifyToken)

dashboardRouter.get("/stats",GetTopStatitics)


export default dashboardRouter
import { Router } from "express";
import { getProperties } from "../controllers/property-controller.js";
import auth from "../auth.js";

const router = Router();
router.use(auth);
router.route("/").get(getProperties);

export default router;

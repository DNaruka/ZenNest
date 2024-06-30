import { Router } from "express";
import { getProperties, getProperty } from "../controllers/property-controller.js";
import auth from "../auth.js";

const router = Router();
router.use(auth);
router.route("/").get(getProperties);

router.route("/:propertyId").get(getProperty);

export default router;

import { Router } from "express";
import {
  getProperties,
  getProperty,
  putProperty,
} from "../controllers/property-controller.js";
import auth from "../auth.js";

const router = Router();
router.use(auth);
router.route("/").get(getProperties);

router.route("/:propertyId").get(getProperty).put(putProperty);

export default router;

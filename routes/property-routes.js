import { Router } from "express";
import {
  addProperty,
  deleteProperty,
  getProperties,
  getProperty,
  putProperty,
} from "../controllers/property-controller.js";
import auth from "../auth.js";

const router = Router();
router.use(auth);
router.route("/").get(getProperties).post(addProperty);

router.route("/:propertyId").get(getProperty).put(putProperty).delete(deleteProperty);

export default router;

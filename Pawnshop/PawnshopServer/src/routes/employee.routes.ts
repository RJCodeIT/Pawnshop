import { Router } from "express";
import {
  addEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
} from "../controllers/employee.controller";

const router: Router = Router();

router.post("/employees", addEmployee);
router.get("/employees/:id", getEmployeeById);
router.get("/employees", getAllEmployees);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.post("/login", loginEmployee);

export default router;

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Employee } from "../models/employee.model";

const employeeRepository = AppDataSource.getRepository(Employee);

export const addEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newEmployee = employeeRepository.create(req.body);
    const savedEmployee = await employeeRepository.save(newEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await employeeRepository.findOneBy({ id });

    if (!employee) {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

export const getAllEmployees = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await employeeRepository.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEmployee = await employeeRepository.update(id, req.body);

    if (!updatedEmployee.affected) {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
      return;
    }

    const employee = await employeeRepository.findOneBy({ id });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employeeRepository.delete(id);

    if (!deletedEmployee.affected) {
      res.status(404).json({ message: `Employee with ID ${id} not found.` });
      return;
    }

    res
      .status(200)
      .json({ message: `Employee with ID ${id} has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

export const loginEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { login, password } = req.body;
    const employee = await employeeRepository.findOneBy({ login });

    if (!employee || employee.password !== password) {
      res.status(401).json({ message: "Invalid login or password" });
      return;
    }

    res.status(200).json({
      firstName: employee.firstName,
      lastName: employee.lastName,
      login: employee.login,
      role: employee.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};

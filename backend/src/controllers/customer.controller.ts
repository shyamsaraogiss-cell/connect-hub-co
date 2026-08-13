import { Request, Response } from "express";
import * as CustomerService from "../services/customer.service";

type CustomerServiceDependency = Pick<
  typeof CustomerService,
  "getCustomers" | "getCustomer" | "createCustomer" | "updateCustomer"
>;

export function createCustomerHandlers(service: CustomerServiceDependency = CustomerService) {
async function getCustomers(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const customers = await service.getCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
}

async function getCustomer(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const customer = await service.getCustomer(req.params.id);

    if (!customer) {
      res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customer.",
    });
  }
}

async function createCustomer(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const customer = await service.createCustomer(req.body);

    res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create customer.",
    });
  }
}

async function updateCustomer(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const customer = await service.updateCustomer(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update customer.",
    });
  }
}

async function deleteCustomer(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  res.status(409).json({
    success: false,
    message: "Customer hard deletion is disabled. Historical operational records must be preserved.",
  });
}

return { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer };
}

export const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = createCustomerHandlers();

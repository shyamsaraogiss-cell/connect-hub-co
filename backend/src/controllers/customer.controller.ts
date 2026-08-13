import { Request, Response } from "express";
import * as CustomerService from "../services/customer.service";

export async function getCustomers(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const customers = await CustomerService.getCustomers();

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

export async function getCustomer(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const customer = await CustomerService.getCustomer(req.params.id);

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

export async function createCustomer(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const customer = await CustomerService.createCustomer(req.body);

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

export async function updateCustomer(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const customer = await CustomerService.updateCustomer(
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

export async function deleteCustomer(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  res.status(409).json({
    success: false,
    message: "Customer hard deletion is disabled. Historical operational records must be preserved.",
  });
}

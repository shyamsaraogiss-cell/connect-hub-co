import { api } from "@/lib/api";
import { Customer, CustomerInput } from "@/types/customer";

const endpoint = "/customers";
export const getCustomers = (): Promise<Customer[]> => api<Customer[]>(endpoint);
export const getCustomer = (id: string): Promise<Customer> => api<Customer>(`${endpoint}/${id}`);
export const createCustomer = (customer: CustomerInput): Promise<Customer> => api<Customer>(endpoint, { method: "POST", body: JSON.stringify(customer) });
export const updateCustomer = (id: string, customer: Partial<CustomerInput>): Promise<Customer> => api<Customer>(`${endpoint}/${id}`, { method: "PATCH", body: JSON.stringify(customer) });
export const deleteCustomer = (id: string): Promise<Customer> => api<Customer>(`${endpoint}/${id}`, { method: "DELETE" });

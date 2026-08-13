import { api } from "@/lib/api";
import { Customer, CustomerInput } from "@/types/customer";

const endpoint = "/customers";
interface BackendCustomer { id:string;fullName:string;mobile:string;email?:string|null;city?:string|null;country?:string|null;purpose:string;serviceType?:string|null;status:string;createdAt?:string;updatedAt?:string }
type Envelope<T> = { data:T };
const normalize=(value:BackendCustomer):Customer=>({id:value.id,name:value.fullName,phone:value.mobile,email:value.email,city:value.city,country:value.country,purpose:value.purpose,serviceType:value.serviceType,status:value.status,createdAt:value.createdAt,updatedAt:value.updatedAt});
const toBackend=(value:Partial<CustomerInput>)=>({fullName:value.name,mobile:value.phone,email:value.email,city:value.city,country:value.country,purpose:value.purpose,serviceType:value.serviceType,status:value.status});
export const getCustomers = async (): Promise<Customer[]> => (await api<Envelope<BackendCustomer[]>>(endpoint)).data.map(normalize);
export const getCustomer = async (id: string): Promise<Customer> => normalize((await api<Envelope<BackendCustomer>>(`${endpoint}/${id}`)).data);
export const createCustomer = async (customer: CustomerInput): Promise<Customer> => normalize((await api<Envelope<BackendCustomer>>(endpoint, { method: "POST", body: JSON.stringify(toBackend(customer)) })).data);
export const updateCustomer = async (id: string, customer: Partial<CustomerInput>): Promise<Customer> => normalize((await api<Envelope<BackendCustomer>>(`${endpoint}/${id}`, { method: "PUT", body: JSON.stringify(toBackend(customer)) })).data);
export const deleteCustomer = (id: string): Promise<Customer> => api<Customer>(`${endpoint}/${id}`, { method: "DELETE" });

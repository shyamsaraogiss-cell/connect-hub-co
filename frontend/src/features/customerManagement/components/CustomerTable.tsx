import { Customer } from "../types/customer";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({
  customers,
}: CustomerTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Mobile</th>
            <th className="px-4 py-3 text-left">Purpose</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {customer.fullName}
              </td>

              <td className="px-4 py-3">
                {customer.mobile}
              </td>

              <td className="px-4 py-3">
                {customer.purpose}
              </td>

              <td className="px-4 py-3">
                {customer.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
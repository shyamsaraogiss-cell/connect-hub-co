"use client";

import Badge from "@/components/ui/Badge";
import { Customer } from "@/types/customer";

type Props = {
  customers: Customer[];
};

export default function CustomerTable({
  customers,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Customer</th>

            <th className="p-3 text-left">Mobile</th>

            <th className="p-3 text-left">Purpose</th>

            <th className="p-3 text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>

              <td
                colSpan={4}
                className="p-8 text-center text-gray-500"
              >
                No customers found.
              </td>

            </tr>

          ) : (

            customers.map((c) => (

              <tr
                key={c.id}
                className="border-t"
              >

                <td className="p-3">{c.fullName}</td>

                <td className="p-3">{c.mobile}</td>

                <td className="p-3">{c.purpose}</td>

                <td className="p-3">
                  <Badge>{c.status}</Badge>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}
import { ReligiousPartner } from "../types/religiousPartner";
import { StatusBadge } from "./StatusBadge";

interface ReligiousPartnerTableProps {
  partners: ReligiousPartner[];
}

export function ReligiousPartnerTable({
  partners,
}: ReligiousPartnerTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">City</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created</th>
          </tr>
        </thead>

        <tbody>
          {partners.map((partner) => (
            <tr
              key={partner.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                {partner.fullName}
              </td>

              <td className="px-4 py-3">
                {partner.category}
              </td>

              <td className="px-4 py-3">
                {partner.city || "-"}
              </td>

              <td className="px-4 py-3">
                <StatusBadge status={partner.status} />
              </td>

              <td className="px-4 py-3">
                {new Date(
                  partner.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
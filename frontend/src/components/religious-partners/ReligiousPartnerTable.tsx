"use client";

import { ReligiousPartner } from "@/types/religiousPartner";
import { deleteReligiousPartner } from "@/lib/religiousPartner";

interface Props {
  partners: ReligiousPartner[];
  loading: boolean;
  onRefresh: () => void;
}

export default function ReligiousPartnerTable({
  partners,
  loading,
  onRefresh,
}: Props) {

  async function handleDelete(id: string) {

    if (!confirm("Delete this Religious Partner?")) return;

    const result = await deleteReligiousPartner(id);

    if (result.success) {
      alert("Religious Partner Deleted");
      onRefresh();
    } else {
      alert(result.message ?? "Unable to delete.");
    }

  }

  if (loading) {

    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading Religious Partners...
      </div>
    );

  }

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-2xl font-bold">
        Religious Partners
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-200">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3 text-left">Name</th>

              <th className="border p-3 text-left">Category</th>

              <th className="border p-3 text-left">Mobile</th>

              <th className="border p-3 text-left">City</th>

              <th className="border p-3 text-left">Status</th>

              <th className="border p-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {partners.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-6 text-center"
                >
                  No Religious Partners Found
                </td>

              </tr>

            ) : (

              partners.map((partner) => (

                <tr key={partner.id}>

                  <td className="border p-3">
                    {partner.fullName}
                  </td>

                  <td className="border p-3">
                    {partner.category}
                  </td>

                  <td className="border p-3">
                    {partner.mobile}
                  </td>

                  <td className="border p-3">
                    {partner.city}
                  </td>

                  <td className="border p-3">
                    {partner.status}
                  </td>

                  <td className="border p-3 text-center">

                    <button
                      onClick={() =>
                        partner.id &&
                        handleDelete(partner.id)
                      }
                      className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}
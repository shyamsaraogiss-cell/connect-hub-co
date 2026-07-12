import Section from "@/components/ui/Section";

export default function CustomerKPIs() {
  return (
    <Section title="Customer Overview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="rounded-lg bg-blue-50 p-5">
          <h3 className="text-gray-500">Total</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg bg-green-50 p-5">
          <h3 className="text-gray-500">New</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg bg-yellow-50 p-5">
          <h3 className="text-gray-500">Quotation</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg bg-purple-50 p-5">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

      </div>
    </Section>
  );
}
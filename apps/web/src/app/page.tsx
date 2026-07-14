import Link from "next/link";

import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-4xl font-bold">
          Connect Hub Co ERP
        </h1>

        <p className="mb-10 text-gray-600">
          AI-Powered Ritual Services Management Platform
        </p>

        <div className="grid gap-6 md:grid-cols-4">

          <Card title="Religious Partners">
            <p className="text-4xl font-bold">--</p>
          </Card>

          <Card title="Customers">
            <p className="text-4xl font-bold">--</p>
          </Card>

          <Card title="Bookings">
            <p className="text-4xl font-bold">--</p>
          </Card>

          <Card title="Revenue">
            <p className="text-4xl font-bold">₹0</p>
          </Card>

        </div>

        <div className="mt-10">

          <Card title="Quick Actions">

            <div className="flex flex-wrap gap-4">

              <Link href="/partners">

                <Button>
                  Religious Partners
                </Button>

              </Link>

              <Link href="/partners/new">

                <Button>
                  Register Partner
                </Button>

              </Link>

            </div>

          </Card>

        </div>

      </div>

    </main>
  );
}
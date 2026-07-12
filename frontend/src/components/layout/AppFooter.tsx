"use client";

export default function AppFooter() {
  return (
    <footer className="border-t bg-white">

      <div className="flex items-center justify-between px-8 py-4">

        <div>

          <div className="font-semibold text-slate-700">
            Connect Hub Co.
          </div>

          <div className="text-sm text-slate-500">
            Faith • Service • Trust
          </div>

        </div>

        <div className="flex gap-8 text-sm">

          <div>
            <div className="font-semibold">Backend</div>
            <div className="text-green-600">
              ● Connected
            </div>
          </div>

          <div>
            <div className="font-semibold">Database</div>
            <div className="text-green-600">
              ● PostgreSQL
            </div>
          </div>

          <div>
            <div className="font-semibold">API</div>
            <div className="text-green-600">
              ● Online
            </div>
          </div>

          <div>
            <div className="font-semibold">GenZ Ritual AI</div>
            <div className="text-blue-600">
              Ready
            </div>
          </div>

        </div>

        <div className="text-right">

          <div className="font-semibold">
            Version 1.0.0
          </div>

          <div className="text-sm text-slate-500">
            © 2026 Connect Hub Co.
          </div>

        </div>

      </div>

    </footer>
  );
}
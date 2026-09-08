"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPublicCategories, getPublicServices } from "@/services/service-catalog.api";
import { CatalogPage, ServiceCategory } from "@/types/service-catalog";

const empty: CatalogPage = { items: [], total: 0, page: 1, pageSize: 12 };

export function PublicCatalog() {
  const [data, setData] = useState(empty);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let current = true;
    void getPublicCategories().then(rows => { if (current) setCategories(rows); }).catch(() => { if (current) setCategories([]); });
    return () => { current = false; };
  }, []);

  useEffect(() => {
    let current = true;
    const timer = setTimeout(() => {
      setLoading(true);
      void getPublicServices({ q, category, featured: featured || undefined, page, pageSize: 12 })
        .then((res) => {
          if (current) { setData(res); setError(null); }
        })
        .catch(reason => { if (current) setError(reason instanceof Error ? reason.message : "Unable to load services."); })
        .finally(() => { if (current) setLoading(false); });
    }, 250);
    return () => { current = false; clearTimeout(timer); };
  }, [q, category, featured, page]);

  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 text-stone-900">
      <div className="grid gap-3 rounded-2xl bg-white p-4 text-stone-900 shadow sm:grid-cols-4">
        <input
          className="rounded border bg-white p-3 text-stone-900 placeholder:text-stone-500 sm:col-span-2"
          placeholder="Search Services"
          aria-label="Search Services"
          value={q}
          onChange={event => { setQ(event.target.value); setPage(1); }}
        />
        <select
          aria-label="All Categories"
          className="rounded border bg-white p-3 text-stone-900 [&>option]:bg-white [&>option]:text-stone-900"
          value={category}
          onChange={event => { setCategory(event.target.value); setPage(1); }}
        >
          <option value="">All categories</option>
          {categories.map(item => (
            <option key={item.id} value={item.slug}>{item.name}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 p-3 text-stone-900">
          <input
            type="checkbox"
            checked={featured}
            onChange={event => { setFeatured(event.target.checked); setPage(1); }}
          />
          Featured Only
        </label>
      </div>

      {error ? <p className="mt-5 rounded bg-red-50 p-4 text-red-700" role="alert">Unable to load the service catalog. Please try again shortly.</p> : null}

      {!error && loading ? <p className="py-16 text-center text-stone-600" role="status">Loading services...</p> : null}

      {!error && !loading ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map(service => (
          <article key={service.id} className="overflow-hidden rounded-2xl bg-white text-stone-900 shadow">
            <div className="grid h-40 place-items-center bg-gradient-to-br from-amber-100 to-orange-200">
              {service.imageUrl ? (
                <Image
                  className="h-full w-full object-cover"
                  src={service.imageUrl}
                  alt={service.name || "Service image"}
                  width={400}
                  height={160}
                  unoptimized
                />
              ) : (
                <span className="text-4xl">ॐ</span>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">{service.categoryName}</p>
              <h2 className="mt-2 text-xl font-bold">{service.name}</h2>
              <p className="mt-3 text-sm text-stone-600">
                {service.shortDescription ?? service.description ?? "Contact us for service details."}
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <span>
                  {service.priceMinor
                    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: service.currency, maximumFractionDigits: 0 }).format(service.priceMinor / 100)
                    : "Price on consultation"}
                </span>
                <span>{service.durationMinutes ? `${service.durationMinutes} min` : "Duration varies"}</span>
              </div>
              <Link className="mt-5 inline-block font-semibold text-orange-800" href={`/services/${service.slug}`}>
                View service 
              </Link>
            </div>
          </article>
        ))}
      </div> : null}

      {!loading && !data.items.length && !error ? (
        <p className="py-16 text-center text-stone-500">No matching services found.</p>
      ) : null}

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          className="rounded border px-4 py-2 text-stone-900 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => setPage(value => value - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {pages}</span>
        <button
          className="rounded border px-4 py-2 text-stone-900 disabled:opacity-40"
          disabled={page >= pages}
          onClick={() => setPage(value => value + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

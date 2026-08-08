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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getPublicCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void getPublicServices({ q, category, featured: featured || undefined, page, pageSize: 12 })
        .then(setData)
        .catch(reason => setError(reason instanceof Error ? reason.message : "Unable to load services."));
    }, 250);
    return () => clearTimeout(timer);
  }, [q, category, featured, page]);

  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow sm:grid-cols-4">
        <input
          className="rounded border p-3 sm:col-span-2"
          placeholder="Search services"
          value={q}
          onChange={event => { setQ(event.target.value); setPage(1); }}
        />
        <select
          className="rounded border p-3"
          value={category}
          onChange={event => { setCategory(event.target.value); setPage(1); }}
        >
          <option value="">All categories</option>
          {categories.map(item => (
            <option key={item.id} value={item.slug}>{item.name}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 p-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={event => { setFeatured(event.target.checked); setPage(1); }}
          />
          Featured only
        </label>
      </div>

      {error ? <p className="mt-5 text-red-700">{error}</p> : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map(service => (
          <article key={service.id} className="overflow-hidden rounded-2xl bg-white shadow">
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
                View service →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {!data.items.length && !error ? (
        <p className="py-16 text-center text-stone-500">No matching services found.</p>
      ) : null}

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          className="rounded border px-4 py-2 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => setPage(value => value - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {pages}</span>
        <button
          className="rounded border px-4 py-2 disabled:opacity-40"
          disabled={page >= pages}
          onClick={() => setPage(value => value + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

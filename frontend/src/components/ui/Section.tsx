type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="bg-white rounded-xl shadow p-6 mb-6">
      {title && (
        <h2 className="text-xl font-semibold mb-4">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
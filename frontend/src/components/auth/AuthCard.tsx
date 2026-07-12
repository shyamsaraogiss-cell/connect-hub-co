import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  children,
}: Props) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {title}
      </h1>

      {children}
    </div>
  );
}
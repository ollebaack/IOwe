import React from "react";

export default function PageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto w-full max-w-6xl px-4 py-6 h-full">
      {children}
    </main>
  );
}

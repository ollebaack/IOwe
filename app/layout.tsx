export const metadata = {
  title: "IOwe",
  description: "Settle up without awkwardness",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto p-6 font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HarapanKalbar - VideoMag Platform Video Indonesia",
  description: "Platform streaming video terbaik dengan konten lokal Kalimantan Barat dan internasional berkualitas tinggi",
  icons: {
    icon: "/harapankalbar.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
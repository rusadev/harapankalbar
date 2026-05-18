import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harapan Kalbar — Portal Berita Terintegrasi Kalimantan Barat",
  description: "Media Informasi Digital Independen, Profesional, dan Eksklusif Kalimantan Barat.",
  icons: {
    icon: "/harapankalbar.png",
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
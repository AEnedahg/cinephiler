import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/_components/Nav";
import QueryProvider from "@/_lib/react-query/QueryProvider";
import Footer from "@/_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Cinephiler | Honest Movie Reviews & Ratings",
  description:
    "Explore honest movie reviews, ratings, and recommendations with Cinephiler — your go-to destination for everything film.",
  keywords: [
    "Cinephiler",
    "movie reviews",
    "film ratings",
    "cinema",
    "movie recommendations",
    "film critiques",
    "latest movies",
    "movie blog",
  ],
  openGraph: {
    title: "Cinephiler | Honest Movie Reviews & Ratings",
    description:
      "Discover the latest movie reviews and ratings from passionate film critics on Cinephiler.",
    url: "https://cinephiler.vercel.app",
    siteName: "Cinephiler",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.cinephiler.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cinephiler - Honest Movie Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinephiler",
    description: "Your destination for honest movie reviews and film ratings.",
    images: ["https://cinephiler.vercel.app/og-image.jpg"],
  },
  metadataBase: new URL("https://www.cinephiler.com"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col">
        <ClerkProvider>
          <QueryProvider>
            <div className="max-w-[1440px] mx-auto flex-1 flex flex-col w-full">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "William Norland",
  description: "Personal webpage for William Norland"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> William Norland </title>
        <meta name="description" content="Personal webpage for William Norland" />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <ErrorBoundary errorComponent={Error}>
            {children}
          </ErrorBoundary>
          <div style={{ flexGrow: 1 }} />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

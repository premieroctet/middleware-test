import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextIntlClientProvider messages={{}}>
        <body className={inter.className}>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
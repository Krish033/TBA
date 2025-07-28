import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/lib/query/provider";
import ToastProvider from "@/lib/providers/ToastProvider";

export const metadata: Metadata = {
  title: "TBA",
  description: "New Gen ..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={` antialiased`}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </Provider>
  );
}

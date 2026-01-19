import type { Metadata } from "next";
import "./globals.css"; // Now this will work because the file is in the same folder

export const metadata: Metadata = {
  title: "SmartLab Portal",
  description: "Laboratory Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
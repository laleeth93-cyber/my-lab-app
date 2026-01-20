// BLOCK LAYOUT IMPORTS OPEN
import type { Metadata } from "next";
import "./globals.css"; 
// BLOCK LAYOUT IMPORTS CLOSE

// BLOCK SITE METADATA OPEN
export const metadata: Metadata = {
  title: "SmartLab Portal",
  description: "Laboratory Management System",
};
// BLOCK SITE METADATA CLOSE

// BLOCK ROOT LAYOUT COMPONENT OPEN
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
// BLOCK ROOT LAYOUT COMPONENT CLOSE
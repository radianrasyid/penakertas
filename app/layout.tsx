import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";
import "./global.scss";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pena Kertas - KEPRI",
  description: "Employee management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Toaster />
    </html>
  );
}

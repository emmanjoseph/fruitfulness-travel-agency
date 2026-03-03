import type { Metadata } from "next";
import { Urbanist} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const chillax = localFont({
  src: [
    {
      path: "./fonts/Chillax-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Chillax-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
});


export const metadata: Metadata = {
  title: "Fruitfulness Travel ",
  description: "Fruitfulness Travel is your gateway to breathtaking adventures, unique experiences, and unforgettable journeys across Kenya, Tanzania, and beyond.",
  icons:{
    icon:"/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${chillax.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster richColors/>
      </body>
    </html>
  );
}

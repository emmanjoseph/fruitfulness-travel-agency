import type { Metadata } from "next";
import {Raleway, Bricolage_Grotesque} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


const urbanist = Raleway({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable:"--font-heading",
  subsets:["latin"],
})


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
        className={`${urbanist.variable} ${bricolage.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster richColors/>
      </body>
    </html>
  );
}

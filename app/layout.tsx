import type { Metadata } from "next";
import { Urbanist, Righteous,Audiowide} from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable:"--font-righteous",
  weight:['400'],
  subsets:['latin']
})

const audiowide = Audiowide({
   variable:"--font-audiowide",
  weight:['400'],
  subsets:['latin']
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
        className={`${urbanist.variable} ${righteous.variable} ${audiowide.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

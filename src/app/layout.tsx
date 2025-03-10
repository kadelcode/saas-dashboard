import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Inter, Poppins, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

/*const inter = Inter({
  subsets: ["latin"], // Supports different character sets
  weight: "400", // Specify font weight
  variable: "--font-inter", // Optional CSS variable
})*/

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-dmsans" });

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/
export const metadata: Metadata = {
  title: "My SaaS Dashboard",
  description: "Admin panel built with Next.js 13+",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${dmSans.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>

        <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'lightgreen',
              color: 'black',
              width: '25%'
            },
          },
          error: {
            style: {
              background: 'lightcoral',
              color: 'white',
              width: '25%',
            },
          },
        }}
      />
        
      </body>
    </html>
  );
}

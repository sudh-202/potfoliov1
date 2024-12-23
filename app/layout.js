import { inter, spaceGrotesk, sora, dancingScript } from './fonts'
import "./globals.css";
import "@/public/cursors/cursor.css";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer'
import ClientWrapper from "@/components/ClientWrapper";

export const metadata = {
  title: "Portfolio",
  description: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable} ${dancingScript.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
       
      </head>
      <body className={`${sora.className} ${dancingScript.variable}`}>
        <ClientWrapper>
          <main className="min-h-screen bg-black text-white">
            <Navbar />
            {children}
            <Footer />
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}

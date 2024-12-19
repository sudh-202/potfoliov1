import { inter, spaceGrotesk, sora } from './fonts'
import "./globals.css";
import Navbar  from '@/components/Navbar'
import  Footer from '@/components/Footer'

export const metadata = {
  title: "Portfolio",
  description: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fahkwang:wght@400;500;600;700&family=Unbounded:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          html {
            zoom: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
          body {
            min-width: 100vw;
            min-height: 100vh;
            overflow-x: hidden;
            transform-origin: center top;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body className={sora.className}>
        <main className="min-h-screen bg-black text-white">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}

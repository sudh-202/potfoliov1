import { inter, spaceGrotesk, sora } from './fonts'
import "./globals.css";
import Navbar  from '@/components/Navbar'
import  Footer from '@/components/Footer'

export const metadata = {
  title: "Your Portfolio | Creative Developer",
  description: "Portfolio website showcasing creative development work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fahkwang:wght@400;500;600;700&family=Unbounded:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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

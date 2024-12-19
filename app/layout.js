import { inter, spaceGrotesk, sora } from './fonts'
import "./globals.css";

export const metadata = {
  title: "Your Portfolio | Creative Developer",
  description: "Portfolio website showcasing creative development work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable}`}>
      <body className={sora.className}>
        {children}
      </body>
    </html>
  );
}

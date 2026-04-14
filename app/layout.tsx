import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

import { ThemeProvider } from "@/context/themeContext";

export const metadata: Metadata = {
  title: "LUNAR Lab",
  description: "LUNAR Lab website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rsx0kcp.css" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
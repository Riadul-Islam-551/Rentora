import { Roboto } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/lib/theme-provider";
import { ToastProvider } from "@/lib/core/toastContext";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rentora",
  description: "Rental property management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

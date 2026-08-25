import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { ToastProvider } from "@/lib/core/toastContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rentora",
  description:
    "Discover verified rental properties, book seamlessly, and manage payments securely all in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.className}>
      <body className="min-h-full">
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

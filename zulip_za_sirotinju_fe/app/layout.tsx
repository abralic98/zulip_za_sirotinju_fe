import "./globals.css";
import { Inter } from "next/font/google";
import { QueryClientProviderA } from "@/lib/queryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zulip Za Sirotinju",
  description: "ZULIP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProviderA>
        <body className={inter.className}>{children}</body>
      </QueryClientProviderA>
    </html>
  );
}



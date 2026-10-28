import "./globals.css";

export const metadata = {
  title: "UMS — Unmatched Services",
  description: "Torn City services, clearly priced.",
  applicationName: "UMS — Unmatched Services",
  manifest: "/manifest.json",
  themeColor: "#0b0c0e",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "UMS" }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}

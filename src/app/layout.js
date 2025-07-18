import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title: "ATPV-e",
  description: "ATPV-e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto}`}>
          {children}
      </body>
    </html>
  );
}

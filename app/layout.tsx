import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/app/context/CartContext"
import Navbar from "@/app/components/layout/Navbar"
import Footer from "@/app/components/layout/Footer"
import CartDrawer from "@/app/components/layout/CartDrawer"

export const metadata: Metadata = {
  title: "PURESKA — Live pure. Glow harder.",
  description:
    "Supplements & cosmetics for people who take their wellness seriously. Clinically tested, clean ingredients, made for real life.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#F7F3EE" }}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}

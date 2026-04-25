import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/app/context/CartContext"
import Navbar from "@/app/components/layout/Navbar"
import Footer from "@/app/components/layout/Footer"
import CartDrawer from "@/app/components/layout/CartDrawer"

export const metadata: Metadata = {
  title: "PURESKA — Vive puro. Brilla Diferente.",
  description:
    "Suplementos y cosméticos para quienes toman su bienestar en serio. Clínicamente probados, ingredientes limpios, hechos para la vida real.",
  icons: {
    icon: { url: "/images/favicon.jpg", type: "image/jpeg" },
  },
}

const MAINTENANCE = process.env.MAINTENANCE_MODE === "true"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#F7F3EE" }}>
        <CartProvider>
          {MAINTENANCE ? (
            <main className="flex-1">{children}</main>
          ) : (
            <>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </>
          )}
        </CartProvider>
      </body>
    </html>
  )
}

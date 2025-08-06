import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
  title: "The Originals (R4RR) - Last War Survival Game Alliance",
  description:
    "Official landing page for The Originals (R4RR) alliance in Last War Survival Game. Join the elite team dominating the battlefield.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black font-sans antialiased">
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

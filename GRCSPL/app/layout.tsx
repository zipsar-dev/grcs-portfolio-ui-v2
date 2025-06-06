import type React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import FMCGPreloader from "@/components/preloader" 
import { AiChatbot } from "@/components/chatbot";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GRCSPL | Home",
  description:
    "GRCSPL is one of the best direct selling companies in Tamil Nadu. We offer high-quality health and daily use products. Join us today!",
  icons: {
    icon: "/GR.png",
    shortcut: "/GR.png",
    apple: "/GR.png",
  },
  keywords:
    "home care products, personal care products, auto care products, health care products, FMCG direct selling, Geeaar Consumer Solutions, GRCSPL, direct selling company Tamilnadu, passive income opportunities, multiple earning opportunities, best MLM company, network marketing business, daily use products, household cleaning solutions, skincare essentials, car maintenance products, health supplements, herbal personal care, wellness products, organic home care, car cleaning solutions, direct selling business Tamilnadu, trusted MLM company, best direct selling opportunity, FMCG network marketing, Tamilnadu MLM products, Geeaar direct selling, home hygiene solutions, beauty and skincare products, auto care essentials, financial freedom with direct selling, work from home business, extra income opportunity, Tamilnadu consumer products, leading direct selling company, Geeaar health care, online business opportunity, premium home care products, natural wellness solutions, earn with direct selling, residual income business, flexible earning opportunity, FMCG business Tamilnadu, profitable MLM business, Geeaar product range, part-time income opportunity, direct sales success, best passive income business, network marketing opportunities Tamilnadu.",
  authors: [{ name: "GEEAAR Consumer Solutions Private Limited" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://grcspl.com/",
  },
  openGraph: {
    url: "https://grcspl.com/",
    type: "website",
    title: "GEEAAR Consumer Solutions Private Limited",
    description:
      "GRCSPL is one of the best direct selling companies in Tamil Nadu. We offer high-quality health and daily use products. Join us today!",
    images: [
      {
        url: "https://grcspl.com/public/Seo_img.png",
        secureUrl: "https://grcspl.com/public/Seo_img.png",
        width: 1200,
        height: 630,
        alt: "GRCSP",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRCSPL | Home",
    description:
      "GRCSPL is one of the best direct selling companies in Tamil Nadu. We offer high-quality health and daily use products. Join us today!",
    images: {
      url: "https://grcspl.com/public/Seo_img.png",
      width: 2500,
      height: 2500,
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "handheldfriendly": "true",
    "mobileoptimized": "width",
    "revisit-after": "7 days",
    "theme-color": "#39b54b",
    copyright: "GEEAAR Consumer Solutions Private Limited",
    "geo.placename": "Tamilnadu",
    "format-detection": "telephone=+914224350058 email=office@grcspl.com",
  },
};

// ✅ Correct viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <FMCGPreloader /> 
            <div className="flex min-h-screen flex-col">
              <Header />
              <AiChatbot />
              {/* AnnouncementBanner can be added here if needed */}
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

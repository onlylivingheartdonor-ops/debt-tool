export const metadata = {
  title: "Debt Reducing Calculator | Estimate How Long to Become Debt‑Free",
  description: "Calculate how long it will take to pay off debt based on balance, interest rate, and monthly payment. See total interest, extra payment impact, and amortization schedule.",

  alternates: {
    canonical: "https://www.debtreducingcalculator.com",
  },

  openGraph: {
    title: "Debt Reducing Calculator | Estimate How Long to Become Debt‑Free",
    description: "Calculate how long it will take to pay off debt based on balance, interest rate, and monthly payment. See total interest and extra payment impact.",
    url: "https://www.debtreducingcalculator.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.debtreducingcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Debt Reducing Calculator — Estimate your debt payoff timeline",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Debt Reducing Calculator | Estimate How Long to Become Debt‑Free",
    description: "Calculate how long it will take to pay off debt based on balance, interest rate, and monthly payment.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Debt Reducing Calculator",
              description: "Free tool to calculate how long it will take to pay off debt. See total interest, extra payment impact, and full amortization schedule.",
              url: "https://www.debtreducingcalculator.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
export const metadata = {
  title: "Debt Payoff Calculator – Estimate How Long to Become Debt‑Free",
  description: "Calculate how long it will take to pay off debt based on balance, interest rate, and monthly payment.",
  alternates: {
    canonical: "https://www.debtreducingcalculator.com",
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
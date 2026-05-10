export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Debt Payoff Calculator – Estimate How Long to Become Debt‑Free</title>
        <meta
          name="description"
          content="Calculate how long it will take to pay off debt based on balance, interest rate, and monthly payment."
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}

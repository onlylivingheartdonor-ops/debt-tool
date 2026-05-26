export const metadata = {
  title: "Terms of Service | Debt Reducing Calculator",
  description: "Terms of service for Debt Reducing Calculator. Please read these terms before using the tool.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Mono', monospace", color: "#1a1a1a", background: "#faf8f4", minHeight: "100vh" }}>
      <p style={{ fontSize: "12px", marginBottom: "1.5rem" }}>
        <a href="/" style={{ color: "#0f6e56", textDecoration: "none" }}>← Back to Debt Reducing Calculator</a>
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", marginBottom: ".5rem" }}>Terms of Service</h1>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: "2rem" }}>Last updated: May 19, 2026</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Acceptance of terms</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          By accessing or using Debt Reducing Calculator at debtreducingcalculator.com, you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Description of service</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Debt Reducing Calculator is a free online tool that helps users calculate debt payoff timelines and interest costs. All calculations are performed within the user's browser.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Accuracy of results</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          The calculations produced by this tool are based on standard financial formulas and the values you enter. Results are estimates, not guarantees. The simulation assumes a fixed interest rate and fixed monthly payment for the full repayment period.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>No financial advice</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Nothing on this site constitutes financial, investment, or legal advice. You should not rely solely on this tool when making financial decisions. Consult a qualified financial professional before making debt repayment decisions.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Acceptable use</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          You may use this tool for personal or educational purposes. You agree not to use automated tools to scrape the site or attempt to disrupt its infrastructure.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Intellectual property</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          The content, design, and code of this site are owned by MoneyWise Calculators and are protected by copyright laws.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Disclaimer of warranties</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site is provided "as is" without warranties of any kind. We do not warrant the accuracy or completeness of any information provided.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Limitation of liability</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          MoneyWise Calculators shall not be liable for any damages arising from your use of this site or tool, including any financial loss resulting from decisions made based on tool outputs.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Third-party services</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site uses Google AdSense and Google Analytics. Your interaction with these services is governed by Google's terms.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Changes to these terms</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          We may modify these terms at any time. Your continued use of the site constitutes acceptance of updated terms.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Contact</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Contact us through <a href="https://moneywisecalculator.com" style={{ color: "#0f6e56" }}>MoneyWise Calculator</a>.
        </p>
      </section>

      <p style={{ fontSize: "12px", color: "#aaa", borderTop: "1px solid #e0dbd3", paddingTop: "1.5rem" }}>
        © 2026 MoneyWise Calculators · <a href="/privacy" style={{ color: "#aaa" }}>Privacy Policy</a>
      </p>
    </main>
  );
}
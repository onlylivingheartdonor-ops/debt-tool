import DebtReducingCalculator from "./DebtReducingCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .dr-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .dr-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .dr-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .dr-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .dr-title em { font-style: italic; color: #0f6e56; }
  .dr-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .dr-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .dr-field-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .dr-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .dr-field-hint { font-size: 12px; color: #888; margin-top: .3rem; }
  .dr-input-wrap { position: relative; }
  .dr-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .dr-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .dr-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .dr-input.no-prefix { padding-left: 0; }
  .dr-input:focus { border-color: #0f6e56; }
  .dr-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; }
  .dr-calc-btn:hover { background: #0f6e56; }
  .dr-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .dr-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .dr-result-cell { background: #fff; padding: 1rem 1.25rem; }
  .dr-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .dr-result-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
  .dr-result-val.red { color: #b91c1c; }
  .dr-result-val.green { color: #0f6e56; }
  .dr-timeline { margin-bottom: 1.5rem; }
  .dr-timeline-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; display: flex; justify-content: space-between; }
  .dr-bar-track { height: 8px; background: #e0dbd3; border-radius: 4px; overflow: hidden; margin-bottom: .4rem; }
  .dr-bar-principal { height: 100%; border-radius: 4px; background: #1a1a1a; transition: width .6s; display: inline-block; }
  .dr-bar-interest { height: 100%; background: #b91c1c; display: inline-block; }
  .dr-bar-legend { display: flex; gap: 1.5rem; font-size: 11px; color: #888; }
  .dr-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: .35rem; vertical-align: middle; }
  .dr-extra-section { border: 1.5px dashed #b7d9c8; border-radius: 4px; padding: 1.25rem; margin-bottom: 1rem; }
  .dr-extra-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #0f6e56; margin-bottom: .75rem; }
  .dr-extra-row { display: flex; align-items: center; gap: 1rem; }
  .dr-extra-label { font-size: 12px; color: #555; white-space: nowrap; }
  .dr-extra-input { flex: 1; border: none; border-bottom: 1.5px solid #b7d9c8; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .3rem 0 .3rem 1rem; outline: none; transition: border-color .2s; }
  .dr-extra-input:focus { border-color: #0f6e56; }
  .dr-extra-prefix { font-size: .9rem; color: #aaa; }
  .dr-extra-result { font-size: 12px; color: #0f6e56; margin-top: .75rem; line-height: 1.6; min-height: 1.4em; }
  .dr-schedule-toggle { font-size: 12px; color: #0f6e56; cursor: pointer; text-decoration: underline; margin-bottom: .75rem; display: inline-block; }
  .dr-schedule { display: none; overflow-x: auto; }
  .dr-schedule.show { display: block; }
  .dr-schedule-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .dr-schedule-table th { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; text-align: left; padding: .4rem .5rem; border-bottom: 1px solid #e0dbd3; }
  .dr-schedule-table td { padding: .4rem .5rem; border-bottom: 1px solid #f5f3ef; color: #444; }
  .dr-schedule-table tr:last-child td { color: #0f6e56; font-weight: 500; }
  .dr-warn { font-size: 12px; color: #b91c1c; padding: .9rem 1rem; background: #fff8f8; border: 1px solid #fcd4d4; border-radius: 3px; margin-bottom: 1rem; line-height: 1.6; }
  .dr-warn span { font-weight: 500; }
  .dr-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .dr-info-item { padding: .75rem; border-left: 2px solid #9fe1cb; }
  .dr-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .dr-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .dr-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .dr-prose p:last-child { margin-bottom: 0; }
  .dr-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .dr-prose ul li { margin-bottom: .3rem; }
  .dr-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .dr-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .dr-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .dr-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .dr-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .dr-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #9fe1cb; line-height: 1; margin-bottom: .4rem; }
  .dr-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .dr-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #0f6e56; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .dr-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .dr-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .dr-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .dr-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .dr-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .dr-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .dr-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .dr-field-row, .dr-result-grid, .dr-info-grid, .dr-tip-grid { grid-template-columns: 1fr; }
  }
`

const FAQ = [
  {
    q: "What happens if my monthly payment doesn't cover the interest?",
    a: "If your payment is less than or equal to the monthly interest charge, the balance will never decrease — it will actually grow. This is the minimum payment trap, and the calculator flags it immediately. To make progress, you must pay at least enough to cover the monthly interest plus some additional principal. Even $1 above the interest charge creates a downward path to zero, though it may take many years."
  },
  {
    q: "How accurate is the payoff timeline?",
    a: "The simulation assumes a fixed interest rate and fixed monthly payment for the entire repayment period — which matches how fixed-rate loans work. If your loan has a variable rate, the timeline will change if rates change. The calculator also assumes you make every payment on time without additional borrowing. Real-world results may vary, but the estimate provides a clear baseline for planning."
  },
  {
    q: "Why does paying extra early matter so much?",
    a: "Interest compounds monthly on the remaining balance. Any extra payment you make reduces the principal immediately, which means less interest accrues in every future month. That saved interest also doesn't compound. This creates a snowball effect: extra payments made early in the loan save dramatically more than the same dollar amount applied later. This calculator shows you the exact savings so you can decide if an extra payment is worth it."
  },
  {
    q: "Should I pay off debt or invest instead?",
    a: "Compare your debt's interest rate to expected investment returns. A credit card at 22% APR is a guaranteed 22% return by paying it off — far better than any risk-free investment. A mortgage at 4% APR might be worth keeping if you can earn 7% in the market. Use the extra payment section to see how much interest you'd save, then decide if that 'return' beats your investment alternatives. Risk-free debt payoff is often the better choice for high-rate debt."
  },
  {
    q: "What's the difference between this calculator and the Credit Card Debt Payoff Calculator?",
    a: "This calculator handles a single debt — perfect for personal loans, auto loans, student loans, or medical debt. The Credit Card Debt Payoff Calculator handles multiple cards simultaneously with different balances, rates, and minimum payments, and offers snowball/avalanche/emotional strategies for prioritizing which card to pay first. Use this one for one debt; use the other for multiple credit cards."
  },
  {
    q: "How do I read the amortization schedule?",
    a: "The schedule shows your balance at key intervals: every month for the first two years, then annually. The 'Interest' column shows the interest charged that month. 'Total interest' is cumulative. 'Remaining' is your balance after that month's payment. As you progress through the schedule, the interest per month decreases because your remaining balance shrinks — that's amortization at work. The final row shows zero balance, your payoff milestone."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="dr-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="dr-header">
          <p className="dr-eyebrow">Personal Finance</p>
          <h1 className="dr-title">Debt Reducing<br /><em>Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate exactly how long it will take to become debt-free. Enter your balance, interest rate, and monthly payment to see your payoff timeline, total interest, and the impact of paying extra each month.
        </p>

        <DebtReducingCalculator />

        {/* HOW IT WORKS */}
        <div className="dr-card">
          <p className="dr-section-title">How this calculator works</p>
          <div className="dr-prose">
            <p>Enter your current debt balance, the annual interest rate, and your planned monthly payment. The calculator simulates month-by-month repayment using compound interest — the same method your lender uses — and shows you exactly how long it will take to reach a zero balance.</p>
            <p>The principal vs interest bar shows what portion of your total payments goes toward actually reducing your debt versus what goes to the lender as interest. For high-rate debt paid slowly, interest can represent the majority of what you ultimately pay — often more than the original balance itself.</p>
            <p>The extra payment section lets you test how much difference even a small additional monthly amount makes. Because interest compounds, paying more early has a disproportionate effect: money saved on interest in month one also saves the interest that would have accrued on that interest in every subsequent month.</p>
          </div>
          <div className="dr-info-grid">
            <div className="dr-info-item">
              <p className="dr-info-title">Compound interest</p>
              <p className="dr-info-body">Interest is calculated monthly on the remaining balance. This means unpaid interest from last month increases the base on which this month's interest is calculated — the core mechanic that makes debt grow so quickly.</p>
            </div>
            <div className="dr-info-item">
              <p className="dr-info-title">Minimum payment trap</p>
              <p className="dr-info-body">If your monthly payment is less than or equal to the monthly interest charge, the balance never decreases. The calculator flags this scenario so you know immediately if your current payment is making progress.</p>
            </div>
            <div className="dr-info-item">
              <p className="dr-info-title">Amortization schedule</p>
              <p className="dr-info-body">The expandable schedule shows your balance at key intervals — monthly for the first two years, then annually. Useful for seeing exactly when the balance crosses certain milestones.</p>
            </div>
            <div className="dr-info-item">
              <p className="dr-info-title">Extra payment modeling</p>
              <p className="dr-info-body">The extra payment field runs a parallel simulation showing months saved and interest avoided. Even $25 extra per month can cut years off a long payoff timeline.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="dr-card">
          <p className="dr-section-title">Why understanding your payoff timeline matters</p>
          <div className="dr-prose">
            <p>Most people carrying debt have a rough sense of their monthly payment but no clear picture of when they'll be debt-free or what the debt is actually costing them. This gap between the monthly number and the total cost is where lenders profit — and where borrowers lose more than they realize.</p>
            <p>A $10,000 personal loan at 15% APR with a $200 monthly payment takes over seven years to pay off and costs more than $7,000 in interest — meaning you repay nearly twice what you borrowed. Seeing that number clearly often changes behavior in ways that abstract warnings about interest rates do not.</p>
            <p>Understanding your timeline also gives you something actionable: a specific monthly amount that, if increased by even 10–20%, meaningfully reduces both the duration and cost of your debt.</p>
          </div>
        </div>

        {/* STRATEGIES */}
        <div className="dr-card">
          <p className="dr-section-title">Strategies to pay off debt faster</p>
          <div className="dr-tip-grid">
            <div>
              <p className="dr-tip-num">01</p>
              <p className="dr-tip-title">Increase your payment, even slightly</p>
              <p className="dr-tip-body">Adding $50 or $100 to your monthly payment consistently is one of the highest-return financial moves available. The interest you avoid paying compounds just like the interest you're charged — it works in both directions.</p>
            </div>
            <div>
              <p className="dr-tip-num">02</p>
              <p className="dr-tip-title">Refinance to a lower rate</p>
              <p className="dr-tip-body">If your credit has improved since taking on the debt, refinancing at a lower APR can significantly reduce total interest cost without changing your monthly payment. Worth checking annually for long-running balances.</p>
            </div>
            <div>
              <p className="dr-tip-num">03</p>
              <p className="dr-tip-title">Apply windfalls to principal</p>
              <p className="dr-tip-body">Tax refunds, work bonuses, or any unexpected income applied directly to your balance reduce the principal that interest is calculated on — immediately lowering every future interest charge for the life of the loan.</p>
            </div>
            <div>
              <p className="dr-tip-num">04</p>
              <p className="dr-tip-title">Avoid extending the term</p>
              <p className="dr-tip-body">Refinancing to a lower monthly payment by extending the repayment period often costs more in total interest, even at a lower rate. Use this calculator to compare total paid under different scenarios before deciding.</p>
            </div>
          </div>
        </div>

{/* REAL-WORLD EXAMPLE */}
<div className="dr-card">
  <p className="dr-section-title">Real-world example: Minimum vs. aggressive payment</p>
  <div className="dr-prose">
    <p><strong>Meet Sarah.</strong> She has a $15,000 personal loan at 18% APR with a minimum monthly payment of $300.</p>
  </div>
  
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
    <div style={{ background: "#fff8f8", padding: "1rem", borderRadius: "4px", border: "1px solid #fcd4d4" }}>
      <p style={{ fontSize: "12px", fontWeight: "500", color: "#b91c1c", marginBottom: ".5rem" }}>📉 Paying only the minimum</p>
      <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Monthly payment:</strong> $300</p>
      <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Payoff time:</strong> 9 years, 4 months</p>
      <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Total interest paid:</strong> $18,647</p>
      <p style={{ fontSize: "13px", color: "#b91c1c", fontWeight: "500", marginTop: ".5rem" }}>She pays back MORE than double what she borrowed.</p>
    </div>
    
    <div style={{ background: "#eaf5ee", padding: "1rem", borderRadius: "4px", border: "1px solid #b7d9c8" }}>
      <p style={{ fontSize: "12px", fontWeight: "500", color: "#0f6e56", marginBottom: ".5rem" }}>📈 Paying aggressively (+$200 extra)</p>
      <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Monthly payment:</strong> $500 ($300 + $200)</p>
      <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Payoff time:</strong> 3 years, 2 months</p>
      <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Total interest paid:</strong> $4,812</p>
      <p style={{ fontSize: "13px", color: "#0f6e56", fontWeight: "500", marginTop: ".5rem" }}>She saves $13,835 in interest and is debt-free 6 years earlier.</p>
    </div>
  </div>
  
  <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
    <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: "500", marginBottom: ".25rem" }}>The bottom line:</p>
    <p style={{ fontSize: "13px", color: "#444" }}>Paying an extra $200 per month turns a 9‑year nightmare into a 3‑year plan — and saves Sarah nearly <strong>$14,000</strong>. This is the power of aggressive debt reduction. Try your own numbers in the calculator above.</p>
  </div>
</div>
        {/* TYPES OF DEBT */}
        <div className="dr-card">
          <p className="dr-section-title">This calculator works for any type of debt</p>
          <div className="dr-prose">
            <p>While the mechanics are the same, payoff timelines vary dramatically by debt type due to differences in interest rates and typical balances:</p>
            <ul>
              <li><strong>Personal loans</strong> typically carry rates between 8–36% APR. Always know your actual rate — not an estimate.</li>
              <li><strong>Auto loans</strong> are usually lower rate (4–12%) but carry large balances. Small extra payments have a meaningful effect early in the loan.</li>
              <li><strong>Student loans</strong> vary widely. Federal loans have income-based repayment options; private loans respond well to extra payments.</li>
              <li><strong>Medical debt</strong> often carries 0% interest if on a payment plan — confirm the terms with your provider.</li>
              <li><strong>Credit cards</strong> typically have the highest rates (18–29% APR). Use the Credit Card Debt Payoff Calculator for multi-card scenarios.</li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="dr-card">
          <p className="dr-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="dr-faq-item" key={i}>
              <p className="dr-faq-q">{item.q}</p>
              <p className="dr-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="dr-card">
          <p className="dr-section-title">Related tools</p>
          <p className="dr-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="dr-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="dr-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="dr-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="dr-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

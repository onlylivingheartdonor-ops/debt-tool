"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
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
  .dr-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .dr-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #9fe1cb; line-height: 1; margin-bottom: .4rem; }
  .dr-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .dr-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .dr-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .dr-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .dr-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .dr-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .dr-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .dr-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .dr-field-row, .dr-result-grid, .dr-info-grid, .dr-tip-grid { grid-template-columns: 1fr; }
  }
`

function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US") }
function fmtDec(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

function simulate(balance, rate, payment) {
  if (!balance || !payment) return null
  const monthlyRate = rate / 100 / 12
  const minRequired = balance * monthlyRate
  if (payment <= minRequired && rate > 0) return { underpaying: true, minRequired }
  let remaining = balance, totalInterest = 0, months = 0
  const schedule = []
  while (remaining > 0 && months < 600) {
    const interest = remaining * monthlyRate
    totalInterest += interest
    remaining = remaining + interest - payment
    if (remaining < 0) remaining = 0
    months++
    if (months <= 24 || months % 12 === 0) {
      schedule.push({ month: months, remaining, interest, totalInterest })
    }
  }
  return { months, totalInterest, schedule, underpaying: false }
}

function simulateExtra(balance, rate, payment, extra) {
  if (!balance || !payment || !extra) return null
  const monthlyRate = rate / 100 / 12
  let remaining = balance, totalInterest = 0, months = 0
  while (remaining > 0 && months < 600) {
    const interest = remaining * monthlyRate
    totalInterest += interest
    remaining = remaining + interest - payment - extra
    if (remaining < 0) remaining = 0
    months++
  }
  return { months, totalInterest }
}

export default function Page() {
  const [balance,      setBalance]      = useState("")
  const [rate,         setRate]         = useState("")
  const [payment,      setPayment]      = useState("")
  const [extra,        setExtra]        = useState("")
  const [results,      setResults]      = useState(null)
  const [showSchedule, setShowSchedule] = useState(false)

  const calculate = () => {
    const b = parseFloat(balance), r = parseFloat(rate) || 0, p = parseFloat(payment)
    if (!b || !p) return
    setResults(simulate(b, r, p))
    setShowSchedule(false)
  }

  const extraResult   = results && !results.underpaying && extra
    ? simulateExtra(parseFloat(balance), parseFloat(rate) || 0, parseFloat(payment), parseFloat(extra))
    : null
  const totalPaid     = results && !results.underpaying ? parseFloat(balance) + results.totalInterest : 0
  const interestPct   = totalPaid > 0 ? Math.round(results.totalInterest / totalPaid * 100) : 0
  const principalPct  = 100 - interestPct
  const monthsSaved   = extraResult ? results.months - extraResult.months : 0
  const interestSaved = extraResult ? results.totalInterest - extraResult.totalInterest : 0

  return (
    <>
      <style>{css}</style>
      <main className="dr-wrap">

        <div className="dr-header">
          <p className="dr-eyebrow">Personal Finance</p>
          <h1 className="dr-title">Debt Reducing<br /><em>Calculator</em></h1>
        </div>

        {/* TOOL */}
        <div className="dr-card">
          <div className="dr-field-row">
            <div>
              <label className="dr-field-label" htmlFor="balance">Total debt balance</label>
              <div className="dr-input-wrap">
                <span className="dr-prefix">$</span>
                <input id="balance" className="dr-input" type="number" min="0" placeholder="0"
                  value={balance} onChange={e => setBalance(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
            <div>
              <label className="dr-field-label" htmlFor="rate">Annual interest rate</label>
              <div className="dr-input-wrap">
                <input id="rate" className="dr-input no-prefix" type="number" min="0" step="0.01" placeholder="0.00"
                  value={rate} onChange={e => setRate(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
                <span className="dr-suffix">%</span>
              </div>
            </div>
            <div>
              <label className="dr-field-label" htmlFor="payment">Monthly payment</label>
              <div className="dr-input-wrap">
                <span className="dr-prefix">$</span>
                <input id="payment" className="dr-input" type="number" min="0" placeholder="0"
                  value={payment} onChange={e => setPayment(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
              </div>
            </div>
          </div>

          <button className="dr-calc-btn" onClick={calculate}>Calculate payoff timeline →</button>

          {results && (
            <div className="dr-results">
              {results.underpaying ? (
                <div className="dr-warn">
                  Your monthly payment of {fmt(parseFloat(payment))} does not cover the monthly interest of <span>{fmtDec(results.minRequired)}</span>. The balance will grow indefinitely. You need at least <span>{fmtDec(results.minRequired + 1)}/month</span> to make progress.
                </div>
              ) : (
                <>
                  <div className="dr-result-grid">
                    <div className="dr-result-cell">
                      <p className="dr-result-label">Payoff time</p>
                      <p className="dr-result-val">
                        {results.months >= 600 ? "50+ yrs" : results.months < 12 ? results.months + " mo" : Math.floor(results.months / 12) + "y " + (results.months % 12) + "m"}
                      </p>
                    </div>
                    <div className="dr-result-cell">
                      <p className="dr-result-label">Total interest</p>
                      <p className="dr-result-val red">{fmtDec(results.totalInterest)}</p>
                    </div>
                    <div className="dr-result-cell">
                      <p className="dr-result-label">Total paid</p>
                      <p className="dr-result-val">{fmtDec(totalPaid)}</p>
                    </div>
                  </div>

                  <div className="dr-timeline">
                    <div className="dr-timeline-label">
                      <span>Principal vs interest</span>
                      <span>{principalPct}% principal · {interestPct}% interest</span>
                    </div>
                    <div className="dr-bar-track">
                      <div className="dr-bar-principal" style={{ width: principalPct + "%" }} />
                      <div className="dr-bar-interest" style={{ width: interestPct + "%" }} />
                    </div>
                    <div className="dr-bar-legend">
                      <span><span className="dr-legend-dot" style={{ background: "#1a1a1a" }} />Principal: {fmt(parseFloat(balance))}</span>
                      <span><span className="dr-legend-dot" style={{ background: "#b91c1c" }} />Interest: {fmtDec(results.totalInterest)}</span>
                    </div>
                  </div>

                  <div className="dr-extra-section">
                    <p className="dr-extra-title">What if I pay a little extra each month?</p>
                    <div className="dr-extra-row">
                      <span className="dr-extra-label">Extra monthly payment</span>
                      <span className="dr-extra-prefix">$</span>
                      <input className="dr-extra-input" type="number" min="0" placeholder="0"
                        value={extra} onChange={e => setExtra(e.target.value)} />
                    </div>
                    {extraResult && (
                      <p className="dr-extra-result">
                        Adding {fmt(parseFloat(extra))}/month saves you <strong style={{ fontWeight: 500 }}>{fmtDec(interestSaved)}</strong> in interest and cuts <strong style={{ fontWeight: 500 }}>{monthsSaved} months</strong> off your payoff timeline.
                      </p>
                    )}
                  </div>

                  <span className="dr-schedule-toggle" onClick={() => setShowSchedule(s => !s)}>
                    {showSchedule ? "Hide" : "Show"} amortization schedule
                  </span>
                  <div className={"dr-schedule" + (showSchedule ? " show" : "")}>
                    <table className="dr-schedule-table">
                      <thead>
                        <tr><th>Month</th><th>Interest</th><th>Total interest</th><th>Remaining</th></tr>
                      </thead>
                      <tbody>
                        {results.schedule.map((row, i) => (
                          <tr key={i}>
                            <td>{row.month}</td>
                            <td>{fmtDec(row.interest)}</td>
                            <td>{fmtDec(row.totalInterest)}</td>
                            <td>{row.remaining < 0.01 ? "—" : fmtDec(row.remaining)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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
              <p className="dr-info-body">Interest is calculated monthly on the remaining balance. This means unpaid interest from last month increases the base on which this month&apos;s interest is calculated — the core mechanic that makes debt grow so quickly.</p>
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
            <p>Most people carrying debt have a rough sense of their monthly payment but no clear picture of when they&apos;ll be debt-free or what the debt is actually costing them. This gap between the monthly number and the total cost is where lenders profit — and where borrowers lose more than they realize.</p>
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
              <p className="dr-tip-body">Adding $50 or $100 to your monthly payment consistently is one of the highest-return financial moves available. The interest you avoid paying compounds just like the interest you&apos;re charged — it works in both directions.</p>
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

        {/* TYPES OF DEBT */}
        <div className="dr-card">
          <p className="dr-section-title">This calculator works for any type of debt</p>
          <div className="dr-prose">
            <p>While the mechanics are the same, payoff timelines vary dramatically by debt type due to differences in interest rates and typical balances:</p>
            <ul>
              <li><strong style={{ fontWeight: 500 }}>Personal loans</strong> typically carry rates between 8–36% APR. Always know your actual rate — not an estimate.</li>
              <li><strong style={{ fontWeight: 500 }}>Auto loans</strong> are usually lower rate (4–12%) but carry large balances. Small extra payments have a meaningful effect early in the loan.</li>
              <li><strong style={{ fontWeight: 500 }}>Student loans</strong> vary widely. Federal loans have income-based repayment options; private loans respond well to extra payments.</li>
              <li><strong style={{ fontWeight: 500 }}>Medical debt</strong> often carries 0% interest if on a payment plan — confirm the terms with your provider.</li>
              <li><strong style={{ fontWeight: 500 }}>Credit cards</strong> typically have the highest rates (18–29% APR). Use the Credit Card Debt Payoff Calculator for multi-card scenarios.</li>
            </ul>
          </div>
        </div>

        {/* ========== MONEYWISE LINK — START ========== */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#b45309", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>
        {/* ========== MONEYWISE LINK — END ========== */}

        {/* RELATED */}
        <div className="dr-card">
          <p className="dr-section-title">Related tools</p>
          <div className="dr-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="dr-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="dr-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="dr-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

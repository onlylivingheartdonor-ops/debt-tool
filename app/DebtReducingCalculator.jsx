"use client"

import { useState } from "react"

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
      schedule.push({ month: months, remaining: Math.max(0, remaining), interest, totalInterest })
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

export default function DebtReducingCalculator() {
  const [balance, setBalance] = useState("")
  const [rate, setRate] = useState("")
  const [payment, setPayment] = useState("")
  const [extra, setExtra] = useState("")
  const [results, setResults] = useState(null)
  const [showSchedule, setShowSchedule] = useState(false)

  const calculate = () => {
    const b = parseFloat(balance), r = parseFloat(rate) || 0, p = parseFloat(payment)
    if (!b || !p) return
    setResults(simulate(b, r, p))
    setShowSchedule(false)
  }

  const extraResult = results && !results.underpaying && extra
    ? simulateExtra(parseFloat(balance), parseFloat(rate) || 0, parseFloat(payment), parseFloat(extra))
    : null
  const totalPaid = results && !results.underpaying ? parseFloat(balance) + results.totalInterest : 0
  const interestPct = totalPaid > 0 ? Math.round(results?.totalInterest / totalPaid * 100) : 0
  const principalPct = 100 - interestPct
  const monthsSaved = extraResult ? results.months - extraResult.months : 0
  const interestSaved = extraResult ? results.totalInterest - extraResult.totalInterest : 0

  return (
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
                    Adding {fmt(parseFloat(extra))}/month saves you <strong>{fmtDec(interestSaved)}</strong> in interest and cuts <strong>{monthsSaved} months</strong> off your payoff timeline.
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
  )
}
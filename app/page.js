"use client"

import { useState } from "react"

export default function Page() {
  const [balance, setBalance] = useState(0)
  const [rate, setRate] = useState(0)
  const [payment, setPayment] = useState(0)

  let months = 0
  let remaining = balance
  const monthlyRate = rate / 100 / 12

  while (remaining > 0 && payment > 0 && months < 600) {
    remaining = remaining + remaining * monthlyRate - payment
    months++
  }

  return (
    <main style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "system-ui, sans-serif",
      background: "#f4f6fb",
      minHeight: "100vh"
    }}>

      <div style={{
        borderBottom: "1px solid #e2e8f0",
        background: "#ffffff",
        padding: "0.8rem 1.5rem",
        fontWeight: 600
      }}>
        Debt Payoff Calculator
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h1>Debt Payoff Calculator</h1>
        <p>
          Estimate how long it will take to pay off debt based on your balance,
          interest rate, and monthly payment.
        </p>

        <div style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginTop: "1.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <span>$</span>
            <input
              type="number"
              placeholder="Total Debt"
              onChange={(e) => setBalance(Number(e.target.value))}
              style={{ padding: "10px", flex: 1, marginLeft: "8px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <span>%</span>
            <input
              type="number"
              placeholder="Interest Rate"
              onChange={(e) => setRate(Number(e.target.value))}
              style={{ padding: "10px", flex: 1, marginLeft: "8px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span>$</span>
            <input
              type="number"
              placeholder="Monthly Payment"
              onChange={(e) => setPayment(Number(e.target.value))}
              style={{ padding: "10px", flex: 1, marginLeft: "8px" }}
            />
          </div>

          <div style={{
            marginTop: "1rem",
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "8px"
          }}>
            {payment > 0
              ? `Estimated payoff time: ${months} months`
              : "Enter values above"}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: "2rem",
        background: "#ffffff",
        padding: "1.5rem",
        borderRadius: "10px"
      }}>
        <h2>Understanding Debt Payoff</h2>
        <p>
          Interest can cause debt to grow quickly if payments are too small.
          Knowing your payoff timeline helps you plan and reduce unnecessary costs.
        </p>

        <h2 style={{ marginTop: "1rem" }}>Ways to Reduce Debt Faster</h2>
        <ul>
          <li>Increase monthly payments when possible</li>
          <li>Focus on high‑interest balances first</li>
          <li>Avoid taking on new debt</li>
          <li>Consider refinancing for lower rates</li>
        </ul>
      </div>

      <div style={{
        marginTop: "2rem",
        background: "#ffffff",
        padding: "1.5rem",
        borderRadius: "10px"
      }}>
        <div
  style={{
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "10px",
    marginBottom: "1.5rem"
  }}
>
  <h2>Related Tools</h2>
  <ul>
    <li onClick={() => window.location.href = "https://creditcarddebtpayoffcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Credit Card Debt Payoff Calculator
    </li>
    <li onClick={() => window.location.href = "https://debtreducingcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Debt Reducing Calculator
    </li>
    <li onClick={() => window.location.href = "https://sidehustletaxestimator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Side Hustle Tax Estimator
    </li>
    <li onClick={() => window.location.href = "https://highyieldsavingscalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      High Yield Savings Calculator
    </li>
    <li onClick={() => window.location.href = "https://retirementsavingsgap.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Retirement Savings Gap
    </li>
    <li onClick={() => window.location.href = "https://lifeinsurancecoveragecalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Life Insurance Coverage Calculator
    </li>
    <li onClick={() => window.location.href = "https://onlinecourseroi.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Online Course ROI Calculator
    </li>
    <li onClick={() => window.location.href = "https://mysubscriptioncost.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Subscription Cost Calculator
    </li>
    <li onClick={() => window.location.href = "https://emailattachmentsize.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Email Attachment Size Checker
    </li>
    <li onClick={() => window.location.href = "https://gpacalculator.site"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      GPA Calculator
    </li>
    <li onClick={() => window.location.href = "https://youtubetitlechecker.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      YouTube Title Checker
    </li>
    <li onClick={() => window.location.href = "https://strongpasswordbuilder.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Strong Password Builder
    </li>
    <li onClick={() => window.location.href = "https://coolusernamegenerator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Cool Username Generator
    </li>
  </ul>
</div>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "13px", color: "#666" }}>
        This tool provides estimates for informational purposes only.
      </div>

      <div style={{ marginTop: "1.5rem", fontSize: "13px", color: "#555" }}>
        This site may use cookies and analytics. By using this site,
        you agree to our Privacy Policy and Terms of Service.
      </div>

      <div style={{
        marginTop: "1rem",
        paddingTop: "1rem",
        borderTop: "1px solid #e2e8f0",
        fontSize: "14px"
      }}>
        <span onClick={() => window.location.href = "/privacy"} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Privacy Policy
        </span>
        {" | "}
        <span onClick={() => window.location.href = "/terms"} style={{ cursor: "pointer", textDecoration: "underline" }}>
          Terms of Service
        </span>
      </div>

    </main>
  )
}

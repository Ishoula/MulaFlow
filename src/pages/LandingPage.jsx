import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero.png";
import { CURRENCY } from "@/constants/currency";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <button
          className="landing-brand"
          type="button"
          onClick={() => navigate("/")}
        >
          <span>M</span>
          MulaFlow
        </button>

        <nav>
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button type="button" onClick={() => navigate("/register")}>
            Get started
          </button>
        </nav>
      </header>

      <main>
        <section className="landing-hero">
          <img src={heroImage} alt="" aria-hidden="true" />

          <div className="landing-hero-content">
            <p className="landing-kicker">Expense tracking for Rwandan francs</p>
            <h1>MulaFlow</h1>
            <p>
              Track daily spending, review totals in {CURRENCY}, and keep a
              clear view of where your money is going.
            </p>

            <div className="landing-actions">
              <button type="button" onClick={() => navigate("/register")}>
                Start tracking
              </button>
              <button type="button" onClick={() => navigate("/login")}>
                Open dashboard
              </button>
            </div>
          </div>
        </section>

        <section className="landing-preview" aria-label="MulaFlow dashboard preview">
          <div className="preview-panel">
            <div className="preview-header">
              <span>Today</span>
              <strong>{CURRENCY} 84,500</strong>
            </div>

            <div className="preview-grid">
              <div>
                <span>Total</span>
                <strong>{CURRENCY} 284,000</strong>
              </div>
              <div>
                <span>Highest</span>
                <strong>{CURRENCY} 52,000</strong>
              </div>
              <div>
                <span>Monthly</span>
                <strong>{CURRENCY} 1,125,000</strong>
              </div>
            </div>

            <div className="preview-list">
              <div>
                <span>Groceries</span>
                <strong>{CURRENCY} 18,500</strong>
              </div>
              <div>
                <span>Transport</span>
                <strong>{CURRENCY} 4,000</strong>
              </div>
              <div>
                <span>Internet</span>
                <strong>{CURRENCY} 30,000</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

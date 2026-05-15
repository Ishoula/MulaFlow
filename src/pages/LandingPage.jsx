import { Link } from "react-router-dom";

const heroPhoto =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=85";

const categories = [
  { title: "Daily Expenses", count: "16 Items", icon: "💳", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=420&q=80" },
  { title: "Income Logs",    count: "8 Items",  icon: "📈", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=420&q=80" },
  { title: "Food & Dining",  count: "16 Items", icon: "🍽️", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=420&q=80" },
  { title: "Bills & Utils",  count: "24 Items", icon: "🏠", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=420&q=80" },
  { title: "Travel Costs",   count: "9 Items",  icon: "✈️", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=420&q=80" },
];

const trustItems = [
  { icon: "⬡", title: "No hidden totals",       body: "Clear records, categories, and running totals — nothing obscured." },
  { icon: "◈", title: "No card needed",          body: "Start tracking without subscriptions or payment prompts." },
  { icon: "⊞", title: "Fast logging process",    body: "Add expenses instantly, then edit or remove them anytime." },
  { icon: "◻", title: "Premium experience",      body: "A focused dashboard keeps daily money movement easy to scan." },
];

const popularTrackers = [
  { title: "Daily Spending",   detail: "Cards  •  Cash  •  Transfers", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=85" },
  { title: "Household Bills",  detail: "Rent  •  Utilities  •  Internet", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=85" },
  { title: "Income Tracking",  detail: "Salary  •  Clients  •  Side work", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=700&q=85" },
  { title: "Travel Costs",     detail: "Fuel  •  Rides  •  Tickets", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=85" },
  { title: "Food Budget",      detail: "Groceries  •  Dining  •  Coffee", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=85" },
  { title: "Savings Goals",    detail: "Plans  •  Progress  •  Reviews", image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=700&q=85" },
];

const mapPhoto = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", color: "var(--ink)", fontFamily: "Inter, sans-serif" }}>

      {/* ── NAV ─────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(243,239,232,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 20px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
            <span style={{
              width: 34, height: 34, borderRadius: "50%", background: "var(--ink)",
              color: "white", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 15,
            }}>M</span>
            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>MulaFlow</span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["#overview","Overview"],["#categories","Categories"],["#contact","Contact"]].map(([href, label]) => (
              <a key={href} href={href} style={{
                fontSize: 13, fontWeight: 600, color: "var(--ink)", textDecoration: "none",
                opacity: 0.7, transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.7}>{label}</a>
            ))}
          </nav>

          <Link to="/dashboard" style={{
            background: "var(--ink)", color: "white", padding: "9px 20px",
            borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
            display: "inline-block",
          }}
          onMouseEnter={e => { e.target.style.background = "#333"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.background = "var(--ink)"; e.target.style.transform = "translateY(0)"; }}>
            Open Dashboard →
          </Link>
        </div>
      </header>

      <main>
        {/* ── HERO ────────────────────────────── */}
        <section id="overview" style={{ padding: "28px 20px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              minHeight: "38rem", background: "#000",
              boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
            }}>
              <img src={heroPhoto} alt="Financial desk" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }} />

              {/* Badge */}
              <div style={{
                position: "absolute", top: 32, left: 32,
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)", borderRadius: 100,
                padding: "6px 16px", color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Live expense tracking
              </div>

              <div style={{
                position: "relative", zIndex: 10, maxWidth: 700, margin: "0 auto",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: "120px 24px 100px", textAlign: "center",
              }}>
                <h1 className="anim-fade-up" style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1,
                  color: "white", margin: 0, letterSpacing: "-0.03em",
                }}>
                  The simplest way to track your money flow
                </h1>
                <p className="anim-fade-up delay-2" style={{ marginTop: 20, fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480 }}>
                  Capture spending, review habits, and keep your numbers easy to understand — all in one focused dashboard.
                </p>
                <div className="anim-fade-up delay-3" style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                  <Link to="/dashboard" style={{
                    background: "white", color: "var(--ink)", padding: "13px 30px",
                    borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    transition: "background 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#E5D3B7"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Explore Dashboard
                  </Link>
                  <a href="#overview" style={{
                    border: "1.5px solid rgba(255,255,255,0.35)", color: "white",
                    padding: "13px 28px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                    textDecoration: "none", transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.borderColor = "rgba(255,255,255,0.7)"}
                  onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}>
                    Learn more
                  </a>
                </div>
              </div>

              {/* Stats bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex", justifyContent: "center", gap: 60, padding: "18px 24px",
                flexWrap: "wrap",
              }}>
                {[["KES 0", "Total Tracked"], ["0", "Expenses"], ["5", "Categories"]].map(([val, label]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "white" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2, fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST SECTION ───────────────────── */}
        <section style={{ padding: "100px 20px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 60, gridTemplateColumns: "1fr 1.2fr", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--brown)", textTransform: "uppercase", marginBottom: 16 }}>
                Why MulaFlow
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Built for clarity,<br />not complexity
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-muted)", maxWidth: 380 }}>
                Simple tools for clearer spending records, faster reviews, and calmer money decisions every day.
              </p>
              <Link to="/dashboard" style={{
                display: "inline-block", marginTop: 28, padding: "11px 24px",
                background: "var(--ink)", color: "white", borderRadius: 8,
                fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}>
                Start Free
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {trustItems.map((item, i) => (
                <article key={item.title} className={`anim-fade-up delay-${i + 1}`} style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 14, padding: "28px 22px",
                  transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "rgba(10,10,10,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "var(--border)"; }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: "var(--ink)",
                    color: "white", display: "grid", placeItems: "center", fontSize: 16, marginBottom: 16,
                  }}>{item.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 8px" }}>{item.title}</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ──────────────────────── */}
        <section id="categories" style={{ padding: "0 20px 100px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ marginBottom: 36, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--brown)", textTransform: "uppercase", marginBottom: 12 }}>Categories</div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>Top-rated trackers</h2>
                <p style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 8 }}>Quick categories for the money records you use most.</p>
              </div>
              <Link to="/dashboard" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", textDecoration: "none", borderBottom: "2px solid var(--ink)", paddingBottom: 2 }}>View all →</Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              {categories.map((cat, i) => (
                <Link to="/dashboard" key={cat.title} className={`anim-scale-in delay-${i + 1}`} style={{
                  display: "block", background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 14, padding: 16, textAlign: "center", textDecoration: "none", color: "inherit",
                  transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.borderColor = "rgba(10,10,10,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "var(--border)"; }}>
                  <div style={{ height: 100, borderRadius: 10, overflow: "hidden", marginBottom: 14, background: "#E9E0D2" }}>
                    <img src={cat.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }} />
                  </div>
                  <div style={{ fontSize: 16, marginBottom: 8 }}>{cat.icon}</div>
                  <h3 style={{ fontSize: 13, fontWeight: 800, margin: "0 0 10px" }}>{cat.title}</h3>
                  <span style={{
                    display: "inline-block", background: "var(--ink)", color: "white",
                    padding: "4px 14px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                  }}>{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR TRACKERS ────────────────── */}
        <section style={{ padding: "0 20px 100px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ marginBottom: 36, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--brown)", textTransform: "uppercase", marginBottom: 12 }}>Explore</div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>Popular money models</h2>
              </div>
              <Link to="/dashboard" style={{
                background: "var(--ink)", color: "white", padding: "10px 22px",
                borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}>Explore All Records</Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {popularTrackers.map((tracker, i) => (
                <Link to="/dashboard" key={tracker.title} className={`anim-fade-in delay-${i % 3 + 1}`} style={{
                  display: "block", position: "relative", minHeight: "20rem",
                  borderRadius: 16, overflow: "hidden", background: "#000",
                  boxShadow: "var(--shadow-md)", textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.07)"; }}
                onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}>
                  <img src={tracker.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24, color: "white" }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{tracker.title}</h3>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0, fontWeight: 500 }}>{tracker.detail}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT + FOOTER ────────────────── */}
        <section id="contact" style={{ padding: "0 20px 40px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{
              borderRadius: 24, overflow: "hidden",
              background: "var(--cream-mid)",
              boxShadow: "var(--shadow-lg)",
            }}>
              <div style={{ position: "relative", minHeight: "34rem", padding: "72px 60px" }}>
                <img src={mapPhoto} alt="" style={{
                  position: "absolute", right: 0, top: "10%", height: "80%", width: "60%",
                  objectFit: "cover", opacity: 0.18, filter: "grayscale(1)",
                }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--cream-mid) 45%, transparent 100%)" }} />

                <div style={{ position: "relative", zIndex: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--brown)", textTransform: "uppercase", marginBottom: 14 }}>Contact</div>
                  <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    Schedule your<br />money check-in
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 36 }}>Reach us to plan your setup or start tracking instantly.</p>

                  <div style={{ display: "grid", maxWidth: 420, gap: 12 }}>
                    {[
                      { title: "Headquarter office", sub: "41 Finance Street, Cape Town, SA", icon: "⌖" },
                      { title: "+27 (11) 555-0132", sub: "Call us", icon: "☎", href: "tel:+27115550132" },
                      { title: "support@mulaflow.com", sub: "Send your email", icon: "✉", href: "mailto:support@mulaflow.com" },
                    ].map(({ title, sub, icon, href }) => {
                      const Tag = href ? "a" : "article";
                      return (
                        <Tag key={title} href={href} style={{
                          display: "block", background: "rgba(248,245,239,0.85)", backdropFilter: "blur(8px)",
                          border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px",
                          textDecoration: "none", color: "inherit",
                          transition: "background 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={href ? e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "translateX(4px)"; } : undefined}
                        onMouseLeave={href ? e => { e.currentTarget.style.background = "rgba(248,245,239,0.85)"; e.currentTarget.style.transform = ""; } : undefined}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: 14 }}>{title}</div>
                              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 3 }}>{sub}</div>
                            </div>
                            <span style={{ fontSize: 18, opacity: 0.5 }}>{icon}</span>
                          </div>
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              </div>

              <footer style={{
                borderTop: "1px solid var(--border)",
                padding: "24px 60px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 16,
              }}>
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ink)", color: "white", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 13 }}>M</span>
                  <span style={{ fontWeight: 800, fontSize: 16 }}>MulaFlow</span>
                </Link>
                <p style={{ fontSize: 12, color: "var(--ink-muted)", margin: 0 }}>41 Finance Street, Cape Town, South Africa</p>
                <p style={{ fontSize: 12, color: "var(--ink-muted)", margin: 0 }}>© 2026 All rights reserved</p>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

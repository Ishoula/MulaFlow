import { Link } from "react-router-dom";

const heroPhoto =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=85";

const categories = [
  {
    title: "Daily Expenses",
    count: "16 Items",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=420&q=80"
  },
  {
    title: "Income Logs",
    count: "8 Items",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=420&q=80"
  },
  {
    title: "Food & Dining",
    count: "16 Items",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=420&q=80"
  },
  {
    title: "Bills & Utilities",
    count: "24 Items",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=420&q=80"
  },
  {
    title: "Travel Costs",
    count: "9 Items",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=420&q=80"
  }
];

const trustItems = [
  {
    icon: "▣",
    title: "No hidden totals",
    body: "Know what you spent with clear records, categories, and simple running totals."
  },
  {
    icon: "◇",
    title: "No credit card needed",
    body: "Start tracking without subscriptions, payment prompts, or extra setup steps."
  },
  {
    icon: "▤",
    title: "Fast logging process",
    body: "Add expenses quickly, then edit or remove records when plans change."
  },
  {
    icon: "□",
    title: "Premium experience",
    body: "A focused dashboard keeps daily money movement easy to scan and trust."
  }
];

const popularTrackers = [
  {
    title: "Daily Spending",
    detail: "Cards  •  Cash  •  Transfers",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=85"
  },
  {
    title: "Household Bills",
    detail: "Rent  •  Utilities  •  Internet",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=85"
  },
  {
    title: "Income Tracking",
    detail: "Salary  •  Clients  •  Side work",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=700&q=85"
  },
  {
    title: "Travel Costs",
    detail: "Fuel  •  Rides  •  Tickets",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=85"
  },
  {
    title: "Food Budget",
    detail: "Groceries  •  Dining  •  Coffee",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=85"
  },
  {
    title: "Savings Goals",
    detail: "Plans  •  Progress  •  Reviews",
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=700&q=85"
  }
];

const mapPhoto =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE8] text-black">
      <header className="px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-sm text-white">
              M
            </span>
            <span>MulaFlow</span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold md:flex">
            <a href="#overview" className="transition hover:text-[#8B593E]">
              Overview
            </a>
            <a href="#categories" className="transition hover:text-[#8B593E]">
              Categories
            </a>
            <Link to="/dashboard" className="transition hover:text-[#8B593E]">
              Dashboard
            </Link>
            <a href="#contact" className="transition hover:text-[#8B593E]">
              Contact Us
            </a>
            <Link to="/dashboard" className="transition hover:text-[#8B593E]">
              Start tracking
            </Link>
          </nav>

          <div className="flex items-center gap-4 text-sm font-bold">
            <button
              type="button"
              aria-label="Search"
              className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black hover:text-white"
            >
              ⌕
            </button>
            <button
              type="button"
              aria-label="Menu"
              className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black hover:text-white"
            >
              =
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="px-5">
          <div className="mx-auto max-w-7xl">
            <div className="relative grid min-h-[36rem] overflow-hidden rounded-lg bg-black shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <img
                src={heroPhoto}
                alt="Desk with financial documents and a laptop"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />

              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center text-white">
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  The simplest expense tracking & money flow dashboard
                </h1>
                <p className="mt-5 text-sm text-white/75">
                  Capture your spending, review your habits, and keep your numbers easy to understand.
                </p>
                <Link
                  to="/dashboard"
                  className="mt-8 rounded-lg bg-white px-7 py-3 text-sm font-extrabold text-black transition hover:bg-[#E5D3B7]"
                >
                  Explore Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 pt-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">
                Why you can trust us
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-black/55">
                Simple tools for clearer spending records, faster reviews, and calmer money decisions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-black/10 bg-[#F8F5EF] p-6 text-center transition hover:border-black/20 hover:bg-white"
                >
                  <div className="mx-auto mb-5 grid h-9 w-9 place-items-center rounded-full bg-black text-sm font-bold text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-extrabold">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[14rem] text-xs leading-5 text-black/50">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="px-5 pb-20 pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Selected top-rated trackers
              </h2>
              <p className="mt-2 text-sm text-black/55">
                Quick categories for the money records you use most.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => (
                <Link
                  to="/dashboard"
                  key={category.title}
                  className="group rounded-lg border border-black/10 bg-[#F8F5EF] p-4 text-center transition hover:-translate-y-1 hover:border-black/25 hover:bg-white hover:shadow-[0_18px_35px_rgba(0,0,0,0.1)]"
                >
                  <div className="mb-5 flex h-24 items-center justify-center overflow-hidden rounded-md bg-[#E9E0D2]">
                    <img
                      src={category.image}
                      alt=""
                      className="h-full w-full object-cover mix-blend-multiply transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-extrabold">
                    {category.title}
                  </h3>
                  <span className="mt-4 inline-flex rounded-full bg-black px-4 py-2 text-[11px] font-bold text-white">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight">
                  Explore popular money models
                </h2>
                <p className="mt-2 text-sm text-black/55">
                  Common views and categories to help you understand where your money goes.
                </p>
              </div>

              <Link
                to="/dashboard"
                className="inline-flex justify-center rounded-lg bg-black px-6 py-3 text-xs font-extrabold text-white transition hover:bg-[#8B593E]"
              >
                Explore All Records
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularTrackers.map((tracker) => (
                <Link
                  to="/dashboard"
                  key={tracker.title}
                  className="group relative min-h-[20rem] overflow-hidden rounded-lg bg-black shadow-[0_16px_38px_rgba(0,0,0,0.14)]"
                >
                  <img
                    src={tracker.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-extrabold">
                      {tracker.title}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-white/70">
                      {tracker.detail}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#E7E1D8] shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
            <div className="relative min-h-[34rem] px-6 py-14 sm:px-10 lg:px-12">
              <img
                src={mapPhoto}
                alt=""
                className="absolute inset-y-20 right-0 h-[22rem] w-full object-cover opacity-25 grayscale lg:w-[68%]"
              />
              <div className="absolute inset-0 bg-[#E7E1D8]/50" />

              <div className="relative z-10">
                <div className="mb-12">
                  <h2 className="text-4xl font-extrabold tracking-tight">
                    Schedule your money check-in
                  </h2>
                  <p className="mt-2 text-sm text-black/55">
                    Reach us to plan your setup or start tracking instantly.
                  </p>
                </div>

                <div className="grid max-w-md gap-3">
                  <article className="rounded-lg border border-black/10 bg-[#F8F5EF]/80 p-6 backdrop-blur">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-sm font-extrabold">
                        Headquarter office
                      </h3>
                      <span className="text-sm">⌖</span>
                    </div>
                    <p className="text-sm leading-6 text-black/70">
                      41 Finance Street
                      <br />
                      Cape Town, Western Cape
                      <br />
                      South Africa
                    </p>
                  </article>

                  <a
                    href="tel:+27115550132"
                    className="rounded-lg border border-black/10 bg-[#F8F5EF]/80 p-6 backdrop-blur transition hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-extrabold">
                          +27 (11) 555-0132
                        </h3>
                        <p className="mt-1 text-sm text-black/55">Call us</p>
                      </div>
                      <span className="text-sm">☎</span>
                    </div>
                  </a>

                  <a
                    href="mailto:support@mulaflow.com"
                    className="rounded-lg border border-black/10 bg-[#F8F5EF]/80 p-6 backdrop-blur transition hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-extrabold">
                          support@mulaflow.com
                        </h3>
                        <p className="mt-1 text-sm text-black/55">Send your email</p>
                      </div>
                      <span className="text-sm">✉</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <footer className="border-t border-black/10 px-6 py-6 sm:px-10 lg:px-12">
              <div className="flex flex-col gap-5 text-xs text-black/55 md:flex-row md:items-center md:justify-between">
                <Link to="/" className="flex items-center gap-2 text-base font-extrabold text-black">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-sm text-white">
                    M
                  </span>
                  <span>MulaFlow</span>
                </Link>

                <p>41 Finance Street, Cape Town, South Africa</p>

                <div className="flex items-center gap-4 text-black">
                  <a href="#overview" aria-label="Overview" className="transition hover:text-[#8B593E]">
                    ●
                  </a>
                  <a href="#categories" aria-label="Categories" className="transition hover:text-[#8B593E]">
                    ×
                  </a>
                  <Link to="/dashboard" aria-label="Dashboard" className="transition hover:text-[#8B593E]">
                    in
                  </Link>
                  <a href="mailto:support@mulaflow.com" aria-label="Email" className="transition hover:text-[#8B593E]">
                    @
                  </a>
                </div>

                <p>© 2026 All rights reserved</p>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

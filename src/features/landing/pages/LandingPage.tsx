import { ArrowRight, Check, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import "../../../styles/landing.css";

const recipes = [
  {
    title: "Roasted squash & herby grains",
    time: "30 min",
    protein: "18g protein",
    label: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Crisp greens, avocado & egg",
    time: "15 min",
    protein: "24g protein",
    label: "Quick lunch",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Salmon with market vegetables",
    time: "25 min",
    protein: "36g protein",
    label: "Weeknight",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
  },
];

function BrandMark() {
  return (
    <span className="brand" aria-label="Plateful home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      Plateful
    </span>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a href="#top" className="brand-link">
            <BrandMark />
          </a>
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#inside">What&apos;s inside</a>
            <a href="#recipes">Recipes</a>
          </div>
          <div className="nav-actions">
            <Link to="/login" className="text-link">
              Log in
            </Link>
            <Link to="/signup" className="button button-small">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={15} /> Nutrition that fits real life
            </p>
            <h1>
              Eat with clarity.
              <br />
              <em>Feel like yourself.</em>
            </h1>
            <p className="hero-lede">
              Your daily nutrition needs, meals, and recipes in one calm place.
              Plateful turns your goals into guidance you can actually use.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="button button-primary">
                Build my plan <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="button button-ghost">
                See how it works
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>AR</span>
                <span>MK</span>
                <span>JL</span>
              </div>
              <p>
                <strong>A smarter daily rhythm</strong>
                <br />
                No rigid rules. No food guilt.
              </p>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Preview of the Plateful nutrition dashboard"
          >
            <div className="hero-photo-wrap">
              <img
                className="hero-photo"
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=88"
                alt="A colorful, balanced meal served at a table"
              />
              <span className="photo-note">Lunch, sorted.</span>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-head">
                <div>
                  <span>Today</span>
                  <strong>Right on track</strong>
                </div>
                <span aria-hidden="true">•••</span>
              </div>
              <div className="progress-row">
                <div className="progress-ring">
                  <div>
                    <strong>68%</strong>
                    <span>daily goal</span>
                  </div>
                </div>
                <div className="macro-list">
                  <div>
                    <span className="dot dot-coral" />
                    Protein <strong>82 / 110g</strong>
                  </div>
                  <div>
                    <span className="dot dot-green" />
                    Carbs <strong>156 / 230g</strong>
                  </div>
                  <div>
                    <span className="dot dot-gold" />
                    Fats <strong>48 / 70g</strong>
                  </div>
                </div>
              </div>
              <div className="next-meal">
                <span>Up next · 12:30</span>
                <strong>Herby grain bowl</strong>
                <ChevronRight size={18} />
              </div>
            </div>
            <div className="insight-pill">
              <Check size={16} /> Protein goal in range
            </div>
          </div>
        </section>

        <section className="promise-strip" aria-label="Product benefits">
          <div className="section-shell promise-inner">
            <span>Personal targets</span>
            <i />
            <span>Simple meal tracking</span>
            <i />
            <span>Recipes worth cooking</span>
            <i />
            <span>Progress you can see</span>
          </div>
        </section>

        <section className="how section-shell" id="how-it-works">
          <div className="section-heading">
            <div>
              <p className="kicker">A plan that starts with you</p>
              <h2>
                Less guessing.
                <br />
                <em>More living.</em>
              </h2>
            </div>
            <p>
              Create your account, personalize your profile when you&apos;re
              ready, then use the dashboard to plan and save meals.
            </p>
          </div>
          <div className="steps-grid">
            <article>
              <div className="step-top">
                <span className="step-number">1</span>
                <span className="step-label">Join</span>
              </div>
              <div className="mini-graphic profile-graphic">
                <span className="profile-dot" />
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <h3>Create your account</h3>
              <p>
                Sign up or log in. We&apos;ll check whether your nutrition
                profile is ready.
              </p>
            </article>
            <article>
              <div className="step-top">
                <span className="step-number">2</span>
                <span className="step-label">Personalize</span>
              </div>
              <div className="mini-graphic targets-graphic">
                <span style={{ "--size": "86%" } as React.CSSProperties}>
                  P
                </span>
                <span style={{ "--size": "62%" } as React.CSSProperties}>
                  C
                </span>
                <span style={{ "--size": "74%" } as React.CSSProperties}>
                  F
                </span>
              </div>
              <h3>Complete your profile</h3>
              <p>
                Add your body details, activity level, and goal so your daily
                targets reflect you. We&apos;ll remind you if you skip it.
              </p>
            </article>
            <article>
              <div className="step-top">
                <span className="step-number">3</span>
                <span className="step-label">Review</span>
              </div>
              <div className="mini-graphic day-graphic">
                <div>
                  <span>8:00</span>
                  <i />
                </div>
                <div>
                  <span>12:30</span>
                  <i />
                </div>
                <div>
                  <span>19:00</span>
                  <i />
                </div>
              </div>
              <h3>See your daily dashboard</h3>
              <p>
                Review your calories, nutrients, and meals against the targets
                created from your profile.
              </p>
            </article>
            <article>
              <div className="step-top">
                <span className="step-number">4</span>
                <span className="step-label">Plan</span>
              </div>
              <div className="mini-graphic plan-graphic">
                <span />
                <span />
                <i>+</i>
              </div>
              <h3>Build and save a meal plan</h3>
              <p>
                Search recipes, add the meals you want, and save the finished
                plan to your day.
              </p>
            </article>
          </div>
        </section>

        <section className="inside" id="inside">
          <div className="section-shell inside-shell">
            <div className="inside-copy">
              <p className="kicker kicker-light">Everything in one view</p>
              <h2>Your day, without the spreadsheet.</h2>
              <p>
                See what you need, what you&apos;ve eaten, and what could work
                next—without turning every meal into math.
              </p>
              <ul>
                <li>
                  <Check size={17} /> Daily calories and nutrient targets
                </li>
                <li>
                  <Check size={17} /> Meal planning and food logging
                </li>
                <li>
                  <Check size={17} /> Clear weekly progress
                </li>
              </ul>
              <Link to="/signup" className="inline-link">
                Start your free account <ArrowRight size={17} />
              </Link>
            </div>
            <div className="week-card">
              <div className="week-top">
                <div>
                  <span>This week</span>
                  <strong>Nicely balanced</strong>
                </div>
                <span className="trend">↗ 8%</span>
              </div>
              <div
                className="chart"
                aria-label="Weekly nutrition progress chart"
              >
                {[62, 76, 54, 88, 72, 94, 68].map((height, index) => (
                  <div className="chart-day" key={index}>
                    <div className="bar-track">
                      <span style={{ height: `${height}%` }} />
                    </div>
                    <small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
                  </div>
                ))}
              </div>
              <div className="week-summary">
                <div>
                  <span>Average</span>
                  <strong>1,940 kcal</strong>
                </div>
                <div>
                  <span>On-target days</span>
                  <strong>5 of 7</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="recipes section-shell" id="recipes">
          <div className="recipes-head">
            <div>
              <p className="kicker">Good food, ready when you are</p>
              <h2>Recipes that make the numbers work.</h2>
            </div>
            <p>
              Browse practical meals with the nutrition details already worked
              out.
            </p>
          </div>
          <div className="recipe-grid">
            {recipes.map((recipe, index) => (
              <article className="recipe-card" key={recipe.title}>
                <div className="recipe-image-wrap">
                  <img src={recipe.image} alt={recipe.title} loading="lazy" />
                  {index === 0 && (
                    <span className="recipe-tag">A good match today</span>
                  )}
                  <span className="recipe-type">{recipe.label}</span>
                </div>
                <div className="recipe-copy">
                  <div className="recipe-details">
                    <div className="recipe-meta">
                      <span>{recipe.time}</span>
                      <i />
                      <span>{recipe.protein}</span>
                    </div>
                    <h3>{recipe.title}</h3>
                    <p>
                      Fresh ingredients, clear nutrition, and simple steps from
                      prep to plate.
                    </p>
                  </div>
                  <Link
                    className="recipe-card-action"
                    to="/signup"
                    aria-label={`Explore ${recipe.title}`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="closing section-shell">
          <div className="closing-card">
            <div>
              <p className="kicker">Your next meal can feel easier</p>
              <h2>Start with what your body needs today.</h2>
            </div>
            <div>
              <Link to="/signup" className="button button-light">
                Create my plan <ArrowRight size={18} />
              </Link>
              <p>Free to get started. Set up in a few minutes.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="section-shell footer-inner">
          <BrandMark />
          <p>Everyday nutrition, made human.</p>
          <div>
            <a href="#how-it-works">How it works</a>
            <a href="#recipes">Recipes</a>
            <Link to="/login">Log in</Link>
          </div>
          <span>© {new Date().getFullYear()} Plateful</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

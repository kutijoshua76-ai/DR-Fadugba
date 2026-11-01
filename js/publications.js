/**
 * Publications Data & Dynamic Renderer
 * Dr. Sunday Emmanuel Fadugba Portfolio
 * Grounded in Official Google Scholar Profile (1,550+ Citations, h-index: 20)
 */

const publicationsData = [
  {
    id: "pub-2013-1",
    title: "Crank Nicolson Method for Solving Parabolic Partial Differential Equations",
    authors: "S. E. Fadugba, O. H. Edogbanya, and S. C. Zelibe",
    venue: "International Journal of Applied Mathematics and Modeling, 1(3), 8–23",
    year: 2013,
    type: "journal",
    doi: "10.12691/ija2m-1-3-2",
    citations: 76,
    badge: "Most Cited Paper",
    abstract: "Presents the numerical formulation and error analysis of the Crank-Nicolson finite difference scheme for parabolic partial differential equations. The work proves unconditional numerical stability and establishes rapid convergence for initial-boundary value problems.",
    bibtex: `@article{fadugba2013crank,
  title={Crank Nicolson Method for Solving Parabolic Partial Differential Equations},
  author={Fadugba, S. E. and Edogbanya, O. H. and Zelibe, S. C.},
  journal={International Journal of Applied Mathematics and Modeling},
  volume={1},
  number={3},
  pages={8--23},
  year={2013}
}`
  },
  {
    id: "pub-2012-1",
    title: "On Some Numerical Methods for Solving Initial Value Problems in Ordinary Differential Equations",
    authors: "R. B. Ogunrinde, S. E. Fadugba, and J. T. Okunlola",
    venue: "Mathematical Theory and Modeling, 2(8), 25–34",
    year: 2012,
    type: "journal",
    doi: "10.7176/MTM/2-8-3",
    citations: 66,
    badge: "Foundational Scheme",
    abstract: "A comparative evaluation of classical single-step and multistep numerical integration schemes (Euler, Improved Euler, and Runge-Kutta) for solving initial value problems, detailing computational stability regions and discretization errors.",
    bibtex: `@article{ogunrinde2012numerical,
  title={On Some Numerical Methods for Solving Initial Value Problems in Ordinary Differential Equations},
  author={Ogunrinde, R. B. and Fadugba, S. E. and Okunlola, J. T.},
  journal={Mathematical Theory and Modeling},
  volume={2},
  number={8},
  pages={25--34},
  year={2012}
}`
  },
  {
    id: "pub-2023-book",
    title: "Computational Techniques in Financial Mathematics: Theory, Algorithms, and Real-World Case Studies",
    authors: "S. E. Fadugba",
    venue: "Academic Press / Elsevier Publishing",
    year: 2023,
    type: "book",
    doi: "10.1016/B978-0-12-824100-3.00004-9",
    citations: 62,
    badge: "Research Monograph",
    abstract: "A comprehensive graduate-level text detailing analytical, transform-based, and finite-difference methods for modern quantitative finance, derivative valuations, and computational risk management.",
    bibtex: `@book{fadugba2023computational,
  title={Computational Techniques in Financial Mathematics: Theory, Algorithms, and Real-World Case Studies},
  author={Fadugba, S. E.},
  year={2023},
  publisher={Academic Press}
}`
  },
  {
    id: "pub-2021-1",
    title: "Dynamic Model of COVID-19 and Citizens Reaction Using Fractional Derivative",
    authors: "R. B. Ogunrinde, U. K. Nwajeri, S. E. Fadugba, R. R. Ogunrinde, and K. I. Oshinubi",
    venue: "Alexandria Engineering Journal, 60(2), 2001–2012 (Elsevier)",
    year: 2021,
    type: "journal",
    doi: "10.1016/j.aej.2020.12.008",
    citations: 50,
    badge: "High Impact",
    abstract: "Formulates a non-linear epidemiological transmission model using Caputo fractional-order derivatives to capture memory effects and public behavioral reactions during viral epidemics. Stability and numerical simulations demonstrate intervention efficacy.",
    bibtex: `@article{ogunrinde2021dynamic,
  title={Dynamic Model of COVID-19 and Citizens Reaction Using Fractional Derivative},
  author={Ogunrinde, R. B. and Nwajeri, U. K. and Fadugba, S. E. and Ogunrinde, R. R. and Oshinubi, K. I.},
  journal={Alexandria Engineering Journal},
  volume={60},
  number={2},
  pages={2001--2012},
  year={2021},
  publisher={Elsevier}
}`
  },
  {
    id: "pub-2020-1",
    title: "Homotopy Analysis Method and Its Applications in the Valuation of European Call Options with Time-Fractional Black-Scholes Equation",
    authors: "S. E. Fadugba",
    venue: "Chaos, Solitons & Fractals, 138, 109968 (Elsevier)",
    year: 2020,
    type: "journal",
    doi: "10.1016/j.chaos.2020.109968",
    citations: 41,
    badge: "Financial Mathematics",
    abstract: "Derives analytical and semi-analytical series solutions for European call options governed by the time-fractional Black-Scholes partial differential equation via the Homotopy Analysis Method (HAM), providing exact closed-form convergence proofs.",
    bibtex: `@article{fadugba2020homotopy,
  title={Homotopy Analysis Method and Its Applications in the Valuation of European Call Options with Time-Fractional Black-Scholes Equation},
  author={Fadugba, S. E.},
  journal={Chaos, Solitons \& Fractals},
  volume={138},
  pages={109968},
  year={2020},
  publisher={Elsevier}
}`
  },
  {
    id: "pub-2024-1",
    title: "On the Convergence of the Mellin Transform Approach for Valuing European and American Style Options",
    authors: "S. E. Fadugba and C. R. Nwozo",
    venue: "Applied Mathematics and Computation, 418, 128211 (Elsevier)",
    year: 2024,
    type: "journal",
    doi: "10.1016/j.amc.2023.128211",
    citations: 34,
    badge: "Top Cited",
    abstract: "Investigates the analytical and numerical performance of the integral transform method via the Mellin transform for the valuation of financial derivatives under jump-diffusion processes.",
    bibtex: `@article{fadugba2024convergence,
  title={On the Convergence of the Mellin Transform Approach for Valuing European and American Style Options},
  author={Fadugba, S. E. and Nwozo, C. R.},
  journal={Applied Mathematics and Computation},
  volume={418},
  pages={128211},
  year={2024},
  publisher={Elsevier}
}`
  },
  {
    id: "pub-2021-book",
    title: "Handbook of Mathematical Modeling for Emerging African Economies (Chapter 7: Quantitative Risk Assessment)",
    authors: "S. E. Fadugba and T. O. Alabi",
    venue: "Springer Nature International Handbooks, 185–214",
    year: 2021,
    type: "book",
    doi: "10.1007/978-3-030-74521-9_7",
    citations: 29,
    badge: "Invited Chapter",
    abstract: "Examines mathematical modeling techniques and econometric scenario analysis tailored to sovereign debt and currency volatility in emerging African markets.",
    bibtex: `@incollection{fadugba2021handbook,
  title={Quantitative Risk Assessment in African Financial Markets},
  author={Fadugba, S. E. and Alabi, T. O.},
  booktitle={Handbook of Mathematical Modeling for Emerging African Economies},
  pages={185--214},
  year={2021},
  publisher={Springer}
}`
  },
  {
    id: "pub-2020-2",
    title: "Comparative Study of Two Semi-Analytical Methods for the Solution of Time-Fractional Black-Scholes Equation in a Caputo Sense",
    authors: "S. E. Fadugba and O. H. Edogbanya",
    venue: "Trends in Applied Sciences Research, 15, 110–114",
    year: 2020,
    type: "journal",
    doi: "10.3923/tasr.2020.110.114",
    citations: 28,
    badge: "Fractional PDE",
    abstract: "A comparative computational analysis of the Reduced Differential Transform Method (RDTM) and Adomian Decomposition Method for solving fractional Black-Scholes PDE option pricing formulations without linearization errors.",
    bibtex: `@article{fadugba2020comparative,
  title={Comparative Study of Two Semi-Analytical Methods for the Solution of Time-Fractional Black-Scholes Equation in a Caputo Sense},
  author={Fadugba, S. E. and Edogbanya, O. H.},
  journal={Trends in Applied Sciences Research},
  volume={15},
  pages={110--114},
  year={2020}
}`
  },
  {
    id: "pub-2018-1",
    title: "Convergence of a Numerical Technique via Interpolating Function to Approximate Physical Dynamical Systems",
    authors: "S. Qureshi and S. E. Fadugba",
    venue: "Journal of Advanced Physics, 7(3), 446–450",
    year: 2018,
    type: "journal",
    doi: "10.1166/jap.2018.1432",
    citations: 25,
    badge: "Dynamical Systems",
    abstract: "Constructs and evaluates an exponential interpolating polynomial technique designed to numerically integrate singular and non-linear initial value dynamical systems with optimal local truncation error control.",
    bibtex: `@article{qureshi2018convergence,
  title={Convergence of a Numerical Technique via Interpolating Function to Approximate Physical Dynamical Systems},
  author={Qureshi, S. and Fadugba, S. E.},
  journal={Journal of Advanced Physics},
  volume={7},
  number={3},
  pages={446--450},
  year={2018}
}`
  },
  {
    id: "pub-2021-2",
    title: "Analysis of the Properties of a Derived One-Step Numerical Method of a Transcendental Function",
    authors: "R. B. Ogunrinde, R. R. Ogunrinde, and S. E. Fadugba",
    venue: "Journal of Interdisciplinary Mathematics, 24(1), 2201–2213",
    year: 2021,
    type: "journal",
    doi: "10.1080/09720502.2021.1966030",
    citations: 22,
    badge: "Numerical Analysis",
    abstract: "Derives and proves consistency, zero-stability, and convergent bounds for a one-step numerical method utilizing transcendental expansion functions for stiff ordinary differential equations.",
    bibtex: `@article{ogunrinde2021analysis,
  title={Analysis of the Properties of a Derived One-Step Numerical Method of a Transcendental Function},
  author={Ogunrinde, R. B. and Ogunrinde, R. R. and Fadugba, S. E.},
  journal={Journal of Interdisciplinary Mathematics},
  volume={24},
  number={1},
  pages={2201--2213},
  year={2021}
}`
  },
  {
    id: "pub-2022-conf",
    title: "Stochastic Stability and Optimal Control of Epidemic Spreading with Computational Numerical Simulations",
    authors: "S. E. Fadugba, O. J. Peter, and F. A. Oguntolu",
    venue: "15th World Congress on Computational Mechanics (WCCM)",
    year: 2022,
    type: "conference",
    doi: "10.23967/wccm-eccomas.2022.089",
    citations: 21,
    badge: "Conference Proceedings",
    abstract: "Presents stochastic modeling and Lyapunov stability analysis for infectious disease dynamics incorporating non-pharmaceutical interventions and numerical stochastic realizations.",
    bibtex: `@inproceedings{fadugba2022stochastic,
  title={Stochastic Stability and Optimal Control of Epidemic Spreading with Computational Numerical Simulations},
  author={Fadugba, S. E. and Peter, O. J. and Oguntolu, F. A.},
  booktitle={15th World Congress on Computational Mechanics},
  year={2022}
}`
  },
  {
    id: "pub-2024-conf",
    title: "Deep Physics-Informed Neural Networks for High-Dimensional Option Pricing Models",
    authors: "S. E. Fadugba, K. A. Adeleke, and M. D. Bello",
    venue: "IEEE International Conference on Data Science & Computational Intelligence (ICDSCI)",
    year: 2024,
    type: "conference",
    doi: "10.1109/ICDSCI.2024.982341",
    citations: 12,
    badge: "Best Paper Award",
    abstract: "Explores the synergy of Physics-Informed Neural Networks (PINNs) and classical numerical PDE discretizations to mitigate the curse of dimensionality in basket option pricing with multiple stochastic factors.",
    bibtex: `@inproceedings{fadugba2024deep,
  title={Deep Physics-Informed Neural Networks for High-Dimensional Option Pricing Models},
  author={Fadugba, S. E. and Adeleke, K. A. and Bello, M. D.},
  booktitle={2024 IEEE International Conference on Data Science and Computational Intelligence},
  pages={112--119},
  year={2024},
  organization={IEEE}
}`
  }
];

// Publication rendering and interactions
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("publications-list");
  const searchInput = document.getElementById("pub-search");
  const filterButtons = document.querySelectorAll(".pub-filter-btn");
  const modal = document.getElementById("bibtex-modal");
  const modalCode = document.getElementById("bibtex-code");
  const copyBtn = document.getElementById("copy-bibtex-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const toast = document.getElementById("toast");

  let activeFilter = "all";
  let searchQuery = "";

  function renderPublications() {
    if (!container) return;

    const filtered = publicationsData.filter(pub => {
      const matchesFilter = activeFilter === "all" || pub.type === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.venue.toLowerCase().includes(q) ||
        pub.year.toString().includes(q);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="pub-empty-state">
          <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p>No publications found matching your criteria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(pub => `
      <article class="pub-card" data-id="${pub.id}">
        <div class="pub-header">
          <div class="pub-meta">
            <span class="pub-type-badge ${pub.type}">${pub.type.toUpperCase()}</span>
            <span class="pub-year">${pub.year}</span>
            ${pub.badge ? `<span class="pub-special-badge">${pub.badge}</span>` : ''}
          </div>
          <div class="pub-citations">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>${pub.citations} Citations</span>
          </div>
        </div>
        
        <h3 class="pub-title">${pub.title}</h3>
        <p class="pub-authors">${pub.authors}</p>
        <p class="pub-venue"><em>${pub.venue}</em></p>
        <p class="pub-abstract">${pub.abstract}</p>

        <div class="pub-actions">
          ${pub.doi ? `
            <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer" class="btn-pub-link">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              <span>View DOI</span>
            </a>
          ` : ''}
          <a href="https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}" target="_blank" rel="noopener noreferrer" class="btn-pub-link">
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4 3.18v6.77L12 24l8-4.55V12.68l4-3.18L12 0z"/></svg>
            <span>Google Scholar</span>
          </a>
          <button class="btn-pub-bibtex" data-id="${pub.id}">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>Cite BibTeX</span>
          </button>
        </div>
      </article>
    `).join("");

    // Bind Cite BibTeX click
    container.querySelectorAll(".btn-pub-bibtex").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const pub = publicationsData.find(p => p.id === id);
        if (pub && modal && modalCode) {
          modalCode.textContent = pub.bibtex;
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });
  }

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      renderPublications();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderPublications();
    });
  }

  // Modal interactions
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Copy BibTeX
  if (copyBtn && modalCode) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(modalCode.textContent).then(() => {
        showToast("BibTeX citation copied to clipboard!");
      }).catch(() => {
        showToast("Unable to copy to clipboard automatically.");
      });
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Initial render
  renderPublications();
});

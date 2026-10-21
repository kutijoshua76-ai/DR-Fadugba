/**
 * Publications Data & Dynamic Renderer
 * Dr. Fadugba Portfolio
 */

const publicationsData = [
  {
    id: "pub-2025-1",
    title: "A Novel High-Order Numerical Scheme for Stochastic Differential Equations with Applications to Financial Volatility Modeling",
    authors: "S. E. Fadugba, O. M. Ogunwobi, and A. T. Johnson",
    venue: "Journal of Computational and Applied Mathematics",
    year: 2025,
    type: "journal",
    doi: "10.1016/j.cam.2024.115890",
    citations: 18,
    badge: "Featured Article",
    abstract: "In this paper, we construct and analyze an unconditionally stable high-order numerical algorithm for solving non-linear stochastic differential equations governing asset price fluctuations in volatile emerging financial markets. Convergence and stability theorems are established.",
    bibtex: `@article{fadugba2025novel,
  title={A Novel High-Order Numerical Scheme for Stochastic Differential Equations with Applications to Financial Volatility Modeling},
  author={Fadugba, S. E. and Ogunwobi, O. M. and Johnson, A. T.},
  journal={Journal of Computational and Applied Mathematics},
  volume={432},
  pages={115890},
  year={2025},
  publisher={Elsevier}
}`
  },
  {
    id: "pub-2024-1",
    title: "On the Convergence of the Mellin Transform Approach for Valuing European and American Style Options",
    authors: "S. E. Fadugba and C. R. Nwozo",
    venue: "Applied Mathematics and Computation",
    year: 2024,
    type: "journal",
    doi: "10.1016/j.amc.2023.128211",
    citations: 34,
    badge: "Top Cited",
    abstract: "This work investigates the analytical and numerical performance of the integral transform method via the Mellin transform for the valuation of financial derivatives under jump-diffusion processes.",
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
    id: "pub-2024-2",
    title: "Deep Physics-Informed Neural Networks for High-Dimensional Option Pricing Models",
    authors: "S. E. Fadugba, K. A. Adeleke, and M. D. Bello",
    venue: "IEEE International Conference on Data Science & Computational Intelligence (ICDSCI)",
    year: 2024,
    type: "conference",
    doi: "10.1109/ICDSCI.2024.982341",
    citations: 12,
    badge: "Best Paper Award",
    abstract: "We explore the synergy of Physics-Informed Neural Networks (PINNs) and classic numerical PDE discretizations to mitigate the curse of dimensionality in basket option pricing with multiple stochastic factors.",
    bibtex: `@inproceedings{fadugba2024deep,
  title={Deep Physics-Informed Neural Networks for High-Dimensional Option Pricing Models},
  author={Fadugba, S. E. and Adeleke, K. A. and Bello, M. D.},
  booktitle={2024 IEEE International Conference on Data Science and Computational Intelligence},
  pages={112--119},
  year={2024},
  organization={IEEE}
}`
  },
  {
    id: "pub-2023-1",
    title: "Computational Techniques in Financial Mathematics: Theory, Algorithms, and Real-World Case Studies",
    authors: "S. E. Fadugba",
    venue: "Academic Press / Elsevier Publishing",
    year: 2023,
    type: "book",
    doi: "10.1016/B978-0-12-824100-3.00004-9",
    citations: 62,
    badge: "Monograph",
    abstract: "A comprehensive graduate-level text detailing analytical, transform-based, and finite-difference methods for modern quantitative finance and computational risk management.",
    bibtex: `@book{fadugba2023computational,
  title={Computational Techniques in Financial Mathematics: Theory, Algorithms, and Real-World Case Studies},
  author={Fadugba, S. E.},
  year={2023},
  publisher={Academic Press}
}`
  },
  {
    id: "pub-2023-2",
    title: "Modified Adomian Decomposition Method for Solving Non-Linear Fractional Boundary Value Problems",
    authors: "S. E. Fadugba and G. A. Adebayo",
    venue: "Fractional Calculus and Applied Analysis",
    year: 2023,
    type: "journal",
    doi: "10.1007/s13540-023-00142-8",
    citations: 45,
    badge: "",
    abstract: "An accelerated decomposition algorithm is developed for solving fractional differential equations with Caputo derivatives, yielding rapidly convergent series solutions without discretization discretization errors.",
    bibtex: `@article{fadugba2023modified,
  title={Modified Adomian Decomposition Method for Solving Non-Linear Fractional Boundary Value Problems},
  author={Fadugba, S. E. and Adebayo, G. A.},
  journal={Fractional Calculus and Applied Analysis},
  volume={26},
  number={3},
  pages={1240--1262},
  year={2023},
  publisher={Springer}
}`
  },
  {
    id: "pub-2022-1",
    title: "Stochastic Stability and Optimal Control of Epidemic Spreading with Computational Numerical Simulations",
    authors: "S. E. Fadugba, O. J. Peter, and F. A. Oguntolu",
    venue: "World Congress on Computational Mechanics (WCCM)",
    year: 2022,
    type: "conference",
    doi: "10.23967/wccm-eccomas.2022.089",
    citations: 21,
    badge: "",
    abstract: "Presents stochastic modeling and Lyapunov stability analysis for infectious disease dynamics incorporating non-pharmaceutical interventions.",
    bibtex: `@inproceedings{fadugba2022stochastic,
  title={Stochastic Stability and Optimal Control of Epidemic Spreading with Computational Numerical Simulations},
  author={Fadugba, S. E. and Peter, O. J. and Oguntolu, F. A.},
  booktitle={15th World Congress on Computational Mechanics},
  year={2022}
}`
  },
  {
    id: "pub-2021-1",
    title: "Handbook of Mathematical Modeling for Emerging African Economies (Chapter 7: Quantitative Risk Assessment)",
    authors: "S. E. Fadugba and T. O. Alabi",
    venue: "Springer Nature International Handbooks",
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
          <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer" class="btn-pub-link">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            <span>DOI: ${pub.doi}</span>
          </a>
          <button class="btn-pub-bibtex" data-id="${pub.id}">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
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

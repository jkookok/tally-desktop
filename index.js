const app = document.getElementById("app");

const state = {
  loggedIn: false,
  activeMenu: "company",
  activePage: "company",
  companyName: "TALLY ELITE UAE"
};

const pages = {
  company: {
    title: "Company",
    description: "Company settings and business profile",
    cards: [
      { label: "Company Profile", value: "Edit company information" },
      { label: "Registration", value: "Trade license and registration" },
      { label: "Address", value: "Office and branch details" },
      { label: "Contacts", value: "Phone, email, website" }
    ]
  },
  master: {
    title: "Master",
    description: "Core business master data",
    cards: [
      { label: "Accounts", value: "Create chart of accounts" },
      { label: "Inventory", value: "Manage products and stock" },
      { label: "Payroll", value: "Employee and payslip setup" },
      { label: "Admin Master", value: "Users and permissions" }
    ]
  },
  transaction: {
    title: "Transaction",
    description: "Daily entry and movement records",
    cards: [
      { label: "Journal", value: "Book accounting entries" },
      { label: "Invoice", value: "Sales and billing" },
      { label: "Purchase", value: "Vendor bills and expenses" },
      { label: "Receipt", value: "Payments and collections" }
    ]
  },
  report: {
    title: "Report",
    description: "Business performance and analysis",
    cards: [
      { label: "Balance Sheet", value: "Financial position overview" },
      { label: "Profit & Loss", value: "Revenue and expenses" },
      { label: "Trail Balance", value: "Ledger summary" },
      { label: "GST / Tax", value: "Tax compliance reports" }
    ]
  },
  admin: {
    title: "Admin",
    description: "System settings and user controls",
    cards: [
      { label: "Users", value: "Create and manage users" },
      { label: "Roles", value: "Permissions and access rights" },
      { label: "Settings", value: "App system preferences" },
      { label: "Backups", value: "Restore and security" }
    ]
  }
};

const menuItems = [
  { key: "company", label: "Company" },
  { key: "master", label: "Master" },
  { key: "transaction", label: "Transaction" },
  { key: "report", label: "Report" },
  { key: "admin", label: "Admin" },
  { key: "exit", label: "Exit", isExit: true }
];

function renderLogin() {
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-box">
        <h1>LOGIN</h1>
        <div class="login-brand">TALLY ELITE UAE</div>

        <label class="field">
          <span>Username</span>
          <input type="text" id="username" value="admin" />
        </label>

        <label class="field">
          <span>Password</span>
          <input type="password" id="password" value="123456" />
        </label>

        <button id="loginBtn" class="primary-btn">Login</button>

        <div class="login-footer">
          <small>Business Accounting Portal</small>
        </div>
      </div>
    </div>
  `;

  document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
      alert("Please enter username and password.");
      return;
    }

    state.loggedIn = true;
    renderApp();
  });
}

function renderMenu() {
  return `
    <header class="topbar">
      <nav class="menu-bar">
        ${menuItems.map(item => {
          if (item.isExit) {
            return `<button class="menu-btn exit-btn" data-menu="exit">${item.label}</button>`;
          }

          const isActive = state.activeMenu === item.key ? "active" : "";
          return `
            <button class="menu-btn ${isActive}" data-menu="${item.key}">
              <span>${item.label}</span>
              <span class="down-arrow">▼</span>
            </button>
          `;
        }).join("")}
      </nav>
    </header>
  `;
}

function renderDropdown() {
  const current = pages[state.activeMenu];
  if (!current) return "";

  return `
    <div class="dropdown-panel">
      <div class="dropdown-menu">
        ${current.cards.map((card) => `
          <button class="dropdown-item" data-page="${state.activeMenu}">
            ${card.label}
            <span>›</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderPageContent() {
  const page = pages[state.activePage];
  if (!page) return "";

  return `
    <section class="page-shell">
      <div class="section-header">
        <div>
          <div class="page-kicker">${page.title}</div>
          <h2>${page.title}</h2>
        </div>
        <div class="company-badge">${state.companyName}</div>
      </div>

      <div class="info-row">
        <span>User: manoj</span>
        <span>Company: ${state.companyName}</span>
        <span>Date: 10/10/2026</span>
      </div>

      <div class="card-grid">
        ${page.cards.map(card => `
          <div class="mini-card">
            <div class="mini-card-title">${card.label}</div>
            <div class="mini-card-body">${card.value}</div>
          </div>
        `).join("")}
      </div>

      <div class="profile-panel">
        <h3>Company Profile</h3>

        <div class="profile-grid">
          <label>
            <span>Company Name</span>
            <input type="text" value="TALLY ELITE UAE" />
          </label>

          <label>
            <span>Trade License</span>
            <input type="text" value="TRD-2026-0001" />
          </label>

          <label>
            <span>Email</span>
            <input type="email" value="info@tallyeliteuae.com" />
          </label>

          <label>
            <span>Phone</span>
            <input type="text" value="+971 50 123 4567" />
          </label>

          <label>
            <span>Address</span>
            <input type="text" value="Dubai, UAE" />
          </label>

          <label>
            <span>Currency</span>
            <select>
              <option selected>AED</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </label>
        </div>

        <div class="profile-actions">
          <button class="primary-btn small">Save Changes</button>
          <button class="secondary-btn small">Cancel</button>
        </div>
      </div>
    </section>
  `;
}

function renderApp() {
  if (!state.loggedIn) {
    renderLogin();
    return;
  }

  app.innerHTML = `
    <div class="desktop-shell">
      ${renderMenu()}
      ${renderDropdown()}
      <main class="main-area">
        ${renderPageContent()}
      </main>
    </div>
  `;

  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const menu = btn.dataset.menu;

      if (menu === "exit") {
        const confirmExit = confirm("Are you sure you want to exit?");
        if (confirmExit) {
          state.loggedIn = false;
          state.activeMenu = "company";
          state.activePage = "company";
          renderLogin();
        }
        return;
      }

      state.activeMenu = menu;
      state.activePage = menu;
      renderApp();
    });
  });

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      state.activePage = page;
      renderApp();
    });
  });
}

renderLogin();
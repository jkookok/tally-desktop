const app = document.getElementById("app");

// Global state
const state = {
  loggedIn: false,
  activeMenu: null,
  activePage: null,
  currentUser: "manoj",
  companyName: "TALLY ELITE UAE"
};

// Page content structure
const pages = {
  company: {
    title: "Company",
    icon: "🏢",
    description: "Company settings and business profile",
    submenus: [
      { id: "company-profile", label: "Company Profile", icon: "📋" },
      { id: "company-info", label: "Company Info", icon: "ℹ️" },
      { id: "company-addresses", label: "Addresses", icon: "📍" },
      { id: "company-contacts", label: "Contacts", icon: "📞" }
    ],
    sections: {
      "company-profile": {
        title: "Company Profile",
        content: "Edit company information and settings",
        fields: [
          { label: "Company Name", type: "text", value: "TALLY ELITE UAE" },
          { label: "Trade License", type: "text", value: "TRD-2026-0001" },
          { label: "Registration Number", type: "text", value: "1234567890" },
          { label: "Tax ID (VAT)", type: "text", value: "123-456-789" },
          { label: "Currency", type: "select", options: ["AED", "USD", "EUR"], value: "AED" },
          { label: "Financial Year Start", type: "date", value: "2026-01-01" }
        ]
      },
      "company-info": {
        title: "Company Information",
        content: "General company details and metadata",
        fields: [
          { label: "Legal Name", type: "text", value: "Tally Elite UAE LLC" },
          { label: "Business Type", type: "text", value: "Accounting Services" },
          { label: "Year of Establishment", type: "number", value: "2020" },
          { label: "Employees", type: "number", value: "50" }
        ]
      },
      "company-addresses": {
        title: "Company Addresses",
        content: "Head office and branch office addresses",
        fields: [
          { label: "Head Office", type: "text", value: "Dubai, UAE" },
          { label: "Branch Office 1", type: "text", value: "Abu Dhabi, UAE" },
          { label: "Postal Code", type: "text", value: "00971" }
        ]
      },
      "company-contacts": {
        title: "Company Contacts",
        content: "Contact information and communication channels",
        fields: [
          { label: "Phone", type: "tel", value: "+971 4 XXX XXXX" },
          { label: "Email", type: "email", value: "info@tallyeliteuae.com" },
          { label: "Website", type: "url", value: "www.tallyeliteuae.com" },
          { label: "WhatsApp", type: "tel", value: "+971 50 XXX XXXX" }
        ]
      }
    }
  },

  master: {
    title: "Master",
    icon: "📚",
    description: "Core business master data management",
    submenus: [
      { id: "accounts", label: "Chart of Accounts", icon: "📊" },
      { id: "inventory", label: "Inventory", icon: "📦" },
      { id: "payroll", label: "Payroll", icon: "💰" },
      { id: "masters", label: "Admin Master", icon: "⚙️" }
    ],
    sections: {
      "accounts": {
        title: "Chart of Accounts",
        content: "Create and manage accounting ledgers",
        fields: [
          { label: "Account Code", type: "text", value: "10001" },
          { label: "Account Name", type: "text", value: "Cash" },
          { label: "Account Type", type: "select", options: ["Asset", "Liability", "Equity", "Income", "Expense"], value: "Asset" },
          { label: "Opening Balance", type: "number", value: "10000" }
        ]
      },
      "inventory": {
        title: "Inventory Management",
        content: "Manage products, stock items and warehouses",
        fields: [
          { label: "Item Code", type: "text", value: "SKU-001" },
          { label: "Item Name", type: "text", value: "Product Name" },
          { label: "Unit of Measure", type: "select", options: ["PCS", "KG", "LTR", "MTR"], value: "PCS" },
          { label: "Opening Stock", type: "number", value: "100" },
          { label: "Reorder Level", type: "number", value: "20" }
        ]
      },
      "payroll": {
        title: "Payroll Master",
        content: "Employee and payslip management",
        fields: [
          { label: "Employee ID", type: "text", value: "EMP-001" },
          { label: "Employee Name", type: "text", value: "John Doe" },
          { label: "Designation", type: "text", value: "Manager" },
          { label: "Basic Salary", type: "number", value: "5000" },
          { label: "Department", type: "text", value: "Finance" }
        ]
      },
      "masters": {
        title: "Admin Master",
        content: "Administrative master data",
        fields: [
          { label: "Cost Center", type: "text", value: "CC-001" },
          { label: "Department", type: "text", value: "Finance" },
          { label: "Location", type: "text", value: "Dubai" }
        ]
      }
    }
  },

  transaction: {
    title: "Transaction",
    icon: "💳",
    description: "Daily transaction entries and movements",
    submenus: [
      { id: "journal", label: "Journal Entry", icon: "📝" },
      { id: "invoice", label: "Invoice", icon: "🧾" },
      { id: "purchase", label: "Purchase Order", icon: "🛒" },
      { id: "payment", label: "Payment", icon: "💸" }
    ],
    sections: {
      "journal": {
        title: "Journal Entry",
        content: "Book accounting journal entries",
        fields: [
          { label: "Entry Date", type: "date", value: "2026-10-10" },
          { label: "Reference No", type: "text", value: "JE-001" },
          { label: "Narration", type: "text", value: "Monthly expenses" },
          { label: "Debit Account", type: "select", options: ["Cash", "Bank", "Expense"], value: "Expense" },
          { label: "Credit Account", type: "select", options: ["Cash", "Bank", "Income"], value: "Cash" },
          { label: "Amount", type: "number", value: "1000" }
        ]
      },
      "invoice": {
        title: "Sales Invoice",
        content: "Create and manage sales invoices",
        fields: [
          { label: "Invoice Number", type: "text", value: "INV-2026-0001" },
          { label: "Invoice Date", type: "date", value: "2026-10-10" },
          { label: "Customer Name", type: "text", value: "ABC Company" },
          { label: "Amount", type: "number", value: "5000" },
          { label: "Tax %", type: "number", value: "5" },
          { label: "Due Date", type: "date", value: "2026-11-10" }
        ]
      },
      "purchase": {
        title: "Purchase Order",
        content: "Create and track purchase orders",
        fields: [
          { label: "PO Number", type: "text", value: "PO-2026-0001" },
          { label: "PO Date", type: "date", value: "2026-10-10" },
          { label: "Vendor Name", type: "text", value: "Supplier XYZ" },
          { label: "Item", type: "text", value: "Product Name" },
          { label: "Quantity", type: "number", value: "50" },
          { label: "Unit Price", type: "number", value: "100" }
        ]
      },
      "payment": {
        title: "Payment Entry",
        content: "Record payments and receipts",
        fields: [
          { label: "Payment Date", type: "date", value: "2026-10-10" },
          { label: "Payment Mode", type: "select", options: ["Cash", "Cheque", "Bank Transfer", "Card"], value: "Bank Transfer" },
          { label: "Amount", type: "number", value: "2500" },
          { label: "From Account", type: "text", value: "Cash" },
          { label: "To Account", type: "text", value: "Bank" },
          { label: "Reference", type: "text", value: "Payment Ref #123" }
        ]
      }
    }
  },

  report: {
    title: "Report",
    icon: "📈",
    description: "Business performance and financial analysis",
    submenus: [
      { id: "balance-sheet", label: "Balance Sheet", icon: "📊" },
      { id: "profit-loss", label: "Profit & Loss", icon: "💹" },
      { id: "trial-balance", label: "Trial Balance", icon: "⚖️" },
      { id: "tax-report", label: "Tax Report", icon: "📋" }
    ],
    sections: {
      "balance-sheet": {
        title: "Balance Sheet",
        content: "Financial position overview - Assets, Liabilities, and Equity",
        fields: [
          { label: "As on Date", type: "date", value: "2026-10-10" },
          { label: "Total Assets", type: "number", value: "500000", readonly: true },
          { label: "Total Liabilities", type: "number", value: "200000", readonly: true },
          { label: "Total Equity", type: "number", value: "300000", readonly: true }
        ]
      },
      "profit-loss": {
        title: "Profit & Loss Statement",
        content: "Revenue, expenses, and net profit analysis",
        fields: [
          { label: "Period From", type: "date", value: "2026-01-01" },
          { label: "Period To", type: "date", value: "2026-10-10" },
          { label: "Total Income", type: "number", value: "100000", readonly: true },
          { label: "Total Expenses", type: "number", value: "60000", readonly: true },
          { label: "Net Profit", type: "number", value: "40000", readonly: true }
        ]
      },
      "trial-balance": {
        title: "Trial Balance",
        content: "Summary of all ledger account balances",
        fields: [
          { label: "As on Date", type: "date", value: "2026-10-10" },
          { label: "Total Debits", type: "number", value: "500000", readonly: true },
          { label: "Total Credits", type: "number", value: "500000", readonly: true },
          { label: "Status", type: "text", value: "Balanced", readonly: true }
        ]
      },
      "tax-report": {
        title: "Tax & GST Report",
        content: "Tax compliance and VAT reporting",
        fields: [
          { label: "Report Period", type: "text", value: "Q4 2026" },
          { label: "Taxable Income", type: "number", value: "100000" },
          { label: "Tax Rate %", type: "number", value: "5" },
          { label: "Tax Amount", type: "number", value: "5000", readonly: true }
        ]
      }
    }
  },

  admin: {
    title: "Admin",
    icon: "🔐",
    description: "System settings and user controls",
    submenus: [
      { id: "users", label: "Users", icon: "👤" },
      { id: "roles", label: "Roles & Permissions", icon: "🔑" },
      { id: "settings", label: "System Settings", icon: "⚙️" },
      { id: "backups", label: "Backups", icon: "💾" }
    ],
    sections: {
      "users": {
        title: "User Management",
        content: "Create and manage system users",
        fields: [
          { label: "Username", type: "text", value: "manoj" },
          { label: "Email", type: "email", value: "manoj@example.com" },
          { label: "Full Name", type: "text", value: "Manoj Kumar" },
          { label: "Role", type: "select", options: ["Admin", "Manager", "Accountant", "Viewer"], value: "Admin" },
          { label: "Status", type: "select", options: ["Active", "Inactive"], value: "Active" }
        ]
      },
      "roles": {
        title: "Roles & Permissions",
        content: "Define user roles and access rights",
        fields: [
          { label: "Role Name", type: "text", value: "Admin" },
          { label: "Description", type: "text", value: "Full system access" },
          { label: "Permissions", type: "text", value: "All" }
        ]
      },
      "settings": {
        title: "System Settings",
        content: "App configuration and preferences",
        fields: [
          { label: "Theme", type: "select", options: ["Light", "Dark", "Green"], value: "Green" },
          { label: "Date Format", type: "select", options: ["DD/MM/YYYY", "MM/DD/YYYY"], value: "DD/MM/YYYY" },
          { label: "Language", type: "select", options: ["English", "Arabic"], value: "English" },
          { label: "Decimal Places", type: "number", value: "2" }
        ]
      },
      "backups": {
        title: "Data Backups",
        content: "Backup and restore database",
        fields: [
          { label: "Last Backup", type: "text", value: "2026-10-09 18:30", readonly: true },
          { label: "Backup Location", type: "text", value: "/backups/tally-2026-10-09.bak", readonly: true },
          { label: "Backup Frequency", type: "select", options: ["Daily", "Weekly", "Monthly"], value: "Daily" }
        ]
      }
    }
  }
};

// Render login screen
function renderLogin() {
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-container">
        <div class="login-box">
          <div class="login-header">
            <h1>LOGIN</h1>
            <p class="login-subtitle">TALLY ELITE UAE</p>
          </div>

          <form class="login-form">
            <div class="form-field">
              <label for="username">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter username" 
                value="manoj"
                autofocus
              />
            </div>

            <div class="form-field">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter password" 
                value="123456"
              />
            </div>

            <button type="button" id="loginBtn" class="login-button">
              LOGIN
            </button>

            <div class="login-footer">
              <small>© 2026 Tally Elite UAE - Accounting & ERP System</small>
            </div>
          </form>
        </div>

        <div class="login-watermark">TALLY ELITE UAE</div>
      </div>
    </div>
  `;

  document.getElementById("loginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    state.loggedIn = true;
    state.currentUser = username;
    state.activeMenu = "company";
    state.activePage = "company-profile";
    renderMainApp();
  });
}

// Render main application
function renderMainApp() {
  if (!state.loggedIn) {
    renderLogin();
    return;
  }

  const menuKeys = Object.keys(pages);
  const currentPageData = pages[state.activeMenu];

  app.innerHTML = `
    <div class="app-container">
      <!-- TOP NAVIGATION -->
      <header class="navbar">
        <nav class="nav-menu">
          ${menuKeys.map(key => {
            const isActive = state.activeMenu === key ? "active" : "";
            return `
              <button class="nav-item ${isActive}" data-menu="${key}">
                <span class="nav-label">${pages[key].title}</span>
                <span class="nav-arrow">▼</span>
              </button>
            `;
          }).join("")}
          <button class="nav-item exit-btn" id="exitBtn">
            <span class="nav-label">Exit</span>
          </button>
        </nav>
      </header>

      <!-- DROPDOWN SUBMENU -->
      <div class="dropdown-area">
        ${currentPageData ? `
          <div class="dropdown-content">
            ${currentPageData.submenus.map(submenu => {
              const isActive = state.activePage === submenu.id ? "active" : "";
              return `
                <button class="dropdown-item ${isActive}" data-page="${submenu.id}">
                  <span>${submenu.icon}</span>
                  <span>${submenu.label}</span>
                </button>
              `;
            }).join("")}
          </div>
        ` : ""}
      </div>

      <!-- MAIN CONTENT AREA -->
      <main class="main-content">
        ${renderPageContent()}
      </main>

      <!-- FOOTER -->
      <footer class="app-footer">
        <div class="footer-left">
          <span>User: <strong>${state.currentUser}</strong></span>
          <span>Company: <strong>${state.companyName}</strong></span>
        </div>
        <div class="footer-right">
          <span>Date: <strong>${new Date().toLocaleDateString()}</strong></span>
        </div>
      </footer>
    </div>
  `;

  // Attach event listeners
  attachEventListeners();
}

// Render page content
function renderPageContent() {
  const menu = pages[state.activeMenu];
  if (!menu) return "";

  const section = menu.sections[state.activePage];
  if (!section) return "";

  return `
    <div class="page-container">
      <div class="page-header">
        <div class="header-left">
          <span class="page-icon">${menu.icon}</span>
          <div>
            <h1 class="page-title">${section.title}</h1>
            <p class="page-breadcrumb">${menu.title} → ${section.title}</p>
          </div>
        </div>
        <div class="company-badge">
          <span class="badge-icon">🏢</span>
          <span>${state.companyName}</span>
        </div>
      </div>

      <div class="page-body">
        <section class="form-section">
          <h2 class="section-title">${section.title}</h2>
          <p class="section-desc">${section.content}</p>

          <form class="data-form">
            <div class="form-grid">
              ${section.fields.map(field => `
                <div class="form-group">
                  <label for="${field.label}">${field.label}</label>
                  ${field.type === "select" ? `
                    <select class="form-control" ${field.readonly ? "disabled" : ""}>
                      ${field.options.map(opt => `
                        <option ${opt === field.value ? "selected" : ""}>${opt}</option>
                      `).join("")}
                    </select>
                  ` : field.type === "textarea" ? `
                    <textarea class="form-control" ${field.readonly ? "disabled" : ""}>${field.value}</textarea>
                  ` : `
                    <input 
                      type="${field.type}" 
                      class="form-control" 
                      value="${field.value}"
                      ${field.readonly ? "disabled" : ""}
                      placeholder="${field.label}"
                    />
                  `}
                </div>
              `).join("")}
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">💾 Save Changes</button>
              <button type="reset" class="btn btn-secondary">🔄 Reset</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;
}

// Attach all event listeners
function attachEventListeners() {
  // Menu click handlers
  document.querySelectorAll(".nav-item:not(.exit-btn)").forEach(btn => {
    btn.addEventListener("click", () => {
      const menu = btn.dataset.menu;
      state.activeMenu = menu;
      const firstSubmenu = Object.keys(pages[menu].sections)[0];
      state.activePage = firstSubmenu;
      renderMainApp();
    });
  });

  // Dropdown item click handlers
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      state.activePage = page;
      renderMainApp();
    });
  });

  // Exit button handler
  const exitBtn = document.getElementById("exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to exit?")) {
        state.loggedIn = false;
        state.activeMenu = null;
        state.activePage = null;
        renderLogin();
      }
    });
  }

  // Form submission
  const form = document.querySelector(".data-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Data saved successfully!");
    });
  }

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && !e.target.closest(".dropdown-area")) {
      // Could add auto-close logic here
    }
  });
}

// Initialize app
renderLogin();

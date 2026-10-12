/* ==========================================================================
   NATASHA BBQ — DIGITAL MENU
   File: script1.js

   PURPOSE:
   1. Store menu categories, item names and prices.
   2. Generate the category navigation buttons.
   3. Display menu categories and items on the page.
   4. Highlight the active category while scrolling.
   5. Automatically update the footer copyright year.

   RELATED FILES:
   - index1.html: Digital menu page
   - style1.css: Digital menu styles (self-contained)
   - logo.png: Natasha BBQ logo

   HOW TO UPDATE THE MENU:
   Edit MENU_DATA below. Keep category IDs unique.
   - An item with no "price" shows "Ask your waiter".
   - A category can have a "note" shown under its heading.
   ========================================================================== */


/* ==========================================================================
   1. MENU DATA
   Source: the Natasha BBQ wooden menu boards (Starters, Main Dish,
   Sizzlers, Sides).

   Each category contains:
   - id: Unique identifier used for navigation.
   - name: Category name displayed on the page.
   - note: Optional note shown under the category heading.
   - items: Meals belonging to the category.

   Each item can contain:
   - name: Item name.
   - price: Price in Tanzanian Shillings (leave out if not listed).
   - desc: Optional description.
   ========================================================================== */

const MENU_DATA = [
  {
    id: "starters",
    name: "Starters",
    note: "All starters are served by themselves.",
    items: [
      { name: "Chicken Wings Pilipili", price: 12000 },
      { name: "Chicken Wings Periperi", price: 12000 },
      { name: "Chicken Wings Pepper Sauce", price: 12000 },
      { name: "Chicken Mishikaki", price: 12000 },
      { name: "Shrimps", price: 20000 },
      { name: "Lamb Chops", price: 12000 },
      { name: "Beef Mishikaki", price: 12000 },
      { name: "Beef Mishikaki Masala", price: 12000 },
      { name: "Beef Mishikaki Pepper", price: 12000 },
      { name: "Nundu Charcoaled Grilled", price: 12000 },
      { name: "Nundu Masala", price: 12000 },
      { name: "Nundu Pepper", price: 12000 },
      { name: "Prawns Pilipili", price: 20000 },
      { name: "Prawns Pepper", price: 20000 },
      { name: "Prawns Periperi", price: 20000 }
    ]
  },

  {
    id: "main-dish",
    name: "Main Dish",
    items: [
      { name: "The Original Gajjar Chicken", price: 12000 },
      { name: "Sekela Chicken", price: 12000 },
      { name: "Pilipili Chicken", price: 12000 },
      { name: "Periperi Chicken", price: 15000 },
      { name: "Chicken Steak BBQ", price: 18000 },
      { name: "Chicken Steak BBQ Pepper", price: 18000 },
      { name: "Natasha Fried Chicken", price: 15000 },
      { name: "Pepper Steak Fillet", price: 18000 },
      { name: "Whole Fish Pilipili", price: 24000 },
      { name: "Fish Pepper Sauce", price: 24000 },
      { name: "Fish Periperi", price: 24000 },
      { name: "Red Snapper Pepper Fill", price: 24000 },
      { name: "Red Snapper Pepper", price: 24000 },
      { name: "Red Snapper Periperi", price: 24000 },
      { name: "Prawns Pilipili", price: 24000 },
      { name: "Prawns Periperi", price: 24000 },
      { name: "Prawns Pepper Sauce", price: 24000 },
      { name: "T-Bone Steak" },
      { name: "Spring Chicken" }
    ]
  },

  {
    id: "sizzlers",
    name: "Sizzlers",
    items: [
      { name: "The Original Gajjar Chicken", price: 18000 },
      { name: "Beef Pepper Fillet", price: 25000 },
      { name: "Charcoal Grilled Chicken Fillet", price: 25000 },
      { name: "Whole Fish Pepper", price: 25000 },
      { name: "Red Snapper", price: 25000 },
      { name: "Prawns Pepper", price: 25000 },
      { name: "Prawns Pilipili", price: 25000 },
      { name: "Nundu", price: 18000 },
      { name: "Masala Mishikaki", price: 18000 }
    ]
  },

  {
    id: "sides",
    name: "Sides",
    items: [
      { name: "Plain Fries", price: 3000 },
      { name: "Masala Fries", price: 4000 },
      { name: "Periperi Fries", price: 4000 },
      { name: "Pepper Fries", price: 4000 },
      { name: "Charcoal BBQ Fries", price: 4000 },
      { name: "Ajam", price: 2000 }
    ]
  }
];


/* ==========================================================================
   2. HELPER FUNCTIONS
   ========================================================================== */


/**
 * Format a number as a Tanzanian Shilling price.
 *
 * Example:
 * formatPrice(12000) returns "TSh 12,000/="
 */
function formatPrice(amount) {
  return "TSh " + amount.toLocaleString("en-US") + "/=";
}


/**
 * Create an HTML element.
 *
 * @param {string} tag       HTML tag name, such as "div" or "h2".
 * @param {string} className Optional CSS class.
 * @returns {HTMLElement}
 *
 * Text is always added with textContent, so menu data can never
 * be interpreted as HTML.
 */
function el(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}


/* ==========================================================================
   3. CATEGORY NAVIGATION
   Creates one navigation button for every menu category.
   Clicking a button scrolls to its section.
   ========================================================================== */

function renderNav() {
  const nav = document.getElementById("category-nav");
  const navContainer = document.querySelector(".category-nav");

  if (!nav || !navContainer) {
    return;
  }

  MENU_DATA.forEach((category) => {
    const button = el("button", "nav-pill", category.name);

    button.type = "button";
    button.dataset.target = category.id;

    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");

    button.addEventListener("click", () => {
      const target = document.getElementById(category.id);

      if (!target) {
        return;
      }

      // Leave room for the sticky navigation bar.
      const headerOffset = navContainer.offsetHeight + 12;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });

    nav.appendChild(button);
  });
}


/* ==========================================================================
   4. MENU RENDERING
   Builds every category and item inside <main id="menu-content">.

   Each row is: name ........ price
   The dotted leader between them is drawn with CSS.
   ========================================================================== */

function renderMenu() {
  const main = document.getElementById("menu-content");

  if (!main) {
    return;
  }

  MENU_DATA.forEach((category) => {

    const section = el("section", "category-section");

    section.id = category.id;
    section.setAttribute("aria-labelledby", category.id + "-heading");

    // Category heading (red brush-stroke label).
    const heading = el("h2", "category-heading", category.name);

    heading.id = category.id + "-heading";

    section.appendChild(heading);

    // Optional category note.
    if (category.note) {
      section.appendChild(el("p", "category-note", category.note));
    }

    const list = el("div", "item-list");

    category.items.forEach((item) => {

      const row = el("article", "menu-item");

      // Name, dotted leader and price on one line.
      const line = el("div", "menu-item-line");

      line.appendChild(el("h3", "menu-item-name", item.name));
      line.appendChild(el("span", "menu-item-leader"));

      const hasPrice = typeof item.price === "number";

      const price = el(
        "span",
        hasPrice ? "menu-item-price" : "menu-item-price menu-item-price--ask",
        hasPrice ? formatPrice(item.price) : "Ask your waiter"
      );

      line.appendChild(price);
      row.appendChild(line);

      // Optional description.
      if (item.desc) {
        row.appendChild(el("p", "menu-item-desc", item.desc));
      }

      list.appendChild(row);
    });

    section.appendChild(list);
    main.appendChild(section);
  });
}


/* ==========================================================================
   5. ACTIVE CATEGORY TRACKING
   Highlights the navigation button for the section being viewed.
   ========================================================================== */

function setupActiveTracking() {
  const pills = Array.from(document.querySelectorAll(".nav-pill"));

  const sections = MENU_DATA.map((category) =>
    document.getElementById(category.id)
  );

  const navElement = document.querySelector(".category-nav");

  if (!pills.length || !navElement) {
    return;
  }

  function setActive(categoryId) {
    pills.forEach((pill) => {

      const isActive = pill.dataset.target === categoryId;

      pill.classList.toggle("active", isActive);

      pill.setAttribute("aria-selected", isActive ? "true" : "false");

      // Keep the active button visible inside the scrolling bar.
      if (isActive) {
        pill.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }

    });
  }

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });

    },
    {
      root: null,
      rootMargin: `-${navElement.offsetHeight + 20}px 0px -70% 0px`,
      threshold: 0
    }
  );

  sections.forEach((section) => {
    if (section) {
      observer.observe(section);
    }
  });

  // Highlight the first category when the page loads.
  if (sections[0]) {
    setActive(sections[0].id);
  }
}


/* ==========================================================================
   6. INITIALIZE THE DIGITAL MENU
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  renderNav();

  renderMenu();

  setupActiveTracking();

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});

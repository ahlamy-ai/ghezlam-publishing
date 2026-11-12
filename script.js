const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();

// Add verified titles to this list when publication details and store pages are ready.
const publications = [];
const grid = document.querySelector("#book-grid");
const search = document.querySelector("#book-search");
const count = document.querySelector("#catalog-count");

function renderCatalog(query = "") {
  const matches = publications.filter(book =>
    [book.title, book.description, book.category].join(" ").toLowerCase().includes(query.toLowerCase())
  );
  count.textContent = publications.length ? `${matches.length} publication(s)` : "A growing collection";
  if (!matches.length) {
    grid.innerHTML = publications.length
      ? '<article class="empty-state"><h3>No matching titles.</h3><p>Try another search term.</p></article>'
      : '<article class="empty-state"><div class="empty-symbol">✳</div><h3>The next chapter starts here.</h3><p>Our catalog is being curated. Published titles and verified store links will appear here soon.</p></article>';
    return;
  }
  grid.innerHTML = matches.map(book => `
    <article class="book-card">
      <p class="eyebrow">${escapeHtml(book.category || "GHEZLAM EDITION")}</p>
      <h3>${escapeHtml(book.title)}</h3>
      <p>${escapeHtml(book.description || "")}</p>
      ${book.url ? `<a href="${escapeAttr(book.url)}" target="_blank" rel="noopener">Find the book ↗</a>` : ""}
    </article>`).join("");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(value) { return escapeHtml(value); }
search?.addEventListener("input", event => renderCatalog(event.target.value));
renderCatalog();
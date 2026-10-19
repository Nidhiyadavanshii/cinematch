const IMG = "https://image.tmdb.org/t/p/w500";
const NO_POSTER = "https://placehold.co/500x750/1b2236/9aa4b5?text=No+Poster";

let movies = {};
let titles = [];
let activeIndex = -1;

const input = document.getElementById("searchInput");
const box = document.getElementById("suggestions");
const resultSection = document.getElementById("resultSection");
const selectedBox = document.getElementById("selected");
const resultsBox = document.getElementById("results");
const popularBox = document.getElementById("popular");

fetch("movies.json")
  .then(r => r.json())
  .then(data => {
    movies = data;
    titles = Object.keys(data);
    showPopular();
  })
  .catch(() => {
    popularBox.textContent = "movies.json load nahi hui. Website ko 'python -m http.server 8000' se chalayein.";
    popularBox.className = "error";
  });

function makePoster(m, title) {
  const img = document.createElement("img");
  img.alt = title;
  img.loading = "lazy";
  img.src = m.poster ? IMG + m.poster : NO_POSTER;
  img.onerror = () => { img.onerror = null; img.src = NO_POSTER; };
  return img;
}

function metaText(m) {
  return [m.year, m.rating ? "⭐ " + m.rating : ""].filter(Boolean).join("  •  ");
}

function makeCard(title) {
  const m = movies[title];
  const el = document.createElement("article");
  el.className = "card";
  el.tabIndex = 0;
  const info = document.createElement("div");
  info.className = "info";
  const h = document.createElement("h3");
  h.textContent = title;
  const p = document.createElement("p");
  p.textContent = metaText(m);
  info.append(h, p);
  el.append(makePoster(m, title), info);
  el.addEventListener("click", () => recommend(title));
  el.addEventListener("keydown", e => { if (e.key === "Enter") recommend(title); });
  return el;
}

function showPopular() {
  titles
    .filter(t => movies[t].votes >= 1500)
    .sort((a, b) => movies[b].rating - movies[a].rating)
    .slice(0, 15)
    .forEach(t => popularBox.append(makeCard(t)));
}

function recommend(title) {
  const m = movies[title];
  input.value = title;
  box.hidden = true;
  selectedBox.replaceChildren();
  resultsBox.replaceChildren();

  const feat = document.createElement("div");
  feat.className = "featured";
  const det = document.createElement("div");
  det.className = "details";
  const h = document.createElement("h3");
  h.textContent = title;
  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = metaText(m);
  const chips = document.createElement("div");
  chips.className = "chips";
  m.genres.forEach(g => {
    const c = document.createElement("span");
    c.className = "chip";
    c.textContent = g;
    chips.append(c);
  });
  const ov = document.createElement("p");
  ov.className = "overview";
  ov.textContent = m.overview;
  det.append(h, meta, chips, ov);
  feat.append(makePoster(m, title), det);
  selectedBox.append(feat);

  m.recs.forEach(t => { if (movies[t]) resultsBox.append(makeCard(t)); });
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth" });
}

// Search suggestions
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  box.replaceChildren();
  activeIndex = -1;
  if (!q) { box.hidden = true; return; }
  const starts = titles.filter(t => t.toLowerCase().startsWith(q));
  const contains = titles.filter(t => !t.toLowerCase().startsWith(q) && t.toLowerCase().includes(q));
  const matches = [...starts, ...contains].slice(0, 8);
  matches.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    li.addEventListener("click", () => recommend(t));
    box.append(li);
  });
  box.hidden = matches.length === 0;
});

input.addEventListener("keydown", e => {
  const items = [...box.children];
  if (!items.length) return;
  if (e.key === "ArrowDown") activeIndex = (activeIndex + 1) % items.length;
  else if (e.key === "ArrowUp") activeIndex = (activeIndex - 1 + items.length) % items.length;
  else if (e.key === "Enter") {
    e.preventDefault();
    recommend(items[Math.max(activeIndex, 0)].textContent);
    return;
  } else return;
  e.preventDefault();
  items.forEach((li, i) => li.classList.toggle("active", i === activeIndex));
});

document.addEventListener("click", e => { if (!e.target.closest(".search")) box.hidden = true; });
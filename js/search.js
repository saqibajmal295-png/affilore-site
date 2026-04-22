document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let products = [];

  if (!searchInput || !searchResults) return;

  fetch('/search.json')
    .then(res => res.json())
    .then(data => {
      products = data;
    });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query.length === 0) {
      searchResults.style.display = 'none';
      return;
    }

    const filtered = products.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

    if (filtered.length > 0) {
      filtered.forEach(p => {
        const a = document.createElement('a');
        a.href = p.url;
        a.className = 'search-result-item';
        a.innerHTML = `<strong>${p.title}</strong><br><small>${p.category}</small>`;
        searchResults.appendChild(a);
      });
      searchResults.style.display = 'block';
    } else {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      div.textContent = 'No results found.';
      searchResults.appendChild(div);
      searchResults.style.display = 'block';
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchResults.style.display = 'none';
    }
  });
});

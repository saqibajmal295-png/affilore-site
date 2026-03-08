import glob
import os

repo_dir = r"G:\software\frontend"

html_files = glob.glob(os.path.join(repo_dir, "**", "*.html"), recursive=True)

for filepath in html_files:
    if 'patch' in filepath.lower() or 'saas-audit' in filepath.lower(): continue

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # Fix 1: Cookie banner click logic
    # In index.html, the cookie banner logic doesn't hide it properly if the button doesn't have the ID or the JS is broken
    # Let's ensure cookie banner ID and JS correspond nicely.
    html = html.replace('''            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('affilore_cookies_accepted', 'true');
                cookieBanner.classList.add('hidden');
            });''', '''            if(cookieAccept) {
                cookieAccept.addEventListener('click', () => {
                    localStorage.setItem('affilore_cookies_accepted', 'true');
                    cookieBanner.style.display = 'none';
                });
            }''')
    
    html = html.replace('''            if (localStorage.getItem('affilore_cookies_accepted') === 'true') {
                cookieBanner.classList.add('hidden');
            }''', '''            if (localStorage.getItem('affilore_cookies_accepted') === 'true') {
                if(cookieBanner) cookieBanner.style.display = 'none';
            }''')

    # Fix 2: activeCategory mismatch
    if 'index.html' in filepath and os.path.dirname(filepath) == repo_dir:
        # User screenshot shows "Finance" highlighted on homepage
        html = html.replace('<a href="/" class="filter-pill">All Tools</a>', '<a href="/" class="filter-pill active">All Tools</a>')
        html = html.replace('<a href="/finance/" class="filter-pill active">💰 Finance</a>', '<a href="/finance/" class="filter-pill">💰 Finance</a>')
        
    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Patched {filepath}")

print("Cookie banner and active category pills patched.")

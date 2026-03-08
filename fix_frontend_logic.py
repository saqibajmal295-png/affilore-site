import glob
import os
import re

repo_dir = r"G:\software\frontend"

html_files = glob.glob(os.path.join(repo_dir, "**", "*.html"), recursive=True)

for filepath in html_files:
    if 'saas-audit' in filepath.lower() or 'patch' in filepath.lower(): continue

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # 1. Fix the category filter bug (it got reverted somehow)
    old_filter = '''                if (activeCategory !== 'all') {
                    tools = tools.filter(t => Array.isArray(t.category) ? t.category.includes(activeCategory) : t.category === activeCategory);
                }'''
    
    new_filter = '''                if (activeCategory !== 'all' && activeCategory !== 'All Tools') {
                    tools = tools.filter(t => {
                        const qCat = activeCategory.toLowerCase();
                        if (Array.isArray(t.category)) {
                            return t.category.some(c => c.toLowerCase() === qCat);
                        }
                        return t.category && t.category.toLowerCase() === qCat;
                    });
                }'''
    
    html = html.replace(old_filter, new_filter)

    # 2. Fix the Cookie Banner logic (make it robust)
    cookie_js_old = '''            if (localStorage.getItem('affilore_cookies_accepted') === 'true') {
                if(cookieBanner) cookieBanner.style.display = 'none';
            }
            if(cookieAccept) {
                cookieAccept.addEventListener('click', () => {
                    localStorage.setItem('affilore_cookies_accepted', 'true');
                    cookieBanner.style.display = 'none';
                });
            }'''
    
    cookie_js_new = '''            if (localStorage.getItem('affilore_cookies_accepted') === 'true') {
                if(cookieBanner) cookieBanner.style.display = 'none';
            }
            if(cookieAccept) {
                cookieAccept.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.setItem('affilore_cookies_accepted', 'true');
                    if(cookieBanner) cookieBanner.style.display = 'none';
                });
            }'''
    
    html = html.replace(cookie_js_old, cookie_js_new)

    # Make absolutely sure it's applied even if the old JS signature is different
    # fallback for cookie logic
    if 'cookieAccept.addEventListener(' not in html and 'cookieAccept' in html:
        html = html.replace("const cookieAccept = document.getElementById('cookieAccept');", 
                            "const cookieAccept = document.getElementById('cookieAccept');\n" + cookie_js_new)


    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Patched {filepath}")

print("Done patching.")

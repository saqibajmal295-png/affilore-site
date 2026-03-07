import os
import re
import shutil

base_dir = r"G:\software\frontend"

# 1. Restructure folders for clean URLs
pages_to_move = ['about', 'contact', 'privacy', 'terms']
for page in pages_to_move:
    file_path = os.path.join(base_dir, f"{page}.html")
    dir_path = os.path.join(base_dir, page)
    
    if os.path.exists(file_path):
        os.makedirs(dir_path, exist_ok=True)
        shutil.move(file_path, os.path.join(dir_path, "index.html"))
        print(f"Moved {page}.html to {page}/index.html")

# 2. Update all links and forms in all HTML files
html_files = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original_content = content
        
        # Replace links to legal pages with directory paths
        content = re.sub(r'href="(?:\.\./)*(?:/)?about\.html"', 'href="/about/"', content)
        content = re.sub(r'href="(?:\.\./)*(?:/)?contact\.html"', 'href="/contact/"', content)
        content = re.sub(r'href="(?:\.\./)*(?:/)?privacy\.html"', 'href="/privacy/"', content)
        content = re.sub(r'href="(?:\.\./)*(?:/)?terms\.html"', 'href="/terms/"', content)
        
        # Replace mailto button
        content = re.sub(
            r'<a href="https://mail\.google\.com/mail/\?view=cm&fs=1&to=affilore4@gmail\.com"[^>]*>Open in Mail</a>',
            '<a href="mailto:affilore4@gmail.com" class="btn-cta" style="width:100%; justify-content:center;">Open in Mail</a>',
            content
        )
        content = re.sub(
            r'<a href="mailto:affilore4@gmail\.com" style="[^"]*">Open in Mail</a>',
            '<a href="mailto:affilore4@gmail.com" class="btn-cta" style="width:100%; justify-content:center;">Open in Mail</a>',
            content
        )

        # Contact form fix: revert to simple mailto
        content = re.sub(
            r"window\.open\('https://mail\.google\.com/mail/\?view=cm&fs=1&to=affilore4@gmail\.com&su='.*?\)",
            "window.location.href='mailto:affilore4@gmail.com?subject=' + encodeURIComponent('Affilore Hub: ' + document.getElementById('subject').value) + '&body=' + encodeURIComponent('From: ' + document.getElementById('name').value + '\\n\\n' + document.getElementById('message').value);",
            content
        )

        # 3. Patch renderTools logic in index.html files to handle array categories
        # Look for the line: const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
        # And replace it with an array friendly version
        if "renderTools" in content:
            content = content.replace(
                "const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;",
                "const matchesCategory = activeCategory === 'all' || (Array.isArray(tool.category) ? tool.category.includes(activeCategory) : tool.category === activeCategory);"
            )
            # Ensure tools.json is referenced cleanly
            content = re.sub(r"fetch\('(?:\.\./)*(?:/)?tools\.json'\)", "fetch('/tools.json')", content)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Patched: {filepath}")
    except Exception as e:
        print(f"Failed to patch {filepath}: {e}")

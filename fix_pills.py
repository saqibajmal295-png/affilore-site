import os
import re

base_dir = r"G:\software\frontend"
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
        
        path_lower = filepath.replace("\\", "/").lower()
        if "finance/index.html" in path_lower:
            content = content.replace('class="filter-pill active">All Tools', 'class="filter-pill">All Tools')
            content = content.replace('class="filter-pill">💰 Finance', 'class="filter-pill active">💰 Finance')
            content = content.replace("let activeCategory = 'all';", "let activeCategory = 'Finance';")
            
        elif "real-estate/index.html" in path_lower:
            content = content.replace('class="filter-pill active">All Tools', 'class="filter-pill">All Tools')
            content = content.replace('class="filter-pill">🏠 Real Estate', 'class="filter-pill active">🏠 Real Estate')
            content = content.replace("let activeCategory = 'all';", "let activeCategory = 'Real Estate';")
            
        elif "seo-marketing/index.html" in path_lower:
            content = content.replace('class="filter-pill active">All Tools', 'class="filter-pill">All Tools')
            content = content.replace('class="filter-pill">📈 SEO & Marketing', 'class="filter-pill active">📈 SEO & Marketing')
            content = content.replace("let activeCategory = 'all';", "let activeCategory = 'SEO & Marketing';")
            
        elif "ai-content-creation/index.html" in path_lower:
            content = content.replace('class="filter-pill active">All Tools', 'class="filter-pill">All Tools')
            content = content.replace('class="filter-pill">🤖 AI Content Creation', 'class="filter-pill active">🤖 AI Content Creation')
            content = content.replace("let activeCategory = 'all';", "let activeCategory = 'AI Content Creation';")
            
        elif "developer-productivity/index.html" in path_lower:
            content = content.replace('class="filter-pill active">All Tools', 'class="filter-pill">All Tools')
            content = content.replace('class="filter-pill">⚡ Developer Productivity', 'class="filter-pill active">⚡ Developer Productivity')
            content = content.replace("let activeCategory = 'all';", "let activeCategory = 'Developer Productivity';")

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Patched pills in: {filepath}")
    except Exception as e:
        print(f"Failed to patch {filepath}: {e}")

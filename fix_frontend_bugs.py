import os
import glob
import re

# 1. Update tools.json
tools_json_path = r'G:\software\frontend\tools.json'
with open(tools_json_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"/images/thumbnails/finance-runway.png"', '"/finance-runway.png"')

with open(tools_json_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated tools.json")

# 2. Patch HTML files to add <a> wrapper to tool cards and make category filter case-insensitive
html_files = glob.glob(r'G:\software\frontend\**\*.html', recursive=True)

for filepath in html_files:
    # Skip saas-audit tool
    if 'saas-audit' in filepath.lower(): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    original_html = html
    
    # Wrap with anchor tag if not already wrapped
    old_card_pattern = r'<article class="tool-card"[^>]*>(\s*<div class="tool-card-thumb">)'
    
    if '<a href="${tool.url}"' not in html and 'renderTools' not in html and 'toolGrid.innerHTML = pageTools.map' in html:
        # Patch the rendering template
        html = re.sub(
            r'(<article class="tool-card"[^>]*>)\s*<div class="tool-card-thumb">',
            r'\1\n                <a href="${tool.url}" style="display:block;height:100%;text-decoration:none;color:inherit;">\n                    <div class="tool-card-thumb">',
            html
        )
        html = re.sub(
            r'(<p class="tool-card-desc">\$\{tool\.description\}</p>\s*</div>)\s*</article>',
            r'\1\n                </a>\n            </article>',
            html
        )

    # Make category filtering case-insensitive
    old_filter = r'tools = tools\.filter\(t => Array\.isArray\(t\.category\) \? t\.category\.includes\(activeCategory\) : t\.category === activeCategory\);'
    new_filter = '''tools = tools.filter(t => {
                        if (Array.isArray(t.category)) {
                            return t.category.some(c => c.toLowerCase() === activeCategory.toLowerCase());
                        }
                        return t.category && t.category.toLowerCase() === activeCategory.toLowerCase();
                    });'''
    
    if old_filter in html:
        html = html.replace(old_filter, new_filter)
        
    if html != original_html:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Patched: {filepath}")

print("Done patching.")

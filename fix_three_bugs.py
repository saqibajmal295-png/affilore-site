import os
import glob
import re

# 1. Update tools.json just to be sure
tools_json_path = r'G:\software\frontend\tools.json'
with open(tools_json_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure thumbnail is exactly /finance-runway.png
content = content.replace('"thumbnail": "./finance-runway.png"', '"thumbnail": "/finance-runway.png"')
content = content.replace('"thumbnail": "finance-runway.png"', '"thumbnail": "/finance-runway.png"')
content = content.replace('"thumbnail": "/images/thumbnails/finance-runway.png"', '"thumbnail": "/finance-runway.png"')

with open(tools_json_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Verified tools.json thumbnail path.")

# 2. Fix the Category Crash on Category pages
# On category pages like /finance/index.html, `tools.json` path is wrong (404)
category_dirs = [
    'finance', 'real-estate', 'seo-marketing', 
    'ai-content-creation', 'developer-productivity'
]

for cat_dir in category_dirs:
    filepath = os.path.join(r'G:\software\frontend', cat_dir, 'index.html')
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
            
        old_path1 = "const TOOLS_JSON_PATH = 'tools.json';"
        old_path2 = 'const TOOLS_JSON_PATH = "tools.json";'
        new_path = "const TOOLS_JSON_PATH = '/tools.json';"
        
        html = html.replace(old_path1, new_path)
        html = html.replace(old_path2, new_path)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Patched TOOLS_JSON_PATH in {filepath}")

# 3. Fix the massive vertical gap on saas-audit.html on mobile
saas_audit_path = r'G:\software\frontend\tools\saas-audit.html'
if os.path.exists(saas_audit_path):
    with open(saas_audit_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # We will inject height: auto; min-height: 0; directly onto .tool-wrap CSS
    # just in case something else is forcing its height.
    if 'height: auto !important;' not in html:
        css_addition = '''
        /* Bug Fix: Mobile Gap */
        .tool-wrap { height: auto !important; min-height: 0 !important; }
        .results-panel { height: auto !important; min-height: 0 !important; }
'''
        html = html.replace('/* SEO Article */', css_addition + '        /* SEO Article */')
        
    # User said "remove any hardcoded min-height: 100vh;". Let's aggressively strip it if it exists by some typo
    html = re.sub(r'min-height:\s*100vh;?', '', html)
    html = re.sub(r'height:\s*100vh;?', '', html)
    
    with open(saas_audit_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Patched mobile gap in saas-audit.html")

print("All fixes applied successfully.")

import os
import re

base_path = 'g:/Affilore'
main_css_path = os.path.join(base_path, 'css/main.css')
index_path = os.path.join(base_path, 'index.html')

# 1. Update css/main.css
with open(main_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace all #FFD700 and #F9D423 with #F5A623
css_content = css_content.replace('#FFD700', '#F5A623')
css_content = css_content.replace('#F9D423', '#F5A623')
css_content = css_content.replace('rgba(255, 215, 0', 'rgba(245, 166, 35') # RGBA equivalent of F5A623
css_content = css_content.replace('#D4AF37', '#D48C1C') # darker version

# Fix Button Readability
btn_css = """.btn--primary, .btn--cta {
  background: var(--premium-gradient) !important;
  border: none !important;
  color: #111111 !important;
  font-weight: bold !important;
}"""

# Replace existing button css
css_content = re.sub(r'\.btn--primary, \.btn--cta\s*\{[^}]*\}', btn_css, css_content)

with open(main_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

# 2. Update index.html
with open(index_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

html_content = html_content.replace('#FFD700', '#F5A623')
html_content = html_content.replace('#F9D423', '#F5A623')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Applied #F5A623 theme and button readability globally.")

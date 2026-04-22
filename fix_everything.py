import os
import re

base_path = 'g:/Affilore'

# 1. Update css/main.css to strictly use #FFFF00 for all accents
main_css_path = os.path.join(base_path, 'css/main.css')
with open(main_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Add root variables to override styles.css accent colors
root_vars = """
:root {
  --color-accent: #FFFF00 !important;
  --color-accent-light: #FFFF00 !important;
  --color-accent-dark: #CCCC00 !important;
  --color-accent-glow: rgba(255, 255, 0, 0.15) !important;
  --color-accent-gradient: linear-gradient(135deg, #FFFF00, #CCCC00) !important;
  --color-cta: #FFFF00 !important;
  --color-cta-hover: #FFFF00 !important;
  --color-cta-gradient: linear-gradient(135deg, #FFFF00, #CCCC00) !important;
  --color-star: #FFFF00 !important;
  --primary-accent: #FFFF00 !important;
  --premium-gradient: linear-gradient(135deg, #FFFF00 0%, #CCCC00 100%) !important;
}
"""

if '--color-accent: #FFFF00' not in css_content:
    # insert after the first :root {
    css_content = re.sub(r':root\s*\{', root_vars, css_content, count=1)

dropdown_css = """
/* Dropdown Menu Styles */
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #111;
  min-width: 220px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  top: 100%;
  left: -20px;
}
.dropdown-content a {
  color: #FFFFFF !important;
  padding: 12px 16px !important;
  text-decoration: none !important;
  display: block !important;
  font-size: 0.9rem !important;
  border-bottom: 1px solid #222;
  text-transform: none !important;
  letter-spacing: normal !important;
}
.dropdown-content a::after {
  display: none !important;
}
.dropdown-content a:last-child {
  border-bottom: none;
}
.dropdown-content a:hover {
  background-color: #222;
  color: #FFFF00 !important;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.nav-links {
  align-items: center;
}
.dropbtn {
  padding: var(--space-2) 0;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  cursor: pointer;
}
.dropdown:hover .dropbtn {
  color: #FFFF00;
}
"""

if '/* Dropdown Menu Styles */' not in css_content:
    css_content += '\n' + dropdown_css

with open(main_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)


# 2. Update all HTML files
dropdown_html = """<div class="dropdown">
            <span class="dropbtn">Categories</span>
            <div class="dropdown-content">
              <a href="/coffee/">Coffee & Espresso</a>
              <a href="/smart-kitchen/">Smart Kitchen</a>
              <a href="/air-quality/">Air Quality</a>
              <a href="/home-cleaning/">Home Cleaning</a>
              <a href="/smart-home/">Smart Home & Security</a>
            </div>
          </div>"""

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Remove "Best Picks"
            content = re.sub(r'<a href="[^"]*#featured"[^>]*>Best Picks</a>', '', content)
            
            # Replace "Categories" with dropdown
            # It could be <a href="/#categories">Categories</a> or <a href="#categories">Categories</a>
            content = re.sub(r'<a href="[^"]*#categories"[^>]*>Categories</a>', dropdown_html, content)
            
            # Clean up empty lines
            content = re.sub(r'^[ \t]+$\n', '', content, flags=re.MULTILINE)
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated header in {file_path}")


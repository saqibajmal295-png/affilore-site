import os
import re

base_path = 'g:/Affilore'

# Update styles.css
styles_path = os.path.join(base_path, 'styles.css')
with open(styles_path, 'r', encoding='utf-8') as f:
    styles_content = f.read()

# Replace text colors in variables
styles_content = re.sub(r'--color-text-secondary:\s*#[a-fA-F0-9]+;', '--color-text-secondary: #FFFFFF;', styles_content)
styles_content = re.sub(r'--color-text-tertiary:\s*#[a-fA-F0-9]+;', '--color-text-tertiary: #FFFFFF;', styles_content)
styles_content = re.sub(r'--color-text-muted:\s*#[a-fA-F0-9]+;', '--color-text-muted: #FFFFFF;', styles_content)
styles_content = re.sub(r'--color-text-primary:\s*#[a-fA-F0-9]+;', '--color-text-primary: #FFFFFF;', styles_content)

# Update css/main.css
main_css_path = os.path.join(base_path, 'css/main.css')
with open(main_css_path, 'r', encoding='utf-8') as f:
    main_css_content = f.read()

# Change background to #000000 instead of #0a0a0a
main_css_content = main_css_content.replace('--bg-color: #0a0a0a;', '--bg-color: #000000;')
# Change premium gradient to yellow
main_css_content = re.sub(r'--premium-gradient: linear-gradient.*?;\n', '--premium-gradient: linear-gradient(135deg, #FFDF00 0%, #FFB300 100%);\n', main_css_content)

with open(styles_path, 'w', encoding='utf-8') as f:
    f.write(styles_content)

with open(main_css_path, 'w', encoding='utf-8') as f:
    f.write(main_css_content)

# Update js/main.js
main_js_path = os.path.join(base_path, 'js/main.js')
with open(main_js_path, 'r', encoding='utf-8') as f:
    main_js_content = f.read()

# Make particles strictly yellow, change quantity
main_js_content = re.sub(r'"value": \["#F9D423", "#FFD700", "#FF4E50"\]', '"value": ["#FFD700", "#FFDF00", "#FFC300"]', main_js_content)
main_js_content = re.sub(r'"value": 60,', '"value": 80,', main_js_content)

with open(main_js_path, 'w', encoding='utf-8') as f:
    f.write(main_js_content)

print("Updated text colors, theme colors and particles.")

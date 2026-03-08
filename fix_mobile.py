import os

repo_dir = r"G:\software\frontend"
filepath = os.path.join(repo_dir, "tools", "saas-audit.html")

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix 1: ensure body and html don't overflow horizontally
html = html.replace('body {\n            font-family:', 'html, body {\n            overflow-x: hidden;\n            max-width: 100vw;\n        }\n\n        body {\n            font-family:')

# Fix 2: Add aggressive mobile constraints
css_hook = '@media(max-width:600px) {'
css_patch = '''@media(max-width:600px) {
            .tool-wrap, .panel { 
                max-width: 100vw; 
                overflow-x: hidden;
            }
            .panel {
                padding: 16px !important;
                margin: 0 !important;
                width: calc(100vw - 20px) !important;
            }
            .form-input {
                width: 100% !important;
                max-width: 100% !important;
            }'''

html = html.replace(css_hook, css_patch)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("saas-audit.html patched for aggressive mobile width constraint.")

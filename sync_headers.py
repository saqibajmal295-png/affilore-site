import os
import re

base_path = 'g:/Affilore'

# Read index.html to get the source of truth
with open(os.path.join(base_path, 'index.html'), 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract header and footer
header_match = re.search(r'(<header class="site-header" id="site-header">.*?</header>)', index_html, re.DOTALL)
footer_match = re.search(r'(<footer class="site-footer" id="site-footer">.*</footer>)', index_html, re.DOTALL)

if not header_match or not footer_match:
    print("Could not find header or footer in index.html")
    exit(1)

new_header = header_match.group(1)
new_footer = footer_match.group(1)

# Function to fix active class based on file path
def customize_header(header_html, file_path):
    # Remove all active classes
    header_html = header_html.replace('class="active"', '')
    header_html = header_html.replace('class="logo active"', 'class="logo"')
    header_html = header_html.replace('class=" active"', '')
    
    # Clean up any empty class attributes
    header_html = header_html.replace(' class=""', '')
    
    # Determine which link should be active
    rel_path = os.path.relpath(file_path, base_path).replace('\\', '/')
    
    if rel_path == 'index.html':
        target = 'href="/"'
    elif rel_path == 'about.html':
        target = 'href="/about/"'
    elif rel_path == 'contact.html':
        target = 'href="/contact/"'
    elif 'review' in rel_path:
        target = 'href="/review/"'
    else:
        # No active class
        return header_html
    
    # Add active class to target
    header_html = header_html.replace(target, f'{target} class="active"')
    return header_html

# Process all html files
for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            # Skip index.html in the root as it's the source
            if file_path.replace('\\', '/') == os.path.join(base_path, 'index.html').replace('\\', '/'):
                continue
                
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Replace header
            content = re.sub(r'<header class="site-header" id="site-header">.*?</header>', customize_header(new_header, file_path), content, flags=re.DOTALL)
            
            # Replace footer
            content = re.sub(r'<footer class="site-footer" id="site-footer">.*</footer>', new_footer, content, flags=re.DOTALL)
            
            # Link main.css in head if not present
            if '/css/main.css' not in content:
                # Find styles.css link and insert main.css after it
                content = re.sub(r'(<link rel="stylesheet" href=".*?styles\.css">)', r'\1\n  <link rel="stylesheet" href="/css/main.css">', content)
                
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {file_path}")

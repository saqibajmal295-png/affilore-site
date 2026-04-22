import os
import re

base_path = 'g:/Affilore'
index_path = os.path.join(base_path, 'index.html')

# 1. Re-add Legal column to index.html
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

company_col = """        <div class="footer-col">
          <h4>Company</h4>
          <a href="/about/">About Us</a>
          <a href="/about/#review-process">How We Test</a>
          <a href="/about/#transparency">Editorial Policy</a>
          <a href="/contact/">Contact</a>
        </div>"""

legal_col = """
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms/">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>"""

if '<h4>Legal</h4>' not in index_content:
    index_content = index_content.replace(company_col, company_col + legal_col)
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print("Re-added Legal column to index.html")

# 2. Remove FTC Disclosure from all HTML files
for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove <a href="#">FTC Disclosure</a>
            new_content = re.sub(r'<a href="[^"]*">FTC Disclosure</a>[ \t]*\n?', '', content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Removed FTC Disclosure from {file_path}")

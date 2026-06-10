import os
import glob
import re

html_files = glob.glob("*.html")

nav_start_pattern = re.compile(r'(<nav id="main-navigation"[^>]*>\s*)')
home_link = '<a class="font-label-md text-label-md hover:text-on-surface transition-colors hover:bg-glass-border rounded-lg px-3 py-2 text-white" href="/">Home</a>\n                '

for file in html_files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
        
    if 'href="/">Home</a>' not in content:
        new_content = nav_start_pattern.sub(r'\1' + home_link, content)
        
        if new_content != content:
            with open(file, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {file}")

print("Done.")

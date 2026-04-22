import os
import re
import subprocess

files_to_move = [
    ('about.html', 'about'),
    ('privacy-policy.html', 'privacy-policy'),
    ('terms.html', 'terms'),
    ('contact.html', 'contact'),
    ('review.html', 'reviews')
]

for file, folder in files_to_move:
    if os.path.exists(file):
        os.makedirs(folder, exist_ok=True)
        dest = f"{folder}/index.html"
        # Move the file using git mv
        subprocess.run(['git', 'mv', file, dest])
        print(f"Moved {file} to {dest}")
        
        # Read the newly moved file
        with open(dest, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Update asset paths to use absolute paths from root
        content = content.replace('href="styles.css"', 'href="/styles.css"')
        content = content.replace('src="main.js"', 'src="/main.js"')
        
        # Just in case there are relative paths to js
        content = content.replace('src="js/', 'src="/js/')
        
        with open(dest, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated paths in {dest}")

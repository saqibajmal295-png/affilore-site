import os
import re

base_path = 'g:/Affilore'
cdn_script = '<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>'
particles_div = '<div id="particles-js"></div>'
init_script = '<script src="/js/main.js"></script>'

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Inject CDN into head
            if cdn_script not in content:
                content = content.replace('</head>', f'  {cdn_script}\n</head>')
                
            # Inject div into body
            if particles_div not in content:
                content = re.sub(r'(<body.*?>)', rf'\1\n  {particles_div}', content, count=1)
                
            # Inject init script before </body>
            if init_script not in content:
                content = content.replace('</body>', f'  {init_script}\n</body>')
                
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {file_path}")

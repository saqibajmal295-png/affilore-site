import os

base_path = 'g:/Affilore'
about_path = os.path.join(base_path, 'about', 'index.html')

if os.path.exists(about_path):
    with open(about_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<a href="/about/" class="active">About</a>' in content and '<a href="/free-tools/">Free Tools</a>' not in content:
        content = content.replace(
            '<a href="/about/" class="active">About</a>', 
            '<a href="/free-tools/">Free Tools</a>\n          <a href="/about/" class="active">About</a>'
        )
        with open(about_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated about/index.html")

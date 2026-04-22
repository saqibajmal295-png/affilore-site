import os

base_path = 'g:/Affilore'

for root, dirs, files in os.walk(base_path):
    # skip free-tools directory since it might not have the header
    if 'free-tools' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find the nav links.
            # We want to replace `<a href="/about/">About</a>` with `<a href="/free-tools/">Free Tools</a>\n          <a href="/about/">About</a>`
            if '<a href="/about/">About</a>' in content and '<a href="/free-tools/">Free Tools</a>' not in content:
                content = content.replace(
                    '<a href="/about/">About</a>', 
                    '<a href="/free-tools/">Free Tools</a>\n          <a href="/about/">About</a>'
                )
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated header in {file_path}")

import os

base_path = 'g:/Affilore'

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Determine correct href depending on if we are at the root index.html
            is_root_index = (file_path.replace('\\', '/') == os.path.join(base_path, 'index.html').replace('\\', '/'))
            
            featured_href = '"#featured"' if is_root_index else '"/#featured"'
            categories_href = '"#categories"' if is_root_index else '"/#categories"'
            
            # Replace nav links in header
            content = content.replace('<a href="#">Best Picks</a>', f'<a href={featured_href}>Best Picks</a>')
            content = content.replace('<a href="#">Categories</a>', f'<a href={categories_href}>Categories</a>')
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated nav links in {file_path}")

import os
import re

base_path = 'g:/Affilore'

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Remove the Reviews link from the header/nav
            # It could be <a href="/review/">Reviews</a> or <a href="/review/" class="active">Reviews</a>
            # Also handle /reviews/ just in case
            content = re.sub(r'<a href="/reviews?/"[^>]*>Reviews</a>', '', content)
            
            # Remove any trailing whitespace that might be left on the empty line
            content = re.sub(r'^[ \t]+$\n', '', content, flags=re.MULTILINE)
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Removed Reviews link from {file_path}")

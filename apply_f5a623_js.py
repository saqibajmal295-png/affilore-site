import os
import re

base_path = 'g:/Affilore'

# Update js/main.js
main_js_path = os.path.join(base_path, 'js/main.js')
if os.path.exists(main_js_path):
    with open(main_js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    js_content = js_content.replace('#FFD700', '#F5A623')
    js_content = js_content.replace('#FFDF00', '#F5A623')
    js_content = js_content.replace('#FFC300', '#D48C1C')

    with open(main_js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("Updated js/main.js")

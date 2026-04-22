import os
import re

base_path = 'g:/Affilore'
index_path = os.path.join(base_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the broken image path, changing .png to .jpeg because .png doesn't exist
content = content.replace(
    'src="images/home-cleaning/roborock-qrevo-thumb.png"', 
    'src="/images/home-cleaning/roborock-qrevo-thumb.jpeg"'
)

# 2. Add Home Cleaning to the sidebar
sidebar_addition = '<li><a href="/air-quality/" style="color: #FFF; text-decoration: none; display: block; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">🌬️ Air Quality</a></li>\n        <li><a href="/home-cleaning/" style="color: #FFF; text-decoration: none; display: block; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">🧹 Home Cleaning</a></li>'

content = content.replace(
    '<li><a href="/air-quality/" style="color: #FFF; text-decoration: none; display: block; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">🌬️ Air Quality</a></li>',
    sidebar_addition
)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed broken image and updated sidebar.")

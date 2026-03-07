import os
import re

base_dir = r"G:\software\frontend"
html_files = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

DROPDOWN_CSS = """
        /* Dropdown */
        .dropdown { position: relative; }
        .dropdown-menu { position: absolute; top: calc(100% + 8px); left: 0; min-width: 220px; padding: 8px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 100; }
        .dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        .dropdown-item { display: block; width: 100%; padding: 10px 14px; border-radius: 8px; font-size: 0.84rem; color: #FFFFFF; text-align: left; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-decoration: none; }
        .dropdown-item:hover { color: #FFBF00; background: rgba(255, 191, 0, 0.06); }
        .chevron-down { width: 14px; height: 14px; margin-left: 4px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .dropdown:hover .chevron-down { transform: rotate(180deg); }
"""

count = 0
for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original_content = content
        
        # Check if the CSS rule ".dropdown:hover .dropdown-menu" exists in the content
        # If the HTML uses <div class="dropdown"> but has no corresponding CSS rule, inject it
        if '.dropdown:hover .dropdown-menu' not in content and 'class="dropdown"' in content:
            content = content.replace('</style>', DROPDOWN_CSS + '\n    </style>')
            print(f"Injected dropdown CSS into: {filepath}")
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
    except Exception as e:
        print(f"Failed: {filepath}: {e}")

print(f"\nTotal files patched: {count}")

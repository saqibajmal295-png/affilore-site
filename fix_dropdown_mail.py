import os
import re

base_dir = r"G:\software\frontend"
html_files = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

# The dropdown CSS block that needs to exist in EVERY page
DROPDOWN_CSS = """
        /* Dropdown */
        .dropdown { position: relative; }
        .dropdown-menu { position: absolute; top: calc(100% + 8px); left: 0; min-width: 220px; padding: 8px; background: var(--black-elevated); border: 1px solid var(--border); border-radius: var(--radius, 12px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 100; }
        .dropdown:hover .dropdown-menu, .dropdown-menu.show { opacity: 1; visibility: visible; transform: translateY(0); }
        .dropdown-item { display: block; width: 100%; padding: 10px 14px; border-radius: 8px; font-size: 0.84rem; color: #FFFFFF; text-align: left; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-decoration: none; }
        .dropdown-item:hover { color: #FFBF00; background: rgba(255, 191, 0, 0.06); }
        .chevron-down { width: 14px; height: 14px; margin-left: 4px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .dropdown:hover .chevron-down { transform: rotate(180deg); }
"""

# The Gmail compose URL (works on ALL devices - desktop, mobile, tablet)
GMAIL_COMPOSE = "https://mail.google.com/mail/?view=cm&fs=1&to=affilore4@gmail.com&su=Custom%20Tool%20Request"

count = 0
for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original_content = content

        # 1. INJECT DROPDOWN CSS if missing
        if '.dropdown-menu' not in content and '.dropdown' in content:
            # Insert right before </style>
            content = content.replace('</style>', DROPDOWN_CSS + '\n    </style>')

        # 2. FIX MAIL BUTTON - Replace ALL mailto links in the modal with Gmail compose URL
        # This pattern matches the "Open in Mail" button specifically
        content = re.sub(
            r'<a\s+href="mailto:affilore4@gmail\.com"\s*([^>]*?)>(\s*Open\s*\n?\s*in\s*\n?\s*Mail\s*)</a>',
            f'<a href="{GMAIL_COMPOSE}" target="_blank" rel="noopener noreferrer" \\1>Open in Mail</a>',
            content,
            flags=re.DOTALL
        )
        
        # Also fix standalone mailto Open in Mail buttons with class
        content = re.sub(
            r'<a href="mailto:affilore4@gmail\.com" class="btn-cta" style="width:100%; justify-content:center;">Open in Mail</a>',
            f'<a href="{GMAIL_COMPOSE}" target="_blank" rel="noopener noreferrer" class="btn-cta" style="width:100%; justify-content:center;">Open in Mail</a>',
            content
        )

        # 3. Fix contact form submission to also use Gmail compose
        content = content.replace(
            "window.location.href='mailto:affilore4@gmail.com?subject='",
            f"window.open('{GMAIL_COMPOSE}' + '&su='"
        )

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"Patched: {filepath}")

    except Exception as e:
        print(f"Failed: {filepath}: {e}")

print(f"\nTotal files patched: {count}")

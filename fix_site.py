import os
import re

base_dir = r"G:\software\frontend"
html_files = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        
        # 1. Colors and Dots
        content = content.replace('--text-secondary: #b0b0b0;', '--text-secondary: #F0F0F0;')
        content = content.replace('--text-muted: #666666;', '--text-muted: #CCCCCC;')
        content = content.replace('--text-muted: #666;', '--text-muted: #CCCCCC;')
        
        # Make paragraphs white explicitly if they use text-secondary
        content = content.replace('color: var(--text-secondary);', 'color: #FFFFFF;')
        
        # Dots visibility
        content = content.replace('rgba(255, 191, 0, 0.07)', 'rgba(255, 191, 0, 0.35)')
        content = content.replace('rgba(255, 191, 0, 0.04)', 'rgba(255, 191, 0, 0.25)')
        content = content.replace('rgba(255, 191, 0, 0.05)', 'rgba(255, 191, 0, 0.30)')

        # 2. Absolute Paths for Assets & Pages (fixing the 404s when navigating from /finance/ )
        # By using absolute paths (/about.html instead of about.html), it will always resolve to the root directory
        content = re.sub(r'href="(?:(?:\.\./)+)?about\.html"', 'href="/about.html"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?contact\.html"', 'href="/contact.html"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?privacy\.html"', 'href="/privacy.html"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?terms\.html"', 'href="/terms.html"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?index\.html"', 'href="/"', content)
        
        content = re.sub(r"fetch\('(?:(?:\.\./)+)?tools\.json'\)", "fetch('/tools.json')", content)
        content = re.sub(r'src="(?:(?:\.\./)+)?images/thumbnails/', 'src="/images/thumbnails/', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?tools/ai-podcast-hook\.html"', 'href="/tools/ai-podcast-hook.html"', content)
        
        # Clean URLs for categories just in case
        content = re.sub(r'href="(?:(?:\.\./)+)?finance\.html"', 'href="/finance/"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?real-estate\.html"', 'href="/real-estate/"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?seo-marketing\.html"', 'href="/seo-marketing/"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?ai-content-creation\.html"', 'href="/ai-content-creation/"', content)
        content = re.sub(r'href="(?:(?:\.\./)+)?developer-productivity\.html"', 'href="/developer-productivity/"', content)
        
        # 3. Open in Mail Button Fix
        # Use Google Mail web compose directly since mailto often fails on Windows PCs without a default client
        content = content.replace('href="mailto:affilore4@gmail.com" style="display:block; text-align:center; background-color:#FFBF00; color:#000; padding:10px; border-radius:5px; text-decoration:none; font-weight:bold;"', 'href="https://mail.google.com/mail/?view=cm&fs=1&to=affilore4@gmail.com" target="_blank" style="display:block; text-align:center; background-color:#FFBF00; color:#000; padding:10px; border-radius:5px; text-decoration:none; font-weight:bold;"')
        content = content.replace('href="mailto:affilore4@gmail.com" class="btn-cta" style="width:100%; justify-content:center;"', 'href="https://mail.google.com/mail/?view=cm&fs=1&to=affilore4@gmail.com" target="_blank" class="btn-cta" style="width:100%; justify-content:center;"')
        
        # Contact form handling
        content = content.replace("window.location.href='mailto:affilore4@gmail.com?subject='", "window.open('https://mail.google.com/mail/?view=cm&fs=1&to=affilore4@gmail.com&su='")

        # 4. Filter Pills Active State for Category Pages
        path_lower = filepath.replace("\\", "/").lower()
        if "finance/index.html" in path_lower:
            content = content.replace('class="filter-btn active" data-category="all"', 'class="filter-btn" data-category="all"')
            content = content.replace('class="filter-btn" data-category="Finance"', 'class="filter-btn active" data-category="Finance"')
        elif "real-estate/index.html" in path_lower:
            content = content.replace('class="filter-btn active" data-category="all"', 'class="filter-btn" data-category="all"')
            content = content.replace('class="filter-btn" data-category="Real Estate"', 'class="filter-btn active" data-category="Real Estate"')
        elif "seo-marketing/index.html" in path_lower:
            content = content.replace('class="filter-btn active" data-category="all"', 'class="filter-btn" data-category="all"')
            content = content.replace('class="filter-btn" data-category="SEO & Marketing"', 'class="filter-btn active" data-category="SEO & Marketing"')
        elif "ai-content-creation/index.html" in path_lower:
            content = content.replace('class="filter-btn active" data-category="all"', 'class="filter-btn" data-category="all"')
            content = content.replace('class="filter-btn" data-category="AI Content Creation"', 'class="filter-btn active" data-category="AI Content Creation"')
        elif "developer-productivity/index.html" in path_lower:
            content = content.replace('class="filter-btn active" data-category="all"', 'class="filter-btn" data-category="all"')
            content = content.replace('class="filter-btn" data-category="Developer Productivity"', 'class="filter-btn active" data-category="Developer Productivity"')

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Patched: {filepath}")
    except Exception as e:
        print(f"Failed to patch {filepath}: {e}")

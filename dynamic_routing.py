import os
import glob
import json
import shutil

repo_dir = r"G:\software\frontend"
tools_json_path = os.path.join(repo_dir, "tools.json")

with open(tools_json_path, 'r', encoding='utf-8') as f:
    tools = json.load(f)

for t in tools:
    tool_id = t["id"]
    source_html = os.path.join(repo_dir, "tools", f"{tool_id}.html")
    if not os.path.exists(source_html): continue
        
    categories = t["category"] if isinstance(t["category"], list) else [t["category"]]
    
    # Home/Alltools
    home_dir = os.path.join(repo_dir, "home", "alltool", tool_id)
    os.makedirs(home_dir, exist_ok=True)
    shutil.copy(source_html, os.path.join(home_dir, "index.html"))
    print(f"Created: {home_dir}/index.html")
    
    # Categories
    for cat in categories:
        cat_slug = cat.lower().replace(" & ", "-").replace(" ", "-")
        cat_dir = os.path.join(repo_dir, cat_slug, tool_id)
        os.makedirs(cat_dir, exist_ok=True)
        shutil.copy(source_html, os.path.join(cat_dir, "index.html"))
        print(f"Created: {cat_dir}/index.html")

old_render = '''                // Render cards
                toolGrid.innerHTML = pageTools.map((tool, i) => `
            <article class="tool-card" style="animation-delay: ${i * 0.07}s" id="tool-${tool.id}">
                <a href="${tool.url}" style="display:block;height:100%;text-decoration:none;color:inherit;">
                    <div class="tool-card-thumb">'''

new_render = '''                // Render cards
                toolGrid.innerHTML = pageTools.map((tool, i) => {
                    let linkPath = tool.url;
                    const path = window.location.pathname;
                    if (path === '/' || path === '/index.html' || path === '') {
                        if (!activeCategory || activeCategory.toLowerCase() === 'all' || activeCategory.toLowerCase() === 'all tools') {
                            linkPath = '/home/alltool/' + tool.id + '/';
                        } else {
                            let catSlug = activeCategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                            linkPath = '/' + catSlug + '/' + tool.id + '/';
                        }
                    } else {
                        let currentDir = window.location.pathname.replace('index.html', '');
                        if (!currentDir.endsWith('/')) currentDir += '/';
                        linkPath = currentDir + tool.id + '/';
                    }
                    return `
            <article class="tool-card" style="animation-delay: ${i * 0.07}s" id="tool-${tool.id}">
                <a href="${linkPath}" style="display:block;height:100%;text-decoration:none;color:inherit;">
                    <div class="tool-card-thumb">'''

close_tag_old = '''                </a>
            </article>
        `).join('');'''

close_tag_new = '''                </a>
            </article>
        `; }).join('');'''

html_files = glob.glob(os.path.join(repo_dir, "**", "*.html"), recursive=True)
for filepath in html_files:
    if 'saas-audit' in filepath.lower() or 'patch' in filepath.lower(): continue
    with open(filepath, 'r', encoding='utf-8') as f: html = f.read()
    if old_render in html:
        html = html.replace(old_render, new_render)
        html = html.replace(close_tag_old, close_tag_new)
        with open(filepath, 'w', encoding='utf-8') as f: f.write(html)
        print(f"Patched: {filepath}")

print("All dynamic routing and patching complete.")

import os

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

        # Fix filtering
        target_filter = "tools = tools.filter(t => t.category === activeCategory);"
        replacement_filter = "tools = tools.filter(t => Array.isArray(t.category) ? t.category.includes(activeCategory) : t.category === activeCategory);"
        content = content.replace(target_filter, replacement_filter)

        # Fix search
        target_search = """                    tools = tools.filter(t =>
                        t.title.toLowerCase().includes(q) ||
                        t.description.toLowerCase().includes(q) ||
                        t.category.toLowerCase().includes(q)
                    );"""
        
        replacement_search = """                    tools = tools.filter(t => {
                        const catStr = Array.isArray(t.category) ? t.category.join(' ') : t.category;
                        return t.title.toLowerCase().includes(q) ||
                        t.description.toLowerCase().includes(q) ||
                        catStr.toLowerCase().includes(q);
                    });"""
        
        content = content.replace(target_search, replacement_search)
        
        # Another variation of search just in case
        target_search2 = """tools = tools.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));"""
        replacement_search2 = """tools = tools.filter(t => { const catStr = Array.isArray(t.category) ? t.category.join(' ') : t.category; return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || catStr.toLowerCase().includes(q); });"""
        content = content.replace(target_search2, replacement_search2)

        # Fix rendering tag
        content = content.replace('<span class="tool-card-category">${tool.category}</span>', '<span class="tool-card-category">${Array.isArray(tool.category) ? tool.category[0] : tool.category}</span>')
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Patched JS in: {filepath}")
    except Exception as e:
        print(f"Failed to patch {filepath}: {e}")

import os

base_dir = r"G:\software\frontend"
html_files = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

count = 0
for fp in html_files:
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    o = c
    c = c.replace('href="mailto:affilore4@gmail.com">Contact Us</a>', 'href="/contact/">Contact Us</a>')
    if c != o:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(c)
        count += 1
        print(f"Fixed: {fp}")
print(f"Total: {count}")

import json
import os

log_path = r'C:\Users\ZM COMPUTRE\.gemini\antigravity\brain\90cf1c67-7e8c-4e3f-9f9d-40de50f3bd0a\.system_generated\logs\transcript.jsonl'
target_dir = r'g:\Affilore\utility\age-calculator'
target_file = os.path.join(target_dir, 'index.html')

os.makedirs(target_dir, exist_ok=True)

html_content = ""
for line in open(log_path, 'r', encoding='utf-8'):
    if '"USER_INPUT"' in line:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            if '<!DOCTYPE html>' in content and 'age-calculator' in content:
                start_idx = content.find('<!DOCTYPE html>')
                html_content = content[start_idx:]
        except Exception:
            pass

if html_content:
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("Extracted HTML of length:", len(html_content))
else:
    print("Could not find HTML in transcript.")

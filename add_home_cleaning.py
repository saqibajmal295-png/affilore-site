import os

base_path = 'g:/Affilore'
index_path = os.path.join(base_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_block = """    <section style="margin-bottom: 60px;">
      <h2 style="color: #FFF; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">HOME CLEANING</h2>
      <div style="display: flex; gap: 20px;">
        
        <div style="flex: 0 0 60%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
          <a href="/home-cleaning/roborock-qrevo-qv35a-review/" style="text-decoration: none;">
            <img src="images/home-cleaning/roborock-qrevo-thumb.png" alt="Roborock Qrevo" style="width: 100%; border-radius: 8px; aspect-ratio: 16/9; object-fit: cover; margin-bottom: 15px;">
            <h3 style="color: #FFF; margin: 0 0 10px 0; font-size: 1.4rem;">Roborock Qrevo QV35A Review</h3>
            <p style="color: #FFF; font-size: 0.9rem; line-height: 1.5;">Is this hands-free vacuum truly hands-free, or a rug transition trap? We test the 8000Pa suction and auto-mop washing.</p>
          </a>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Roborock S8 Pro Ultra Review</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 20, 2026</span>
          </a>
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Dyson V15 Detect Review</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 15, 2026</span>
          </a>
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Shark Matrix Plus Robot</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 10, 2026</span>
          </a>
        </div>

      </div>
    </section>

"""

# Find the end of the SMART KITCHEN block and insert the new block.
# Line 112 is </section> for SMART KITCHEN
insert_idx = -1
for i, line in enumerate(lines):
    if "COFFEE & ESPRESSO" in line:
        # Step back to find the start of its section
        for j in range(i, -1, -1):
            if "<section" in lines[j]:
                insert_idx = j
                break
        break

if insert_idx != -1:
    lines.insert(insert_idx, new_block)
    with open(index_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully inserted Home Cleaning block.")
else:
    print("Could not find injection point.")

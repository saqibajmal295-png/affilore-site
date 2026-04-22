import os
import re

base_path = 'g:/Affilore'
index_path = os.path.join(base_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_html = """<!-- ===== RTINGS STYLE LAYOUT ===== -->
<div style="display: flex; gap: 40px; max-width: 1200px; margin: 0 auto; padding: 20px; align-items: flex-start;">
  
  <div style="width: 75%;">

    <section style="margin-bottom: 60px;">
      <h2 style="color: #FFF; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">SMART KITCHEN</h2>
      <div style="display: flex; gap: 20px;">
        
        <div style="flex: 0 0 60%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
          <a href="/smart-kitchen/ninja-foodi-sp351/" style="text-decoration: none;">
            <img src="images/smart-kitchen/ninja-sp351-thumb.png" alt="Ninja SP151" style="width: 100%; border-radius: 8px; aspect-ratio: 16/9; object-fit: cover; margin-bottom: 15px;">
            <h3 style="color: #FFF; margin: 0 0 10px 0; font-size: 1.4rem;">Ninja SP151 Air Fryer Toaster Oven Review</h3>
            <p style="color: #FFF; font-size: 0.9rem; line-height: 1.5;">A Brilliant Space-Saver or a Cleaning Nightmare? Comprehensive hands-on test and long-term reliability.</p>
          </a>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Breville Smart Oven Air Fryer Pro</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 20, 2026</span>
          </a>
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Instant Pot Duo Crisp Ultimate</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 18, 2026</span>
          </a>
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Anova Precision Cooker Pro</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 15, 2026</span>
          </a>
        </div>

      </div>
    </section>

    <section style="margin-bottom: 60px;">
      <h2 style="color: #FFF; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">COFFEE & ESPRESSO</h2>
      <div style="display: flex; gap: 20px;">
        
        <div style="flex: 0 0 60%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
          <a href="/coffee/ninja-luxe-espresso-review/" style="text-decoration: none;">
            <img src="images/coffee/ninja-luxe-thumb.jpeg" alt="Ninja Luxe" style="width: 100%; border-radius: 8px; aspect-ratio: 16/9; object-fit: cover; margin-bottom: 15px;">
            <h3 style="color: #FFF; margin: 0 0 10px 0; font-size: 1.4rem;">Ninja Luxe Café Premier ES601 Review</h3>
            <p style="color: #FFF; font-size: 0.9rem; line-height: 1.5;">Is this $500 machine the ultimate Breville killer? We test its weight-based dosing and auto-frothing.</p>
          </a>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Breville Barista Express Impress</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 19, 2026</span>
          </a>
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">De'Longhi Magnifica Evo Review</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 17, 2026</span>
          </a>
          <a href="#" style="display: block; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; color: #FFF; text-decoration: none; transition: 0.3s;">
            <h4 style="margin: 0; font-size: 1rem;">Fellow Opus Conical Burr Grinder</h4>
            <span style="font-size: 0.8rem; color: #FFD700;">Apr 12, 2026</span>
          </a>
        </div>

      </div>
    </section>
    
  </div>

  <div style="width: 25%; position: sticky; top: 20px;">
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
      <h3 style="color: #FFF; margin-top: 0; margin-bottom: 15px;">Browse Categories</h3>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
        <li><a href="/coffee/" style="color: #FFF; text-decoration: none; display: block; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">☕ Coffee & Espresso</a></li>
        <li><a href="/smart-kitchen/" style="color: #FFF; text-decoration: none; display: block; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">🍳 Smart Kitchen</a></li>
        <li><a href="/air-quality/" style="color: #FFF; text-decoration: none; display: block; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px;">🌬️ Air Quality</a></li>
      </ul>
    </div>
  </div>

</div>
"""

# Replace everything from <!-- ===== RTINGS STYLE LAYOUT ===== --> to <!-- ===== FOOTER ===== -->
# Note: In the previous turn I put the whole thing under <!-- ===== RTINGS STYLE LAYOUT ===== -->
pattern = r'<!-- ===== RTINGS STYLE LAYOUT ===== -->.*?<!-- ===== FOOTER ===== -->'
new_content = re.sub(pattern, new_html + '\n<!-- ===== FOOTER ===== -->', content, flags=re.DOTALL)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Forced RTINGS Flexbox layout using inline styles in index.html.")

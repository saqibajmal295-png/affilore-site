import os
import re

base_path = 'g:/Affilore'
index_path = os.path.join(base_path, 'index.html')
main_css_path = os.path.join(base_path, 'css/main.css')

# 1. Fix CSS
with open(main_css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace colors to #FFFF00
css_content = css_content.replace('--primary-accent: #FFD700;', '--primary-accent: #FFFF00;')
css_content = re.sub(r'--premium-gradient:.*?;', '--premium-gradient: linear-gradient(135deg, #FFFF00 0%, #FFD700 100%);', css_content)

# Remove old RTINGS layout
css_content = re.sub(r'/\* RTINGS Layout \*/.*?/\* Force Pure White Text for Contrast \*/', '/* Force Pure White Text for Contrast */', css_content, flags=re.DOTALL)

# Add new RTINGS layout right before /* Force Pure White Text for Contrast */
new_css = """/* RTINGS Layout Fix */
.rtings-layout { display: flex; gap: 40px; align-items: flex-start; }
.rtings-main { width: 75%; }
.rtings-sidebar { width: 25%; position: sticky; top: 20px; }
.category-block { margin-bottom: 60px; }
.category-block h2 { font-size: 2rem; margin-bottom: 25px; color: #FFFFFF !important; text-transform: uppercase; letter-spacing: 1px; }
.category-split { display: flex; gap: 20px; margin-bottom: 60px; }
.hero-card { width: 65%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; display: block; text-decoration: none; color: #FFFFFF; }
.hero-card img { width: 100%; height: auto; border-radius: 8px; object-fit: cover; aspect-ratio: 16/9; margin-bottom: 15px; }
.hero-card h3 { font-size: 1.8rem; margin-bottom: 10px; color: #FFFFFF !important; }
.list-column { width: 35%; display: flex; flex-direction: column; gap: 15px; }
.list-item-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 15px; display: block; text-decoration: none; color: #FFFFFF; transition: 0.3s; }
.list-item-card:hover { border-color: #FFFF00; transform: translateY(-2px); }
.list-item-title { font-weight: 600; margin-bottom: 5px; }
.list-item-meta { font-size: 0.8rem; opacity: 0.8; }
.sidebar-widget { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 25px; }
.sidebar-widget h3 { color: #FFFFFF !important; margin-bottom: 20px; }
.pill-list { display: flex; flex-direction: column; gap: 12px; }
.pill-btn { display: block; padding: 12px 20px; border-radius: 30px; background: rgba(255, 255, 255, 0.05); color: #FFFFFF !important; text-decoration: none; font-weight: 600; transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.1); text-align: center; }
.pill-btn:hover { background: var(--premium-gradient); color: #000 !important; border-color: transparent; }
@media (max-width: 992px) {
  .rtings-layout { flex-direction: column; }
  .rtings-main, .rtings-sidebar { width: 100%; }
  .category-split { flex-direction: column; }
  .hero-card, .list-column { width: 100%; }
}

"""
css_content = css_content.replace('/* Force Pure White Text for Contrast */', new_css + '/* Force Pure White Text for Contrast */')

with open(main_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

# 2. Fix HTML
with open(index_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

new_html = """  <!-- ===== RTINGS STYLE LAYOUT ===== -->
  <section class="container" style="max-width: 1250px; margin: 0 auto; padding: 20px;">
    <div class="rtings-layout">
      
      <div class="rtings-main">
        <!-- Smart Kitchen Block -->
        <div class="category-block">
          <h2>Smart Kitchen</h2>
          <div class="category-split">
            <a href="/smart-kitchen/ninja-foodi-sp351/" class="hero-card">
              <img src="images/smart-kitchen/ninja-sp351-thumb.png" alt="Ninja SP151">
              <h3>Ninja SP151 Air Fryer Toaster Oven Review</h3>
              <p>A Brilliant Space-Saver or a Cleaning Nightmare? Comprehensive hands-on test and long-term reliability.</p>
            </a>
            <div class="list-column">
              <a href="#" class="list-item-card">
                <div class="list-item-title">Breville Smart Oven Air Fryer Pro Review</div>
                <div class="list-item-meta">Apr 20, 2026</div>
              </a>
              <a href="#" class="list-item-card">
                <div class="list-item-title">Instant Pot Duo Crisp Ultimate Review</div>
                <div class="list-item-meta">Apr 18, 2026</div>
              </a>
              <a href="#" class="list-item-card">
                <div class="list-item-title">Anova Precision Cooker Pro Review</div>
                <div class="list-item-meta">Apr 15, 2026</div>
              </a>
            </div>
          </div>
        </div>

        <!-- Coffee & Espresso Block -->
        <div class="category-block">
          <h2>Coffee & Espresso</h2>
          <div class="category-split">
            <a href="/coffee/ninja-luxe-espresso-review/" class="hero-card">
              <img src="images/coffee/ninja-luxe-thumb.jpeg" alt="Ninja Luxe">
              <h3>Ninja Luxe Café Premier ES601 Review</h3>
              <p>Is this $500 machine the ultimate Breville killer? We test its weight-based dosing and auto-frothing.</p>
            </a>
            <div class="list-column">
              <a href="#" class="list-item-card">
                <div class="list-item-title">Breville Barista Express Impress Review</div>
                <div class="list-item-meta">Apr 19, 2026</div>
              </a>
              <a href="#" class="list-item-card">
                <div class="list-item-title">De'Longhi Magnifica Evo Review</div>
                <div class="list-item-meta">Apr 17, 2026</div>
              </a>
              <a href="#" class="list-item-card">
                <div class="list-item-title">Fellow Opus Conical Burr Grinder Review</div>
                <div class="list-item-meta">Apr 12, 2026</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <aside class="rtings-sidebar">
        <div class="sidebar-widget">
          <h3>Browse Categories</h3>
          <div class="pill-list">
            <a href="/coffee/" class="pill-btn">Coffee & Espresso</a>
            <a href="/smart-kitchen/" class="pill-btn">Smart Kitchen</a>
            <a href="/air-quality/" class="pill-btn">Air Quality</a>
            <a href="/home-cleaning/" class="pill-btn">Home Cleaning</a>
            <a href="/smart-home/" class="pill-btn">Smart Home & Security</a>
          </div>
        </div>
      </aside>

    </div>
  </section>"""

# Replace the old section
html_content = re.sub(r'<!-- ===== RTINGS STYLE LAYOUT ===== -->.*?<!-- ===== FOOTER ===== -->', new_html + '\n\n  <!-- ===== FOOTER ===== -->', html_content, flags=re.DOTALL)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Fixed CSS and HTML layout")

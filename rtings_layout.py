import os
import re

base_path = 'g:/Affilore'
index_path = os.path.join(base_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The new RTINGS layout HTML
rtings_html = """
  <!-- ===== RTINGS STYLE LAYOUT ===== -->
  <section class="rtings-container">
    <div class="rtings-main">
      
      <!-- Smart Kitchen Block -->
      <div class="category-block">
        <h2>Smart Kitchen</h2>
        <div class="hero-list-container">
          <div class="hero-featured">
            <a href="/smart-kitchen/ninja-foodi-sp351/" class="card">
              <div class="card-image">
                <div style="width:100%;height:100%;background-image:url('images/smart-kitchen/ninja-sp351-thumb.png');background-size:cover;background-position:center;"></div>
                <div class="card-image-overlay"></div>
                <span class="card-badge">Top Pick</span>
              </div>
              <div class="card-body">
                <span class="card-category">Smart Kitchen</span>
                <h3 class="card-title">Ninja SP151 Air Fryer Toaster Oven Review</h3>
                <p class="card-excerpt">A Brilliant Space-Saver or a Cleaning Nightmare? Comprehensive hands-on test and long-term reliability.</p>
                <div class="card-meta">
                  <div class="card-rating">
                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star star--empty">★</span>
                    <span style="margin-left:4px;font-weight:600;">4.5</span>
                  </div>
                  <span>Apr 21, 2026</span>
                </div>
              </div>
            </a>
          </div>
          <div class="hero-list">
            <a href="#" class="list-item-card">
              <div class="list-item-image" style="background-image:url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&q=80');"></div>
              <div class="list-item-content">
                <div class="list-item-title">Breville Smart Oven Air Fryer Pro Review</div>
                <div class="list-item-meta">Apr 20, 2026</div>
              </div>
            </a>
            <a href="#" class="list-item-card">
              <div class="list-item-image" style="background-image:url('https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&q=80');"></div>
              <div class="list-item-content">
                <div class="list-item-title">Instant Pot Duo Crisp Ultimate Review</div>
                <div class="list-item-meta">Apr 18, 2026</div>
              </div>
            </a>
            <a href="#" class="list-item-card">
              <div class="list-item-image" style="background-image:url('https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300&q=80');"></div>
              <div class="list-item-content">
                <div class="list-item-title">Anova Precision Cooker Pro Review</div>
                <div class="list-item-meta">Apr 15, 2026</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Coffee & Espresso Block -->
      <div class="category-block">
        <h2>Coffee & Espresso</h2>
        <div class="hero-list-container">
          <div class="hero-featured">
            <a href="/coffee/ninja-luxe-espresso-review/" class="card">
              <div class="card-image">
                <div style="width:100%;height:100%;background-image:url('images/coffee/ninja-luxe-thumb.jpeg');background-size:cover;background-position:center;"></div>
                <div class="card-image-overlay"></div>
                <span class="card-badge">Editor's Pick</span>
              </div>
              <div class="card-body">
                <span class="card-category">Coffee & Espresso</span>
                <h3 class="card-title">Ninja Luxe Café Premier ES601 Review</h3>
                <p class="card-excerpt">Is this $500 machine the ultimate Breville killer? We test its weight-based dosing and auto-frothing.</p>
                <div class="card-meta">
                  <div class="card-rating">
                    <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
                    <span style="margin-left:4px;font-weight:600;">4.7</span>
                  </div>
                  <span>Apr 22, 2026</span>
                </div>
              </div>
            </a>
          </div>
          <div class="hero-list">
            <a href="#" class="list-item-card">
              <div class="list-item-image" style="background-image:url('https://images.unsplash.com/photo-1517701550927-30cfcb64d4f4?w=300&q=80');"></div>
              <div class="list-item-content">
                <div class="list-item-title">Breville Barista Express Impress Review</div>
                <div class="list-item-meta">Apr 19, 2026</div>
              </div>
            </a>
            <a href="#" class="list-item-card">
              <div class="list-item-image" style="background-image:url('https://images.unsplash.com/photo-1507133750073-1f19661332f1?w=300&q=80');"></div>
              <div class="list-item-content">
                <div class="list-item-title">De'Longhi Magnifica Evo Review</div>
                <div class="list-item-meta">Apr 17, 2026</div>
              </div>
            </a>
            <a href="#" class="list-item-card">
              <div class="list-item-image" style="background-image:url('https://images.unsplash.com/photo-1510251194098-b8ce771f251c?w=300&q=80');"></div>
              <div class="list-item-content">
                <div class="list-item-title">Fellow Opus Conical Burr Grinder Review</div>
                <div class="list-item-meta">Apr 12, 2026</div>
              </div>
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
  </section>
"""

# We want to replace everything from <!-- ===== HOW IT WORKS / TRUST ===== --> to <!-- ===== FOOTER ===== -->
pattern = r'<!-- ===== HOW IT WORKS / TRUST ===== -->.*?<!-- ===== FOOTER ===== -->'
new_content = re.sub(pattern, rtings_html + '\n  <!-- ===== FOOTER ===== -->', content, flags=re.DOTALL)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated index.html with RTINGS layout.")

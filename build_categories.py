import os
import re

# Categories and their details
categories = {
    'coffee': {
        'title': 'Coffee & Espresso Reviews',
        'cards': '''
        <a href="/coffee/ninja-luxe-espresso-review/" class="card animate-on-scroll">
          <div class="card-image">
            <div style="width:100%;height:100%;background-image:url('/images/coffee/ninja-luxe-thumb.jpeg');background-size:cover;background-position:center;"></div>
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
        '''
    },
    'smart-kitchen': {
        'title': 'Smart Kitchen Reviews',
        'cards': '''
        <a href="/smart-kitchen/ninja-foodi-sp351/" class="card animate-on-scroll">
          <div class="card-image">
            <div style="width:100%;height:100%;background-image:url('/images/smart-kitchen/ninja-sp351-thumb.png');background-size:cover;background-position:center;"></div>
            <div class="card-image-overlay"></div>
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
        '''
    },
    'home-cleaning': {
        'title': 'Home Cleaning Reviews',
        'cards': '''
        <a href="/home-cleaning/roborock-qrevo-qv35a-review/" class="card animate-on-scroll">
          <div class="card-image">
            <div style="width:100%;height:100%;background-image:url('/images/home-cleaning/roborock-qrevo-thumb.jpeg');background-size:cover;background-position:center;"></div>
            <div class="card-image-overlay"></div>
          </div>
          <div class="card-body">
            <span class="card-category">Home Cleaning</span>
            <h3 class="card-title">Roborock Qrevo QV 35A Review</h3>
            <p class="card-excerpt">Is this 8000Pa robot vacuum the ultimate hands-off cleaner? We test its auto mop washing & tangle-free brushes.</p>
            <div class="card-meta">
              <div class="card-rating">
                <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star star--empty">★</span>
                <span style="margin-left:4px;font-weight:600;">4.2</span>
              </div>
              <span>Apr 22, 2026</span>
            </div>
          </div>
        </a>
        '''
    },
    'air-quality': {
        'title': 'Air Quality Reviews',
        'cards': '<p>No reviews yet. Check back soon!</p>'
    },
    'smart-home': {
        'title': 'Smart Home & Security Reviews',
        'cards': '<p>No reviews yet. Check back soon!</p>'
    }
}

base_path = 'g:/Affilore'
with open(os.path.join(base_path, 'index.html'), 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract header and footer
header_match = re.search(r'(<header.*?</header>)', index_html, re.DOTALL)
footer_match = re.search(r'(<footer.*</footer>)', index_html, re.DOTALL)
head_match = re.search(r'(<head>.*?</head>)', index_html, re.DOTALL)

header = header_match.group(1) if header_match else ''
footer = footer_match.group(1) if footer_match else ''
head = head_match.group(1) if head_match else '<head></head>'

# Let's clean the relative paths in the head, header and footer since these will be in subdirectories
# Actually they are already using absolute paths like href="/css/main.css" in index.html, but let's double check.
# index.html uses href="styles.css", we should change to href="/styles.css".
head = head.replace('href="styles.css"', 'href="/styles.css"')
head = head.replace('src="main.js"', 'src="/main.js"')
# footer might have <script src="main.js"></script>
footer = footer.replace('src="main.js"', 'src="/main.js"')

for cat, data in categories.items():
    cat_dir = os.path.join(base_path, cat)
    os.makedirs(cat_dir, exist_ok=True)
    
    html = f"""<!DOCTYPE html>
<html lang="en">
{head}
<body>
  <!-- Ambient Background Glows -->
  <div class="ambient-glow ambient-glow--1"></div>
  <div class="ambient-glow ambient-glow--2"></div>

  {header}

  <section class="section" style="padding-top: 150px; min-height: 60vh;">
    <div class="container">
      <div class="section-header text-center">
        <h1 class="section-title">{data['title']}</h1>
      </div>
      <div class="card-grid">
        {data['cards']}
      </div>
    </div>
  </section>

  {footer}
  <script src="/main.js"></script>
</body>
</html>"""

    # Fix the title
    html = re.sub(r'<title>.*?</title>', f'<title>{data["title"]} — Affilore</title>', html)
    
    file_path = os.path.join(cat_dir, 'index.html')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Created {file_path}')

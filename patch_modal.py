import os

files = ['about.html', 'contact.html', 'privacy.html', 'terms.html', 'tools/ai-podcast-hook.html']

css_modal = """        /* ─── Modal ─── */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); z-index: 3000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity var(--transition); }
        .modal-overlay.open { opacity: 1; pointer-events: auto; }
        .modal-content { background: var(--black-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px; max-width: 400px; width: 90%; position: relative; transform: translateY(20px); transition: transform var(--transition); text-align: center; }
        .modal-overlay.open .modal-content { transform: translateY(0); }
        .modal-close { position: absolute; top: 16px; right: 16px; font-size: 1.5rem; color: var(--text-muted); transition: color var(--transition); }
        .modal-close:hover { color: var(--text-primary); }
        .modal-content h3 { font-family: 'Outfit', sans-serif; font-size: 1.25rem; color: var(--text-primary); margin-bottom: 8px; }
        .modal-content p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.5; }
        .modal-email-box { display: flex; align-items: center; justify-content: space-between; background: var(--black-card); border: 1px solid var(--border); padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; }
        .modal-email-box span { font-size: 0.9rem; color: var(--text-primary); }
        .btn-copy { color: var(--yellow); font-size: 0.8rem; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: rgba(255,191,0,0.1); transition: background var(--transition); }
        .btn-copy:hover { background: rgba(255,191,0,0.2); }
"""

html_modal = """    <!-- Request Custom Tool Modal -->
    <div class="modal-overlay" id="requestModal">
        <div class="modal-content">
            <button class="modal-close" id="closeModal" aria-label="Close modal">&times;</button>
            <h3>Request a Custom Tool</h3>
            <p>Need a specific tool designed for your workflow? Send us an email with your core requirements.</p>
            <div class="modal-email-box">
                <span>affilore4@gmail.com</span>
                <button class="btn-copy" onclick="navigator.clipboard.writeText('affilore4@gmail.com');this.innerText='Copied!';setTimeout(()=>this.innerText='Copy',2000)">Copy</button>
            </div>
            <a href="mailto:affilore4@gmail.com" class="btn-cta" style="width:100%; justify-content:center;">Open in Mail</a>
        </div>
    </div>
"""

js_modal = """    // Global Modal Handler
    const reqModal = document.getElementById('requestModal');
    document.querySelectorAll('a').forEach(a => {
        if (a.textContent.includes('Request Custom Tool')) {
            a.addEventListener('click', e => { e.preventDefault(); reqModal.classList.add('open'); document.body.style.overflow = 'hidden'; });
        }
    });
    document.getElementById('closeModal').addEventListener('click', () => { reqModal.classList.remove('open'); document.body.style.overflow = ''; });
    reqModal.addEventListener('click', e => { if(e.target === reqModal) { reqModal.classList.remove('open'); document.body.style.overflow = ''; } });
"""

dropdowns = """    <nav class="nav-links"><a href="index.html" class="nav-link">Home</a><a href="about.html" class="nav-link">About</a>
        <div class="dropdown">
            <button class="nav-link" aria-haspopup="true" aria-expanded="false">Categories <svg class="chevron-down" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg></button>
            <div class="dropdown-menu">
                <a href="finance.html" class="dropdown-item">💰 Finance</a>
                <a href="real-estate.html" class="dropdown-item">🏠 Real Estate</a>
                <a href="seo-marketing.html" class="dropdown-item">📈 SEO & Marketing</a>
                <a href="ai-content-creation.html" class="dropdown-item">🤖 AI Content Creation</a>
                <a href="developer-productivity.html" class="dropdown-item">⚡ Developer Productivity</a>
            </div>
        </div>
    </nav>"""

for file in files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f: content = f.read()
    
    # 1. Add CSS
    if '.modal-overlay' not in content:
        content = content.replace('</style>', css_modal + '</style>')
    
    # 2. Add HTML
    if 'id="requestModal"' not in content:
        content = content.replace('<script>', html_modal + '<script>')
        
    # 3. Add JS
    if 'reqModal.classList' not in content:
        content = content.replace('</script>', js_modal + '</script>')
        
    # 4. Replace exact dropdown links if present
    # We didn't put categories in legal pages yet, except index.html. Wait, the user prompt says:
    # "Wire up all footer links correctly to these pages" -> done already.
    # What about mobile nav and header dropdown for inner pages? The current legal pages just have:
    # `<nav class="nav-links"><a href="index.html" class="nav-link">Home</a><a href="about.html" class="nav-link">About</a></nav>`
    # We should add the dropdown there too, to match homepage.
    if '<nav class="nav-links"><a href="index.html" class="nav-link"' in content and 'Categories' not in content:
        import re
        content = re.sub(r'<nav class="nav-links">.*?</nav>', dropdowns, content)
        
    with open(file, 'w', encoding='utf-8') as f: f.write(content)

print('Patched modal into all files.')

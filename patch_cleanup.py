import re, os

files = ['about.html', 'contact.html', 'privacy.html', 'terms.html', 'tools/ai-podcast-hook.html']

for file in files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f: content = f.read()
    
    # Remove all modal HTML
    content = re.sub(r'<!-- Request Custom Tool Modal -->.+?</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Remove all modal JS
    content = re.sub(r'// Global Modal Handler.*?</script>', '</script>', content, flags=re.DOTALL)
    
    # Re-insert cleanly at the very end
    modal_html = """
    <!-- Request Custom Tool Modal -->
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
    <script>
        // Global Modal Handler
        const reqModal = document.getElementById('requestModal');
        document.querySelectorAll('a').forEach(a => {
            if (a.textContent.includes('Request Custom Tool')) {
                a.addEventListener('click', e => { e.preventDefault(); reqModal.classList.add('open'); document.body.style.overflow = 'hidden'; });
            }
        });
        document.getElementById('closeModal').addEventListener('click', () => { reqModal.classList.remove('open'); document.body.style.overflow = ''; });
        reqModal.addEventListener('click', e => { if (e.target === reqModal) { reqModal.classList.remove('open'); document.body.style.overflow = ''; } });
    </script>
</body>
"""
    content = content.replace('</body>', modal_html)
    
    # Fix the duplicate nav dropdowns as well just in case they were appended wrong earlier
    with open(file, 'w', encoding='utf-8') as f: f.write(content)

print("Cleaned up duplicates successfully.")

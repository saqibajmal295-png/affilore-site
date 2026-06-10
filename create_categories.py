import os
import re

categories = ["data", "calculator", "utility", "developer", "seo", "productivity"]

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Make the Affilore logo link to mailto:affilore4@gmail.com
html = html.replace(
    '<span class="font-headline-lg text-headline-lg font-bold tracking-tighter text-white">Affilore</span>',
    '<a href="mailto:affilore4@gmail.com" class="font-headline-lg text-headline-lg font-bold tracking-tighter text-white hover:text-primary transition-colors">Affilore</a>'
)

# Also update index.html with the new logo link
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

# The new main content for category pages
coming_soon_main = """<main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg pb-[120px] flex items-center justify-center min-h-[60vh]">
        <div class="text-center glass-panel rounded-2xl p-12 border border-[rgba(234,179,8,0.4)] shadow-[0_0_30px_rgba(234,179,8,0.15)] relative overflow-hidden w-full max-w-3xl">
            <div class="absolute inset-0 bg-gradient-to-r from-[rgba(234,179,8,0.08)] to-[rgba(245,158,11,0.08)] pointer-events-none"></div>
            <div class="relative z-10 flex flex-col items-center">
                <span class="material-symbols-outlined text-[80px] text-primary mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]">hourglass_empty</span>
                <h1 class="font-headline-xl text-headline-xl text-on-surface mb-6">Coming Soon</h1>
                <p class="font-body-lg text-body-lg text-white max-w-lg mx-auto">
                    We're currently building high-performance utilities for this category. Check back later for powerful new tools!
                </p>
                <div class="mt-10">
                    <a class="px-8 py-3 rounded-full gradient-bg text-black font-label-md text-label-md transition-all shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.9)]" href="index.html">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    </main>"""

# Replace the <main>...</main> section with regex
pattern = re.compile(r'<main.*?</main>', re.DOTALL)

category_html = pattern.sub(coming_soon_main, html)

for cat in categories:
    with open(f"{cat}.html", "w", encoding="utf-8") as f:
        f.write(category_html)
    print(f"Created {cat}.html")

print("Done.")

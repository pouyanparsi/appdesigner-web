import glob
import re

files = glob.glob('/Volumes/T7/pouyanparsimood/website_projects/appdesigner-web/*.html')

new_html = r'''<div class="brand-text">
                    <span class="brand-name" style="font-weight: 800; margin-bottom: 5px;">App Designer Group</span>
                    <span style="font-size: 0.65rem; color: rgba(255,255,255,0.85); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-top: -1px; margin-bottom: 10px;">Part of Legal Version Ltd</span>
                    <span class="brand-sub" style="font-size: 0.6rem; font-weight: 400; color: var(--gold);">Enterprise Consulting</span>
                </div>'''

pattern = re.compile(
    r'<div class="brand-text">\s*<span class="brand-name">App Designer Group</span>\s*<span class="brand-sub" style="font-size:\s*0\.6rem;">Enterprise Consulting</span>\s*<span style="[^"]*">Part of Legal Version Ltd</span>\s*</div>',
    re.DOTALL
)

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    if pattern.search(content):
        content = pattern.sub(new_html, content)
        with open(f, 'w') as file:
            file.write(content)

print("Brand text updated in all HTML files.")

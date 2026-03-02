import glob
import re
import os

files = glob.glob('/Volumes/T7/pouyanparsimood/website_projects/appdesigner-web/*.html')

# Larger sizes and more spacing as requested
# Line 1: 1.4rem, 800 weight, margin-bottom 10px
# Line 2: 0.9rem, 800 weight, margin-bottom 8px
# Line 3: Original sub-style, 400 weight or 500

new_html = r'''<div class="brand-text">
                    <span class="brand-name" style="font-size: 1.4rem; font-weight: 800; margin-bottom: 10px; display: block; line-height: 1.2;">App Designer Group</span>
                    <span style="font-size: 0.9rem; color: rgba(255,255,255,0.85); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display: block; line-height: 1.2;">Part of Legal Version Ltd</span>
                    <span class="brand-sub" style="font-size: 0.65rem; font-weight: 400; color: var(--gold); text-transform: uppercase; letter-spacing: 0.1em; display: block; line-height: 1.2;">Enterprise Consulting</span>
                </div>'''

# Target the previous patterns (both original and the user's manual edits)
# We use a broad regex to capture the brand-text div content and replace it entirely.
pattern = re.compile(
    r'<div class="brand-text">.*?</div>',
    re.DOTALL
)

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    if pattern.search(content):
        # Using sub with a function or escaped string to avoid backreference issues if any
        # Since new_html has no backreferences like \1, it's safe.
        content = pattern.sub(new_html, content)
        with open(f, 'w') as file:
            file.write(content)

print(f"Refined brand typography updated in {len(files)} files.")

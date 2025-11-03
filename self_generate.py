#!/usr/bin/env python3
"""
self_generate.py
Run from: C:\\Users\\yates\\Desktop\\SuntechLanding\\Testnet
Python 3.12+ only (standard library only)
"""

import os
import re
import json
import hashlib
import zipfile
from datetime import datetime

ROOT = os.path.abspath(os.path.dirname(__file__))
DOCS_DIR = os.path.join(ROOT, "Docs")
ASSETS_DIR = os.path.join(ROOT, "Assets")
DEFAULT_START_VERSION = "5.0"

def find_html_files(root):
    htmls = []
    for dirpath, _, filenames in os.walk(root):
        for fn in filenames:
            if fn.lower().endswith(".html"):
                htmls.append(os.path.join(dirpath, fn))
    return sorted(htmls)

def detect_main_html(html_paths):
    for p in html_paths:
        if os.path.basename(p).lower().startswith("venom_platform"):
            return p
    return html_paths[0] if html_paths else None

def load_meta_version(meta_path):
    if os.path.exists(meta_path):
        try:
            with open(meta_path, "r", encoding="utf-8") as f:
                return json.load(f).get("version", DEFAULT_START_VERSION)
        except Exception:
            pass
    return DEFAULT_START_VERSION

def increment_version(vstr):
    parts = vstr.split(".")
    try:
        parts[-1] = str(int(parts[-1]) + 1)
        return ".".join(parts)
    except Exception:
        return vstr + ".1"

def file_checksums(path):
    md5 = hashlib.md5()
    sha256 = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            md5.update(chunk)
            sha256.update(chunk)
    return md5.hexdigest(), sha256.hexdigest()

# 1️⃣ Center slogan automatically
def fix_slogan(content):
    pattern = re.compile(r'<div[^>]*id=["\']sloganSupport["\'][^>]*>', re.IGNORECASE)
    if pattern.search(content):
        content = pattern.sub('<div class="slogan-support" id="sloganSupport" style="text-align:center;">', content)
    else:
        content = content.replace(
            "Confidence-first protections — our promise to local Victorians.",
            '<div class="slogan-support" id="sloganSupport" style="text-align:center;">Confidence-first protections — our promise to local Victorians.</div>'
        )
    return content

# 2️⃣ Replace Testimonials section with auto-scroll version
def replace_testimonials(content):
    testimonials_pattern = re.compile(r'<!-- TESTIMONIALS[\s\S]*?</section>', re.IGNORECASE)
    new_section = """
<!-- TESTIMONIALS (AUTO-SCROLL) -->
<section class="section" aria-label="Testimonials" style="margin-top:60px;">
  <h2 class="h2-left"><span class="h-icon">📝</span>Testimonials</h2>
  <div class="testimonials-wrapper" style="overflow:hidden;position:relative;">
    <div class="testimonials" style="display:flex;gap:16px;animation:scrollTestimonials 40s linear infinite;">
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"Jess and his team were fantastic... bills dropped from $680 to $95 per quarter!"</p><div style="font-weight:700">Sarah — Geelong</div></div>
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"Battery kept our fridge running during the last blackout."</p><div style="font-weight:700">Mark — Ballarat</div></div>
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"No high-pressure sales, just honest advice."</p><div style="font-weight:700">Elise — Werribee</div></div>
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"The battery rebate advice saved us thousands. Highly recommend."</p><div style="font-weight:700">Trent — Warragul</div></div>
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"Installers were professional, punctual, and tidy. Couldn’t be happier."</p><div style="font-weight:700">Michelle — Dandenong</div></div>
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"Battery app is easy to use — love seeing our savings in real-time!"</p><div style="font-weight:700">Gavin — Mornington</div></div>
      <div class="card panel" style="border:1px solid #00bfff;"><strong style="color:var(--orange)">⭐⭐⭐⭐⭐</strong><p style="color:var(--muted);font-style:italic">"Fantastic communication and after-sales support."</p><div style="font-weight:700">Lucy — Berwick</div></div>
    </div>
  </div>
</section>
<style>
@keyframes scrollTestimonials {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.testimonials:hover { animation-play-state: paused; }
</style>
"""
    return testimonials_pattern.sub(new_section, content)

# 3️⃣ Fix footer layout and add Legal under Quick Links
def fix_footer(content):
    footer_pattern = re.compile(r'<div[^>]+class=["\']footer-grid["\'][\s\S]*?<\/div>', re.IGNORECASE)
    footer_replacement = """
<div class="footer-grid">
  <div class="col">
    <h3>Contact Us</h3>
    <p>📞 1300 786 429</p>
    <p>✉️ <a href="mailto:sales@suntechsolarsystems.com.au">sales@suntechsolarsystems.com.au</a></p>
  </div>
  <div class="col">
    <h3>Quick Links</h3>
    <div>Savings Calculator</div>
    <div>Customer Reviews</div>
    <hr style="margin:10px 0;border:0;border-top:1px solid rgba(255,255,255,0.08)">
    <h3 style="margin-top:10px;">Legal</h3>
    <div><a href="Docs/ip.html">Intellectual Property</a></div>
    <div><a href="Docs/terms.html">Terms</a></div>
    <div><a href="Docs/privacy.html">Privacy</a></div>
  </div>
  <div class="col">
    <h3>Service Areas</h3>
    <div>Bass Coast, Mornington Peninsula, La Trobe Valley, Greater Melbourne</div>
  </div>
  <div class="col">
    <h3>Why Choose Us</h3>
    <div>Local team • NETCC certified • Owner-installed systems</div>
  </div>
</div>
"""
    return footer_pattern.sub(footer_replacement, content)

# 4️⃣ Remove “Offset Energy Usage / Store Power / Disconnect” section
def remove_energy_cards(content):
    return re.sub(r'<section[^>]*aria-label=["\']Feature Highlights["\'][\s\S]*?</section>', '', content, flags=re.IGNORECASE)

# Apply all transformations
def process_html_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()
    except Exception as e:
        print(f"Failed to read {path}: {e}")
        return False

    html = fix_slogan(html)
    html = replace_testimonials(html)
    html = fix_footer(html)
    html = remove_energy_cards(html)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    return True

def build_meta_json(root, version):
    meta = {"version": version, "date_generated": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"), "files": []}
    for dirpath, _, filenames in os.walk(root):
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            md5, sha256 = file_checksums(full)
            rel = os.path.relpath(full, start=root).replace("\\", "/")
            meta["files"].append({"path": rel, "md5": md5, "sha256": sha256})
    meta_path = os.path.join(root, "meta.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)
    return meta_path

def make_zip(root, version):
    zipname = f"Venom_Platform_v{version}.zip"
    zipfull = os.path.join(root, zipname)
    if os.path.exists(zipfull):
        os.remove(zipfull)
    with zipfile.ZipFile(zipfull, "w", zipfile.ZIP_DEFLATED) as zf:
        for dirpath, _, files in os.walk(root):
            for fn in files:
                full = os.path.join(dirpath, fn)
                if os.path.abspath(full) == os.path.abspath(zipfull):
                    continue
                rel = os.path.relpath(full, start=root)
                zf.write(full, arcname=rel)
    return zipfull

def main():
    print("Running Venom HTML auto-patcher\n")
    htmls = find_html_files(ROOT)
    if not htmls:
        print("No HTML files found.")
        return

    version = increment_version(load_meta_version(os.path.join(ROOT, "meta.json")))
    success = 0
    for f in htmls:
        print("→", os.path.basename(f), end=" ... ")
        if process_html_file(f):
            success += 1
            print("OK")
        else:
            print("FAIL")

    meta = build_meta_json(ROOT, version)
    zippath = make_zip(ROOT, version)
    print(f"\n✔ Updated {success}/{len(htmls)} HTML files\n✔ meta.json written: {meta}\n✔ Packaged into {zippath}")

if __name__ == "__main__":
    main()

import os
import shutil

# Define safe keepers
KEEP = {
    "index.html",
    "assets",
    "Docs",
    ".git",
    ".github"
}

# Define extensions to delete (common build leftovers)
DELETE_EXT = {".bak", ".tmp", ".old", ".log", ".DS_Store", ".zip"}

# Walk through everything
for root, dirs, files in os.walk(".", topdown=True):
    dirs[:] = [d for d in dirs if d not in {'.git', '.github', '__pycache__'}]
    for file in files:
        path = os.path.join(root, file)
        name = os.path.basename(path)
        ext = os.path.splitext(name)[1]
        if name not in KEEP and ext in DELETE_EXT:
            print(f"🧹 Deleting {path}")
            os.remove(path)
        elif name not in KEEP and "backup" in name.lower():
            print(f"🧹 Removing backup file: {path}")
            os.remove(path)

# Optional: prune redundant CSS/JS versions
redundant_dirs = ["assets/old", "assets/test", "assets/static/old", "Assets"]
for folder in redundant_dirs:
    if os.path.exists(folder):
        print(f"🗑️ Removing redundant folder: {folder}")
        shutil.rmtree(folder)

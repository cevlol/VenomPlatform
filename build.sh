#!/bin/bash
echo "🚀 Starting Venom Platform build..."
python self_generate.py
if [ $? -eq 0 ]; then
  echo "✅ Build complete! You can find your new Venom_Platform_v*.zip in the folder."
else
  echo "❌ Build failed — check for errors above." fi

#!/bin/bash

# ─── SANSU ADMIN LAUNCHER ───────────────────────────────────────────────
# Double-click this file (or run it as a macOS .app) to start the
# admin panel locally.
#
# SETUP (one time):
#   1. Edit PROJECT_DIR below to match the location of this project.
#   2. Right-click this file in Finder → Open With → Terminal
#      (to grant execute permission the first time)
# ────────────────────────────────────────────────────────────────────────

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

cd "$PROJECT_DIR" || exit 1

# Kill any existing process on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Start dev server in the background
npm run dev &
DEV_PID=$!

# Wait until the server responds
echo "Iniciando servidor…"
for i in $(seq 1 30); do
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Open admin in the default browser
open http://localhost:3000/admin

# Keep this script alive so the dev server stays running.
# Closing the Terminal window will stop the server.
echo ""
echo "✓ Sansu Admin corriendo en http://localhost:3000/admin"
echo "  Cierra esta ventana para detener el servidor."
wait $DEV_PID

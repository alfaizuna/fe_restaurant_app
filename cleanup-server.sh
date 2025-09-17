#!/bin/bash
# Script to clean up server files when using Vite only

echo "Removing server-related files..."

# Create backup first
if [ -d "server" ]; then
  echo "Creating backup of server folder..."
  mv server server_backup_$(date +%Y%m%d_%H%M%S)
fi

echo "Server files moved to backup folder."
echo "You can now run 'npm run dev' to start with Vite only."
echo ""
echo "Updated scripts:"
echo "- npm run dev     -> starts Vite dev server"  
echo "- npm run build   -> builds for production"
echo "- npm run start   -> preview production build"

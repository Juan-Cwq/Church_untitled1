#!/bin/bash

# The Connection Hub - Git Push Script
# Repository: https://github.com/Juan-Cwq/Church_untitled1

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🙏 The Connection Hub - Git Push            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${BLUE}📦 Initializing git repository...${NC}"
    git init
    git branch -M main
fi

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo -e "${BLUE}🔗 Adding remote repository...${NC}"
    git remote add origin https://github.com/Juan-Cwq/Church_untitled1.git
else
    echo -e "${GREEN}✅ Remote repository already configured${NC}"
fi

# Add all files
echo -e "${BLUE}📝 Adding files...${NC}"
git add .

# Commit with message
if [ -z "$1" ]; then
    # Default commit message if none provided
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

echo -e "${BLUE}💾 Committing changes: ${COMMIT_MSG}${NC}"
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
git push -u origin main

# Check if push was successful
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✅ Successfully pushed to GitHub!           ║${NC}"
    echo -e "${GREEN}║   🔗 https://github.com/Juan-Cwq/Church_untitled1${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
else
    echo ""
    echo -e "${RED}❌ Push failed. Please check your credentials and try again.${NC}"
    exit 1
fi

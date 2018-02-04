#!/bin/bash
source ~/.bash_profile

THISFOLDER="${0%/*}"
cd $THISFOLDER

# Rebuild site making sure there are no changes
sh ./_build_site.sh

# Check if working directory is clean
if output=$(git status --porcelain) && [ -z "$output" ]; then
  # Working directory clean
  git subtree push --prefix _site origin gh-pages
  echo '----------------------------------------'
  echo 'Website updated!'
  echo '----------------------------------------'
else 
  # Uncommitted changes
  echo '----------------------------------------'
  echo 'Could not update website'
  echo '----------------------------------------'
  echo 'Please commit any changes to master first, before pushing live.'
fi

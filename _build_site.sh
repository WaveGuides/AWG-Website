#!/bin/bash
source ~/.bash_profile

THISFOLDER="${0%/*}"
cd $THISFOLDER

# Makes sure no old files are left
rm -rf ./_site

# Run virtual environment and build site
workon awg_web
tags build

# Remove git from build
rm -rf ./_site/.git

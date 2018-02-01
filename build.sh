#!/bin/bash
source ~/.bash_profile

THISFOLDER="${0%/*}"

cd $THISFOLDER
workon awg_web
tags build

rm -rf ./_site/.git

#git subtree push --prefix _site origin gh-pages

#!/bin/bash
source ~/.bash_profile

THISFOLDER="${0%/*}"
cd $THISFOLDER

# Rebuild site making sure there are no changes
sh ./_build_site.sh

if git checkout master &&
    git fetch origin master &&
    [ `git rev-list HEAD...origin/master --count` != 0 ] &&
    git merge origin/master
then
    git subtree push --prefix _site origin gh-pages
    echo '----------------------------------------'
    echo 'Website updated!'
    echo '----------------------------------------'
else
    echo '----------------------------------------'
    echo 'Could not update website'
    echo '----------------------------------------'
    echo 'Please commit any changes to master first, before pushing live.'
fi


# AWG Website

![](preview_index.png?v=4&s=200)

The [AWG website](http://waveguides.com.au) is a static site build on top of [html5boilerplate](https://github.com/h5bp/html5-boilerplate) and templified with [Brace Tags](https://github.com/braceio/tags).

## Requirements
- [virtualenv](https://pypi.python.org/pypi/virtualenv)
- [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper/)
- [Python Brace Tags](https://pypi.python.org/pypi/brace-tags/1.0.3)

## Build

Use `tags build` or `tags serve` to generate the wesite into the `_site` folder.

## Publish manually

    git subtree push --prefix _site origin gh-pages

## Using the build and publish scripts

The `_build_site.sh` builds the site into the `_site` folder. This script will remove the `.git` folder making it easy to commit the changes into the feature branch. It also removes the `_site` folder first making sure there are no old files left in the folder.

The `_publish_site.sh` script pushes the site to the `gh-pages` branch. But before it does this it checks if the master branch is clean. If there are any changes it reminds the user to commit/resolve these first.
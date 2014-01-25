## This script creates the quickInstall.js file from
## the main.js and stylesBase.js files
## Doesn't work in IDLE...

quickInstall = open('quickInstall.js', 'w')
main = open('main.js', 'r')
base = open('stylesBase.js', 'r')
langSelector = open('langSelector.html', 'r')

quickInstall.write('//*******************stylesBases.js**************\n\n' +
                   base.read() + '\n\n'
                   '//*******************main.js*********************\n\n' +
                   main.read())

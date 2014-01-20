## This script creates the quickInstall.js file from
## the main.js and stylesBase.js files


# Checking Python compatibility (thanks orip at StackOverflow!)
def isNewPython():
    try:
      eval("1 if True else 2")
    except SyntaxError:
      False


quickInstall = open('quickInstall.js', 'w')
main = open('main.js', 'r')
base = open('stylesBase.js', 'r')

quickInstall.write('//*******************stylesBases.js**************\n\n' +
                   base.read() + '\n\n'
                   '//*******************main.js*********************\n\n' +
                   main.read())
print('Done')

if isNewPython: input()
else: raw_input()

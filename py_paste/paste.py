#!/usr/bin/env python
# coding=utf-8
from pasteimg import PasteImg
from sys import stdin, stdout
import os
import gtk
import random
# -----------------------
changelogBase = "resources/help/images"
changelogPath = "./%s" % changelogBase
if not os.path.exists(changelogPath):
    os.makedirs(changelogPath)

while True:
    stdout.write("\nPodaj nazwę pliku (bez rozszerzenia) lub wciśnij ENTER: ")
    name = stdin.readline().rstrip("\n")

    if name == "":
        name = ''.join(random.choice('0123456789abcdef') for i in range(12))
    filePath = "%s/%s.png" % (changelogPath, name)
    if os.path.exists(filePath):
        stdout.write("\nPlik istnieje, spróbuj ponownie.")
        continue
    if name is None:
        exit(0)
    else:
        paste = PasteImg(filePath)
        paste.main()
        os.system("git add %s" % filePath)
        clipb = gtk.clipboard_get()
        clipb.clear()
        clipb.set_text("%s/%s.png" % (changelogBase, name))
        clipb.store()

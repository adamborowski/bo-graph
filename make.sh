sencha app build -c production
./sync.sh
git add .
git commit -am production
git push origin
rm -f build/bograph.zip
zip build/bograph.zip build/production/bo -r

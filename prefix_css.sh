#!/usr/bin/bash

generate_vendor_prefixes() {
  for file in $1/*; do
    if [ -d "$file" ] && ([ "$file" != "./node_modules" ] && [ "$file" != "./build" ] && [ "$file" != "./.git" ]); then
      count=0
      count=`ls -1 $file/*.css 2>/dev/null | wc -l`
      if [ $count != 0 ]; then
        npx postcss $file/*.css --use autoprefixer -d $file/
	echo "Generated CSS Vendor Prefixes to CSS files in: ${file}/"
      fi

      generate_vendor_prefixes $file
    fi
  done
}

if [ -d $1 ] && [ -f "$1/*.css" ]; then
  npx postcss $1/*.css --use autoprefixer -d $1/
  echo "Generated CSS Vendor Prefixes to CSS files in: ${1}"
elif [ -d $1 ]; then
  generate_vendor_prefixes $1
else
  echo "The current folder has no CSS files or it is not a folder"
fi

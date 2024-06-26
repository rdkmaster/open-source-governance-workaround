#!/bin/bash

scriptDir=$(cd `dirname $0`; pwd)

if [ $# -eq 0 ]; then
	echo "Error: need package name to publish, usage: sh publish.sh <package-name>"
	exit 1
fi
packages="$@"

cd $scriptDir
for package in $packages; do
    dirName=@rdkmaster/$(basename "$package")
    echo "Publishing package: $dirName"
    npm publish --registry https://registry.npmjs.org/ --loglevel warn --access public $dirName/
    if [ $? -eq 0 ]; then
        echo "Package $dirName published successfully"
    else
        echo ""
        echo ""
        echo "Error: Failed to publish package $dirName"
        echo ""
        echo ""
    fi
done


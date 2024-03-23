#!/bin/bash

scriptDir=$(cd `dirname $0`; pwd)
packages=$(find "$scriptDir/@rdkmaster" -mindepth 1 -maxdepth 1 -type d | grep -v "\.git$")

cd $scriptDir
for package in $packages; do
    dirName=@rdkmaster/$(basename "$package")
    echo "Publishing package: $dirName"
    npm publish --loglevel=warn --access public $dirName/
    if [ $? -eq 0 ]; then
        echo "Package $dirName published successfully"
    else
        echo "Error: Failed to publish package $dirName"
    fi
done


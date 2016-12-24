#!/usr/bin/env bash

# Read .buildignore content and replace newlines with "\|"
BUILD_IGNORE=$(paste -s -d '\|' .buildignore | sed 's/\|/\\\|/g')
# List all files except the ignored ones
file_list=$(ls | grep -v "$BUILD_IGNORE")
# Zip the files
zip -r -X tab-renamer.zip ${file_list}
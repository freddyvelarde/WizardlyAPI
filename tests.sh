#!/bin/bash

# Define ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "Running '${GREEN}rest-client${NC}' tests:"

sleep 1

docker exec -it rest-client sh -c 'npm run test'

# Check the exit code of the previous command
if [ $? -eq 0 ]; then
  echo -e "\n${GREEN}All tests passed.${NC}"
else
  echo -e "\n${RED}Tests failed.${NC}"
fi


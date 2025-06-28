#!/bin/bash
cd /home/kavia/workspace/code-generation/persistenttictactoe-61945-f0dce36c/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


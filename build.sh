#!/bin/bash

# Setup SSH key
mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_ed25519

# Add GitHub to known hosts
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# Initialize and update submodules
git submodule update --init --recursive

# Run your build command
bun run build
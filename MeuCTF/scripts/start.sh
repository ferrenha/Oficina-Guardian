#!/bin/sh
set -eu

# Prepare sshd
mkdir -p /var/run/sshd
ssh-keygen -A >/dev/null 2>&1 || true

# Ensure ctfuser password (in case not set at build)
echo "ctfuser:ctfpass" | chpasswd || true

# Start sshd in background (internal only; no extra port exposed)
/usr/sbin/sshd -D &

# Start node app (foreground)
exec node server.js


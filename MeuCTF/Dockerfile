FROM node:20-alpine

WORKDIR /app

# System deps for CTF features
RUN apk add --no-cache \
    openssh \
    imagemagick \
    sudo \
    bash \
    shadow \
    util-linux \
    netcat-openbsd

# App deps
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# App source
COPY . .

# Users
RUN adduser -D -s /bin/sh web && \
    adduser -D -s /bin/sh ctfuser && \
    adduser -D -s /bin/sh admin && \
    echo 'ctfuser:ctfpass' | chpasswd && \
    echo 'admin:admin' | chpasswd && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && \
    echo 'PermitRootLogin no' >> /etc/ssh/sshd_config && \
    (grep -q '^#includedir /etc/sudoers.d' /etc/sudoers || echo '#includedir /etc/sudoers.d' >> /etc/sudoers) && \
    mkdir -p /opt/flags /opt/hints && \
    printf 'GUARDIAN{stage1_jwt_token_decoded_admin}\n' > /opt/flags/flag1.txt && \
    printf 'GUARDIAN{stage2_user_via_ssh}\n' > /opt/flags/flag2.txt && \
    printf 'ctfuser ALL=(root) NOPASSWD: /usr/bin/find\nadmin ALL=(root) NOPASSWD: /usr/bin/find\n' > /etc/sudoers.d/ctf && \
    chmod 0440 /etc/sudoers.d/ctf && \
    printf 'GUARDIAN{stage3_root_privesc_success}\n' > /root/flag3.txt && \
    mkdir -p /home/admin && printf 'GUARDIAN{stage2_user_via_ssh}\n' > /home/admin/user.txt && chown admin:admin /home/admin/user.txt && \
    chmod 0644 /opt/flags/flag1.txt /opt/flags/flag2.txt /home/admin/user.txt && \
    chmod 0600 /root/flag3.txt

# Start script
RUN chmod +x /app/scripts/start.sh

EXPOSE 80 22
CMD ["/bin/sh", "/app/scripts/start.sh"]

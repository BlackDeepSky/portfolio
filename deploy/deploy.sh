#!/usr/bin/env bash
# Деплой портфолио на домашний сервер (blackdeepsky.by).
#
# На сервере /var/www/portfolio — git-клон (origin: github.com/BlackDeepSky/portfolio),
# а /var/www/html — то, что отдаёт Nginx. Поэтому деплой = git pull + rsync в web-root.
#
# Запуск от пользователя blackdeepsky (для chown/chmod используется узкий sudo):
#   cd /var/www/portfolio && git pull --ff-only origin main && bash deploy/deploy.sh
#
# С Mac это делает функция deploy-portfolio в ~/.zshrc (push + деплой).
set -euo pipefail

REPO=/var/www/portfolio
WEB=/var/www/html

echo "[deploy] git pull"
git -C "$REPO" pull --ff-only origin main

echo "[deploy] обновляю $WEB"
rsync -a --delete \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='deploy' \
  --exclude='deploy.sh' \
  --exclude='.gitignore' \
  --exclude='.DS_Store' \
  "$REPO/" "$WEB/"

# Убираем служебные файлы, которые могли попасть в web-root предыдущими выкатками
# (старый скрипт не исключал их, из-за чего deploy.sh и .gitignore отдавались публично).
rm -rf "$WEB/deploy" "$WEB/deploy.sh" "$WEB/.gitignore" "$WEB/.github"

# Cache-busting: подставляем короткий хэш коммита в ссылки на css/js, чтобы Cloudflare
# (кэширует ассеты до 4 часов) не отдавал старую версию после деплоя.
COMMIT=$(git -C "$REPO" rev-parse --short HEAD)
sed -i \
  -e "s|href=\"css/style.css\"|href=\"css/style.css?v=$COMMIT\"|" \
  -e "s|src=\"js/\([A-Za-z0-9_-]*\)\.js\"|src=\"js/\1.js?v=$COMMIT\"|g" \
  "$WEB/index.html"

echo "[deploy] права"
sudo chown -R blackdeepsky:blackdeepsky "$WEB"
sudo find "$WEB" -type d -exec chmod 755 {} \;
sudo find "$WEB" -type f -exec chmod 644 {} \;

echo "[deploy] done @ $(date '+%Y-%m-%d %H:%M:%S')"

# VPS Deployment Guide

## Hızlı Deployment Komutları

```bash
# 1. Git pull
git pull origin master

# 2. Dependencies
npm install

# 3. Database migration (varsa)
npx prisma migrate deploy
npx prisma generate

# 4. Build
npm run build

# 5. Restart
pm2 restart cv-app
```

## Sıralı Adımlar

### 1. Projeyi Hazırla (Local)

```bash
git add .
git commit -m "Update project"
git push origin master
```

### 2. VPS'e Bağlan

```bash
ssh kullanici@vps-ip
```

### 3. Projeyi Güncelle

```bash
cd /path/to/project
git pull origin master
npm install
```

### 4. Database Migration (Yeni alanlar varsa)

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Build ve Deploy

```bash
npm run build
pm2 restart cv-app
# veya
systemctl restart your-service-name
```

### 6. Logları Kontrol Et

```bash
pm2 logs cv-app
# veya
journalctl -u your-service-name -f
```

## Environment Variables (.env) Kontrolü

```bash
# .env dosyasını kontrol et
cat .env

# Örnek .env içeriği:
# DATABASE_URL="postgresql://user:password@localhost:5432/cv"
# NEXTAUTH_SECRET="your-secret-key"
# NEXTAUTH_URL="https://yourdomain.com"
```

## Nginx Config (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## PM2 Process Manager

```bash
# PM2 ile başlat
pm2 start npm --name "cv-app" -- start

# PM2 komutları
pm2 list          # Process listesi
pm2 logs          # Logları göster
pm2 restart cv-app # Restart
pm2 stop cv-app    # Stop
pm2 delete cv-app  # Sil
```

## Troubleshooting

### Port Kullanımda Hatası

```bash
# 3000 portunu kullanan process'i bul
lsof -i :3000

# Process'i öldür
kill -9 PID
```

### Build Hatası

```bash
# Node modules'u temizle ve yeniden yükle
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Connection Hatası

```bash
# PostgreSQL servisi çalışıyor mu?
sudo systemctl status postgresql

# Database'e bağlan
psql -U username -d cvdb
```

## Rollback (Geri Alma)

```bash
# Önceki commit'e dön
git log  # commit hash'ini bul
git checkout commit-hash

# Build ve restart
npm run build
pm2 restart cv-app
```

## Güvenlik Kontrolleri

```bash
# Firewall kontrolü
sudo ufw status

# SSL sertifikası (Let's Encrypt)
sudo certbot --nginx -d yourdomain.com
```

## Performance Monitoring

```bash
# CPU ve Memory kullanımı
htop

# Disk kullanımı
df -h

# PM2 monitoring
pm2 monit
```

## Notlar

1. **Production mode**: `npm run build` ve `npm start` kullan
2. **Environment**: `.env.production` dosyasını oluştur
3. **Backup**: Düzenli olarak database ve dosyaları yedekle
4. **Monitoring**: PM2 monitoring aktif et
5. **Logs**: Log dosyalarını düzenli kontrol et

## Hızlı Referans

```bash
# Deployment
git pull && npm install && npm run build && pm2 restart cv-app

# Logs
pm2 logs cv-app

# Status
pm2 status

# Database backup
pg_dump -U username cvdb > backup.sql
```


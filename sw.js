// sw.js - ApeX İhale Arka Plan Yönetimi
let timer1, timer2;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

function zamanlayicilariBaslat() {
    // Önceki sayaçları temizle
    clearTimeout(timer1);
    clearTimeout(timer2);

    // 1. MESAJ: 1 Saat 25 Dakika sonra (85 dakika)
    timer1 = setTimeout(() => {
        self.registration.showNotification("ApeX İhale", {
            body: "İhale Almaya Gelmiyecek Misin?😔",
            icon: "logo.png",
            vibrate: [200, 100, 200]
        });
    }, 85 * 60 * 1000);

    // 2. MESAJ: Toplam 2.5 Saat sonra (150 dakika)
    timer2 = setTimeout(() => {
        self.registration.showNotification("ApeX İhale", {
            body: "İhale Alma Süresi Geldi, Haydi Gel Teklifini At İhaleni Kap!😏",
            icon: "logo.png",
            vibrate: [200, 100, 200]
        });
        // Döngü bittiği için tekrar başlatır
        zamanlayicilariBaslat();
    }, 150 * 60 * 1000);
}

// Ana uygulamadan gelen mesajları dinle
self.addEventListener('message', (event) => {
    if (event.data === 'GIRIS_YAPILDI') {
        // Uygulamaya girdiğinde anlık hoş geldin bildirimi gönder
        self.registration.showNotification("ApeX İhale", {
            body: "İhale Almaya Mı Geldin? Hoş Geldin :))",
            icon: "logo.png"
        });
        
        // Arka plan sayaçlarını sıfırla ve yeniden başlat
        zamanlayicilariBaslat();
    }
});

// Bildirime tıklandığında uygulamayı aç/odakla
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            if (windowClients.length > 0) {
                return windowClients[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});

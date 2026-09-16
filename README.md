# Kod Kaşifleri

Proje tanıtım sitesi ve uygulama demosu. Güncel kapsam: Proje Tanıtım Sunumu v1.1, P-01–P-08 teknik şartnameleri ve D-47 Pilot Başlangıç Takvimi.

## Açılış

Ayrı sunulan `Kod_Kasifleri_Onizleme.html`, site ve demoyu tek dosyada açar; görseller ve hareketli açılış dahil çevrimdışı çalışır. Dosyayı indirip tarayıcıda açın.

`dist/index.html` proje tanıtımıdır. `dist/demo.html` çalışan uygulama demosudur. Derleme, paket kurulumu veya API anahtarı gerektirmez.

## GitHub Pages

Depo içeriğini koruyarak bu kaynakları deponun köküne yerleştirin. GitHub'da **Settings → Pages → Source: GitHub Actions** seçin. Ekli `.github/workflows/pages.yml`, `dist` klasörünü yayımlar. Ana dal `main` olarak yapılandırılmıştır. Alt dizinli GitHub Pages adresleri için bütün bağlantılar göreli yazılmıştır.

## Demo kapsamı

- 12 temada örnek görev: yön komutları, sıralama, döngü, hata düzeltme, olay/tepki, mesafe sensörü, motor dengesi, sulama otomasyonu, sınıflandırma, YZ doğrulama, yerel proje planı ve takım/test planı.
- Çocuk, öğretmen, veli ve kurum görünümleri.
- Yaş seçimi yön parkurunu ve sıralama görevini uyarlar; diğer temalar ortak kavramı örnekler ve yetişkin rehberliğiyle ele alınır.
- Kademeli, hazır kurallarla çalışan ipuçları; robot rengi, portfolyo, görev atama, fiziksel doğrulama ve gelişim özeti.
- Kurgusal sınıf verisi isteğe bağlı eklenir; mevcut denemeler silinmez.
- Veriler yalnız aynı tarayıcının `localStorage` alanında tutulur. Merkezi veritabanı, canlı yapay zekâ, robot veya okul bağlantısı bulunmaz.
- Rol geçişi bir kimlik doğrulama sistemi değildir. Gerçek kişi, öğrenci, okul verisi yüklenmemelidir. Şifresiz sunum demosudur.
- Web sürümü ilk yükleme ve sayfa geçişlerinde ağ gerektirebilir. Üretim ürünündeki offline paket/merkezi eşitleme bu demoda uygulanmış olarak sunulmaz.

## Üretim öncesi

Gerçek hesap/rol yetkilendirmesi, sunucu ve veritabanı, pedagojik onaylı içerik, 24 mini animasyon, güvenli YZ ara katmanı, mobil istemciler, çevrimdışı eşitleme, robot entegrasyonu, güvenlik ve pilot kabul süreçleri ayrı geliştirme kapsamıdır.

## Kaynak kararı

Güncel v1.1 sunumu Faz 1 için 12 tema × 2 mini bölüm, yaklaşık 1–2 dakikalık 24 mini animasyon öngörür. Eski 3 sezon / 72 uzun bölüm taslağı Faz 1 hedefi olarak yayımlanmamıştır. Uzun animasyonlar sonraki içerik genişlemesi altında anlatılır. Bütçe veya gerçekleşmemiş pilot/kurum onayı iddiası eklenmemiştir.

## Kontrol

JavaScript sözdizimi ve görev motoru kontrolleri: `node qa/verify.cjs` (geliştirme kontrol dosyası yayın dizinine dahil değildir).

Görsel kaynakları ve içerik eşleştirmesi `SOURCE_NOTES.md` dosyasındadır.

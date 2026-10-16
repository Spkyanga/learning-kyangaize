# Learning Kyangaize — sigar gwaji 0.1

## Abin da ke aiki
- Dashboard
- Dictionary search (Hausa, English da Kyanganci)
- Darasin lambobi 1–20
- Favorites da dark mode
- Ajiye favorites da zaɓin dark mode a cikin wayar (localStorage)
- PWA/offline cache bayan an fara buɗe app a hosting mai HTTPS
- Allon bayani kan Premium ₦500 / watanni 12

## Muhimmin bayani
Wannan **samfurin farko ne**, ba APK ba kuma ba cikakken tsarin kasuwanci ba.
Biyan kuɗi na gaske **bai haɗu ba**. Kada a karɓi kuɗi ta wannan samfurin.
Kafin ƙaddamarwa, a gina backend mai tsaro da Paystack, tabbatar da transaction a server, sarrafa expiry na watanni 12, da gwada tsaro.
Kalmomin Kyanganci an shigar da su daga jerin da mai aikin ya bayar. Ba a ƙirƙiri sabbin kalmomi ba. Wasu fassarorin Turanci an nuna su a matsayin waɗanda ba a tabbatar ba.

## Yadda za a buɗe a Android
1. Ajiye ZIP ɗin kuma a cire (Extract) shi.
2. Domin gwaji mai sauƙi, za a iya buɗe `index.html` ta browser; wasu fasalolin offline/PWA suna buƙatar hosting mai HTTPS.
3. Domin a saka a Home Screen kamar app, da farko a ɗora fayilolin zuwa hosting mai HTTPS. Sai a buɗe adireshin a Chrome > menu ⋮ > Add to Home screen / Install app.
4. Don biyan kuɗi na gaske da APK, ana buƙatar backend, saitin Paystack da gwaji kafin sakin app.

## Fayiloli
- `index.html`: shafukan app
- `styles.css`: zane da responsive layout
- `app.js`: search, lessons, favorites, dark mode
- `manifest.json`, `sw.js`, `icon.svg`: PWA files

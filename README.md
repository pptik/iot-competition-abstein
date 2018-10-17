# Pendahuluan

Selamat datang pada halaman petunjuk penggunaan kostumisasi Website Absensi untuk keperluan lomba IoT SMK. Silahkan ikuti step by step di bawah untuk memulai kostumisasi

# Step by step penggunaan

1. Unduh aplikasi POSTMAN untuk mencoba API yang akan digunakan.
2. Unduh file POSTMAN Absensi yang sudah disediakan oleh panitia di https://drive.google.com/open?id=1vA4grTm7J3sUaP_3O4Oe4Gj-WmpAmrIr .
3. Import hasil poin no 2 ke aplikasi POSTMAN.
4. Setelah berhasil diimport perhatikan deskiprsi dari masing-masing API dan parameter untuk dipergunakan pada website.
5. Kostumisasi website dengan menggunakan template pada repository ini dengan API yang ada. (Mencangkup desain dan penyajian data).

## 5.1 Cara menjalankan template website
``` bash
1. Donwload dan Install Node JS di https://nodejs.org/en/download/
2. Buka CMD atau command prompt di komputer/laptop
3. Arahkan ke lokasi direktori template projek 
4. Lalu jalankan perintah:

# Untuk menginstall libray
npm install

# Untuk menjalankan versi development localhost:8080
npm run dev

```
5. Lihat hasil menjalankan perintah di web browser dengan alamat localhost:8080
6. Apabila konstumisasi website selesai dan ingin dihostingkan maka perlu dilakukan proses build dengan menjalankan perintah:

```
npm run build
```

## Keterangan
1. Contoh Format pendafaran Siswa: https://drive.google.com/file/d/1Tvd3hf7bb-ZNWet0GZQNtCgRSTJKKT5R/view?usp=sharing
2. Contoh Format pendaftaran RFID:
https://drive.google.com/file/d/1a_TQK_r3cdXtFrDsvKohdlHklz7W8U0T/view?usp=sharing
3. Kirim email ke itb.pptik@gmail.com dengan subjek: Pendaftaran Siswa RFID Absensi Sekolah (Nama Sekolah Anda)
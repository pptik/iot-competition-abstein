# Pendahuluan

Selamat datang pada halaman petunjuk penggunaan kostumisasi Website Absensi untuk keperluan lomba IoT SMK. Silahkan ikuti step by step di bawah untuk memulai kostumisasi

# Step by step penggunaan

1. Unduh aplikasi POSTMAN di https://www.getpostman.com/apps untuk mencoba API yang akan digunakan.
2. Unduh file POSTMAN Absensi yang sudah disediakan oleh panitia di https://drive.google.com/open?id=1vA4grTm7J3sUaP_3O4Oe4Gj-WmpAmrIr .
3. Import hasil poin no 2 ke aplikasi POSTMAN.
4. Setelah berhasil diimport perhatikan deskiprsi dari masing-masing API dan coba login dengan akun sekolah. Akun sekolah dapat dilihat di https://drive.google.com/file/d/1MdXQqDWoKo1GHqCvkdoeIGMYGRwBc9S8/view?usp=sharing .
5. Unduh template website dengan menekan tombol Clone or Download lalu pilih Download ZIP.
6. Kostumisasi website dengan menggunakan template pada repository ini dengan API yang ada. (Mencangkup desain dan penyajian data).
7. Cara menjalankan template website di komputer/laptop Anda
``` bash
1. Donwload dan Install Node JS di https://nodejs.org/en/download/
2. Buka command prompt atau terminal.
3. Arahkan ke lokasi direktori template projek 
4. Lalu jalankan perintah:

# Untuk menginstall libray
npm install

# Untuk menjalankan versi development localhost:8080
npm run dev

```
5. Lihat hasil menjalankan perintah di web browser dengan alamat localhost:8080(menyesuaikan dengan hasil keluaran di layar terminal)
6. Apabila konstumisasi website selesai dan ingin dihostingkan maka perlu dilakukan proses build dengan menjalankan perintah:

```
npm run build
```
7. Silahkan hubungi panitia untuk keperluan hosting website.

## Keterangan
1. Contoh Format pendafaran Siswa: https://drive.google.com/file/d/1Tvd3hf7bb-ZNWet0GZQNtCgRSTJKKT5R/view?usp=sharing
2. Contoh Format pendaftaran RFID:
https://drive.google.com/file/d/1a_TQK_r3cdXtFrDsvKohdlHklz7W8U0T/view?usp=sharing
3. Kirim email ke itb.pptik@gmail.com dengan subjek: Pendaftaran Siswa RFID Absensi Sekolah (Nama Sekolah Anda)
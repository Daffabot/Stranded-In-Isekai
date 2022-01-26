var awal_cerita = [];
awal_cerita[0] = [0, "Huh? apa yang terjadi? dimana ini?", "next"];
awal_cerita[1] = [0, "Seingatku aku sedang memperbaiki bug di komputer.\nKenapa tiba-tiba aku disini? apakah aku ketiduran?", "next"];
awal_cerita[2] = [0, "Kalo dilihat-lihat daerah ini aneh sekali, bangunannya\nterlihat kuno seperti di abad pertengahan saja.", "next"];
awal_cerita[3] = [0, "Wah jangan-jangan aku teleport ke isekai nih. Lebih\nbaik, aku berkeliling dulu untuk mencari tahu", "close"];

var talk_1 = [];
talk_1[0] = [0, "Punten gopud... dimanakah ini?", "next"];
talk_1[1] = [5, "Ini desa Ganyu, kamu berasal dari mana?", "next"];
talk_1[2] = [0, "Saya dari Subang pak", "next"];
talk_1[3] = [5, "Subang, mmmmm.... saya belum pernah dengar", "next"];
talk_1[4] = [5, "Coba kamu ke resto, mungkin kamu bisa bertanya-\ntanya", "next"];
talk_1[5] = [5, "Tapi, kamu jangan pergi ke hutan! Disana banyak\nkadrun", "next"];
talk_1[6] = [0, "Wakarimasta, hatur nuhun infona", "close"];

var talk_2 = [];  //services NPC inn
talk_2[0] = [2, "Selamat datang di penginapan kami. Istirahat dapat\nmemulihkan energi, terutama sehabis bertempur.", "next"];
talk_2[1] = [2, "Apakah anata mau menginap di kamar onee-san?", "trade", 0];
talk_2[2] = [2, "Arigatou gozaimas, selamat datang kembali", "close"];
talk_2[3] = [2, "Maaf, anda tidak memiliki cukup uang, makanya kerja tolol!", "trade"];
talk_2[4] = [2, "Ohayou onee-chan! selamat beraktivitas kembali", "close"];

var item_0 = [];
item_0[0] = [2,2, "bobo bareng onee-san", 1, 30, "sleep", 10, 0, "Memulihkan energimu 100% sehingga siap bertempur kembali esok hari"];
item_0[1] = [0,3, "Tidak jadi menginap", 0, 0, "close", 0, ""];

var talk_3 = [];
talk_3[0] = [7, "Istirahat di penginapan ini akan memulihkan tenaga\nmu", "next"];
talk_3[1] = [7, "Hal itu bermanfaat jika kamu kelelahan sehabis\nbertempur", "next"];
talk_3[2] = [0, "Naruhudo, jadi tadi apakah anda habis seggs loli pak?", "next"];
talk_3[3] = [7, "Eh.. eh etto.. kagaklah njir, orang saya habis perang\ndi hutan untuk menaikkan pengetahuan saya.", "close"];

var talk_4 = [];  //services NPC bar
talk_4[0] = [4, "Selamat datang di warkop kami..", "next"];
talk_4[1] = [4, "Apa yang anata butuhkan", "trade", 1];
talk_4[2] = [4, "Arigatou gozaimas! selamat datang kembali ya\nouji-sama", "close"];
talk_4[3] = [4, "Maaf, anda tidak memiliki cukup uang, makanya kerja goblog!", "trade"];
talk_4[4] = [4, "Maaf, level anda belum cukup bego!", "trade"];
talk_4[5] = [4, "Anata sudah punya", "trade"];

var item_1 = [];
item_1[0] = [0,2, "Kopikap Basi", 1, 10, "HP", 5, 0, "Memulihkan energimu sebesar\n5 poin"];
item_1[1] = [1,2, "Ayam Goyeng", 1, 20, "HP", 10, 0, "Memulihkan energimu sebesar 10 poin"];
item_1[2] = [0,3, "Tidak jadi beli", 0, 0, "close", 0, ""];

var talk_5 = [];
talk_5[0] = [1, "Yare yare... sepertinya kamu orang baru disini,\npakaianmu terlihat asing", "next"];
talk_5[1] = [1, "Bersiaplah, jika kamu ingin pergi ke hutan, karena\nbanyak anak muda yang mati dihutan karena kurang perlengkapan.", "next"];
talk_5[2] = [1, "Jadi beli dulu perlengkapan di toko sebelah", "close"];

var talk_6 = [];  //services NPC bar
talk_6[0] = [3, "Selamat datang di toko senpi ..", "next"];
talk_6[1] = [3, "Apa yang anata butuhkan", "trade", 2];
talk_6[2] = [3, "Arigatou gozaimas! selamat datang kembali", "close"];
talk_6[3] = [3, "Maaf, kamu tidak memiliki cukup uang bakayaro!!!", "trade", 2];
talk_6[4] = [3, "Maaf, level kamu belum cukup tolol!", "trade", 2];
talk_6[5] = [3, "Anata sudah punya barang ini", "trade", 2];

var item_2 = [];
item_2[0] = [0,0, "Shinai", 1, 40, "ATK", 5, 1, "Pedang dari bambu asal jepang ini cocok untuk pemula. Meningkatkan kerusakan sebesar 5 Poin"];
item_2[1] = [1,0, "Golok Badag", 2, 250, "ATK", 12, 2, "Golok tajam, senjata berbahaya yang dapat meningkatkan kerusakan sebesar 12 poin. Butuh level 2 untuk menggunakannya"];
item_2[2] = [2,0, "Taser Gun", 4, 500, "ATK", 18, 3, "Senjata kejut listrik yang sangat mematikan, kerusakan sebesar 18 poin. Butuh level 4 untuk menggunakannya"];
item_2[3] = [3,0, "Perisai Kayu", 1, 40, "DEF", 4, 4, "Perisai kayu cocok untuk pemula, meningkatkan daya tahan sebesar 4 poin"];
item_2[4] = [0,1, "Perisai Kuningan", 2, 150, "DEF", 9, 5, "Perisai kuningan lebih kuat, mampu melindungi sebesar 9 poin. Butuh level 2 untuk menggunakannya"];
item_2[5] = [1,1, "Perisai Duralumin", 3, 350, "DEF", 12, 6, "Perisai ini dapat meningkatkan daya tahan sebesar 12 poin.. Butuh level 3 untuk menggunakannya"];
item_2[6] = [2,1, "Ramuan Elixir", 1, 30, "HP", 10, 7, "Ramuan untuk memulihkan energi di saat pertempuran berlangsung"];
item_2[7] = [3,1, "Buku Doujin", 1, 50, "EXP", 25, 0, "Bacol untuk memperkaya wawasan dan menambah pengalaman"];
item_2[8] = [0,3, "Tidak jadi beli", 0, 0, "close", 0, ""];
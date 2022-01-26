import flash.display.MovieClip;
import flash.display.Bitmap;
import flash.system.Capabilities;
/*
RPG-Game versi 1.0
Nama : Daffa Ahmad Ibrahin
Email : vladimirdimitryivan@gmail.com

silahkan digunakan dengan mencantumkan credit

Flash RPG adalah kumpulan kode yang saya buat untuk mempermudah pengembangan game RPG dengan teknik Bitmap Data.
*/
//game screen
var screen_w:int = 800; //lebar project 
var screen_h:int = 600;
var game_output:String = "pc";  //nilai = "pc" atau = "android"
//tile
var tile_set:BitmapData;
var game:MovieClip;
var peta:MovieClip;
var canvas:MovieClip;
var cmask:MovieClip;
var tile_bmp:Bitmap;
var item_bmp:Bitmap;
//linkage name
var tileset_name:String = "tileset_bmp";
var char_sprites_name:String = "karakter_1";
var UIset_name:String = "UI_set";
var faceset_name: String = "face_set";
var itemset_name: String = "item_set";
var battle_bg: String = "bg_battle";
var game_over_bg: String = "gameover_bg";
var game_cover_bg: String = "cover_bg";

var map_w:int = 10; //lebar peta
var map_h:int = 10; //tinggi peta
var t_size:int = 32; //tile size : ukuran tile
var m_size:int = 512; //master size : ukuran tileset
var tile_num:int = Math.floor(m_size/t_size);

//karakter
var char:MovieClip;
var karakter_w:int = 20;
var karakter_h:int = 20;
var karakter_x:int = 0;
var karakter_y:int = 0;
var karakter_speed:int = 4;
 
var arah_karakter:int = 1;
var karakter_langkah:int = 1;
var start_x:int;
var start_y:int;
var old_x:int;
var old_y:int;


//keyboard
var key_up:Boolean=false;
var key_down:Boolean=false;
var key_left:Boolean=false;
var key_right:Boolean=false;
var key_space:Boolean=false;
var mouse_klik:Boolean=false;
//virtual kb
var vk:MovieClip;
var stick:MovieClip;
var v_space:MovieClip;
//game active
var game_aktif:Boolean=false;
var is_action:Boolean=false;

//map
var map_active:Array;
var last_map:Array;
var door_id:int;

//karakter sprite -> digunakan untuk mengatur animasi / membuat movieclip 
var t05:int = t_size/2;
var t1:int = t_size;
var t2:int = t_size*2;
var t3:int = t_size*3;
var t4:int = t_size*4;
var char_tile_pos:Array = [[0, -t1], [-t1, -t1], [-t2, -t1],[-t1, -t1], [0, -t2], [-t1, -t2], [-t2, -t2],[-t1, -t2],[0, -t3], [-t1, -t3], [-t2, -t3],[-t1, -t3], [0, -t4], [-t1, -t4], [-t2, -t4],[-t1, -t4]];

var step:int = 0;

//UI_set
var ui_set:BitmapData;
var GUI:MovieClip;
var dialog:MovieClip;
var dialog_w:int = 480;
var dialog_h:int = 160;
var teks_display:TextField;
var gold_txt:TextField;
var GUI_ready:Boolean = false;
var hp_bar:MovieClip;
var exp_bar:MovieClip;
var popup:MovieClip;
var popup_item:MovieClip;
var tittle_page:MovieClip;
var gameover_page:MovieClip;

//karakter properti
var pc_hp:int = 10;
var pc_hp_max:int = 10;
var pc_exp:int = 1;
var pc_lvl:int = 1;
var pc_atk:int = 2;
var pc_def:int = 1;
var pc_item:Array = [0];
var pc_exp_level:Array = [10, 100, 150, 225, 350, 500, 1000, 10000];
var pc_hp_level:Array = [10, 10, 15, 25, 35, 55, 65, 75];
var pc_atk_level:Array = [1, 2, 5, 8, 11, 15, 20, 25];
var pc_def_level:Array = [1, 2, 3, 6, 8, 10, 12, 14];
var item_2:Array = [];
//story
var story_id:int = 0;
var just_talk:int = 0;
var popup_id:int = 0;
var item_id:int = 0;
var item_arr:Array;
var temp_arr:Array;

//npc
var npc_db:Array;
var talk_id:int;
var npc_id:int;

//enemy
var enemy_db:Array = new Array();
var enemy:Array = new Array();
var battle_arena:Array = new Array();
var btl_scene:MovieClip;
var pc_mc:MovieClip;
var e_mc:MovieClip;
var e_hp_bar:MovieClip;
var jawaban:MovieClip;
var jawaban_1:MovieClip;
var jawaban_2:MovieClip;
var jawaban_3:MovieClip;
var jawaban_4:MovieClip;
var attack_speed:MovieClip;
var enemy_id:int = 0;
var e_hp:int = 1;
var e_hp_max:int = 1;
var p_attack:int = 0;
var p_defend:int = 0;
var enemy_battle_id:int = 0;
var answer_time:int = 500;
var teks_soal:TextField;
var jawab_1:TextField;
var jawab_2:TextField;
var jawab_3:TextField;
var jawab_4:TextField;
var hasil_jawaban:Boolean = false;
var battle_scene:Boolean = false;

var temp_soal:Array;
var map_start:Array;
var temp_jawaban:Array;
var item_db:Array = new Array();
var no_soal:int;
var soal_quiz:Array;

//suara
var suara_aktif:Boolean = false;
var suara_halaman_pembuka:String = "";
var suara_peta:String = "";
var suara_battle_arena:String = "";
var suara_mode_pertempuran:String = "";
var suara_game_over:String = "";
var suara_level_up:String = "";
var suara_koin:String = "";
var suara_dapat_item:String = "";
var suara_menang:String = "";
var suara_serang:String = "";
var suara_benar:String = "";
var suara_salah:String = "";

//fungsi membaca tombol ditekan
function keyDownFunction(event:KeyboardEvent):void {
	if (event.keyCode == 38) {
		key_up=true;
	} else if (event.keyCode == 39) {
		key_right=true;
	} else if (event.keyCode == 40) {
		key_down=true;
	} else if (event.keyCode == 37) {
		key_left=true;
	}else if (event.keyCode == 32) {
		key_space=true;
	}
}
//fungsi membaca tombol dilepas
function keyUpFunction(event:KeyboardEvent) {
	if (event.keyCode == 38) {
		key_up=false;
	} else if (event.keyCode == 39) {
		key_right=false;
	} else if (event.keyCode == 40) {
		key_down=false;
	} else if (event.keyCode == 37) {
		key_left=false;
	}else if (event.keyCode == 32) {
		key_space=false;
		is_action = false;
	}
	karakter_langkah = 0;
}

//fungsi menggambar peta permainan dengan teknik bitmapData
function set_canvas(map:Array, tileset:String):void{	
	//npc
	npc_db = new Array();
	//menjadikan tileset sebagai gambar sumber
	map_w = map.length;
	map_h = map[0].length;
	tileset_name = tileset;
	trace("build map "+map_w+"x"+map_h);
	var tilesetClass = getDefinitionByName(tileset);
	var bmp:Bitmap = new Bitmap(new tilesetClass());
	tile_set = bmp.bitmapData;
	//membuat container untuk gambar potongan tile (background)
	canvas = new MovieClip();
	addChild(canvas);
	var bmp_handler:MovieClip = new MovieClip();
	canvas.addChild(bmp_handler);
	tile_bmp = new Bitmap(new BitmapData(map_w * t_size,map_h * t_size,true,0x00000000));
	bmp_handler.addChild(tile_bmp);
	//membuat container untuk gambar potongan tile (foreground)
	var item_handler:MovieClip = new MovieClip();
	canvas.addChild(item_handler);
	item_bmp = new Bitmap(new BitmapData(map_w * t_size,map_h * t_size,true,0x00000000));
	item_handler.addChild(item_bmp);
	//membuat container untuk potongan tile
	var tile_handler:MovieClip = new MovieClip();
	canvas.addChild(tile_handler);	
	tile_bmp = new Bitmap(new BitmapData(map_w * t_size,map_h * t_size,true,0x00000000));
	var bmd1:BitmapData = tile_set;
	var bmd2:BitmapData = tile_set;
	for (var i:int = 0; i < map_w; i++){
		for (var j:int = 0; j < map_h; j++){
			var t_type:int = map[i][j][1];
			//background
			if (t_type > -1){
				var sy:int = Math.floor(t_type / tile_num);
				var sx:int = t_type-(sy*tile_num);
				var rect:Rectangle = new Rectangle(sx * t_size,sy * t_size,t_size,t_size);
				var pt:Point = new Point(i * t_size,j * t_size);
				tile_bmp.bitmapData.copyPixels(bmd1, rect, pt);
			}
			var i_type:int = map[i][j][2];
			//foreground
			if (i_type > 0){
				var iy:int = Math.floor(i_type / tile_num);
				var ix:int = i_type-(iy*tile_num);
				var i_rect:Rectangle = new Rectangle(ix * t_size,iy * t_size,t_size,t_size);
				var i_pt:Point = new Point(i * t_size,j * t_size);
				item_bmp.bitmapData.copyPixels(bmd1, i_rect, i_pt);
			}	
			//door
			if (map[i][j][0] == 2){
				if (map[i][j][3] == 0){
					start_x = i;
					start_y = j;					
					trace("door x"+start_x);
				}
			}
			//npc
			if (map[i][j][0] == 5){
				var n_db:Array = new Array();
				var n_id:int = map[i][j][3];
				var t_id:int = map[i][j][4];
				var npc_ob:MovieClip = set_char("npc_sprites_"+n_id);
				game.addChild(npc_ob);
				npc_ob.x = i*t_size+t05;
				npc_ob.y = j*t_size+t05;
				set_frame(npc_ob, 1);
				n_db.push(n_id);
				n_db.push(t_id);
				n_db.push(npc_ob);
				npc_db.push(n_db);
			}
		}
	}	
	bmp_handler.addChild(tile_bmp);	
	item_handler.addChild(item_bmp);
}
//fungsi untuk membangun level permainan
function buat_level(map:Array, tileset:String):void{
	stage.color = 0x000000;
	//mengatur properti game
	game = new MovieClip();
	map_active = map;	
	addChild(game);
	if (game_output == "android"){
		game.scaleX = 2;
		game.scaleY = 2;
	}
	peta = new MovieClip();
	game.addChild(peta);
	//menambahkan canvas
	set_canvas(map, tileset);
	//menjadikan canvas sebagai gambar sumber
	var peta_bd:BitmapData = new BitmapData(map_w * t_size,map_h * t_size,true,0x00000000);
	var peta_bmp:Bitmap = new Bitmap(peta_bd);
	peta.addChild(peta_bmp);
	peta_bd.draw(canvas);
	//hapus canvas setelah digambar ulang
	removeChild(canvas);
	//efek wipe_out
	wipe_out();
	//stop all sound
	SoundMixer.stopAll();
	//add Enemy
	if (map_active == battle_arena){
		enemy_db = new Array();
		add_enemy();
		//suara
		play_sound(suara_battle_arena, 99);
	}else{
		play_sound(suara_peta, 99);
	}
}
//gerakan karakter dengan menggunakan keyboard
function loop_event(e:Event):void{	
	if (game_aktif){
		if (key_up) {
			arah_karakter = 4;
			gerakkan_karakter(char, 0, -karakter_speed);
			if (key_left) gerakkan_karakter(char, -karakter_speed/2, 0, false);
			if (key_right) gerakkan_karakter(char, karakter_speed/2, 0, false);
		}else if (key_down) {
			arah_karakter = 1;
			gerakkan_karakter(char, 0, karakter_speed);
			if (key_left) gerakkan_karakter(char, -karakter_speed/2, 0, false);
			if (key_right) gerakkan_karakter(char, karakter_speed/2, 0, false);
		}else if (key_left) {
			arah_karakter = 2;
			gerakkan_karakter(char, -karakter_speed, 0 );
		}else if (key_right) {
			arah_karakter = 3;
			gerakkan_karakter(char, karakter_speed, 0);
		}	
		if (key_space && !is_action){
			is_action = true;
			cek_pintu();
			if (just_talk == 0) cek_npc();
			if (just_talk == 0) collect_item();
		}
	}
	if (just_talk > 0) just_talk--;
	center_screen();
}
//fungsi untuk mengecek posisi pintu ketika tombol cek ditekan
function cek_pintu():void{
	var px:int = Math.floor(char.x/t_size);
	var py:int = Math.floor(char.y/t_size);
	var ada_pintu:Boolean = false;
	if (px > 0 && px < map_active.length-1 && py > 1 && py < map_active[0].length-1){
	if (arah_karakter == 1 ){	
		if (map_active[px][py+1][0] == 2){
			ada_pintu = true;
			door_id = map_active[px][py+1][3];
		}
	}
	if (arah_karakter == 2){
		if (map_active[px-1][py][0] == 2){
			ada_pintu = true;
			door_id = map_active[px-1][py][3];
		}
	}
	if (arah_karakter == 3){		
		trace(map_active[px+1][py][0]);
		if (map_active[px+1][py][0] == 2){
			ada_pintu = true;
			door_id = map_active[px+1][py][3];
		}
	}
	if (arah_karakter == 4){
		if (map_active[px][py-1][0] == 2){
			ada_pintu = true;
			door_id = map_active[px][py-1][3];
		}
	}
	}
	if (ada_pintu){
		if (door_id != 0){
			old_x = px;
			old_y = py;	
			last_map = map_active;			
		}
		if (game_output == "android") remove_vk();
		wipe_in();
	}
}
//fungsi untuk mengambil item, dan mengubah nilai tile setelah item terambil
function collect_item():void{
	var px:int = Math.floor(char.x/t_size);
	var py:int = Math.floor(char.y/t_size);
	var ada_item:Boolean = false;
	var item_id:int = 0;
	var item_x:int = 0;
	var item_y:int = 0;
	if (px > 1 && px < map_active.length-1 && py > 1 && py < map_active[0].length-1){
	if (arah_karakter == 1 ){	
		if (map_active[px][py+1][0] == 3){
			ada_item = true;
			item_id = map_active[px][py+1][3];
			item_x = px;
			item_y = py+1;
		}
	}
	if (arah_karakter == 2){
		if (map_active[px-1][py][0] == 3){
			ada_item = true;
			item_id = map_active[px-1][py][3];
			item_x = px-1;
			item_y = py;
		}
	}
	if (arah_karakter == 3){		
		trace(map_active[px+1][py][0]);
		if (map_active[px+1][py][0] == 3){
			ada_item = true;
			item_id = map_active[px+1][py][3];
			item_x = px+1;
			item_y = py;
		}
	}
	if (arah_karakter == 4){
		if (map_active[px][py-1][0] == 3){
			ada_item = true;
			item_id = map_active[px][py-1][3];
			item_x = px;
			item_y = py-1;
		}
	}
	}
	if (ada_item){
		trace("find item"+item_id);
		if (item_id > 1 && item_id<8){
			//hapus data item
			map_active[item_x][item_y][3] = 0;
			tambah_dialog(item_db, item_id);
			just_talk = 30;
			//suara
			play_sound(suara_dapat_item, 1);
		}else{
			tambah_dialog(item_db, item_id);
			just_talk = 30;
		}		
	}
}
//fungsi cek posisi npc
function cek_npc():void{
	var px:int = Math.floor(char.x/t_size);
	var py:int = Math.floor(char.y/t_size);
	var ada_npc:Boolean = false;
	if (px > 2 && px < map_active.length-2 && py > 2 && py < map_active[0].length-2){
	if (arah_karakter == 1){		
		if (map_active[px][py+1][0] == 5){
			ada_npc = true;
			npc_id = map_active[px][py+1][3];
		}
		//seller
		if (map_active[px][py+1][0] == 1 && map_active[px][py+2][0] == 5){
			ada_npc = true;
			npc_id = map_active[px][py+2][3];
		}
	}
	if (arah_karakter == 2){
		if (map_active[px-1][py][0] == 5){
			ada_npc = true;
			npc_id = map_active[px-1][py][3];
		}
		if (map_active[px-1][py][0] == 1 && map_active[px-2][py][0] == 5){
			ada_npc = true;
			npc_id = map_active[px-2][py][3];
		}
	}
	if (arah_karakter == 3){
		if (map_active[px+1][py][0] == 5){
			ada_npc = true;
			npc_id = map_active[px+1][py][3];
		}
		if (map_active[px+1][py][0] == 1 && map_active[px+2][py][0] == 5){
			ada_npc = true;
			npc_id = map_active[px+2][py][3];
		}
	}
	if (arah_karakter == 4){
		if (map_active[px][py-1][0] == 5){
			ada_npc = true;
			npc_id = map_active[px][py-1][3];
		}
		if (map_active[px][py-1][0] == 1 && map_active[px][py-2][0] == 5){
			ada_npc = true;
			npc_id = map_active[px][py-2][3];
		}
	}
	}
	if (ada_npc){
		var r_id:int = 0;
		if (npc_db.length > 0){
			for (var i:int = 0; i<npc_db.length;i++){
				if (npc_db[i][0] == npc_id){
					r_id = i;
				}
			}			
		}
		trace(npc_db+" >> "+r_id);
		//set hadap
		if (arah_karakter == 1) set_frame(npc_db[r_id][2], 13);
		if (arah_karakter == 2) set_frame(npc_db[r_id][2], 9);
		if (arah_karakter == 3) set_frame(npc_db[r_id][2], 5);
		if (arah_karakter == 4) set_frame(npc_db[r_id][2], 1);
		//dialog
		var t_arr:Array = this["talk_"+npc_db[r_id][1]];
		if (t_arr.length>0) tambah_dialog(t_arr);
	}
}
//fungsi menggerakkan karakter ke posisi tertentu dalam tile
function gerakkan_karakter(ob:MovieClip, sx:int, sy:int, do_step:Boolean = true):void{
	var map:Array = map_active;
	var o_x:int = ob.x;
	var o_y:int = ob.y;
	//menghitung posisi karakter setelah bergerak
	var pos_x:int =  Math.floor(ob.x/t_size);
	var pos_y:int =  Math.floor(ob.y/t_size);
	var next_x:int = ob.x+sx;
	var next_y:int = ob.y+sy;
	//mengecek jenis tile di sekitar karakter
	var cek_up:int =  Math.floor((next_y-karakter_h/2)/t_size);	
	var cek_down:int =  Math.floor((next_y+karakter_h/2)/t_size);	
	var cek_left:int =  Math.floor((next_x-karakter_w/2)/t_size);	
	var cek_right:int =  Math.floor((next_x+karakter_w/2)/t_size);
	//mencegah bug ketika karakter di tepi peta
	if (cek_up < 0) {
		sy = 0;
		cek_up = 0;
	}
	if (cek_down > map_h-1){
		sy = 0;
		cek_down = map_h-1;
	}
	if (cek_left < 0) {
		sx = 0;
		cek_left = 0;
	}
	if (cek_right > map_w-1){
		sx = 0;
		cek_right = map_w-1;
	}
	if (sy < 0){
		if (map[pos_x][cek_up][0] == 0 && map[cek_left][cek_up][0] == 0 && map[cek_right][cek_up][0] == 0) ob.y += sy;
	}else{
		if (map[pos_x][cek_down][0] == 0 && map[cek_left][cek_down][0] == 0 && map[cek_right][cek_down][0] == 0) ob.y += sy;
	}
	if (sx < 0){
		if (map[cek_left][pos_y][0] == 0 && map[cek_left][cek_up][0] == 0 && map[cek_left][cek_down][0] == 0) ob.x += sx;
	}else{
		if (map[cek_right][pos_y][0] == 0 && map[cek_right][cek_up][0] == 0 && map[cek_right][cek_down][0] == 0) ob.x += sx;
	}
	//animasi karakter
	if (do_step){
		step++;
		if (step > 4){
			step = 0;
			karakter_langkah++;
			if (karakter_langkah>3) karakter_langkah = 0;
			set_frame(ob, (arah_karakter-1)*4+karakter_langkah );
		}
	}
}
//fungsi untuk mengatur karakter selalu di tengah layar 
function center_screen():void{
	if (game_output == "android"){
		game.x = -char.x*2+screen_w/2;
		game.y = -char.y*2+screen_h/2;
	}else{
		game.x = -char.x+screen_w/2;
		game.y = -char.y+screen_h/2;
	}
}

//pengaturan awal karakter
function set_char(link_name:String):MovieClip{
	var ob:MovieClip = new MovieClip();
	var shadClass = getDefinitionByName("char_shadow");
	var sbmp:Bitmap = new Bitmap(new shadClass());
	var sgraf:MovieClip = new MovieClip();
	sgraf.addChild(sbmp);
	sgraf.x = -sgraf.width/2;
	sgraf.y = -sgraf.height/2;
	ob.addChild(sgraf);
	var charClass = getDefinitionByName(link_name);
	var bmp:Bitmap = new Bitmap(new charClass());
	var graf:MovieClip = new MovieClip();
	graf.addChild(bmp);
	//mask
	var rectangle:Shape = new Shape;
	rectangle.graphics.beginFill(0xFF0000); 
	rectangle.graphics.drawRect(-t_size/2, -t_size, t_size,t_size); 
	rectangle.graphics.endFill(); 
	ob.addChild(rectangle);
	ob.grap = graf;
	graf.mask = rectangle;
	ob.addChild(graf);
	return ob;
}	
//fungsi untuk mengatur frame aktif karakter, teknik untuk membuat movieclip otomatis
function set_frame(ob:MovieClip, fr:int):void{
	ob.grap.x = char_tile_pos[fr][0]-t05;
	ob.grap.y = char_tile_pos[fr][1];
}
//fungsi membuat karakter berdasarkan linkage
function set_karakter(nama_link:String, px:int, py:int):MovieClip{
	char_sprites_name = nama_link;
	var karakter:MovieClip = set_char(nama_link);
	karakter.x = px*t_size;	
	karakter.y = py*t_size;
	set_frame(karakter, 1);
	game.addChild(karakter);
	return karakter;
}
//event awal untuk menjalankan game
function jalankan_game():void{
	stage.addEventListener(MouseEvent.MOUSE_DOWN, mouse_down);
	stage.addEventListener(MouseEvent.MOUSE_UP, mouse_up);
	stage.addEventListener(KeyboardEvent.KEY_DOWN, keyDownFunction);
	stage.addEventListener(KeyboardEvent.KEY_UP, keyUpFunction);
	game.addEventListener(Event.ENTER_FRAME, loop_event);	
	//android
	if (game_output == "android"){
		stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
		draw_vk();
	}
	//game focus
	stage.stageFocusRect = false;
	stage.focus = this.stage;
}
//membaca tombol mouse
function mouse_down(e:MouseEvent):void{
	mouse_klik = true;
}
//membaca tombol mouse
function mouse_up(e:MouseEvent):void{
	mouse_klik = false;
	is_action = false;
}
//mask wipe digunakan untuk memberikan efek linkaran saat pertamakali permainan dimuncilkan
function wipe_out():void{
	game_aktif = false;
	cmask = new MovieClip();
	addChild(cmask);
	cmask.x = screen_w/2;
	cmask.y = screen_h/2;
	var circle:Shape = new Shape(); // The instance name circle is created
	circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
	circle.graphics.lineStyle(0, 0x000000); // Give the ellipse a black, 2 pixels thick line
	circle.graphics.drawCircle(0, 0, 10); 
	circle.graphics.endFill(); 
	cmask.addChild(circle);
	cmask.addEventListener(Event.ENTER_FRAME, do_wipe_out);
	trace("wipe out")
	game.mask = cmask;
	if (GUI_ready) addChild(GUI);
}
function do_wipe_out(e:Event):void{
	var ob:Object = e.currentTarget;
	ob.scaleX+=0.75;
	ob.scaleY+=0.75;
	if (ob.width > screen_w*1.25) {
		//remove it
		game_aktif = true;
		//game.mask = null;
		ob.removeEventListener(Event.ENTER_FRAME, do_wipe_out);
		removeChild(DisplayObject(ob));
		if (battle_scene){
			battle_scene = false;
			stage.removeEventListener(KeyboardEvent.KEY_DOWN, keyDownFunction);
			stage.removeEventListener(KeyboardEvent.KEY_UP, keyUpFunction);
			stage.removeEventListener(MouseEvent.MOUSE_DOWN, mouse_down);
			stage.removeEventListener(MouseEvent.MOUSE_UP, mouse_up);
			jalankan_game();
		}
	}
}
function wipe_in():void{
	game_aktif = false;
	cmask = new MovieClip();
	addChild(cmask);
	cmask.x = screen_w/2;
	cmask.y = screen_h/2;
	var circle:Shape = new Shape(); // The instance name circle is created
	circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
	circle.graphics.lineStyle(0, 0x000000); // Give the ellipse a black, 2 pixels thick line
	circle.graphics.drawCircle(0, 0, screen_w/2+100); 
	circle.graphics.endFill(); 
	cmask.addChild(circle);
	cmask.addEventListener(Event.ENTER_FRAME, do_wipe_in);
	trace("wipe in")
	game.mask = cmask;
}
function do_wipe_in(e:Event):void{
	var ob:Object = e.currentTarget;
	ob.scaleX-=0.02;
	ob.scaleY-=0.02;
	if (ob.width < 5) {
		//remove it
		game.mask = null;
		ob.removeEventListener(Event.ENTER_FRAME, do_wipe_in);
		removeChild(DisplayObject(ob));
		ganti_peta();
	}
}
//fungsi untuk menghapus peta
function ganti_peta():void{		
		//hapus game
		hapus_game();
		trace(door_id);
		//setup peta ulang 
		if (door_id != 0){	
			var c_map = this["map_"+door_id];			
			buat_level(c_map, tileset_name);
			trace(start_x*t_size+" , "+start_y*t_size);
			char = set_karakter(char_sprites_name, start_x*t_size, start_y*t_size);	
			char.x = start_x*t_size;
			char.y = start_y*t_size;
		}else{
			buat_level(last_map, tileset_name);
			char = set_karakter(char_sprites_name, old_x*t_size, old_y*t_size);
			char.x = old_x*t_size;
			char.y = old_y*t_size;
		}
		if (arah_karakter == 1){
			char.x+=t05;
			char.y+=t_size;
			set_frame(char, 1);
		}
		if (arah_karakter == 2){
			char.x-=t_size;			
			set_frame(char, 5);
		}
		if (arah_karakter == 3){
			char.x+=t_size;			
			set_frame(char, 9);
		}
		if (arah_karakter == 4){
			char.y-=t_size;
			set_frame(char, 13);
		}
		//tambahkan listener lagi
		jalankan_game();
}
//fungsi menghapus game dan listener yang sedang aktif
function hapus_game():void{
	trace("hapus game");
	// hapus musuh jika ada	
	remove_enemy();
	stage.removeEventListener(MouseEvent.MOUSE_DOWN, mouse_down);
	stage.removeEventListener(MouseEvent.MOUSE_UP, mouse_up);
	stage.removeEventListener(KeyboardEvent.KEY_DOWN, keyDownFunction);
	stage.removeEventListener(KeyboardEvent.KEY_UP, keyUpFunction);
	game.removeEventListener(Event.ENTER_FRAME, loop_event);
	removeChild(game);
}
//UI dan dialog
function draw_panel(px:int, py:int, pw:int, ph:int, style:String, st_id:int):MovieClip{
	var pmc:MovieClip = new MovieClip();	
	var UIsetClass = getDefinitionByName(UIset_name);	
	var bmp:Bitmap = new Bitmap(new UIsetClass());
	ui_set = bmp.bitmapData;
	var ui_bmp:Bitmap = new Bitmap(new BitmapData(pw * t_size,ph * t_size,true,0x00000000));
	//addChild(pmc);
	pmc.addChild(ui_bmp);
	var sdx:int = 0;
	var sdy:int = 0;
	var stx:int = 0;
	var sty:int = 0;
	var i_rect:Rectangle;
	var i_pt:Point;
	//draw from 9x9
	if (style == "3x3"){
		if (st_id == 1){
			stx = 0;
			sty = 0;
		}
		if (st_id == 2){
			stx = 3;
			sty = 0;
		}
		if (st_id == 3){
			stx = 6;
			sty = 0;
		}
		if (st_id == 4){
			stx = 0;
			sty = 3;
		}
		if (st_id == 5){
			stx = 3;
			sty = 3;
		}
		if (st_id == 6){
			stx = 6;
			sty = 3;
		}
		var i:int = 0;
		var j:int = 0;
		for (i=0;i<pw;i++){
			for (j = 0;j<ph;j++){
				if (j == 0){
					if (i ==0){
						sdx = stx*t_size; 
						sdy = sty*t_size;
					}else if (i > 0 && i < pw-1){
						sdx = stx*t_size+t_size; 
						sdy = sty*t_size;
					}else{
						sdx = stx*t_size+t_size+t_size; 
						sdy = sty*t_size;
					}
				}else if (j > 0 && j < ph-1){
					if (i ==0){
						sdx = stx*t_size; 
						sdy = (sty+1)*t_size;
					}else if (i > 0 && i < pw-1){
						sdx = stx*t_size+t_size; 
						sdy = (sty+1)*t_size;
					}else{
						sdx = stx*t_size+t_size+t_size; 
						sdy = (sty+1)*t_size;
					}
				}else{
					if (i ==0){
						sdx = stx*t_size; 
						sdy = (sty+2)*t_size;
					}else if (i > 0 && i < pw-1){
						sdx = stx*t_size+t_size; 
						sdy = (sty+2)*t_size;
					}else{
						sdx = stx*t_size+t_size+t_size; 
						sdy = (sty+2)*t_size;
					}
				}
				i_rect = new Rectangle(sdx, sdy,t_size,t_size);
				i_pt = new Point(i * t_size,j * t_size);
				ui_bmp.bitmapData.copyPixels(ui_set, i_rect, i_pt);
			}
		}
	}
	//draw from 1x3
	if (style == "1x3"){
		trace(pw+" x "+ph);
		if (st_id == 1){
			stx = 192;
			sty = 96;
		}
		if (st_id == 2){
			stx = 192;
			sty = 128;
		}
		if (st_id == 3){
			stx = 196;
			sty = 160;
		}
		if (st_id == 4){
			stx = 0;
			sty = 192;
		}
		if (st_id == 5){
			stx = 0;
			sty = 224;
		}
		if (st_id == 6){
			stx = 96;
			sty = 224;
		}
		if (st_id == 7){
			stx = 192;
			sty = 224;
		}
		trace(stx+"  "+sty);
		for (i=0;i<pw;i++){
			if (i ==0){
				sdx = stx; 
				sdy = sty;
			}else if (i > 0 && i < pw-1){
				sdx = stx+t_size; 
				sdy = sty;
			}else{
				sdx = stx+t_size+t_size; 
				sdy = sty;
			}
			i_rect = new Rectangle(sdx, sdy,t_size,t_size);
			i_pt = new Point(i * t_size,0);
			ui_bmp.bitmapData.copyPixels(ui_set, i_rect, i_pt);
		}
	}
	pmc.x = px;
	pmc.y = py;
	return pmc;
}
//menggambar bitmap dari sumber gambar yang berasal dari linkage
function draw_from(src:String, px:int, py:int, pw:int, ph:int):MovieClip{
	var pmc:MovieClip = new MovieClip();	
	var linkClass = getDefinitionByName(src);	
	var bmp:Bitmap = new Bitmap(new linkClass());
	var sumber:BitmapData = bmp.bitmapData;
	var hasil_bmp:Bitmap = new Bitmap(new BitmapData(pw,ph,true,0x00000000));	
	pmc.addChild(hasil_bmp);
	var i_rect:Rectangle = new Rectangle(px, py, pw, ph);
	var i_pt:Point = new Point(0, 0);
	hasil_bmp.bitmapData.copyPixels(sumber, i_rect, i_pt);
	return pmc;
}
function add_avatar(id:int):MovieClip{
	//avatar
	var py:int = Math.floor(id/4);
	var px:int = id-(py*4);
	var ava:MovieClip = draw_from(faceset_name, px*64, py*64, 64, 64);	
	return ava;
}

function set_dialog_panel():void{
	dialog = new MovieClip();
	GUI.addChild(dialog);
	var bg_1:MovieClip = draw_panel(0, 0, 20, 4, "3x3", 1);
	var bg_2:MovieClip = draw_panel(0, 0, 3, 3, "3x3", 3);
	dialog.addChild(bg_1);
	dialog.addChild(bg_2);
	dialog.ava = dialog.addChild(add_avatar(0));
	dialog.ava.x = 16;
	dialog.ava.y = 16;
	//text
	teks_display = add_text("", 500, 100);
	dialog.addChild(teks_display);
	dialog.teks = teks_display;
	dialog.teks.x = 100;
	dialog.teks.y = 16;
	dialog.visible = false;

	if (game_output == "android"){
		dialog.scaleX = 1.5;
		dialog.scaleY = 1.5;
	}
	dialog.x = screen_w/2-dialog.width/2;
	dialog.y = screen_h - 200;
}
//membuat textfield
function add_text(str:String, pw:int, ph:int, sz:int = 16):TextField{
	var myTextField:TextField = new TextField();
	var newFormat:TextFormat = new TextFormat(); 
	myTextField.x = 0;
	myTextField.y = 0;
	myTextField.width = pw;
	myTextField.height = ph;
	myTextField.background = false;
	myTextField.wordWrap = true;
	myTextField.multiline = true;
	myTextField.selectable = false;
	myTextField.antiAliasType = AntiAliasType.ADVANCED;
	myTextField.sharpness = 0;
	myTextField.thickness = 0;
	//
	newFormat.align = TextFormatAlign.LEFT;
	newFormat.size = sz;
	newFormat.font = "Arial";
	newFormat.color = 0xf9f9d0;
	newFormat.italic = true;
	newFormat.bold = true;
	newFormat.leading = 10;
	myTextField.defaultTextFormat = newFormat;
	myTextField.text = str;
	return myTextField;
}
//menambahkan dialog
function tambah_dialog(arr:Array, st_id:int = 0):void{
	if (game_output == "android"){
		vk.visible = false;
	}
	dialog.visible = true;
	dialog.stat = 0;
	dialog.talk_id = st_id;
	dialog.timer = 0;
	dialog.slice_id = 0;
	dialog.arr = arr;
	teks_display.text = "";
	dialog.addEventListener(Event.ENTER_FRAME, do_talk);
	stage.focus = this.stage;
}
//efek dialog
function do_talk(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 0){
		//removing avatar and add the new one'
		game_aktif = false;
		ob.removeChild(ob.ava);
		var avat:int = ob.arr[ob.talk_id][0];		
		ob.ava = ob.addChild(add_avatar(avat));	
		ob.ava.x = 16;
		ob.ava.y = 16;
		ob.tb = ob.arr[ob.talk_id][1];
		teks_display.text = "";
		ob.stat = 1;
		ob.timer = 0;
	}	
	if (ob.stat == 1){
		ob.timer++;
		if (ob.timer > 1){
			ob.timer = 1;
			ob.slice_id++;
			teks_display.text = ob.tb.substr(0, ob.slice_id);
			if (ob.slice_id>=ob.tb.length){
				ob.stat = 2;
			}
		}
	}	
	if (ob.stat == 2){
		if (key_space || mouse_klik){
			ob.stat = 3;
			if (ob.arr[ob.talk_id][2] == "next"){
				ob.talk_id++;
				ob.stat = 0;
				ob.timer = 0;
				ob.slice_id = 0;
			}else if (ob.arr[ob.talk_id][2] == "close"){
				game_aktif = true;
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				dialog.visible = false;
				just_talk = 30;
				if (game_output == "android"){
					vk.visible = true;
				}
			}else if (ob.arr[ob.talk_id][2] == "sleep"){
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				dialog.visible = false;
				just_talk = 30;
				add_popup(this["talk_"+npc_id][1]);
			}else if (ob.arr[ob.talk_id][2] == "close_sleep"){
				game_aktif = false;
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				dialog.visible = false;
				just_talk = 30;
				//sleep
				add_sleep();
				if (game_output == "android"){
					vk.visible = true;
				}
			}else if (ob.arr[ob.talk_id][2] == "trade"){
				game_aktif = false;
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				just_talk = 30;
				var i_arr:Array =this["item_"+ob.arr[ob.talk_id][3]];
				item_panel(i_arr);
			}else if (ob.arr[ob.talk_id][2] == "exp"){
				game_aktif = true;
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				dialog.visible = false;
				pc_exp+=ob.arr[ob.talk_id][3];
				//suara
				play_sound(suara_dapat_item, 1);
				//naik level	
				if (pc_exp>pc_exp_level[pc_lvl]) {
					pc_lvl++;
					level_up();
				}
				update_GUI();
				just_talk = 30;
				if (game_output == "android"){
					vk.visible = true;
				}
			}else if (ob.arr[ob.talk_id][2] == "item"){
				game_aktif = true;
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				dialog.visible = false;
				if(ob.arr[ob.talk_id][3] == 0){
					pc_item[0]+=ob.arr[ob.talk_id][4];
					//suara
					play_sound(suara_koin, 1);
				}else if(ob.arr[ob.talk_id][3] > 0){
					pc_item.push(ob.arr[ob.talk_id][3]);
					//suara
					play_sound(suara_dapat_item, 1);
				}	
				if (game_output == "android"){
					vk.visible = true;
				}
				update_GUI();
				just_talk = 30;
			}else if (ob.arr[ob.talk_id][2] == "game_over"){
				game_aktif = false;
				dialog.removeEventListener(Event.ENTER_FRAME, do_talk);
				dialog.visible = false;
				just_talk = 30;
				//end game
				trace("game over");		
				//hapus battle
				removeChild(btl_scene);
				removeChild(GUI);
				game_over();
			}
		}
	}
}

function add_sleep():void{
	var black:MovieClip = new MovieClip();
	addChild(black);
	//mask
	var rectangle:Shape = new Shape;
	rectangle.graphics.beginFill(0x000000); 
	rectangle.graphics.drawRect(0, 0, screen_w,screen_h); 
	rectangle.graphics.endFill(); 
	black.addChild(rectangle);
	black.stat = 0;
	black.alpha = 0;
	black.addEventListener(Event.ENTER_FRAME, do_sleep);
}

function do_sleep(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 0){
		ob.alpha+=0.02;
		if (ob.alpha>= 1) {
			ob.stat = 1;
			pc_hp = pc_hp_max;
			update_GUI();
		}
	}
	if (ob.stat == 1){
		ob.alpha-=0.02;
		if (ob.alpha<= 0) {
			ob.removeEventListener(Event.ENTER_FRAME, do_sleep);
			ob.stat = 2;
			removeChild(DisplayObject(ob));
			//add dialog
			tambah_dialog(this["talk_"+npc_id], 4);
		}
	}
}
//-----------------------------------GUI------------------------------
function setup_GUI():void{
	GUI = new MovieClip();
	addChild(GUI);
	set_dialog_panel();
	GUI_ready = true;
	//add hp bar
	add_hp_bar();
	add_exp_bar();
	add_gold_txt();
}

function add_hp_bar():void{
	hp_bar = new MovieClip();
	GUI.addChild(hp_bar);
	var ico:MovieClip = draw_from(UIset_name, 32, 257, 32, 32);
	hp_bar.addChild(ico);
	var bg_hp:MovieClip = draw_from(UIset_name, 96, 224, 96, 32);
	bg_hp.x = 32;
	hp_bar.addChild(bg_hp);
	var r_hp:int = Math.floor(pc_hp/pc_hp_max*86);
	if (r_hp < 1 ) r_hp = 1;
	var bg_r:MovieClip = draw_from(UIset_name, 197, 224, r_hp, 32);
	bg_r.x = 37;
	hp_bar.addChild(bg_r);
}

function add_exp_bar():void{
	exp_bar = new MovieClip();
	GUI.addChild(exp_bar);
	exp_bar.y = 24;
	var ico:MovieClip = draw_from(UIset_name, 64, 257, 32, 32);
	exp_bar.addChild(ico);
	var bg_exp:MovieClip = draw_from(UIset_name, 96, 224, 96, 32);
	bg_exp.x = 32;
	exp_bar.addChild(bg_exp);
	var r_exp:int = Math.floor(pc_exp/pc_exp_level[pc_lvl]*86);
	if (r_exp < 1 ) r_exp = 1;
	var bg_r:MovieClip = draw_from(UIset_name, 197, 224, r_exp, 32);
	bg_r.x = 37;
	exp_bar.addChild(bg_r);
}

function add_gold_txt():void{
	var ico:MovieClip = draw_from(UIset_name, 0, 257, 32, 32);
	ico.x = 130;
	gold_txt = add_text("",100,30,14);
	gold_txt.x = 160;
	gold_txt.y = 8;
	gold_txt.text = String(pc_item[0]);
	GUI.addChild(ico);
	GUI.addChild(gold_txt);
}

function update_GUI():void{
	trace("update UI");
	GUI.removeChild(hp_bar);
	GUI.removeChild(exp_bar);
	add_hp_bar();
	add_exp_bar();
	gold_txt.text = String(pc_item[0]);
}

//popup---------
function add_popup(arr:Array):void{
	if (game_output == "android"){
		vk.visible = false;
	}
	
	dialog.visible = true;
	dialog.stat = 0;
	dialog.timer = 0;
	dialog.slice_id = 0;
	dialog.arr = arr;
	teks_display.text = "";
	dialog.addEventListener(Event.ENTER_FRAME, do_popup);	
}

function do_popup(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 0){
		//removing avatar and add the new one'
		game_aktif = false;
		ob.removeChild(ob.ava);
		var avat:int = ob.arr[0];
		ob.ava = ob.addChild(add_avatar(avat));	
		ob.ava.x = 16;
		ob.ava.y = 16;
		ob.tb = ob.arr[1];
		teks_display.text = "";
		ob.stat = 1;
		ob.timer = 0;
	}	
	if (ob.stat == 1){
		ob.timer++;
		if (ob.timer > 1){
			ob.timer = 1;
			ob.slice_id++;
			teks_display.text = ob.tb.substr(0, ob.slice_id);
			if (ob.slice_id>=ob.tb.length){
				ob.stat = 2;
			}
		}
	}	
	if (ob.stat == 2){
		dialog.removeEventListener(Event.ENTER_FRAME, do_popup);
		ob.stat = 3;
		//tampilkan panel popup
		popup = new MovieClip();
		popup.scaleX = 1.5;
		popup.scaleY = 1.5;		
		GUI.addChild(popup);
		popup.x = dialog.x;
		popup.y = dialog.y;
		//yes btn
		var y_btn:MovieClip = new MovieClip();
		popup.addChild(y_btn);
		y_btn.x = 200;
		y_btn.y = 60;
		var bg_ya:MovieClip = draw_panel(0, 0, 5, 2, "3x3", 3);
		y_btn.addChild(bg_ya);
		//icon
		var ico_ya:MovieClip = draw_from(UIset_name, 224, 192, 32, 32);
		ico_ya.x = 16;
		ico_ya.y = 16;
		y_btn.addChild(ico_ya);
		var t_ya:TextField = add_text(ob.arr[2], 60, 30, 14);
		t_ya.x = 60;
		t_ya.y = 20;
		y_btn.addChild(t_ya);
		y_btn.addEventListener(MouseEvent.CLICK, yes_popup);
		popup.yes = y_btn;
		//no btn
		var n_btn:MovieClip = new MovieClip();
		popup.addChild(n_btn);
		n_btn.x = 350;
		n_btn.y = 60;
		var bg_no:MovieClip = draw_panel(0, 0, 5, 2, "3x3", 3);
		n_btn.addChild(bg_no);
		//icon
		var ico_n:MovieClip = draw_from(UIset_name, 256, 192, 32, 32);
		ico_n.x = 16;
		ico_n.y = 16;
		n_btn.addChild(ico_n);
		var t_no:TextField = add_text(ob.arr[3], 60, 30, 14);
		t_no.x = 60;
		t_no.y = 20;
		n_btn.addChild(t_no);	
		n_btn.addEventListener(MouseEvent.CLICK, no_popup);
		popup.no = n_btn;
	}
}

function yes_popup(e:MouseEvent):void{
	trace("yes");
	popup.yes.removeEventListener(MouseEvent.CLICK, yes_popup);
	popup.no.removeEventListener(MouseEvent.CLICK, no_popup);
	GUI.removeChild(popup);	
	//hide dialog
	dialog.visible = false;
	just_talk = 10;
	//jalankan tombol yes
	//sleep
	if (dialog.arr[4] == "sleep"){
		if (pc_item[0]>dialog.arr[5]){
			pc_item[0]-=dialog.arr[5];
			//suara
			play_sound(suara_koin, 1);
			update_GUI();
			tambah_dialog(this["talk_"+npc_id], 2);
		}else{
			tambah_dialog(this["talk_"+npc_id], 3);
		}
	}
	stage.focus = this.stage;
}

function no_popup(e:MouseEvent):void{
	trace("no");
	popup.yes.removeEventListener(MouseEvent.CLICK, yes_popup);
	popup.no.removeEventListener(MouseEvent.CLICK, no_popup);
	GUI.removeChild(popup);	
	//hide dialog
	if (game_output == "android"){
		vk.visible = true;
	}
	dialog.visible = false;
	just_talk = 10;
	game_aktif = true;
	stage.focus = this.stage;
}

function add_item_panel(px:int, py:int, arr:Array):MovieClip{
	var ob:MovieClip = new MovieClip();
	ob.x = px;
	ob.y = py;
	var bg_p:MovieClip = draw_panel(0,0,8,1,"1x3", 4);
	ob.addChild(bg_p);
	var bg_i:MovieClip = draw_from(UIset_name, 96, 192, 32, 32);
	ob.addChild(bg_i);
	var ico:MovieClip = draw_from(itemset_name, arr[0]*t_size, arr[1]*t_size, 32, 32 );
	ob.addChild(ico);
	//teks
	var tks:TextField = add_text(arr[2], 200,60, 12);
	tks.x = 40;
	tks.y = 6;
	ob.addChild(tks);
	if (arr[5] != "close"){ 
		//gold ico
		var g_ico:MovieClip = draw_from(UIset_name, 0, 257, 32, 32);
		g_ico.x = 145;
		ob.addChild(g_ico);
		//g_teks
		var g_tks:TextField = add_text(arr[4], 200,60, 12);
		g_tks.x = 175;
		g_tks.y = 6;
		ob.addChild(g_tks);
		//exp ico
		var e_ico:MovieClip = draw_from(UIset_name, 64, 257, 32, 32);
		e_ico.x = 200;
		ob.addChild(e_ico);
		//g_teks
		var e_tks:TextField = add_text(arr[3], 200,60, 12);
		e_tks.x = 230;
		e_tks.y = 6;
		ob.addChild(e_tks);
	}
	return ob;
}

function item_panel(arr:Array):void{
	popup_item = new MovieClip;
	var bg:MovieClip = draw_panel(0,0, 9,arr.length+1,"3x3", 1);
	popup_item.addChild(bg);
	popup_item.x = 430;
	popup_item.y = dialog.y-(arr.length+1)*34;
	if (game_output == "android"){
		popup_item.scaleX = 1.5;
		popup_item.scaleY = 1.5;
		popup_item.x = screen_w/2+120;
		popup_item.y = dialog.y-(arr.length+1)*40;
		vk.visible = false;
	}
	item_arr = arr;
	temp_arr = new Array();
	//show the item
	for (var i:int = 0;i<arr.length;i++){
		var tb:MovieClip = add_item_panel(16, i*34+8, arr[i]);		
		popup_item.addChild(tb);
		tb.i_id = i;		
		tb.addEventListener(MouseEvent.CLICK, buy_item);
		temp_arr.push(tb);
	}
	GUI.addChild(popup_item);
}


function buy_item(e:MouseEvent):void{
	var ob:Object = e.currentTarget;
	item_id = ob.i_id;
	trace("buy item :"+item_arr[item_id][2]);	
	close_item_panel();
	if (item_arr[item_id][5] == "close"){
		tambah_dialog(this["talk_"+npc_id], 2);
	}else{
		//exp cukup
		if (pc_lvl>=item_arr[item_id][3]){
			//uang cukup
			if (pc_item[0]>=item_arr[item_id][4]){
				//jika item_arr[item_id][7] == 0 berarti tidak perlu cek inventory
				if (item_arr[item_id][7] > 0){
					var punya:Boolean = cek_item(item_arr[item_id][7]);
					if (punya){
						trace("punya "+item_arr[item_id][7]);
						tambah_dialog(this["talk_"+npc_id], 5);
					}else{
						trace("belum");
						pc_item[0]-=item_arr[item_id][4];
						//suara
						play_sound(suara_koin, 1);
						var i_arr:Array = new Array;
						i_arr[0] = [1, "", "close"];
						//ava
						i_arr[0][0] = this["talk_"+npc_id][0][0];
						i_arr[0][1] = "Terimakasih telah membeli "+item_arr[item_id][2]+" ("+item_arr[item_id][5]+" +"+item_arr[item_id][6]+")";
						//tambahkan ke inventory
						trace("i arr = "+i_arr);
						pc_item.push(item_arr[item_id][7]);
						tambah_dialog(i_arr);				
						update_GUI();
					}
				}else{ 
					//item yang habis sekali pakai
					pc_item[0]-=item_arr[item_id][4];
					var r_arr:Array = new Array;
					r_arr[0] = [1, "", "close"];
					//ava
					r_arr[0][0] = this["talk_"+npc_id][0][0];
					r_arr[0][1] = "Terimakasih telah membeli "+item_arr[item_id][2]+" ("+item_arr[item_id][5]+" +"+item_arr[item_id][6]+")";
					//efek item					
					if (item_arr[item_id][5] == "HP") {
						pc_hp+= item_arr[item_id][6];
						if (pc_hp>pc_hp_max) pc_hp = pc_hp_max;
						//suara
						play_sound(suara_dapat_item, 1);
					}else if (item_arr[item_id][5] == "EXP") {
						pc_exp+= item_arr[item_id][6];
						//suara
						play_sound(suara_dapat_item, 1);
						//naik level	
						if (pc_exp>pc_exp_level[pc_lvl]) {
							pc_lvl++;
							r_arr[0][1]+=". Anda naik menjadi level "+pc_lvl;
							level_up();
						}
					}	
					tambah_dialog(r_arr);				
					update_GUI();
				}							
			}else{
				tambah_dialog(this["talk_"+npc_id], 3);
			}
		}else{
			tambah_dialog(this["talk_"+npc_id], 4);
		}
	}
}

function cek_item(id:int):Boolean{
	var res:Boolean = false;
	for (var i:int=0;i<pc_item.length;i++){
		if (pc_item[i] == id) res = true;
	}
	return res;
}

function level_up():void{
	//suara
	play_sound(suara_level_up, 1);
	pc_hp_max = pc_hp_level[pc_lvl];
	pc_atk = pc_atk_level[pc_lvl];
	pc_def = pc_def_level[pc_lvl];
}

function close_item_panel():void{
	for (var i:int = 0;i<temp_arr.length;i++){
		temp_arr[i].removeEventListener(MouseEvent.CLICK, buy_item);
	}
	GUI.removeChild(popup_item);
}
//-----------------------------------------Enemy dan BATTLE SYSTEM---------------------
function add_enemy():void{	
	for (var i:int = 0;i < pc_lvl+1;i++){
		if (i < enemy_db.length+2){
			var ob:MovieClip = setup_enemy();
			enemy_db.push(ob);
		}
	}
}

function setup_enemy():MovieClip{
	var e_id:int = Math.floor(Math.random()*(pc_lvl+1));
	if (e_id > enemy.length-1) e_id = enemy.length-1;
	trace("add enemy "+ e_id);
	var e_px:int = rand(map_w-2);
	var e_py:int = rand(map_h-2);
	while (map_active[e_px][e_py][0] > 0 || e_px < 2 || e_py < 2){
		 e_px = rand(map_w-2);
		 e_py = rand(map_h-2);
	}
	
	var ob:MovieClip = set_char("enemy_sprites_"+enemy[e_id][1]);
	ob.x = e_px*t_size+t05;
	ob.y = e_py*t_size+t05;	
	ob.arr = enemy[e_id];
	ob.id = e_id;
	ob.stat = 0;
	ob.step = 2;
	ob.move = 0;
	ob.speed = 4;
	ob.dir = rand(4)+1;
	set_frame(ob, (ob.dir-1)*4+ob.move);
	trace("enemy out = "+e_px+" , "+e_py+" dir = "+ob.dir);
	ob.addEventListener(Event.ENTER_FRAME, move_enemy);
	game.addChild(ob);
	return ob;
}

function rand(num:int):int{
	return Math.floor(Math.random()*num);
}

function dist(x1:int, y1:int, x2:int, y2:int):int{
	var res:int = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	return res;
}

function remove_enemy():void{
	if (enemy_db.length>0){
		for (var i:int = 0;i<enemy_db.length;i++){
			enemy_db[i].removeEventListener(Event.ENTER_FRAME, move_enemy);
			game.removeChild(enemy_db[i]);
		}
	}
	enemy_db = [];
}

function move_enemy(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 0){
		if (rand(10) == 6){
			ob.dir = rand(4)+1;
			ob.step = 2;
			ob.move	= 0;	
			ob.stat = 1;
			ob.speed = 4;
			//trace("enemy move "+ob.dir);
		}
		//close with player
		if (dist(ob.x, ob.y, char.x, char.y)<25 && !battle_scene){
			battle_scene = true;
			ob.stat = 10;
			game_aktif = false;
			enemy_id = ob.id;
			karakter_x = Math.floor(char.x/t_size);
			karakter_y = Math.floor(char.y/t_size);
			trace("cx = "+karakter_x+", "+karakter_y);
			//
			wipe_in_start_battle();
		}
	}
	if (ob.stat == 1){
		//close with player
		if (dist(ob.x, ob.y, char.x, char.y)<25 && !battle_scene){
			battle_scene = true;
			game_aktif = false;
			ob.stat = 10;
			enemy_id = ob.id;
			karakter_x = Math.floor(char.x/t_size);
			karakter_y = Math.floor(char.y/t_size);
			trace("cx = "+karakter_x+", "+karakter_y);
			//
			wipe_in_start_battle();
		}
		ob.step++;
		if (ob.step > 4){
			ob.step = 0;
			ob.move++;
			if (ob.move>3) ob.move = 0;
			set_frame(MovieClip(ob), (ob.dir-1)*4+ob.move);
			//move to player 
			if (rand(14)==10){
				if (dist(ob.x, ob.y, char.x, char.y) < 300){
					ob.speed = 8;
					if (ob.x < char.x-100){
						ob.dir = 3;
					}else if (ob.x > char.x+100){
						ob.dir = 2
					}else if (ob.y < char.y-100){
						ob.dir = 1;
					}else if (ob.y > char.y+100){
						ob.dir = 4;
					}
				}
			}
			//move
			if (ob.dir == 1) {				
				ob.y+=ob.speed;
				ob.px = Math.floor(ob.x/t_size);
				ob.py = Math.floor(ob.y/t_size);
				if (ob.py < map_h-2){
					if (map_active[ob.px][ob.py+1][0] > 0){
						if (rand(10)>5){
							ob.dir = 2;
						}else{
							ob.dir = 3;
						}
					}
				}else {
					ob.dir = 4;
				}
			}
			if (ob.dir == 2) {
				ob.x-=ob.speed;
				ob.px = Math.floor(ob.x/t_size);
				ob.py = Math.floor(ob.y/t_size);
				if (ob.py > 2){
					if (map_active[ob.px-1][ob.py][0] > 0){
						if (rand(10)>5){
							ob.dir = 1;
						}else{
							ob.dir = 4;
						}
					}
				}else{
					ob.dir = 3;
				}
			}
			if (ob.dir == 3) {
				ob.x+=ob.speed;
				ob.px = Math.floor(ob.x/t_size);
				ob.py = Math.floor(ob.y/t_size);
				if (ob.px < map_w-2){
					if (map_active[ob.px+1][ob.py][0] > 0){
						if (rand(10)>5){
							ob.dir = 1;
						}else{
							ob.dir = 4;
						}
					}
				}else{
					ob.dir = 2;
				}
			}
			if (ob.dir == 4) {
				ob.y-=ob.speed;
				ob.px = Math.floor(ob.x/t_size);
				ob.py = Math.floor(ob.y/t_size);
				if (ob.py > 3){
					if (map_active[ob.px][ob.py-1][0] > 0){
						if (rand(10)>5){
							ob.dir = 2;
						}else{
							ob.dir = 3;
						}
					}
				}else{
					ob.dir = 1;
				}
			}		
		}
		if (rand(150)==34) ob.stat = 0;
	}
}
//--------------------------battle ----------------------------
function setup_battle(e_id:int):void{
	enemy_battle_id = e_id;
	btl_scene = new MovieClip();
	addChild(btl_scene);
	var bg:MovieClip = draw_from(battle_bg, 0,0,800,280);
	btl_scene.addChild(bg);
	if (game_output == "android"){
		btl_scene.x = screen_w/2 - btl_scene.width/2;
		vk.visible = false;		
	}
	//char_sprites_name
	pc_mc = new MovieClip();
	var c_shad:MovieClip = draw_from("char_shadow", 0,0, 27, 18);
	c_shad.x = -13;
	c_shad.y = -9;
	//perisai
	if (cek_item(4) || cek_item(5) || cek_item(6)){
		var c_shield:MovieClip = draw_from(itemset_name, 96,64,32,32);
		c_shield.x = -16;
		c_shield.y = -32;
		pc_mc.addChild(c_shield);
	}	
	pc_mc.addChild(c_shad);
	var c_img:MovieClip = draw_from(char_sprites_name, 32, 64, 32,32);
	c_img.x = -16;
	c_img.y = -32;	
	pc_mc.addChild(c_img);
	pc_mc.scaleX = 3;
	pc_mc.scaleY = 3;
	btl_scene.addChild(pc_mc);
	pc_mc.x = 230;
	pc_mc.y = 210;
	pc_mc.xa = pc_mc.x;
	pc_mc.ya = pc_mc.y;
	//pedang
	var c_sword:MovieClip = new MovieClip;
	if (cek_item(3)){
		c_sword = draw_from(itemset_name, 96, 96, 32, 32);
		pc_mc.addChild(c_sword);
	}else if (cek_item(2)){
		c_sword = draw_from(itemset_name, 64, 96, 32, 32);
		pc_mc.addChild(c_sword);
	}else if (cek_item(1)){
		c_sword = draw_from(itemset_name, 32, 96, 32, 32);
		pc_mc.addChild(c_sword);
	}
	c_sword.x = -16;
	c_sword.y = -32;	
	//enemy
	e_mc = new MovieClip();
	var e_shad:MovieClip = draw_from("char_shadow", 0,0, 27, 18);
	e_shad.x = -13;
	e_shad.y = -9;
	e_mc.addChild(e_shad);
	var e_img:MovieClip = draw_from("enemy_sprites_"+enemy[e_id][1], 32, 64, 32,32);
	//var e_img:MovieClip = draw_from("enemy_sprites_"+enemy[e_id][1], 32, 32, 32,32);
	e_img.x = -16;
	e_img.y = -32;	
	e_mc.addChild(e_img);
	e_mc.scaleX = -3;
	e_mc.scaleY = 3;
	btl_scene.addChild(e_mc);
	e_mc.x = 530;
	e_mc.y = 210;
	e_mc.xa = e_mc.x;
	e_mc.ya = e_mc.y;
	btl_scene.addChild(draw_panel(0,280,25,10,"3x3", 1));
	//hp
	e_hp = enemy[e_id][3];
	e_hp_max = enemy[e_id][3];
	add_e_hp_bar();
	prepare_battle();
	//GUI
	btl_scene.addChild(draw_panel(0,300,25,4,"3x3", 3));
	btl_scene.addChild(draw_panel(15,315,3,3,"3x3", 3));
	//e ava
	var e_ava:MovieClip = add_avatar(enemy[e_id][0]);
	btl_scene.addChild(e_ava);
	e_ava.x = 31;
	e_ava.y = 331;
	//teks soal
	teks_soal = add_text("", 600, 100);
	btl_scene.addChild(teks_soal);
	teks_soal.x = 120;
	teks_soal.y = 326;
	teks_soal.text = "";
	//jawaban
	jawaban = new MovieClip();
	btl_scene.addChild(jawaban);
	jawaban_1 = draw_panel(100,426, 9, 2, "3x3", 1);
	jawaban_2 = draw_panel(400,426, 9, 2, "3x3", 1);
	jawaban_3 = draw_panel(100,500, 9, 2, "3x3", 1);
	jawaban_4 = draw_panel(400,500, 9, 2, "3x3", 1);
	jawaban.addChild(jawaban_1);
	jawaban.addChild(jawaban_2);
	jawaban.addChild(jawaban_3);
	jawaban.addChild(jawaban_4);
	jawab_1 = add_text("a. ini adalah jawaban a", 200, 50);
	jawab_1.x = 120;
	jawab_1.y = 445;
	jawaban.addChild(jawab_1);
	jawab_2 = add_text("b. ini adalah jawaban b", 200, 50);
	jawab_2.x = 420;
	jawab_2.y = 445;
	jawaban.addChild(jawab_2);
	jawab_3 = add_text("c. ini adalah jawaban c", 200, 50);
	jawab_3.x = 120;
	jawab_3.y = 520;
	jawaban.addChild(jawab_3);
	jawab_4 = add_text("d. ini adalah jawaban b", 200, 50);
	jawab_4.x = 420;
	jawab_4.y = 520;
	jawaban.addChild(jawab_4);
	jawaban.visible = false;
	jawaban.timer = 0;
	no_soal = 0;
	//attack speed
	attack_speed = new MovieClip();
	btl_scene.addChild(attack_speed);
	attack_speed.x = 15;
	attack_speed.y = 293;
	var rectangle:Shape = new Shape;
	rectangle.graphics.beginFill(0xEE2020); 
	rectangle.graphics.drawRect(0, 0, 770,10); 
	rectangle.graphics.endFill(); 
	attack_speed.addChild(rectangle);
	attack_speed.visible = false;
	//suara
	SoundMixer.stopAll();
	play_sound(suara_mode_pertempuran, 1);
}

 
function acak_soal():void{
	//mengacak soal
	temp_soal = soal_quiz.slice(0, soal_quiz.length);
	for (var i:Number = 0; i < soal_quiz.length; i++){
		var acak:Number = Math.floor(Math.random()*soal_quiz.length);
		var temp:Array = temp_soal[acak];
		temp_soal[acak] = temp_soal[i];
		temp_soal[i] = temp;
	}
}


function buat_soal():void{
	jawaban.stat = 0;
	jawaban.timer = 0;
	jawaban.slice_id = 0;
	jawaban.visible = false;
	jawaban.addEventListener(Event.ENTER_FRAME, tampilkan_jawaban);
}
function tampilkan_jawaban(e:Event):void{
	//tampilkan soal
	if (jawaban.stat == 0){
		jawaban.timer++;
		if (jawaban.timer > 1){
			jawaban.timer = 1;
			jawaban.slice_id++;
			teks_soal.text = temp_soal[no_soal][0].substr(0, jawaban.slice_id);
			if (jawaban.slice_id>=temp_soal[no_soal][0].length){
				jawaban.stat = 1;
				jawaban.removeEventListener(Event.ENTER_FRAME, tampilkan_jawaban);
			//acak jawaban
				temp_jawaban = temp_soal[no_soal].slice(1, 5);
				for (var i:Number = 0; i < temp_jawaban.length; i++){
					var acak:Number = Math.floor(Math.random()*temp_jawaban.length);
					var temp:String = temp_jawaban[acak];
					temp_jawaban[acak] = temp_jawaban[i];
					temp_jawaban[i] = temp;
				}
				//tampilkan jawaban
				jawab_1.text = "a. "+temp_jawaban[0];
				jawab_2.text = "b. "+temp_jawaban[1];
				jawab_3.text = "c. "+temp_jawaban[2];
				jawab_4.text = "d. "+temp_jawaban[3];
				jawaban.visible = true;
				//tambah listener
				jawab_1.addEventListener(MouseEvent.CLICK, cek_jawaban_1);
				jawab_2.addEventListener(MouseEvent.CLICK, cek_jawaban_2);
				jawab_3.addEventListener(MouseEvent.CLICK, cek_jawaban_3);
				jawab_4.addEventListener(MouseEvent.CLICK, cek_jawaban_4);
				//attack_speed
				attack_speed.visible = true;
				attack_speed.scaleX = 1;
				answer_time = 500;
				attack_speed.addEventListener(Event.ENTER_FRAME, speed_answer);
			}
		}
	}	
}

function speed_answer(e:Event):void{
	answer_time-=enemy[enemy_id][7];
	attack_speed.scaleX = answer_time/500;
	if(answer_time <=0){
		enemy_attack();
		jawab_1.removeEventListener(MouseEvent.CLICK, cek_jawaban_1);
		jawab_2.removeEventListener(MouseEvent.CLICK, cek_jawaban_2);
		jawab_3.removeEventListener(MouseEvent.CLICK, cek_jawaban_3);
		jawab_4.removeEventListener(MouseEvent.CLICK, cek_jawaban_4);
		attack_speed.removeEventListener(Event.ENTER_FRAME, speed_answer);
		no_soal++;
		if (no_soal>soal_quiz.length-1) no_soal = 0;
	}
}

function cek_jawaban_1(e:MouseEvent):void{
	trace("aa");
	cek_jawaban(0);
}
function cek_jawaban_2(e:MouseEvent):void{
	cek_jawaban(1);
}
function cek_jawaban_3(e:MouseEvent):void{
	cek_jawaban(2);
}
function cek_jawaban_4(e:MouseEvent):void{
	cek_jawaban(3);
}


function cek_jawaban(id:int):void{
	attack_speed.removeEventListener(Event.ENTER_FRAME, speed_answer);
	trace("pilih = "+id);
	if (temp_jawaban[id] == temp_soal[no_soal][1]){
		//jawaban benar
		hasil_jawaban = true;
		//suara
		play_sound(suara_benar, 1);
	}else{
		//jawaban salah
		hasil_jawaban = false;
		//suara
		play_sound(suara_salah, 1);
	}
	//tunjukkan yang benar
	var j_benar:int = 0;
	for (var i:int = 0; i<temp_jawaban.length;i++){		
		if (temp_jawaban[i] == temp_soal[no_soal][1]) j_benar = i;
	}
	var t_panel:MovieClip = new MovieClip();
	if (j_benar == 0) {
		t_panel = draw_panel(100,426, 9, 2, "3x3", 4);
		jawaban.addChild(t_panel);
		jawaban.addChild(jawab_1);
	}
	if (j_benar == 1) {
		t_panel = draw_panel(400,426, 9, 2, "3x3", 4);
		jawaban.addChild(t_panel);
		jawaban.addChild(jawab_2);
	}
	if (j_benar == 2) {
		t_panel = draw_panel(100,500, 9, 2, "3x3", 4);
		jawaban.addChild(t_panel);
		jawaban.addChild(jawab_3);
	}
	if (j_benar == 3) {
		t_panel = draw_panel(400,500, 9, 2, "3x3", 4);
		jawaban.addChild(t_panel);
		jawaban.addChild(jawab_4);
	}
	t_panel.addEventListener(Event.ENTER_FRAME, remove_t_panel);
	t_panel.stat = 0;
	t_panel.timer = 0;
	t_panel.alpha = 0.75;
	//hapus listener
	jawab_1.removeEventListener(MouseEvent.CLICK, cek_jawaban_1);
	jawab_2.removeEventListener(MouseEvent.CLICK, cek_jawaban_2);
	jawab_3.removeEventListener(MouseEvent.CLICK, cek_jawaban_3);
	jawab_4.removeEventListener(MouseEvent.CLICK, cek_jawaban_4);
	//tambahkan no soal
	no_soal++;
	if (no_soal>soal_quiz.length-1) no_soal = 0;
}

function remove_t_panel(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 0){
		ob.timer++;
		if (ob.timer>20){			
			ob.stat = 1;
		}
	}
	if (ob.stat == 1){
		ob.alpha-=0.1;
		if (ob.alpha < 0.01){
			ob.stat = 2;
			if (hasil_jawaban){
				player_attack();
			}else{
				enemy_attack();
			}
			ob.removeEventListener(MouseEvent.CLICK, remove_t_panel);
			jawaban.removeChild(DisplayObject(ob));
		}
	}
}

function prepare_battle():void{
	p_attack = pc_atk;
	if (cek_item(3)){
		p_attack+=item_2[2][6];
	}else if (cek_item(2)){
		p_attack+=item_2[1][6];
	}else if (cek_item(1)){
		p_attack+=item_2[0][6];
	}
	p_defend = pc_def;
	if (cek_item(6)){
		p_defend+=item_2[5][6];
	}else if (cek_item(5)){
		p_defend+=item_2[4][6];
	}else if (cek_item(4)){
		p_defend+=item_2[3][6];
	}
	trace("p atk = "+p_attack+" , def ="+ p_defend);
}

function add_e_hp_bar():void{
	e_hp_bar = new MovieClip();
	e_hp_bar.x = screen_w - 200;	
	GUI.addChild(e_hp_bar);
	var ico:MovieClip = draw_from(UIset_name, 32, 257, 32, 32);
	e_hp_bar.addChild(ico);
	var bg_hp:MovieClip = draw_from(UIset_name, 96, 224, 96, 32);
	bg_hp.x = 32;
	e_hp_bar.addChild(bg_hp);
	var r_hp:int = Math.floor(e_hp/e_hp_max*86);
	if (r_hp < 1 ) r_hp = 1;
	var bg_r:MovieClip = draw_from(UIset_name, 197, 224, r_hp, 32);
	bg_r.x = 37;
	e_hp_bar.addChild(bg_r);
}

function update_e_hp_bar():void{
	GUI.removeChild(e_hp_bar);
	add_e_hp_bar();
}

function player_attack():void{
	pc_mc.stat = 1;
	pc_mc.vx = 3;
	pc_mc.vy = 0;
	pc_mc.addEventListener(Event.ENTER_FRAME, move_pc_battle);
	e_mc.stat = 0;
	e_mc.vx = 0;
	e_mc.vy = 0;
	e_mc.addEventListener(Event.ENTER_FRAME, move_e_battle);	
}

function enemy_attack():void{
	pc_mc.stat = 0;
	pc_mc.vx = 0;
	pc_mc.vy = 0;
	pc_mc.addEventListener(Event.ENTER_FRAME, move_pc_battle);
	e_mc.stat = 1;
	e_mc.vx = 3;
	e_mc.vy = 0;
	e_mc.addEventListener(Event.ENTER_FRAME, move_e_battle);	
}


function move_pc_battle(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 1){
		ob.vx+=3;
		ob.x+=ob.vx;
		if (ob.x > e_mc.x-50){
			ob.vx = -5;
			ob.vy = -12;
			ob.stat = 2;
			//enemy
			e_mc.stat = 2;
			e_mc.vx = 6;
			e_mc.vy = -8;
			add_flash();
			var dmg:int = p_attack-enemy[enemy_battle_id][5];
			if (dmg < 1) dmg = 1;
			trace("dmg = "+dmg);
			e_hp-=dmg;
			play_sound(suara_serang, 1);
			if (e_hp <= 0){
				trace("player win");
				e_mc.stat = 4;
				//suara
				SoundMixer.stopAll();
				play_sound(suara_menang, 1);
			}
			update_e_hp_bar();
		}
	}
	if (ob.stat == 2){
		ob.x+=ob.vx;
		ob.y+=ob.vy;
		ob.vy++;
		if (ob.y>ob.ya){
			ob.vy*=-0.35;
			ob.vx*=0.75;
			ob.y = ob.ya;
			if (Math.abs(ob.vy)<2){
				ob.y = ob.ya;
				ob.stat = 3;
			}
		}
	}
	if (ob.stat == 3){
		var dis:int = ob.x-ob.xa;
		ob.x-=dis/6;
		if (Math.abs(dis) < 2){
			ob.stat = 0;
			ob.removeEventListener(Event.ENTER_FRAME, move_pc_battle);
		}
	}
	if (ob.stat == 4){
		ob.alpha -= 0.01;
		if (ob.alpha < 0.01){
			ob.stat = 0;
			ob.visible = false;
			teks_soal.text = "Hehehehe...... kamu harus lebih giat belajar!!!...";
			ob.removeEventListener(Event.ENTER_FRAME, move_pc_battle);
			var d_arr:Array = new Array();
			d_arr[0] = [0, "Monster ini terlalu kuat......", "next"];
			d_arr[1] = [0, "Aku harus belajar lebih giat lagi..", "game_over"];
			stage.addEventListener(KeyboardEvent.KEY_DOWN, keyDownFunction);
			stage.addEventListener(KeyboardEvent.KEY_UP, keyUpFunction);
			stage.addEventListener(MouseEvent.MOUSE_DOWN, mouse_down);
			stage.addEventListener(MouseEvent.MOUSE_UP, mouse_up);
			tambah_dialog(d_arr);
			jawaban.visible = false;
		}
	}
}

function add_flash():void{
	var ob:MovieClip = new MovieClip();
	var rectangle:Shape = new Shape;
	rectangle.graphics.beginFill(0xFFFFFF); 
	rectangle.graphics.drawRect(0, 0, screen_w,280); 
	rectangle.graphics.endFill(); 
	ob.addChild(rectangle);
	addChild(ob);
	ob.num = 0;
	ob.addEventListener(Event.ENTER_FRAME, remove_flash);
}

function remove_flash(e:Event):void{
	var ob:Object = e.currentTarget;
	ob.num++;
	if (ob.num>3){
		ob.removeEventListener(Event.ENTER_FRAME, remove_flash);
		removeChild(DisplayObject(ob));
	}
}

function move_e_battle(e:Event):void{
	var ob:Object = e.currentTarget;
	if (ob.stat == 1){
		ob.vx-=3;
		ob.x+=ob.vx;
		if (ob.x < pc_mc.x+50){
			ob.vx = 5;
			ob.vy = -12;
			ob.stat = 2;
			//player
			pc_mc.stat = 2;
			pc_mc.vx = -3;
			pc_mc.vy = -5;
			add_flash();
			//kurangi hp pemain
			var dmg:int = enemy[enemy_battle_id][4]-p_defend;
			if (dmg<1) dmg = 1;
			pc_hp-=dmg;
			trace("e dmg = "+dmg);
			//suara
			play_sound(suara_serang, 1);
			update_GUI();
			if (pc_hp<=0){
				trace("player kalah");
				pc_mc.stat = 4;
			}
		}
	}
	if (ob.stat == 2){
		ob.x+=ob.vx;
		ob.y+=ob.vy;
		ob.vy++;
		if (ob.y>ob.ya){
			ob.vy*=-0.35;
			ob.vx*=0.75;
			ob.y = ob.ya;
			if (Math.abs(ob.vy)<2){
				ob.y = ob.ya;
				ob.stat = 3;
			}
		}
	}
	if (ob.stat == 3){
		var dis:int = ob.x-ob.xa;
		ob.x-=dis/6;
		if (Math.abs(dis) < 2){
			ob.stat = 0;
			ob.removeEventListener(Event.ENTER_FRAME, move_e_battle);
			//buat soal baru
			if (pc_hp>0){
				buat_soal();
			}			
		}
	}
	if (ob.stat == 4){
		ob.alpha -= 0.01;
		if (ob.alpha < 0.01){
			ob.stat = 5;
			ob.visible = false;
			
			//exp naik
			trace("battle over exp");
			pc_exp+=enemy[enemy_id][6]*5;
			if (pc_exp>pc_exp_level[pc_lvl]){
				pc_lvl++;
				level_up();
			}
			//earn gold
			var b_gold:int = enemy[enemy_id][6]*5+rand(pc_lvl);
			pc_item[0]+= b_gold;
			teks_soal.text = "Anda berhasil mengalahkan "+enemy[enemy_id][2]+", mendapat pengalaman EXP+ "+(enemy[enemy_id][6]*5)+" dan uang "+b_gold+"G";
			update_GUI();
			jawaban.visible = false;
			ob.timer = 0;
		}
	}
	if (ob.stat == 5){
		ob.timer++;
		if (ob.timer>100){
			ob.removeEventListener(Event.ENTER_FRAME, move_e_battle);
			//wipe in
			wipe_in_battle();
		}		
	}
}

function start_battle(e_id:int):void{
	trace("battle start ---------------");
	enemy_id = e_id;
	acak_soal();
	setup_battle(e_id);
	wipe_out_battle();
	//buat_soal();
	if (game_output == "android"){
		vk.visible = false;
		remove_vk();
	}
	
}

function wipe_out_battle():void{
	game_aktif = false;
	cmask = new MovieClip();
	addChild(cmask);
	cmask.x = screen_w/2;
	cmask.y = screen_h/2;
	var circle:Shape = new Shape(); // The instance name circle is created
	circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
	circle.graphics.lineStyle(0, 0x000000); // Give the ellipse a black, 2 pixels thick line
	circle.graphics.drawCircle(0, 0, 5); 
	circle.graphics.endFill(); 
	cmask.addChild(circle);
	cmask.addEventListener(Event.ENTER_FRAME, do_wipe_out_battle);
	trace("wipe in")
	btl_scene.mask = cmask;
}

function do_wipe_out_battle(e:Event):void{
	var ob:Object = e.currentTarget;
	ob.scaleX+=1.5;
	ob.scaleY+=1.5;
	if (ob.width > screen_w*1.25) {
		//remove it
		btl_scene.mask = null;
		ob.removeEventListener(Event.ENTER_FRAME, do_wipe_out_battle);
		removeChild(DisplayObject(ob));	
		buat_soal();
		addChild(GUI);
	}
}

function wipe_in_battle():void{
	game_aktif = false;
	cmask = new MovieClip();
	addChild(cmask);
	cmask.x = screen_w/2;
	cmask.y = screen_h/2;
	var circle:Shape = new Shape(); // The instance name circle is created
	circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
	circle.graphics.lineStyle(0, 0x000000); // Give the ellipse a black, 2 pixels thick line
	circle.graphics.drawCircle(0, 0, screen_w/2+100); 
	circle.graphics.endFill(); 
	cmask.addChild(circle);
	cmask.addEventListener(Event.ENTER_FRAME, do_wipe_in_battle);
	trace("wipe in")
	btl_scene.mask = cmask;
}

function do_wipe_in_battle(e:Event):void{
	var ob:Object = e.currentTarget;
	ob.scaleX-=0.02;
	ob.scaleY-=0.02;
	if (ob.width < 5) {
		//remove it
		btl_scene.mask = null;
		ob.removeEventListener(Event.ENTER_FRAME, do_wipe_in_battle);
		removeChild(DisplayObject(ob));
		removeChild(btl_scene);
		GUI.removeChild(e_hp_bar);
		//kembali ke peta
		buat_level(battle_arena, tileset_name);
		char = set_karakter(char_sprites_name, karakter_x, karakter_y);			
		addChild(GUI);
		set_frame(char, 1);
		center_screen();
		//
	}
}

function wipe_in_start_battle():void{
	game_aktif = false;
	cmask = new MovieClip();
	addChild(cmask);
	cmask.x = screen_w/2;
	cmask.y = screen_h/2;
	var circle:Shape = new Shape(); // The instance name circle is created
	circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
	circle.graphics.lineStyle(0, 0x000000); // Give the ellipse a black, 2 pixels thick line
	circle.graphics.drawCircle(0, 0, screen_w/2+100); 
	circle.graphics.endFill(); 
	cmask.addChild(circle);
	cmask.addEventListener(Event.ENTER_FRAME, do_wipe_in_start_battle);
	trace("wipe in");
	game.mask = cmask;
	if (game_output == "android"){
		trace("vk invisible");
		vk.visible = false;
	}
}

function do_wipe_in_start_battle(e:Event):void{
	var ob:Object = e.currentTarget;
	ob.scaleX-=0.02;
	ob.scaleY-=0.02;
	if (ob.width < 5) {
		//remove it
		game.mask = null;
		ob.removeEventListener(Event.ENTER_FRAME, do_wipe_in_start_battle);
		removeChild(DisplayObject(ob));
		remove_enemy();
		hapus_game();
		start_battle(enemy_id);		
	}
}

function halaman_awal(link:String):void{
	tittle_page = new MovieClip();
	addChild(tittle_page);
	game_cover_bg = link;
	tittle_page.addChild(draw_from(link, 0,0, screen_w, screen_h));
	var s_btn:MovieClip = new MovieClip();
	tittle_page.addChild(s_btn);
	s_btn.addChild(draw_panel(0,0,9,2,"3x3", 5));
	s_btn.x = screen_w/2 - s_btn.width/2;
	s_btn.y = screen_h-150;
	var s_txt:TextField = add_text("Mulai Permainan", 200,30, 20);
	s_btn.addChild(s_txt);
	s_txt.x = 60;
	s_txt.y = 15;
	s_btn.addEventListener(MouseEvent.CLICK, start_game);
	//suara
	SoundMixer.stopAll();
	play_sound(suara_halaman_pembuka, 99);
}
//-------------------------------------------tittle screen --------------------------------
function start_game(e:MouseEvent):void{
	var ob:Object = e.currentTarget;
	ob.removeEventListener(MouseEvent.CLICK, start_game);
	removeChild(tittle_page);
	set_var_awal();
	buat_level(map_start, tileset_name);
	char = set_karakter(char_sprites_name, karakter_x, karakter_y);
	setup_GUI();
	jalankan_game();
}


function game_over():void{
	tittle_page = new MovieClip();
	addChild(tittle_page);
	tittle_page.addChild(draw_from(game_over_bg, 0,0, screen_w, screen_h));
	var s_btn:MovieClip = new MovieClip();
	tittle_page.addChild(s_btn);
	s_btn.addChild(draw_panel(0,0,9,2,"3x3", 4));
	s_btn.x = screen_w/2 - s_btn.width/2;
	s_btn.y = screen_h-150;
	var s_txt:TextField = add_text("Kembali", 200,30, 20);
	s_btn.addChild(s_txt);
	s_txt.x = 100;
	s_txt.y = 15;
	s_btn.addEventListener(MouseEvent.CLICK, kembali_halaman_awal);
	//suara
	SoundMixer.stopAll();
	play_sound(suara_game_over, 99);
}

function kembali_halaman_awal(e:MouseEvent):void{
	var ob:Object = e.currentTarget;
	ob.removeEventListener(MouseEvent.CLICK, kembali_halaman_awal);
	removeChild(tittle_page);
	halaman_awal(game_cover_bg);
}

function set_var_awal():void{
	pc_hp = 10;
	pc_hp_max = 10;
	pc_exp = 1;
	pc_lvl = 1;
	pc_atk = 2;
	pc_def = 1;
	pc_item = [0];
	//story
	story_id = 0;
	just_talk = 0;
	popup_id = 0;
	karakter_x = 18;
	karakter_y = 7;	
}

function play_sound(link:String, loop:int = 1):void{
	if (suara_aktif){
		var s_class:* = getDefinitionByName(link);
		var suara:* = new s_class();
		suara.play(0, loop);
	}
}
//-------------------------virtual keyboard untuk Android ----------------------------

function draw_vk():void{
	vk = new MovieClip();
	addChild(vk);
	trace("vk added -------->")
	var circle:Shape = new Shape(); // The instance name circle is created
	circle.graphics.beginFill(0xFFFFFF, 1); // Fill the circle with the color 990000
	circle.graphics.lineStyle(2, 0xCCCCCC); // Give the ellipse a black, 2 pixels thick line
	circle.graphics.drawCircle(0, 0, 100); 
	circle.graphics.endFill(); 
	vk.addChild(circle);
	vk.area = circle;
	vk.x = 150;
	vk.y = screen_h-150;
	circle.alpha = 0.4;
	stick = new MovieClip();
	var cs:Shape = new Shape(); // The instance name circle is created
	cs.graphics.beginFill(0xFFFFFF, 1); // Fill the circle with the color 990000
	cs.graphics.lineStyle(2, 0xCCCCCC); // Give the ellipse a black, 2 pixels thick line
	cs.graphics.drawCircle(0, 0, 40); 
	cs.graphics.endFill(); 
	stick.addChild(cs);
	stick.alpha = 0.7;
	stick.is_drag = false;
	vk.addChild(stick);
	stick.addEventListener(Event.ENTER_FRAME, move_stick);	
	//space
	v_space = new MovieClip();
	vk.addChild(v_space);
	var cp:Shape = new Shape(); // The instance name circle is created
	cp.graphics.beginFill(0xFFFFFF, 1); // Fill the circle with the color 990000
	cp.graphics.lineStyle(2, 0xCCCCCC); // Give the ellipse a black, 2 pixels thick line
	cp.graphics.drawCircle(0, 0, 50); 
	cp.graphics.endFill(); 
	v_space.addChild(cp);
	v_space.is_drag = false;
	v_space.alpha = 0.4;
	v_space.x = screen_w - 300;
	v_space.addEventListener(MouseEvent.CLICK, vk_space);

}

function vk_space(e:MouseEvent):void{
	if (!is_action && game_aktif){
		is_action = true;
		cek_pintu();
		if (just_talk == 0) cek_npc();
		if (just_talk == 0) collect_item();
	}
}

function remove_vk():void{
	trace("vk removed");
	v_space.removeEventListener(MouseEvent.CLICK, vk_space);
	stick.removeEventListener(Event.ENTER_FRAME, move_stick);
	removeChild(vk);
}

function move_stick(e:Event):void{
	var ob:Object = e.currentTarget;
	if (mouse_klik){
		if (vk.area.hitTestPoint(mouseX, mouseY, true) && !ob.is_drag){
			ob.is_drag = true;
		}
	}else{
		ob.is_drag = false;
	}
	
	if (ob.is_drag){
		ob.x = mouseX-vk.x;
		ob.y = mouseY-vk.y;	
		ob.rot = rotasi(ob.x, ob.y, 0, 0)			
		ob.dist = Math.sqrt(ob.x*ob.x+ob.y*ob.y);
		if (ob.dist > 100){
			ob.x = 100 * Math.cos((ob.rot+90) * Math.PI / 180);
			ob.y = 100 * Math.sin((ob.rot+90) * Math.PI / 180);
		}
		//posisi
		key_up =  ((ob.rot>120 && ob.rot<180) || (ob.rot>-180 && ob.rot<-120));
		key_down =  ((ob.rot>0 && ob.rot<60) || (ob.rot>-60 && ob.rot<0));
		key_left =  (ob.rot>30 && ob.rot<150);
		key_right =  (ob.rot>-150 && ob.rot<-30);
	}else{
		ob.x = 0;
		ob.y = 0;
		key_up = false;
		key_down = false;
		key_left = false;
		key_right = false;
	}
	
}

function rotasi(x1:int, y1:int, x2:int, y2:int):Number{
	var rad:Number =  -Math.atan2((x1 - x2), (y1 - y2)); 
	return rad * 180 / Math.PI;
}
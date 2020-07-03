# RULE OF THUMB

## membuat page baru:
1. buka tab router, buat deskripsi route baru tersebut beserta urutan middlewarenya
1. pindah ke controller untuk membuat controller baru. tentukan mau buat bentuk get atau post
1. buat controller untuk dummy test apakah berhasil
1. jika sudah berhasil, buat viewnya beserta flash errornya. flash error itu validasinya di post, tapi di konsumsinya di get
1. jika view sudah dibuat lalu integrasikan dengan controllernya agar variabel yg disalurkan tepat
1. lengkapi middleware yang dibutuhkan, semisal validasi form, dll serta kembangkan logika dari get dan post nya

## mengubah struktur model
1. buat model versi barunya
1. integrasikan dengan view

## membuat model baru
1. 

## form
1. application/x-www-form-urlencoded
	✅ middleware: body-parser + multer
	✅ req.body
	❌ req.files
1. form-data/multipart
	✅ middleware: body-parser + multer
	❌ req.body --> validator error
	✅ req.files

##	Skema Database
1. user adalah model himaster yang aktif tahun itu (misal himaster_alpha) dengan tahun (misal 2020)
1. user memiliki relationship hasOne dengan about
1. user memiliki relationship hasMany dengan event, photo, person
1. team memiliki hubungan hasMany dengan person
1. gallery memiliki hubungan hasMany dengan photo

kepikiran ide tiap person bisa jualan di situ atau bikin blog kayaknya seru banget anjing bikin platform dongg :"""D

ntar bisa buat portofolioooo kerennnn anjingggg
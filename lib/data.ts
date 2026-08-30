import React from "react";
import { FaBullhorn, FaChalkboardTeacher, FaMobileAlt } from "react-icons/fa";
import { GiMicrophone, GiPodium } from "react-icons/gi";

import workshopAiImg1 from "@/public/images/kegiatan/AI-1.jpg";
import workshopAiImg2 from "@/public/images/kegiatan/AI-2.jpg";
import workshopAiImg3 from "@/public/images/kegiatan/AI-3.jpg";
import rektorCupImg1 from "@/public/images/kegiatan/RSC-1.jpg";
import rektorCupImg2 from "@/public/images/kegiatan/RSC-2.jpg";
import seminarPasarModalImg from "@/public/images/kegiatan/pspm.jpg";
import seminarPasarModalImg1 from "@/public/images/kegiatan/pspm1.jpg";
import coachingClinicImg1 from "@/public/images/kegiatan/clc1.jpg";
import coachingClinicImg2 from "@/public/images/kegiatan/clc2.jpg";
import coachingClinicImg3 from "@/public/images/kegiatan/clc3.jpg";
import mcSekolahPasarModalImg1 from "@/public/images/kegiatan/spm1.jpg";
import mcSekolahPasarModalImg2 from "@/public/images/kegiatan/spm2.jpg";
import mcSekolahPasarModalImg3 from "@/public/images/kegiatan/spm3.jpg";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Divisi Acara - Workshop Nasional AI",
    location: "Workshop 'Artificial Intelligence in The World of Data Science'",
    description:
      "Mengatur susunan acara dan berkoordinasi langsung dengan pemateri ahli agar sesi berjalan rapi dari awal hingga akhir.",
    date: "2024",
    icon: React.createElement(GiPodium),
    imageUrls: [workshopAiImg1, workshopAiImg2, workshopAiImg3],
  },
  {
    title: "Divisi Humas - Rektor Sport Champion",
    location: "Kompetisi Olahraga Tingkat Universitas",
    description:
      "Mengelola komunikasi, publikasi, dan koordinasi peserta untuk meningkatkan partisipasi antar program studi.",
    date: "2024",
    icon: React.createElement(FaBullhorn),
    imageUrls: [rektorCupImg1, rektorCupImg2],
  },
  {
    title: "Divisi Acara - Seminar Nasional Pasar Modal",
    location: "Seminar 'Pengenalan Sekolah Pasar Modal pada Gen Z'",
    description:
      "Bertanggung jawab atas kelancaran teknis acara dan membantu kesiapan narasumber dari awal hingga akhir seminar.",
    date: "2025",
    icon: React.createElement(GiPodium),
    imageUrls: [seminarPasarModalImg, seminarPasarModalImg1],
  },
  {
    title: "Divisi Acara - Coaching Clinic Investasi",
    location:
      "Coaching Clinic 'Cerdas Bertransaksi dan Investasi Hadapi Era Digital'",
    description:
      "Menyusun rundown acara secara detail dan memastikan setiap sesi berjalan sesuai rencana.",
    date: "2025",
    icon: React.createElement(FaChalkboardTeacher),
    imageUrls: [coachingClinicImg1, coachingClinicImg2, coachingClinicImg3],
  },
  {
    title: "Master of Ceremony (MC) - Sekolah Pasar Modal",
    location: "Edukasi Pasar Modal oleh IDX & MNC Sekuritas",
    description:
      "Memandu jalannya acara edukasi pasar modal bersama narasumber dari Bursa Efek Indonesia dan MNC Sekuritas.",
    date: "2025",
    icon: React.createElement(GiMicrophone),
    imageUrls: [
      mcSekolahPasarModalImg1,
      mcSekolahPasarModalImg2,
      mcSekolahPasarModalImg3,
    ],
  },
] as const;

export const workExperienceData = [
  {
    title: "Mobile App Developer Intern",
    company: "PERUMDA Tirta Bhagasasi",
    division: "Divisi Teknologi Informasi",
    date: "Oktober 2025 - Januari 2026",
    description: [
      "Merancang dan mengembangkan aplikasi mobile manajemen aset inventaris perusahaan dari tahap inisialisasi hingga deployment menggunakan Ionic Angular.",
      "Mengintegrasikan Google ML Kit via Capacitor untuk fitur pemindaian QR Code dan Barcode secara real-time.",
      "Membangun form dinamis yang terintegrasi dengan RESTful API perusahaan, termasuk konversi Base64 ke Blob untuk upload foto via FormData.",
      "Melakukan testing, debugging, validasi endpoint API dengan Postman, dan build APK release.",
    ],
    icon: React.createElement(FaMobileAlt),
    imageUrls: ["/images/internship/intern1.png", "/images/internship/intern2.png"],
    tech: ["Ionic", "Angular", "TypeScript", "REST API", "Google ML Kit"],
  },
] as const;

export const projectsData = [
  {
    title: "CRM Sales Pipeline Dashboard",
    description:
      "Dashboard CRM B2B untuk mengelola leads, customers, pipeline deal, aktivitas sales, forecast revenue, dan laporan performa tim dalam satu workspace operasional.",
    screenshots: ["/images/project/github/crm-sales.png"],
    image: "/images/project/github/crm-sales.png",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/tailwind.svg",
      "/images/icon/javascript.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/AhmadMayiludin/CRM-Sales-Pipeline",
    features: [
      "Dashboard KPI untuk leads, conversion rate, forecast revenue, dan active deals.",
      "Pipeline board untuk simulasi perpindahan deal antar stage.",
      "Customer dan activity log untuk menyimpan PIC, next step, dan catatan follow-up.",
      "Reports berbasis Recharts untuk revenue, target, prioritas deal, dan performa tim.",
    ],
    languages: ["React", "Vite", "Tailwind CSS", "Recharts", "LocalStorage"],
  },
  {
    title: "ProcureFlow - Procurement & Vendor Management",
    description:
      "Portal internal procurement untuk mengontrol vendor master, purchase request, perbandingan quotation, purchase order, invoice tracking, approval flow, dan laporan pengadaan.",
    screenshots: ["/images/project/github/procurement.png"],
    image: "/images/project/github/procurement.png",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/tailwind.svg",
      "/images/icon/javascript.svg",
    ],
    demoUrl: null,
    githubUrl:
      "https://github.com/AhmadMayiludin/Procurement-Vendor-Management-",
    features: [
      "Vendor management dengan legalitas, rating, PIC, kategori, dan status aktif.",
      "Purchase workflow untuk PR, quotation comparison, PO, invoice, dan approval.",
      "Dashboard spend untuk request, PO aktif, vendor terverifikasi, invoice pending, dan tren pengeluaran.",
      "Approval simulation dengan perubahan status yang tersimpan di LocalStorage.",
    ],
    languages: ["React", "Vite", "Tailwind CSS", "Recharts", "LocalStorage"],
  },
  {
    title: "Aplikasi Mobile Manajemen Aset - PERUMDA",
    description:
      "Aplikasi mobile internal untuk pendataan dan monitoring aset inventaris perusahaan. Fokus pada pemindaian QR/Barcode, form dinamis, upload foto, dan integrasi REST API.",
    screenshots: ["/images/internship/intern1.png", "/images/internship/intern2.png"],
    image: "/images/internship/intern1.png",
    tech: [
      "/images/icon/ionic.svg",
      "/images/icon/angular.svg",
      "/images/icon/typescript.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/AhmadMayiludin/tirta-bhagasasi-api",
    features: [
      "QR/Barcode scanner menggunakan Google ML Kit via Capacitor.",
      "Dynamic form yang terhubung dengan endpoint API perusahaan.",
      "Photo upload dengan konversi Base64 ke Blob melalui FormData.",
      "Testing endpoint, debugging, dan build APK release.",
    ],
    languages: ["Ionic", "Angular", "TypeScript", "Capacitor", "REST API"],
  },
  {
    title: "HRIS Employee Self-Service Portal",
    description:
      "Portal HRIS/ESS untuk kebutuhan karyawan seperti profil, absensi, pengajuan cuti, slip gaji, pengumuman, struktur organisasi, dan pengaturan akun.",
    screenshots: ["/images/project/hris/dashboard.png"],
    image: "/images/project/hris/dashboard.png",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/tailwind.svg",
      "/images/icon/javascript.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Employee dashboard untuk ringkasan kehadiran, sisa cuti, jadwal kerja, dan status pengajuan.",
      "Leave management dengan form pengajuan cuti dan riwayat status persetujuan.",
      "Payroll view untuk rincian slip gaji, pendapatan, potongan, dan take-home pay.",
      "Responsive layout dengan sidebar desktop, mobile menu, dan komponen data yang mudah dipindai.",
    ],
    languages: ["React", "Vite", "Tailwind CSS", "Recharts", "LocalStorage"],
  },
  {
    title: "Sistem Manajemen Restoran - RestoPOS",
    description:
      "Aplikasi web untuk Admin, Pelayan, dan Koki. Sistem menangani manajemen menu, meja, pesanan, laporan penjualan, dan pemantauan aktivitas dapur secara terpusat.",
    screenshots: [
      "/images/project/restopos-admin/1.png",
      "/images/project/restopos-admin/2.png",
      "/images/project/restopos-admin/3.png",
      "/images/project/restopos-admin/4.png",
    ],
    image: "/images/project/restopos-admin/1.png",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
      "/images/icon/mysql.svg",
      "/images/icon/bootstrap.svg",
      "/images/icon/php.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Manajemen data master untuk menu, pengguna, meja, dan kategori.",
      "Dashboard analitik untuk laporan penjualan dan item terlaris.",
      "Alur pesanan untuk kasir/pelayan dan dashboard koki.",
      "Role-based access untuk Admin, Kasir/Pelayan, dan Koki.",
    ],
    languages: ["Laravel", "PHP", "MySQL", "Bootstrap"],
  },
  {
    title: "Aplikasi Pelanggan - RestoPOS",
    description:
      "Aplikasi mobile pelanggan untuk pemesanan makanan, reservasi meja, pembayaran digital, dan pelacakan status pesanan restoran.",
    screenshots: [
      "/images/project/restopos-pelanggan/1.png",
      "/images/project/restopos-pelanggan/2.png",
      "/images/project/restopos-pelanggan/3.png",
      "/images/project/restopos-pelanggan/4.png",
    ],
    image: "/images/project/restopos-pelanggan/2.png",
    tech: [
      "/images/icon/ionic.svg",
      "/images/icon/angular.svg",
      "/images/icon/typescript.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Pemesanan online untuk dine-in dan take-away.",
      "Reservasi meja berdasarkan tanggal, jam, dan jumlah tamu.",
      "Pembayaran digital dengan opsi QRIS dan tunai.",
      "Tracking status pesanan secara real-time dari sisi pelanggan.",
    ],
    languages: ["Ionic", "Angular", "TypeScript"],
  },
  {
    title: "Website Donasi Yayasan",
    description:
      "Platform donasi online untuk yayasan dengan fitur program donasi, verifikasi transaksi, dan manajemen data agar penggalangan dana lebih transparan.",
    screenshots: [
      "/images/project/donasi/1.png",
      "/images/project/donasi/2.png",
      "/images/project/donasi/3.png",
      "/images/project/donasi/4.png",
      "/images/project/donasi/5.jpg",
      "/images/project/donasi/6.jpg",
      "/images/project/donasi/7.jpg",
    ],
    image: "/images/project/donasi/1.png",
    tech: [
      "/images/icon/php.svg",
      "/images/icon/bootstrap.svg",
      "/images/icon/tailwind.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/AhmadMayiludin/donasi",
    features: [
      "Donasi online untuk memudahkan donatur berpartisipasi.",
      "Verifikasi transaksi dari dashboard admin.",
      "Manajemen program penggalangan dana yang sedang berjalan.",
    ],
    languages: ["PHP Native", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Website Taman Bacaan Masyarakat",
    description:
      "Website profil komunitas literasi TBM untuk menampilkan program literasi, kegiatan belajar, relawan, dan donasi buku dengan tampilan visual yang ramah komunitas.",
    screenshots: [
      "/images/project/tbm/hero.png",
      "/images/project/tbm/kegiatan-1.jpg",
      "/images/project/tbm/reading-picnic.jpeg",
    ],
    image: "/images/project/tbm/hero.png",
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/javascript.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/AhmadMayiludin/tbm_app",
    features: [
      "Halaman profil, visi-misi, dan program utama TBM.",
      "Konten program literasi dasar, kegiatan belajar, reading picnic, dan sumbangan buku.",
      "Routing SPA menggunakan React Router.",
      "Visual kegiatan lokal untuk memperkuat identitas komunitas.",
    ],
    languages: ["React", "Vite", "React Router", "JavaScript"],
  },
  {
    title: "Desain UI/UX - Aplikasi Restoran RestoPOS",
    description:
      "Perancangan UI/UX sistem restoran RestoPOS untuk empat peran pengguna: Pelanggan, Pelayan/Kasir, Koki, dan Admin.",
    screenshots: ["/images/project/UIUX/1.png"],
    image: "/images/project/UIUX/1.png",
    tech: ["/images/icon/figma.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "User flow untuk 4 peran pengguna.",
      "Prototype interaktif untuk simulasi aplikasi.",
      "Mockup detail untuk aplikasi mobile dan web.",
      "Desain berbasis komponen yang konsisten.",
    ],
    languages: ["Figma", "Draw.io"],
  },
  {
    title: "Desain UI/UX - Website Manajemen UMKM",
    description:
      "Desain antarmuka platform web UMKM yang mencakup halaman marketing dan dashboard internal untuk manajemen penjualan, stok, dan laporan.",
    screenshots: ["/images/project/umkm-deign/1.png"],
    image: "/images/project/umkm-deign/figma-overview.png",
    tech: ["/images/icon/figma.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Desain halaman marketing seperti homepage, layanan, dan tentang kami.",
      "Dashboard analitik untuk data penjualan dan stok.",
      "Fitur manajemen produk, pelanggan, dan laporan.",
      "Alur pendaftaran dan pembayaran pengguna.",
    ],
    languages: ["Figma"],
  },
  {
    title: "Deteksi Kendaraan (YOLOv5)",
    description:
      "Proyek Computer Vision yang menggunakan YOLOv5 untuk mendeteksi objek kendaraan secara real-time dari gambar atau video.",
    screenshots: ["/images/project/yolo/1.jpg", "/images/project/yolo/2.jpg"],
    image: "/images/project/yolo/1.jpg",
    tech: ["/images/icon/python.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Deteksi objek kendaraan dari input gambar atau video.",
      "Implementasi algoritma YOLOv5 untuk Computer Vision.",
      "Visualisasi hasil deteksi untuk evaluasi model.",
    ],
    languages: ["Python", "YOLOv5", "Pandas", "Matplotlib"],
  },
  {
    title: "Aplikasi Pendaftaran Pasien Online",
    description:
      "Sistem pendaftaran dan pemeriksaan pasien berbasis web untuk membantu alur administrasi klinik dan pencatatan data medis.",
    screenshots: [
      "/images/project/pasien/1.png",
      "/images/project/pasien/2.png",
      "/images/project/pasien/3.png",
    ],
    image: "/images/project/pasien/1.png",
    tech: ["/images/icon/php.svg", "/images/icon/mysql.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Pendaftaran pasien online untuk mengurangi antrean administrasi.",
      "Pencatatan pemeriksaan pasien secara digital.",
      "Manajemen data pasien dan riwayat pemeriksaan.",
    ],
    languages: ["PHP Native", "MySQL"],
  },
  {
    title: "Proyek Data Mining - Online Retail",
    description:
      "Analisis dataset Online Retail berisi ratusan ribu data transaksi untuk segmentasi pelanggan menggunakan Python, Pandas, dan Matplotlib.",
    screenshots: [
      "/images/project/datamining/1.png",
      "/images/project/datamining/2.png",
      "/images/project/datamining/3.png",
    ],
    image: "/images/project/datamining/1.png",
    tech: ["/images/icon/python.svg", "/images/icon/pandas.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Pengolahan dataset retail berskala besar.",
      "Segmentasi pelanggan berdasarkan perilaku transaksi.",
      "Visualisasi data untuk mendukung interpretasi hasil analisis.",
    ],
    languages: ["Python", "Pandas", "Matplotlib"],
  },
  {
    title: "Deteksi dan Pengenalan Wajah",
    description:
      "Aplikasi desktop Python untuk mendeteksi dan mengenali wajah secara real-time menggunakan webcam, OpenCV, dan model Machine Learning.",
    screenshots: ["/images/project/face-recognition/1.jpg"],
    image: "/images/project/face-recognition/1.jpg",
    tech: ["/images/icon/python.svg", "/images/icon/opencv.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Real-time face detection dari input webcam.",
      "Face recognition untuk mengenali identitas tertentu.",
      "Model training menggunakan algoritma klasifikasi seperti K-NN dan SVM.",
      "Image processing dengan OpenCV untuk resize dan grayscale.",
    ],
    languages: ["Python", "OpenCV", "Scikit-learn"],
  },
  {
    title: "Desain Topologi Jaringan Universitas",
    description:
      "Simulasi topologi jaringan universitas dengan 2 gedung dan 4 fakultas menggunakan Cisco Packet Tracer, BGP, OSPF, VLAN, dan DHCP.",
    screenshots: ["/images/project/jaringan/topologi.png"],
    image: "/images/project/jaringan/topologi.png",
    tech: ["/images/icon/cisco.svg"],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Routing dinamis antar gedung menggunakan BGP.",
      "Routing internal gedung menggunakan OSPF.",
      "Segmentasi traffic antar departemen menggunakan VLAN.",
      "Skema DHCP dan IP statis sesuai kebutuhan setiap fakultas.",
    ],
    languages: ["Cisco Packet Tracer", "OSPF", "BGP", "VLAN", "DHCP"],
  },
] as const;

export const skills = [
  {
    id: 1,
    imgUrl: "/images/icon/html.svg",
  },
  {
    id: 2,
    imgUrl: "/images/icon/css.svg",
  },
  {
    id: 3,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
  },
  {
    id: 4,
    imgUrl: "/images/icon/python.svg",
  },
  {
    id: 5,
    imgUrl: "/images/icon/mysql.svg",
  },
  {
    id: 6,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
  },
  {
    id: 7,
    imgUrl: "/images/icon/ionic.svg",
  },
  {
    id: 8,
    imgUrl: "/images/icon/bootstrap.svg",
  },
  {
    id: 9,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    id: 10,
    imgUrl: "/images/icon/figma.svg",
  },
  {
    id: 11,
    imgUrl: "/images/icon/canva.svg",
  },
  {
    id: 12,
    imgUrl: "/images/icon/git.svg",
  },
] as const;

export const inDevelopmentProjects = [
  {
    title: "Portfolio Website v2",
    description:
      "Versi terbaru portfolio pribadi dengan fitur maskot AI interaktif, section project in-development, redesain visual premium biru-ungu, dan integrasi AI guide via 9router.",
    progress: 75,
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/next-js.svg",
      "/images/icon/typescript.svg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    ],
    expectedDate: "September 2026",
    features: [
      "Redesain visual dengan gradien biru-ungu premium.",
      "Maskot AI 'AMAI' yang interaktif dan scroll-aware.",
      "Section khusus project yang sedang dikembangkan.",
      "Integrasi AI chat via 9router endpoint.",
    ],
    githubUrl: null,
    languages: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI/LLM"],
  },
  {
    title: "SekaiDrama - Platform Streaming Drama",
    description:
      "Platform streaming drama Asia berbasis web dengan fitur playlist, rekomendasi konten, ulasan pengguna, dan sistem langganan. Dibangun dengan Next.js dan TypeScript.",
    progress: 40,
    tech: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/next-js.svg",
      "/images/icon/typescript.svg",
    ],
    expectedDate: "Oktober 2026",
    features: [
      "Streaming konten drama Asia dengan player custom.",
      "Sistem rekomendasi berdasarkan riwayat tontonan.",
      "Review dan rating oleh pengguna.",
      "Langganan premium dan manajemen akun.",
    ],
    githubUrl: null,
    languages: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
] as const;

import { Mentor } from "@/lib/types";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Khuraman Guliyeva",
    role: "Founder & Director",
    bio: "Description of the student",
    initials: "KG",
    photo: "/team/khuraman-guliyeva.jpeg",
  },
  {
    id: "2",
    name: "Elshan Huseynzada",
    role: "Operations Lead",
    bio: "Description of the student",
    initials: "EH",
    photo: "/team/Elshan.jpeg",
  },
  {
    id: "3",
    name: "Ulvi Asadli",
    role: "Community Outreach Lead",
    bio: "Description of the student",
    initials: "UA",
    photo: "/team/ulvi-asadli.jpeg",
  },
];

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Əmrah",
    surname: "Həsənli",
    expertise:
      "Təhsil İşçilərinin Həmrəyliyi Alyansının Sədri, təhsil məsələləri üzrə ekspert",
    photo: "/mentors/emrah-hesenli.jpeg",
  },
  {
    id: "2",
    name: "Vüsət",
    surname: "Əzizov",
    expertise:
      "Silsilə Tədris Mərkəzinin rəhbəri, Təhsil işləri üzrə mütəxəssis.",
    photo: "/mentors/vusat-azizov.jpeg",
  },
  {
    id: "3",
    name: "Elnur",
    surname: "Quliyev",
    expertise:
      "Neway Academy-nin təsisçi və direktoru, 10 il təcrübəyə malik ingilis dili mütəxxəsisi",
    photo: "/mentors/elnur-guliyev.jpeg",
  },
  {
    id: "4",
    name: "Rizvan",
    surname: "Fikrətoğlu",
    expertise:
      "'Master of Science' Təhsil Mərkəzinin direktoru, Təhsil işləri üzrə ekspert",
    photo: "/mentors/rizvan-fikretoglu.jpeg",
  },
  {
    id: "5",
    name: "Ələmdar",
    surname: "Manafov",
    expertise:
      "Marketing Specialist / Entreprenuer Founder of Be Positive Advertising Agency, Marketing & Brand Specialist of Colibri Express",
    photo: "/mentors/elemdar-manafov.jpeg",
  },
  {
    id: "6",
    name: "Seyidfatima",
    surname: "Abbasova",
    expertise: "Accredited Trainer. M. Sc. Social Psychology",
    photo: "/mentors/seyidfatima-abbasova.jpeg",
  },
  {
    id: "7",
    name: "Günay",
    surname: "İbadova",
    expertise: "Psychtherapist, Trainer",
    photo: "/mentors/gunay-ibadova.jpeg",
  },
  {
    id: "8",
    name: "Şahin",
    surname: "Sərdarlı",
    expertise:
      "Karyera və İşə Hazırlıq Mərkəzinin təsisçisi, karyera məsləhətçisi",
    photo: "/mentors/sahin-serdarli.jpeg",
  },
  {
    id: "9",
    name: "Ləman",
    surname: "Abbasova",
    expertise:
      "Sosial Media Marketinq üzrə mütəxəssis, mobilograf və Namel Academy təhsil platformasının qurucusu.",
    photo: "/mentors/laman-abbasova.jpeg",
  },
  {
    id: "10",
    name: "Rəşad",
    surname: "İmanov",
    expertise:
      "Strateji Kommunikasiya üzrə Mütəxəssis.Strateji Kommunikasiya üzrə Mütəxəssis.",
    photo: "/mentors/rasad-imanov.jpeg",
  },
  {
    id: "11",
    name: "Nərmin",
    surname: "Nizam",
    expertise:
      "Amerika Akkreditasiya Assosiasiyası tərəfindən sertifikatlaşdırılmış təlimçi və “Böyük Dayaq” İctimai Birliyinin təsisçisi",
    photo: "/mentors/narmin-nizam.jpeg",
  },
  {
    id: "12",
    name: "Rəfiq",
    surname: "Mərdanov",
    expertise:
      "Beyin Yatırım Tədris Mərkəzinin təsisçisi,ölkədə ingilis dili fənni üzrə ilk dinləmə və oxu testlərinin həm-müəllifi  və ingilis dili müəllimi",
    photo: "/mentors/rafig-merdanov.jpeg",
  },
  {
    id: "13",
    name: "Mehdi",
    surname: "Bəşirli",
    expertise: "Beynəlxalq dərəcəli Karyera Kouç",
    photo: "/mentors/mehdi-besirli.jpg",
  },
  {
    id: "14",
    name: "Nigar",
    surname: "İlqar qızı",
    expertise: "Nitq və Diksiya təlimçisi",
    photo: "/mentors/nigar-ilgar.jpeg",
  },
  {
    id: "15",
    name: "Ümid",
    surname: "Salay",
    expertise: "Code Academy - Creative AI Head",
    photo: "/mentors/umid-salay.jpeg",
  },
  {
    id: "16",
    name: "Aydan",
    surname: "Orucova",
    expertise: "Physics and STEAM",
    photo: "/mentors/aydan-orujova.jpeg",
  },
  {
    id: "17",
    name: "Aygün",
    surname: "Kərimova",
    expertise: "Azərbaycan Gənc Müəllimlər Assosiasiyasının İcraçı direktoru",
    photo: "/mentors/aygun-karimova.jpeg",
  },
  {
    id: "18",
    name: "Orxan",
    surname: "Salmanov",
    expertise: "İnk academy təsisçi",
    photo: "/mentors/orkhan-salmanov.jpeg",
  },
  {
    id: "19",
    name: "Osman",
    surname: "Osmanli",
    expertise: "Karate üzrə İdmançı",
    photo: "/mentors/osman-osmanli.jpeg",
  },
  {
    id: "20",
    name: "Anara",
    surname: "Quliyeva",
    expertise: "Klinik Psixoloq, Beynəlxalq Sertifikatlı Oyun Terapisti",
    photo: "/mentors/anara-quliyeva.jpeg",
  },
  {
    id: "21",
    name: "Fərid ",
    surname: "Quluzadə",
    expertise: "Biznes və Satış üzrə mütəxəssis",
    photo: "/mentors/farid-quluzada.jpeg",
  },
  {
    id: "22",
    name: "Ülviyyə ",
    surname: "Mütəllimzadə",
    expertise:
      "Amerika Akkreditasiya Assosasiyası tərəfindən sertifikatlı təlimçi və Evrika Liseyinin İnformatika və STEAM müəllimi",
    photo: "/mentors/ulviyye-mutellimzade.jpeg",
  },
  {
    id: "23",
    name: "Şərəbanı",
    surname: "Abbasova",
    expertise: "Uşaq və yeniyetmə psixoloqu",
    photo: "/mentors/serabani-abbasova.jpeg",
  },
  {
    id: "24",
    name: "Cəmilə",
    surname: "İsmayılova",
    expertise: "Tibb üzrə fəlsəfə doktoru, MD, MSc, PhD",
    photo: "/mentors/jamila-ismayilova.jpeg",
  },
  {
    id: "25",
    name: "Sərxan",
    surname: "Surxay",
    expertise:
      "Adroit Agency icraçı direktoru, Azerbaijan Design Summit layihə rəhbəri",
    photo: "/mentors/serxan-surxay.jpeg",
  },
  {
    id: "26",
    name: "Rauf",
    surname: "Aliyev",
    expertise: "Kapital Bank / Birbank, Tribe Tech Leader",
    photo: "/mentors/rauf-aliyev.jpeg",
  },
  {
    id: "27",
    name: "Leyla",
    surname: "Yaqub",
    expertise: "Lawyer, Body Language and Oratory Coach",
    photo: "/mentors/leyla-yagub.jpeg",
  },
  {
    id: "28",
    name: "Nigar",
    surname: "Zeynalova",
    expertise: "İT layihələrin idarəolunması üzrə rəhbər",
    photo: "/mentors/nigar-zeynalova.jpeg",
  },
  {
    id: "29",
    name: "Sahibə",
    surname: "Qədirova",
    expertise: "Klinik psixoloq | Eda terapiya",
    photo: "/mentors/sahibe-qedirova.jpeg",
  },
  {
    id: "30",
    name: "Arif",
    surname: "Rəhimli",
    expertise: "Founder of DNT HUB, Corporate Communications Expert, PMP",
    photo: "/mentors/arif-rehimli.jpeg",
  },
  {
    id: "31",
    name: "Leyla",
    surname: "Yaqub",
    expertise: "Lawyer,Body Language and Oratory Coach",
    photo: "/mentors/leyla-yagub.jpeg",
  },
  {
    id: "32",
    name: "Bəxtiyar",
    surname: "Quluzadə",
    expertise:
      "Azərbaycan Tələbə Gənclər Təşkilatları İttifaqının Proqram meneceri",
    photo: "/mentors/baxtiyar-quluzade.jpeg",
  },
];

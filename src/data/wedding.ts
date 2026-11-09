export interface AccountItem {
  role: string;
  name: string;
  bank: string;
  accountNumber: string;
  accountOwner: string;
}

export interface WeddingData {
  groom: {
    nameKo: string;
    fullNameKo: string;
    nameEn: string;
    father: string;
    mother: string;
    phone: string;
    accountBank: string;
    accountNumber: string;
    accountOwner: string;
    accounts: AccountItem[];
  };
  bride: {
    nameKo: string;
    fullNameKo: string;
    nameEn: string;
    father: string;
    mother: string;
    phone: string;
    accountBank: string;
    accountNumber: string;
    accountOwner: string;
    accounts: AccountItem[];
  };
  weddingDay: {
    dateIso: string;
    dateFormattedKo: string;
    dateFormattedEn: string;
    timeFormattedKo: string;
    venueName: string;
    hallName: string;
    address: string;
    addressDetail: string;
    tel: string;
  };
  timeline: Array<{
    year: string;
    title: string;
    description: string;
    photo: string;
  }>;
  timelinePhotos: Array<{
    id: number;
    src: string;
    alt: string;
    title: string;
    year: string;
    description: string;
  }>;
  maps: {
    kakao: string;
    naver: string;
    tmap: string;
  };
  accessInfo: {
    parking: string;
    car: string;
    subway: string;
    bus: string;
  };
  information: {
    photobooth: string;
    meal: string;
    notice?: string;
    atm?: string;
    gift?: string;
  };
  images: {
    cover: string;
    brideGarden: string;
    detailShoes: string;
    champagneRibbon: string;
    champagneCouple: string;
  };
  gallery: Array<{
    id: number;
    src: string;
    alt: string;
    aspectRatio: 'square' | 'tall' | 'wide';
  }>;
  weddingSnaps: Array<{
    id: number;
    src: string;
    alt: string;
    caption: string;
    note: string;
    tag: string;
  }>;
}

export const weddingData: WeddingData = {
  groom: {
    nameKo: "성규",
    fullNameKo: "박성규",
    nameEn: "SUNGKYU",
    father: "ㅇㅇㅇ",
    mother: "ㅇㅇㅇ",
    phone: "010-1234-5678",
    accountBank: "신한은행",
    accountNumber: "110-123-456789",
    accountOwner: "박성규",
    accounts: [
      {
        role: "신랑",
        name: "박성규",
        bank: "신한은행",
        accountNumber: "110-123-456789",
        accountOwner: "박성규"
      },
      {
        role: "아버지",
        name: "ㅇㅇㅇ",
        bank: "신한은행",
        accountNumber: "110-987-654321",
        accountOwner: "ㅇㅇㅇ"
      },
      {
        role: "어머니",
        name: "ㅇㅇㅇ",
        bank: "국민은행",
        accountNumber: "123-456-789012",
        accountOwner: "ㅇㅇㅇ"
      }
    ]
  },
  bride: {
    nameKo: "현지",
    fullNameKo: "김현지",
    nameEn: "HYEONJI",
    father: "김동국",
    mother: "이경숙",
    phone: "010-8765-4321",
    accountBank: "카카오뱅크",
    accountNumber: "3333-01-2345678",
    accountOwner: "김현지",
    accounts: [
      {
        role: "신부",
        name: "김현지",
        bank: "카카오뱅크",
        accountNumber: "3333-01-2345678",
        accountOwner: "김현지"
      },
      {
        role: "아버지",
        name: "김동국",
        bank: "국민은행",
        accountNumber: "4321-02-1234567",
        accountOwner: "김동국"
      },
      {
        role: "어머니",
        name: "이경숙",
        bank: "농협은행",
        accountNumber: "302-1234-5678-91",
        accountOwner: "이경숙"
      }
    ]
  },
  weddingDay: {
    dateIso: "2027-05-08T13:30:00",
    dateFormattedKo: "2027년 5월 8일 토요일",
    dateFormattedEn: "MAY 08, 2027",
    timeFormattedKo: "오후 1시 30분",
    venueName: "라도무스아트센터",
    hallName: "8층 루미니스홀",
    address: "대전 유성구 동서대로 639",
    addressDetail: "대전광역시 유성구 동서대로 639 (원신흥동 578-6)",
    tel: "042-822-0005"
  },
  timeline: [
    {
      year: "2022",
      title: "THE FIRST ENCOUNTER",
      description: "따뜻했던 봄날의 어느 오후, 두 사람의 첫 대화가 시작되었습니다.",
      photo: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
    },
    {
      year: "2023",
      title: "SEASONS TOGETHER",
      description: "함께 맞이한 사계절 속에서 서로에 대한 믿음과 사랑이 더욱 깊어졌습니다.",
      photo: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
    },
    {
      year: "2025",
      title: "OUR PROMISE",
      description: "서로가 서로의 가장 따뜻하고 편안한 안식처가 되기로 약속했습니다.",
      photo: "https://images.unsplash.com/photo-1545232979-fbfd42e000b5?auto=format&fit=crop&w=1000&q=80"
    },
    {
      year: "2027. 05. 08",
      title: "THE WEDDING DAY",
      description: "영원히 함께 걸어갈 새로운 계절의 시작, 그 찬란한 첫걸음을 내딛습니다.",
      photo: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  timelinePhotos: [
    {
      id: 1,
      src: "/images/timeline/photo1.jpg",
      alt: "첫 만남",
      title: "THE FIRST ENCOUNTER",
      year: "2022",
      description: "따뜻했던 봄날의 어느 오후, 두 사람의 첫 대화가 시작되었습니다."
    },
    {
      id: 2,
      src: "/images/timeline/photo2.jpg",
      alt: "첫 여행",
      title: "FIRST TRIP TOGETHER",
      year: "2023",
      description: "함께 맞이한 사계절 속에서 서로에 대한 믿음과 사랑이 더욱 깊어졌습니다."
    },
    {
      id: 3,
      src: "/images/timeline/photo3.jpg",
      alt: "사계절의 추억",
      title: "SEASONS IN LOVE",
      year: "2024",
      description: "서로가 서로의 가장 편안하고 따뜻한 안식처가 되기로 약속했습니다."
    },
    {
      id: 4,
      src: "/images/timeline/photo4.jpg",
      alt: "소중한 약속",
      title: "OUR PROMISE",
      year: "2025",
      description: "평생을 함께 걸어가기로 약속한 그 소중한 순간"
    },
    {
      id: 5,
      src: "/images/timeline/photo5.jpg",
      alt: "웨딩 촬영",
      title: "WEDDING MOMENT",
      year: "2026",
      description: "서로를 바라보는 눈빛 속에 가득 담긴 설렘과 행복"
    },
    {
      id: 6,
      src: "/images/timeline/photo6.jpg",
      alt: "결혼식의 날",
      title: "THE WEDDING DAY",
      year: "2027. 05. 08",
      description: "라도무스 루미니스홀에서 영원한 사랑의 첫걸음을 내딛습니다."
    }
  ],
  maps: {
    kakao: "https://map.kakao.com/link/search/라도무스아트센터",
    naver: "https://map.naver.com/v5/search/대전 유성구 동서대로 639 라도무스아트센터",
    tmap: "https://surl.tmaps.co.kr"
  },
  accessInfo: {
    parking: "· 라도무스 전용 주차타워 및 외부주차장(제 2,3,4 주차장) * 주차 혼잡예상으로 외부주차를 추천드립니다♥\n· 하객분들을 위한 넉넉한 주차공간 완비(동시 2,300대 수용)",
    car: "· 네비게이션 검색: '라도무스아트센터' 또는 '대전 유성구 동서대로 639' (원신흥동 578-6)\n· 유성 IC 방면: 유성 IC 진출 후 월드컵경기장 네거리 방면 약 10분 소요\n· 서대전 IC 방면: 진잠 네거리 → 도안동 방면 약 15분 소요",
    subway: "· 대전 지하철 1호선 [유성온천역] 하차 (3번 출구)\n· 시내버스(115번, 312번) 또는 택시 환승 (차량 약 7분 소요)",
    bus: "· '라도무스아트센터' 또는 '어울림하트아파트' 정류장 하차\n· 간선버스: 114번, 115번, 312번, 706번\n· 지선버스: 106번, 604번"
  },
  information: {
    photobooth: "Photo Booth가 8층 로비에 설치되어 있으니 많은 이용 부탁드립니다.\n소중한 날 귀한 발걸음 해주신 여러분의 따뜻한 미소를 사진으로 간직하고 싶습니다.",
    meal: "예식 이후 7층 개별 연회장에서 식사 제공됩니다. 귀한 걸음 해주신만큼 정갈하고 맛있는 음식과 함께 즐거운 시간 되시길 소망합니다.",
    atm: "신관 7층/8층, 본관 1층",
    gift: "신관 7층 답례품"
  },
  images: {
    cover: "/images/main_cover.jpg",
    brideGarden: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    detailShoes: "https://images.unsplash.com/photo-1545232979-fbfd42e000b5?auto=format&fit=crop&w=1200&q=80",
    champagneRibbon: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    champagneCouple: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
  },
  gallery: [
    { id: 1, src: "/images/gallery/photo1.jpg", alt: "웨딩 사진 1", aspectRatio: "square" },
    { id: 2, src: "/images/gallery/photo2.jpg", alt: "웨딩 사진 2", aspectRatio: "square" },
    { id: 3, src: "/images/gallery/photo3.jpg", alt: "웨딩 사진 3", aspectRatio: "wide" },
    { id: 4, src: "/images/gallery/photo4.jpg", alt: "웨딩 사진 4", aspectRatio: "square" },
    { id: 5, src: "/images/gallery/photo5.jpg", alt: "웨딩 사진 5", aspectRatio: "wide" },
    { id: 6, src: "/images/gallery/photo6.jpg", alt: "웨딩 사진 6", aspectRatio: "tall" },
    { id: 7, src: "/images/gallery/photo7.jpg", alt: "웨딩 사진 7", aspectRatio: "wide" },
    { id: 8, src: "/images/gallery/photo8.jpg", alt: "웨딩 사진 8", aspectRatio: "wide" },
    { id: 9, src: "/images/gallery/photo9.jpg", alt: "웨딩 사진 9", aspectRatio: "wide" }
  ],
  weddingSnaps: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      alt: "Spring Garden Vows",
      caption: "IN THE QUIET GARDEN",
      note: "EACH SESSION AND EXPERIENCE IS CRAFTED TO GIVE YOU SPACE TO BE FULLY PRESENT.",
      tag: "couples"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      alt: "Under the Sunlight",
      caption: "A SUNLIT AFTERNOON",
      note: "THOUGHTFUL GUIDANCE, HONEST EMOTION, AND IMAGERY THAT FEELS LIKE OUR VERY OWN CINEMATIC ROM-COM.",
      tag: "portraits"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1545232979-fbfd42e000b5?auto=format&fit=crop&w=1200&q=80",
      alt: "Silk & White Flowers",
      caption: "THE LITTLE DETAILS",
      note: "THE DELICATE EMBROIDERY, VINTAGE RIBBON, AND HANDPICKED BOUQUET THAT MARKED OUR BEAUTIFUL BEGINNING.",
      tag: "elopements"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      alt: "Toasts & Laughter",
      caption: "CHEERS TO FOREVER",
      note: "SHARING LAUGHTER AND CHERISHED MOMENTS WITH THE ONES WHO HAVE SHAPED OUR WORLD WITH ENDLESS WARMTH.",
      tag: "intimate weddings"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      alt: "Champagne Glasses",
      caption: "CELEBRATION OF LOVE",
      note: "EVERY SMILE, EVERY GLANCE, AND EVERY PROMISE RECORDED FOREVER LIKE A CHERISHED PAGE IN OUR JOURNAL.",
      tag: "romance"
    }
  ]
};

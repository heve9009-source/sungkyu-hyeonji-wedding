export interface WeddingData {
  groom: {
    nameKo: string;
    nameEn: string;
    father: string;
    mother: string;
    phone: string;
    accountBank: string;
    accountNumber: string;
    accountOwner: string;
  };
  bride: {
    nameKo: string;
    nameEn: string;
    father: string;
    mother: string;
    phone: string;
    accountBank: string;
    accountNumber: string;
    accountOwner: string;
  };
  weddingDay: {
    dateIso: string;
    dateFormattedKo: string;
    dateFormattedEn: string;
    timeFormattedKo: string;
    venueName: string;
    hallName: string;
    address: string;
    tel: string;
  };
  timeline: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  maps: {
    kakao: string;
    naver: string;
    tmap: string;
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
    nameEn: "SUNGKYU",
    father: "한기석",
    mother: "박선자",
    phone: "010-1234-5678",
    accountBank: "신한은행",
    accountNumber: "110-123-456789",
    accountOwner: "성규"
  },
  bride: {
    nameKo: "현지",
    nameEn: "HYEONJI",
    father: "이태용",
    mother: "김미숙",
    phone: "010-8765-4321",
    accountBank: "카카오뱅크",
    accountNumber: "3333-01-2345678",
    accountOwner: "현지"
  },
  weddingDay: {
    dateIso: "2026-05-16T12:30:00",
    dateFormattedKo: "2026년 5월 16일 토요일",
    dateFormattedEn: "MAY 16, 2026",
    timeFormattedKo: "오후 12시 30분",
    venueName: "라온정원 웨딩홀",
    hallName: "3층 그랜드볼룸",
    address: "서울시 서초구 서초대로 123",
    tel: "02-123-4567"
  },
  timeline: [
    {
      year: "2022",
      title: "THE FIRST HELLO",
      description: "따뜻했던 봄날의 어느 오후, 두 사람의 첫 대화가 시작되었습니다."
    },
    {
      year: "2023",
      title: "THE FIRST TRIP",
      description: "함께 맞이한 사계절 속에서 서로에 대한 믿음과 사랑이 더욱 깊어졌습니다."
    },
    {
      year: "2024",
      title: "HOME",
      description: "서로가 서로의 가장 편안한 안식처가 되기로 약속했습니다."
    },
    {
      year: "2026",
      title: "THE DAY",
      description: "이제 영원히 함께 걸어갈 새로운 계절의 시작을 선언합니다."
    }
  ],
  maps: {
    kakao: "https://map.kakao.com/link/to/라온정원웨딩홀,37.497942,127.027621",
    naver: "https://map.naver.com/v5/search/라온정원웨딩홀",
    tmap: "https://tmap.co.kr"
  },
  images: {
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    brideGarden: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    detailShoes: "https://images.unsplash.com/photo-1545232979-fbfd42e000b5?auto=format&fit=crop&w=1200&q=80",
    champagneRibbon: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    champagneCouple: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
  },
  gallery: [
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80", alt: "European Garden Wedding", aspectRatio: "tall" },
    { id: 2, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80", alt: "Bride in Flower Arch", aspectRatio: "tall" },
    { id: 3, src: "https://images.unsplash.com/photo-1545232979-fbfd42e000b5?auto=format&fit=crop&w=1200&q=80", alt: "Wedding Shoes & Bouquet", aspectRatio: "square" },
    { id: 4, src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80", alt: "Champagne Glasses with Ribbon", aspectRatio: "wide" },
    { id: 5, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80", alt: "Champagne Toast Couple", aspectRatio: "tall" }
  ],
  weddingSnaps: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      alt: "Spring Garden Vows",
      caption: "IN THE QUIET GARDEN",
      note: "EACH SESSION AND EXPERIENCE IS CRAFTED TO GIVE YOU SPACE TO BE FULLY PRESENT WHILE WE DOCUMENT IT ALL WITH A CINEMATIC, WARM APPROACH.",
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

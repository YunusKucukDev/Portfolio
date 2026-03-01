export const myProjects = [
  {
    id: 1,
    title: "MultiShop E-Ticaret Alışveriş Platformu",
    description:
      "ASP.NET Core MVC ile inşa edilmiş,, yüksek ölçeklenebilirliğe sahip bir e-ticaret platformudur. Bu proje, karmaşık iş mantıklarını 16 farklı mikroservis üzerinden yöneten kurumsal düzeyde bir mimariyi temsil eder.",
    subDescription: [
      "IdentityServer4 / OpenID Connect: Tüm servislerin güvenliği ve kullanıcı yetkilendirme süreçleri (RBAC) merkezi bir kimlik doğrulama sunucusu üzerinden yönetilir.",
      "Ocelot API Gateway: İstemci (Frontend) ve servisler arasındaki trafik, istek yönlendirme ve kimlik doğrulama kontrolleri için Ocelot kullanıld",
      "Redis Dağıtık Önbellekleme: Sepet (Basket) mikroservisinde verinin milisaniyeler içinde işlenmesi için bellek içi (in-memory) Redis veritabanı tercih edildi.",
      "Payment (Ödeme) Mikroservisi: Güvenli ödeme akışlarını yöneten, harici sistemlerle entegre olmaya hazır özel bir ödeme modülü geliştirildi.",  
      "Haberleşme: Servisler arası iletişimde veri bütünlüğünü korumak adına asenkron ve senkron yapılar kurgulandı."
    ],
    href: "https://github.com/YunusKucukDev/Asp.net_Web_Api_E-Commerce-Web-Site",
    logo: "",
    image: "/assets/projects/multishop.png",
    tags: [
      {
        id: 1,
        name: "C#",
        path: "/assets/logos/csharp.svg",
      },
      {
        id: 2,
        name: ".Net",
        path: "/assets/logos/dotnet.svg",
      },
      {
        id: 3,
        name: "Ef Core",
        path: "/assets/logos/efcore.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Restaurant Yönetim Sistemi",
    description:
      "A secure authentication and authorization system using Auth0 for seamless user management.",
    subDescription: [
      "ASP.NET Core 8.0 / MVC: Projenin ana iskeleti olarak en güncel .NET sürümü kullanıldı; hem backend API'ları hem de kullanıcı arayüzü yüksek performanslı bir yapıda kurgulandı.",
      "Mikroservis Mimarisi (16 Servis): Monolitik yapı yerine, birbirinden bağımsız çalışan 16 farklı mikroservis tasarlandı. Bu sayede her bir modül (Katalog, Sipariş, Stok vb.) kendi içinde ölçeklenebilir ve hata toleranslı hale getirildi.",
      "Redis Dağıtık Önbellekleme: Sepet (Basket) mikroservisinde veriye anlık erişim sağlamak için disk yerine bellek tabanlı (In-Memory) Redis kullanılarak maksimum performans sağlandı.",
      "Docker & Docker Compose: 16 mikroservisin ve yardımcı araçların (Redis, MSSQL vb.) tek bir komutla ayağa kaldırılabilmesi ve her ortamda aynı şekilde çalışması için konteynerizasyon teknolojisi kullanıldı.",
    ],
    href: "https://github.com/YunusKucukDev/Restaurant-.NET-API",
    logo: "",
    image: "/assets/projects/anasayfa1.png",
    tags: [
      {
        id: 1,
        name: "Auth0",
        path: "/assets/logos/auth0.svg",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "SQLite",
        path: "/assets/logos/sqlite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/905431791132",
    icon: "/assets/socials/whatsApp.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/yunus-küçük-63b36b1b6",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://github.com/YunusKucukDev",
    icon: "/assets/socials/instagram.svg",
  },
];

export const experiences = [
  {
    title: "Robotic Process Automation Developer Stajyeri",
    job: "KMN Robotics",
    date: "2024",
    contents: [
      "Endüstriyel robot kollarının hareket senaryolarını programlama ve test süreçlerine destek verdim. ",
      "Zamanlama ve koordinat sistemleriyle üretim senaryolarına uygun robot hareketleri geliştirdim.",
      "Robotik süreç otomasyonu (RPA) projelerinde, tekrarlayan görevlerin otomatikleştirilmesi için yazılım çözümleri tasarladım ve uyguladım.",
      "RPA araçları kullanarak, iş süreçlerini analiz ettim ve otomatikleştirme fırsatlarını belirledim. Bu sayede operasyonel verimliliği artırmaya katkıda bulundum.",
    ],
  },
  {
    title: "Full Stack Developer Stajyeri",
    job: "Probel Yazılım",
    date: "2025",
    contents: [
      "Oracle veritabanında tablolar oluşturdum ve HBYS için veri yapıları tasarladım. ",
      "NET Core action’larına loglama mekanizması ekleyerek işlemlerin Oracle veritabanına kaydedilmesini sağladım. ",
      "Migration yapılarıyla veritabanı değişikliklerini yönettim. ",
      "Hastanaelrin Vpn Bilgilerini Erişebilindiği Bir web API ve Arayüzü geliştirdim.",
    ],
  }, 
  {
    title: "Freelance Developer",
    job: "Self-Employed",
    date: "2025-Present",
    contents: [
      "Modern Full-Stack Geliştirme: React ile hızlı ve kullanıcı dostu arayüzler tasarlıyor, bu arayüzleri ASP.NET Core ile güçlendirilmiş sağlam bir backend mimarisiyle birleştirerek eksiksiz çözümler sunuyorum.",
      "Mikroservis ve Yüksek Performans: Projeleri küçük, yönetilebilir ve ölçeklenebilir mikroservis parçalarına bölüyor; Redis ve Ocelot kullanarak binlerce kullanıcı altında bile donmayan, ışık hızında çalışan sistemler kuruyorum.",
      "Güvenli ve Entegre Sistemler: IdentityServer ile en üst düzey güvenlik standartlarını uyguluyor; ödeme sistemlerinden (Payment API) üçüncü parti servislere kadar tüm dış entegrasyonları profesyonelce yönetiyorum.",
    ],
  },
];
export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://robohash.org/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://robohash.org/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://robohash.org/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "This is hands down the best thing I've experienced. Highly recommend!",
    img: "https://robohash.org/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Incredible work! The attention to detail is phenomenal.",
    img: "https://robohash.org/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "This exceeded all my expectations. Absolutely stunning!",
    img: "https://robohash.org/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Simply breathtaking. The best decision I've made in a while.",
    img: "https://robohash.org/dave",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "So glad I found this. It has changed the game for me.",
    img: "https://robohash.org/eve",
  },
];

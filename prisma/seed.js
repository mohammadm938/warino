const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = [
  {
    id: 1,
    name: "زیورآلات",
    slug: "jewelry",
  },
  {
    id: 2,
    name: "اکسسوری",
    slug: "accessories",
  },
  {
    id: 3,
    name: "ساعت",
    slug: "watches",
  },
  {
    id: 4,
    name: "پوشاک",
    slug: "clothing",
  },
  {
    id: 5,
    name: "خانه و دکور",
    slug: "home-decor",
  },
];

const shops = [
  {
    id: 1,
    name: "Sara Jewelry",
    username: "@sara_jewelry",
    slug: "sara-jewelry",
    description:
      "زیورآلات مینیمال و دست‌ساز برای کسانی که به جزئیات اهمیت میدن.",
    categoryId: 1,
    location: "تهران",
    followers: "12.4K",
    initials: "SJ",
    instagram: "https://instagram.com/sara_jewelry",
  },
  {
    id: 2,
    name: "Mona Store",
    username: "@mona_store",
    slug: "mona-store",
    description: "اکسسوری‌های خاص و ترند برای استایل روزمره.",
    categoryId: 2,
    location: "مشهد",
    followers: "8.7K",
    initials: "MS",
    instagram: "https://instagram.com/mona_store",
  },
  {
    id: 3,
    name: "Time Gallery",
    username: "@time_gallery",
    slug: "time-gallery",
    description: "مجموعه‌ای از ساعت‌های کلاسیک و خاص.",
    categoryId: 3,
    location: "اصفهان",
    followers: "15.2K",
    initials: "TG",
    instagram: "https://instagram.com/time_gallery",
  },
  {
    id: 4,
    name: "Nika Accessories",
    username: "@nika_accessories",
    slug: "nika-accessories",
    description: "اکسسوری‌های روزمره، مینیمال و خاص.",
    categoryId: 2,
    location: "رشت",
    followers: "10.1K",
    initials: "NA",
    instagram: "https://instagram.com/nika_accessories",
  },
  {
    id: 5,
    name: "Silver Mood",
    username: "@silver_mood",
    slug: "silver-mood",
    description: "زیورآلات نقره‌ای با طراحی ساده و مدرن.",
    categoryId: 1,
    location: "شیراز",
    followers: "6.8K",
    initials: "SM",
    instagram: "https://instagram.com/silver_mood",
  },
  {
    id: 6,
    name: "Urban Style",
    username: "@urban_style",
    slug: "urban-style",
    description: "استایل شهری و اکسسوری‌های متفاوت.",
    categoryId: 2,
    location: "تبریز",
    followers: "9.3K",
    initials: "US",
    instagram: "https://instagram.com/urban_style",
  },
  {
    id: 7,
    name: "Pearl House",
    username: "@pearl_house",
    slug: "pearl-house",
    description: "زیورآلات مرواریدی و محصولات ظریف و خاص.",
    categoryId: 1,
    location: "رشت",
    followers: "7.1K",
    initials: "PH",
    instagram: "https://instagram.com/pearl_house",
  },
  {
    id: 8,
    name: "Watch Lab",
    username: "@watch_lab",
    slug: "watch-lab",
    description: "ساعت‌های مدرن و کلاسیک برای استایل‌های مختلف.",
    categoryId: 3,
    location: "تهران",
    followers: "18.6K",
    initials: "WL",
    instagram: "https://instagram.com/watch_lab",
  },
];

const products = [
  // =========================
  // Sara Jewelry
  // =========================
  {
    id: 1,
    shopId: 1,
    categoryId: 1,
    title: "گردنبند مینیمال طلایی",
    slug: "minimal-gold-necklace",
    description: "گردنبند مینیمال مناسب استفاده روزمره با طراحی ساده و ظریف.",
    price: 498000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg4xHIsLAEVvXpcTAStpnidsZSED94h52mG_7py4_wLzJsjLPj3oH7hy9Z&s=10",
  },
  {
    id: 9,
    shopId: 1,
    categoryId: 1,
    title: "انگشتر طلایی مینیمال",
    slug: "minimal-gold-ring",
    description: "انگشتر طلایی ظریف با طراحی مینیمال برای استفاده روزمره.",
    price: 385000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdgmxKZ3bQb2NO7gdDz5Mf_3kkLMDtB0LDrjyoPXvFdylDc5byIu7BSNY&s=10",
  },
  {
    id: 10,
    shopId: 1,
    categoryId: 1,
    title: "دستبند ظریف طلایی",
    slug: "delicate-gold-bracelet",
    description: "دستبند ظریف و سبک با طراحی ساده برای استایل‌های روزمره.",
    price: 425000,
    image:
      "https://charkhegallery.com/storage/products/23/03/01/1677698067D415211A-0452-4891-A9CD-55C4CC314981.jpeg",
  },
  {
    id: 11,
    shopId: 1,
    categoryId: 1,
    title: "گوشواره حلقه‌ای مینیمال",
    slug: "minimal-hoop-earrings",
    description: "گوشواره حلقه‌ای ظریف با طراحی ساده و مناسب استفاده روزانه.",
    price: 345000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9JcC_-rzfHWzPpRB6bPWm--4fDzXCMcL4NvjtHfBrFxRdH11bnvyIFA6&s=10",
  },

  // =========================
  // Mona Store
  // =========================
  {
    id: 2,
    shopId: 2,
    categoryId: 2,
    title: "کیف دوشی مینیمال",
    slug: "minimal-crossbody-bag",
    description: "کیف دوشی سبک و مینیمال مناسب استفاده روزمره.",
    price: 780000,
    image:
      "https://dilipo.com/wp-content/uploads/2024/02/%DA%A9%DB%8C%D9%81-%D8%AF%D9%88%D8%B4%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%B2%D9%86%D8%A7%D9%86%D9%87-%D8%A2%D9%86%D8%B1%DB%8C%D8%A7-%D8%B3%D8%A8%D8%B2-%D9%BE%D8%A7%D8%B3%D8%AA%D9%84%DB%8C.webp",
  },
  {
    id: 12,
    shopId: 2,
    categoryId: 2,
    title: "کیف دستی کوچک",
    slug: "small-handbag",
    description: "کیف دستی جمع‌وجور و کاربردی برای استایل‌های روزمره.",
    price: 690000,
    image:
      "https://dilipo.com/wp-content/uploads/2024/02/%DA%A9%DB%8C%D9%81-%D8%AF%D9%88%D8%B4%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%B2%D9%86%D8%A7%D9%86%D9%87-%D8%A2%D9%86%D8%B1%DB%8C%D8%A7-%D8%B3%D8%A8%D8%B2-%D9%BE%D8%A7%D8%B3%D8%AA%D9%84%DB%8C.webp",
  },
  {
    id: 13,
    shopId: 2,
    categoryId: 2,
    title: "عینک آفتابی ترند",
    slug: "trendy-sunglasses",
    description: "عینک آفتابی مدرن مناسب استایل‌های روزمره و شهری.",
    price: 560000,
    image:
      "https://komolife.ir/mag/wp-content/uploads/2024/07/mykonos-vintage-sunglasses-rectangular-unisex.jpg",
  },
  {
    id: 14,
    shopId: 2,
    categoryId: 2,
    title: "کیف کراس‌بادی مشکی",
    slug: "black-crossbody-bag",
    description: "کیف کراس‌بادی مشکی با طراحی ساده و قابل استفاده روزمره.",
    price: 820000,
    image:
      "https://dilipo.com/wp-content/uploads/2024/02/%DA%A9%DB%8C%D9%81-%D8%AF%D9%88%D8%B4%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%B2%D9%86%D8%A7%D9%86%D9%87-%D8%A2%D9%86%D8%B1%DB%8C%D8%A7-%D8%B3%D8%A8%D8%B2-%D9%BE%D8%A7%D8%B3%D8%AA%D9%84%DB%8C.webp",
  },

  // =========================
  // Time Gallery
  // =========================
  {
    id: 3,
    shopId: 3,
    categoryId: 3,
    title: "ساعت کلاسیک زنانه",
    slug: "classic-womens-watch",
    description: "ساعت کلاسیک با طراحی ساده و مناسب استایل‌های رسمی و روزمره.",
    price: 1250000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABujmGcjIG1jPEvM_er7c4wQgtbEklqaEVrIhregQMw&s=10",
  },
  {
    id: 15,
    shopId: 3,
    categoryId: 3,
    title: "ساعت کلاسیک چرمی",
    slug: "classic-leather-watch",
    description: "ساعت کلاسیک با بند چرمی مناسب استایل رسمی و روزمره.",
    price: 1390000,
    image: "https://myroz.ir/wp-content/uploads/2023/10/2428.webp",
  },
  {
    id: 16,
    shopId: 3,
    categoryId: 3,
    title: "ساعت مینیمال نقره‌ای",
    slug: "minimal-silver-watch",
    description: "ساعت مینیمال نقره‌ای با طراحی ساده و مدرن.",
    price: 1180000,
    image: "https://myroz.ir/wp-content/uploads/2023/10/2428.webp",
  },
  {
    id: 17,
    shopId: 3,
    categoryId: 3,
    title: "ساعت استیل کلاسیک",
    slug: "classic-steel-watch",
    description: "ساعت استیل با ظاهر کلاسیک و مناسب استفاده روزمره.",
    price: 1590000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABujmGcjIG1jPEvM_er7c4wQgtbEklqaEVrIhregQMw&s=10",
  },

  // =========================
  // Nika Accessories
  // =========================
  {
    id: 4,
    shopId: 4,
    categoryId: 2,
    title: "دستبند استیل مینیمال",
    slug: "minimal-steel-bracelet",
    description: "دستبند استیل با طراحی مینیمال و قابل استفاده روزمره.",
    price: 390000,
    image:
      "https://charkhegallery.com/storage/products/23/03/01/1677698067D415211A-0452-4891-A9CD-55C4CC314981.jpeg",
  },
  {
    id: 18,
    shopId: 4,
    categoryId: 2,
    title: "گردنبند استیل ساده",
    slug: "simple-steel-necklace",
    description: "گردنبند استیل ساده و مقاوم مناسب استفاده روزانه.",
    price: 450000,
    image:
      "https://charkhegallery.com/storage/products/23/03/01/1677698067D415211A-0452-4891-A9CD-55C4CC314981.jpeg",
  },
  {
    id: 19,
    shopId: 4,
    categoryId: 2,
    title: "انگشتر استیل مدرن",
    slug: "modern-steel-ring",
    description: "انگشتر استیل با طراحی مدرن و مینیمال.",
    price: 320000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdgmxKZ3bQb2NO7gdDz5Mf_3kkLMDtB0LDrjyoPXvFdylDc5byIu7BSNY&s=10",
  },
  {
    id: 20,
    shopId: 4,
    categoryId: 2,
    title: "عینک آفتابی مشکی",
    slug: "black-sunglasses",
    description: "عینک آفتابی مشکی با طراحی کلاسیک و مناسب استایل شهری.",
    price: 590000,
    image:
      "https://komolife.ir/mag/wp-content/uploads/2024/07/mykonos-vintage-sunglasses-rectangular-unisex.jpg",
  },

  // =========================
  // Silver Mood
  // =========================
  {
    id: 5,
    shopId: 5,
    categoryId: 1,
    title: "انگشتر ظریف نقره‌ای",
    slug: "delicate-silver-ring",
    description: "انگشتر نقره‌ای ظریف با طراحی ساده و مدرن.",
    price: 620000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdgmxKZ3bQb2NO7gdDz5Mf_3kkLMDtB0LDrjyoPXvFdylDc5byIu7BSNY&s=10",
  },
  {
    id: 21,
    shopId: 5,
    categoryId: 1,
    title: "گردنبند نقره‌ای ظریف",
    slug: "delicate-silver-necklace",
    description: "گردنبند نقره‌ای با طراحی ظریف و مناسب استایل مینیمال.",
    price: 740000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg4xHIsLAEVvXpcTAStpnidsZSED94h52mG_7py4_wLzJsjLPj3oH7hy9Z&s=10",
  },
  {
    id: 22,
    shopId: 5,
    categoryId: 1,
    title: "دستبند نقره‌ای ساده",
    slug: "simple-silver-bracelet",
    description: "دستبند نقره‌ای ساده برای استفاده روزمره.",
    price: 680000,
    image:
      "https://charkhegallery.com/storage/products/23/03/01/1677698067D415211A-0452-4891-A9CD-55C4CC314981.jpeg",
  },
  {
    id: 23,
    shopId: 5,
    categoryId: 1,
    title: "گوشواره نقره‌ای",
    slug: "silver-earrings",
    description: "گوشواره نقره‌ای ظریف با طراحی ساده و مدرن.",
    price: 510000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9JcC_-rzfHWzPpRB6bPWm--4fDzXCMcL4NvjtHfBrFxRdH11bnvyIFA6&s=10",
  },

  // =========================
  // Urban Style
  // =========================
  {
    id: 6,
    shopId: 6,
    categoryId: 2,
    title: "عینک آفتابی کلاسیک",
    slug: "classic-sunglasses",
    description: "عینک آفتابی با طراحی کلاسیک و مناسب استایل شهری.",
    price: 890000,
    image:
      "https://komolife.ir/mag/wp-content/uploads/2024/07/mykonos-vintage-sunglasses-rectangular-unisex.jpg",
  },
  {
    id: 24,
    shopId: 6,
    categoryId: 2,
    title: "عینک آفتابی گرد",
    slug: "round-sunglasses",
    description: "عینک آفتابی گرد با طراحی متفاوت برای استایل شهری.",
    price: 760000,
    image:
      "https://komolife.ir/mag/wp-content/uploads/2024/07/mykonos-vintage-sunglasses-rectangular-unisex.jpg",
  },
  {
    id: 25,
    shopId: 6,
    categoryId: 2,
    title: "دستبند چرمی مردانه",
    slug: "mens-leather-bracelet",
    description: "دستبند چرمی ساده و شیک مناسب استایل روزمره.",
    price: 430000,
    image:
      "https://charkhegallery.com/storage/products/23/03/01/1677698067D415211A-0452-4891-A9CD-55C4CC314981.jpeg",
  },
  {
    id: 26,
    shopId: 6,
    categoryId: 2,
    title: "کیف کمری شهری",
    slug: "urban-waist-bag",
    description: "کیف کمری سبک و کاربردی مناسب استفاده روزمره.",
    price: 640000,
    image:
      "https://dilipo.com/wp-content/uploads/2024/02/%DA%A9%DB%8C%D9%81-%D8%AF%D9%88%D8%B4%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%B2%D9%86%D8%A7%D9%86%D9%87-%D8%A2%D9%86%D8%B1%DB%8C%D8%A7-%D8%B3%D8%A8%D8%B2-%D9%BE%D8%A7%D8%B3%D8%AA%D9%84%DB%8C.webp",
  },

  // =========================
  // Pearl House
  // =========================
  {
    id: 7,
    shopId: 7,
    categoryId: 1,
    title: "گردنبند مرواریدی",
    slug: "pearl-necklace",
    description: "گردنبند مرواریدی ظریف برای استایل‌های خاص.",
    price: 950000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9JcC_-rzfHWzPpRB6bPWm--4fDzXCMcL4NvjtHfBrFxRdH11bnvyIFA6&s=10",
  },
  {
    id: 27,
    shopId: 7,
    categoryId: 1,
    title: "دستبند مرواریدی",
    slug: "pearl-bracelet",
    description: "دستبند مرواریدی ظریف برای استایل‌های رسمی و خاص.",
    price: 720000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9JcC_-rzfHWzPpRB6bPWm--4fDzXCMcL4NvjtHfBrFxRdH11bnvyIFA6&s=10",
  },
  {
    id: 28,
    shopId: 7,
    categoryId: 1,
    title: "گوشواره مرواریدی",
    slug: "pearl-earrings",
    description: "گوشواره مرواریدی ظریف با ظاهر کلاسیک و جذاب.",
    price: 580000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9JcC_-rzfHWzPpRB6bPWm--4fDzXCMcL4NvjtHfBrFxRdH11bnvyIFA6&s=10",
  },
  {
    id: 29,
    shopId: 7,
    categoryId: 1,
    title: "انگشتر مرواریدی",
    slug: "pearl-ring",
    description: "انگشتر ظریف با جزئیات مرواریدی برای استایل‌های خاص.",
    price: 640000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdgmxKZ3bQb2NO7gdDz5Mf_3kkLMDtB0LDrjyoPXvFdylDc5byIu7BSNY&s=10",
  },

  // =========================
  // Watch Lab
  // =========================
  {
    id: 8,
    shopId: 8,
    categoryId: 3,
    title: "ساعت استیل نقره‌ای",
    slug: "silver-steel-watch",
    description: "ساعت استیل با ظاهر مدرن و مینیمال.",
    price: 1480000,
    image: "https://myroz.ir/wp-content/uploads/2023/10/2428.webp",
  },
  {
    id: 30,
    shopId: 8,
    categoryId: 3,
    title: "ساعت مشکی مدرن",
    slug: "modern-black-watch",
    description: "ساعت مشکی مدرن برای استایل‌های رسمی و روزمره.",
    price: 1320000,
    image: "https://myroz.ir/wp-content/uploads/2023/10/2428.webp",
  },
  {
    id: 31,
    shopId: 8,
    categoryId: 3,
    title: "ساعت کلاسیک مردانه",
    slug: "classic-mens-watch",
    description: "ساعت کلاسیک مردانه با طراحی ساده و شیک.",
    price: 1750000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABujmGcjIG1jPEvM_er7c4wQgtbEklqaEVrIhregQMw&s=10",
  },
  {
    id: 32,
    shopId: 8,
    categoryId: 3,
    title: "ساعت مینیمال چرمی",
    slug: "minimal-leather-watch",
    description: "ساعت مینیمال با بند چرمی و طراحی ساده.",
    price: 1190000,
    image: "https://myroz.ir/wp-content/uploads/2023/10/2428.webp",
  },
];


async function main() {
  console.log("🌱 شروع Seed دیتابیس وارینو...");

  console.log("🗑️ پاک کردن داده‌های قبلی...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 ساخت کاربران...");

  const users = [];

  for (const shop of shops) {
    const user = await prisma.user.create({
      data: {
        name: shop.name,
        email: `seller${shop.id}@warino.local`,
        passwordHash: "TEMP_PASSWORD_HASH",
        role: "SELLER",
      },
    });

    users.push(user);
  }

  console.log(`✅ ${users.length} فروشنده ساخته شد.`);

  console.log("📂 ساخت دسته‌بندی‌ها...");

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log(`✅ ${categories.length} دسته‌بندی ساخته شد.`);

  console.log("🏪 ساخت فروشگاه‌ها...");

  for (const shop of shops) {
    const owner = users.find((user) => user.name === shop.name);

    await prisma.shop.create({
      data: {
        id: shop.id,
        name: shop.name,
        username: shop.username,
        slug: shop.slug,
        description: shop.description,
        location: shop.location,
        followers: shop.followers,
        initials: shop.initials,
        instagram: shop.instagram,
        ownerId: owner.id,
        categoryId: shop.categoryId,
      },
    });
  }

  console.log(`✅ ${shops.length} فروشگاه ساخته شد.`);

  console.log("📦 ساخت محصولات...");

  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        image: product.image,
        shopId: product.shopId,
        categoryId: product.categoryId,
      },
    });
  }

  console.log(`✅ ${products.length} محصول ساخته شد.`);

  console.log("🎉 Seed با موفقیت انجام شد.");
}

main()
  .catch((error) => {
    console.error("❌ خطا در Seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

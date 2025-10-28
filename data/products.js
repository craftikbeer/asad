const PRODUCTS = (() => {
  const saved = localStorage.getItem('anders_products');
  if (saved) {
    return JSON.parse(saved);
  }
  return [
    {
      id: 1,
      name: 'Classic Denim Jacket',
      category: 'Denim',
      price: 45000,
      images: [
        'https://i.imgur.com/x3i5KTk.jpeg',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80'
      ],
      image: 'https://i.imgur.com/x3i5KTk.jpeg',
      description: 'Timeless denim jacket with premium wash. A wardrobe essential for any season.',
      isNew: true,
      isFeatured: true,
      material: '100% премиум японский деним',
      sizes: ['S', 'M', 'L', 'XL'],
      details: ['Made in Italy', 'Handcrafted by artisans', 'Limited collection', 'Classic fit']
    },
  {
    id: 2,
    name: 'Lace Bralette Set',
    category: 'Lingerie',
    price: 18000,
    images: [
      'https://i.imgur.com/0Kl4q8p.png',
      'https://images.unsplash.com/photo-1566206091558-7f218c6e6c16?w=600&q=80'
    ],
    image: 'https://i.imgur.com/0Kl4q8p.png',
    description: 'Delicate lace bralette with matching briefs. Elegant comfort for everyday wear.',
    isNew: true,
    isFeatured: true,
    material: 'Французское кружево, хлопок 85%, эластан 15%',
    sizes: ['XS', 'S', 'M', 'L'],
    details: ['Made in France', 'Delicate hand wash', 'Premium lace', 'Adjustable straps']
  },
  {
    id: 3,
    name: 'Denim Shirt',
    category: 'Denim',
    price: 22000,
    images: [
      'https://i.imgur.com/UELhjAB.png'
    ],
    image: 'https://i.imgur.com/UELhjAB.png',
    description: 'Lightweight chambray shirt with refined details. Versatile and comfortable.',
    isNew: false,
    isFeatured: true,
    material: 'Итальянский шамбре, хлопок 100%',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Made in Italy', 'Breathable fabric', 'Mother-of-pearl buttons', 'Slim fit']
  },
  {
    id: 4,
    name: 'Slim Fit Jeans',
    category: 'Denim',
    price: 32000,
    images: [
      'https://i.imgur.com/5mULsNZ.png'
    ],
    image: 'https://i.imgur.com/5mULsNZ.png',
    description: 'Premium denim with perfect fit. Classic style that never goes out of fashion.',
    isNew: false,
    isFeatured: true,
    material: 'Турецкий деним премиум, хлопок 98%, эластан 2%',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Made in Turkey', 'Stretch fabric', '5-pocket design', 'Slim fit']
  },
  {
    id: 5,
    name: 'Silk Bodysuit',
    category: 'Lingerie',
    price: 25000,
    images: [
      'https://i.imgur.com/mwVF3i7.png'
    ],
    image: 'https://i.imgur.com/mwVF3i7.png',
    description: 'Luxurious silk bodysuit with delicate straps. Sophisticated and sensual.',
    isNew: true,
    isFeatured: false,
    material: 'Натуральный шёлк 100%',
    sizes: ['XS', 'S', 'M', 'L'],
    details: ['Made in France', 'Pure silk', 'Adjustable straps', 'Snap closure']
  },
  {
    id: 6,
    name: 'Denim Dress',
    category: 'Denim',
    price: 38000,
    images: [
      'https://i.imgur.com/1ASZPuH.jpeg'
    ],
    image: 'https://i.imgur.com/1ASZPuH.jpeg',
    description: 'Modern denim dress with elegant silhouette. Perfect for casual sophistication.',
    isNew: false,
    isFeatured: false,
    material: 'Эластичный деним, хлопок 95%, эластан 5%',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Made in Italy', 'Stretch denim', 'Button-down front', 'A-line silhouette']
  },
  {
    id: 7,
    name: 'Cotton Basics Set',
    category: 'Lingerie',
    price: 12000,
    images: [
      'https://i.imgur.com/0gh1nPp.png'
    ],
    image: 'https://i.imgur.com/0gh1nPp.png',
    description: 'Essential cotton underwear set. Comfortable basics for daily wear.',
    isNew: false,
    isFeatured: false,
    material: 'Органический хлопок 95%, эластан 5%',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: ['Made in Portugal', 'Organic cotton', 'Seamless design', 'Breathable fabric']
  },
  {
    id: 8,
    name: 'Wide Leg Jeans',
    category: 'Denim',
    price: 35000,
    images: ['https://i.imgur.com/wSQSbTf.png'],
    image: 'https://i.imgur.com/wSQSbTf.png',
    description: 'Trendy wide leg silhouette in premium denim. Comfortable and stylish.',
    isNew: true,
    material: 'Японский селвидж деним 100%',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['Made in Japan', 'Selvedge denim', 'Wide leg fit', 'High waist']
  }
];
})();

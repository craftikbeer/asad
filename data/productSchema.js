const PRODUCT_SCHEMAS = PRODUCTS.map(product => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "image": product.image,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "ANDERS"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://andersdenim.ru/index.html#product-${product.id}`,
    "priceCurrency": "RUB",
    "price": product.price,
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "ANDERS"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}));
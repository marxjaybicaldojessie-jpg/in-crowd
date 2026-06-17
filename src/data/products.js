const products = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1;
  const categories = ['Streetwear', 'Accessories', 'Footwear', 'Athleisure', 'Tech', 'Home'];
  const category = categories[index % categories.length];
  return {
    id,
    name: `In-Crowd ${category} Product ${id}`,
    description: `A premium ${category.toLowerCase()} item designed for comfort, style, and lasting wear.`,
    price: Number((Math.random() * 180 + 20).toFixed(2)),
    category,
    specs: {
      material: ['Cotton', 'Polyester', 'Leather', 'Recycled Fiber'][id % 4],
      color: ['Black', 'White', 'Blue', 'Olive', 'Sand'][id % 5],
      size: ['S', 'M', 'L', 'XL'][id % 4],
      origin: ['USA', 'Vietnam', 'Portugal', 'Bangladesh'][id % 4],
      weight: `${Math.floor(Math.random() * 700 + 150)}g`,
    },
    imageUrl: `https://picsum.photos/seed/${id}/300/300`,
  };
});

export default products;

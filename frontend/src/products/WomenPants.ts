const WomensPants = [
    // Group products (if applicable, you can adjust based on your requirements)
    {
        id: 'f7n92ksw-3jd24-92jd',
        type: 'group',
        gender: 'women',
        category: 'pants',
        name: "High Waist Black Pants",
        price: 49.99,
        description: "High Waist Black Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Polyester',
        brand: 'ChicWear',
        availability: true,
        rating: 4.5,
        reviews: 120,
        image: '/images/products/fc/pantsProduct/group1/s1.avif', // First group image
        multiple: [
            {
                image: '/images/products/fc/pantsProduct/group1/s2.avif' // Second group image
            }
        ]
    },
    {
        id: 'f92ksh82-jwq93-x3gf',
        type: 'group',
        gender: 'women',
        category: 'pants',
        name: "Flared Red Pants",
        price: 59.99,
        description: "Flared Red Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Cotton',
        brand: 'FemStyle',
        availability: true,
        rating: 4.7,
        reviews: 150,
        image: '/images/products/fc/pantsProduct/group2/s1.avif', // Second group image
        multiple: [
            {
                image: '/images/products/fc/pantsProduct/group2/s2.avif' // Second group image
            }
        ]
    },
    {
        name: "Flared Red Pants",
        category: 'pants',
        gender: 'women',
        type: 'group',
        price: 59.99,
        description: "Flared Red Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Cotton',
        brand: 'FemStyle',
        availability: true,
        rating: 4.7,
        reviews: 150,
        id: 'f92ksh82-jwq93-x3gf',
        image: '/images/products/fc/pantsProduct/group3/s1.avif', // First group image
        multiple: [
          {
            image: '/images/products/fc/pantsProduct/group3/s2.avif' // Second group image
          }
        ]
      },

    // Single products
    {
        id: 't91sfd32-nbl74-m2x1',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Skinny Black Pants",
        price: 49.99,
        description: "Skinny Black Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Linen',
        brand: 'ChicFit',
        availability: true,
        rating: 4.6,
        reviews: 130,
        image: '/images/products/fc/pantsProduct/p (1).avif' // First single image
    },
    {
        id: 'h93fjd34-kpo92-p6d5',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Slim Fit Beige Pants",
        price: 59.99,
        description: "Slim Fit Beige Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Polyester',
        brand: 'StylishFit',
        availability: true,
        rating: 4.8,
        reviews: 140,
        image: '/images/products/fc/pantsProduct/p (2).avif' // Second single image
    },
    {
        id: 't84jsw32-pnw56-q1r7',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Casual Navy Pants",
        price: 39.99,
        description: "Casual Navy Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Cotton',
        brand: 'CasualWear',
        availability: true,
        rating: 4.7,
        reviews: 120,
        image: '/images/products/fc/pantsProduct/p (3).avif' // Third single image
    },
    {
        id: 'p84jsd92-lwf76-v8r3',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Wide Leg Grey Pants",
        price: 69.99,
        description: "Wide Leg Grey Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Wool',
        brand: 'LuxeStyle',
        availability: true,
        rating: 4.5,
        reviews: 160,
        image: '/images/products/fc/pantsProduct/p (4).avif' // Fourth single image
    },
    {
        id: 'g82jda39-dnx45-b4w2',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "High Waist Cargo Pants",
        price: 59.99,
        description: "High Waist Cargo Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Cotton',
        brand: 'UrbanChic',
        availability: true,
        rating: 4.6,
        reviews: 150,
        image: '/images/products/fc/pantsProduct/p (5).avif' // Fifth single image
    },
    {
        id: 'f93jds18-bkj62-r8p9',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Black Faux Leather Pants",
        price: 79.99,
        description: "Black Faux Leather Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Faux Leather',
        brand: 'FashionX',
        availability: true,
        rating: 4.8,
        reviews: 140,
        image: '/images/products/fc/pantsProduct/p (6).avif' // Sixth single image
    },
    {
        id: 'b29wfk31-nzo23-m8l5',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Wide Leg Olive Pants",
        price: 69.99,
        description: "Wide Leg Olive Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Linen',
        brand: 'ChicWear',
        availability: true,
        rating: 4.4,
        reviews: 130,
        image: '/images/products/fc/pantsProduct/p (7).avif' // Seventh single image
    },
    {
        id: 's72nfd42-koo28-z3p9',
        type: 'single',
        gender: 'women',
        category: 'pants',
        name: "Tapered Fit Brown Pants",
        price: 79.99,
        description: "Tapered Fit Brown Pants",
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Wool',
        brand: 'FashionPlus',
        availability: true,
        rating: 4.9,
        reviews: 200,
        image: '/images/products/fc/pantsProduct/p (8).avif' // Eighth single image
    }
];

export default WomensPants;

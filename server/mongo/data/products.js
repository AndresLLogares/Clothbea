const products = [
  {
    Id: 1,
    category: "Men",
    subcategory: "T-Shirt",
    name: "Cat T-Shirt",
    brand: "Clothbea",
    price: 30,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459672/Images/T-Shit-1-Men_roqpu9.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 2,
    category: "Men",
    subcategory: "T-Shirt",
    name: "Skull T-Shirt",
    brand: "Clothbea",
    price: 40,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459681/Images/T-Shit-2-Men_ediyot.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 3,
    category: "Men",
    subcategory: "T-Shirt",
    name: "Dog T-Shirt",
    brand: "Clothbea",
    price: 35,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459688/Images/T-Shit-3-Men_cd25fl.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 4,
    category: "Men",
    subcategory: "T-Shirt",
    name: "MM93 T-Shirt",
    brand: "Clothbea",
    price: 39,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524895/Images/T-Shirt-Men-5_nkaw43.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 5,
    category: "Men",
    subcategory: "T-Shirt",
    name: "Maximun T-Shirt",
    brand: "Clothbea",
    price: 48,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524892/Images/T-Shirt-Men-4_slhhfo.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 6,
    category: "Women",
    subcategory: "T-Shirt",
    name: "Dog T-Shirt",
    brand: "Clothbea",
    price: 25,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459690/Images/T-Shit-3-Women_v605lk.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 7,
    category: "Women",
    subcategory: "T-Shirt",
    name: "Koi T-Shirt",
    brand: "Clothbea",
    price: 35,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459694/Images/T-Shit-2-Women_lyyfvk.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 8,
    category: "Women",
    subcategory: "T-Shirt",
    name: "Rocket T-Shirt",
    brand: "Clothbea",
    price: 50,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459679/Images/T-Shit-1-Women_ace2vw.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 9,
    category: "Women",
    subcategory: "T-Shirt",
    name: "Blue T-Shirt",
    brand: "Clothbea",
    price: 57,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524905/Images/T-Shirt-Women-4_ut2lc8.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 10,
    category: "Women",
    subcategory: "T-Shirt",
    name: "Dog Hide T-Shirt",
    brand: "Clothbea",
    price: 34,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524913/Images/T-Shirt-Women-5_g1ehla.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 11,
    category: "Men",
    subcategory: "Sweaters",
    name: "Wings Sweater",
    brand: "Clothbea",
    price: 50,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459694/Images/Sweaters-2-Men_qnjawo.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 12,
    category: "Men",
    subcategory: "Sweaters",
    name: "Everyday Sweater",
    brand: "Clothbea",
    price: 60,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459677/Images/Sweaters-3-Men_w98ton.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 13,
    category: "Men",
    subcategory: "Sweaters",
    name: "Multicolor Sweater",
    brand: "Clothbea",
    price: 55,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459663/Images/Sweaters-1-Men_vg34tu.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 14,
    category: "Men",
    subcategory: "Sweaters",
    name: "Ant Sweater",
    brand: "Clothbea",
    price: 70,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524875/Images/Sweaters-Men-5_dnynq4.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 15,
    category: "Men",
    subcategory: "Sweaters",
    name: "Green Sweater",
    brand: "Clothbea",
    price: 83,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524893/Images/Sweaters-Men-4_b8qm7y.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 16,
    category: "Women",
    subcategory: "Sweaters",
    name: "Jesus Sweater",
    brand: "Clothbea",
    price: 45,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459658/Images/Sweaters-1-Women_bcaerw.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 17,
    category: "Women",
    subcategory: "Sweaters",
    name: "Pink Sweater",
    brand: "Clothbea",
    price: 60,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459680/Images/Sweaters-3-Women_gufvew.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 18,
    category: "Women",
    subcategory: "Sweaters",
    name: "New York Sweater",
    brand: "Clothbea",
    price: 65,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459675/Images/Sweaters-2-Women_bdapzr.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 19,
    category: "Women",
    subcategory: "Sweaters",
    name: "Wolf Sweater",
    brand: "Clothbea",
    price: 44,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524899/Images/Sweaters-Women-4_otqyy1.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 20,
    category: "Women",
    subcategory: "Sweaters",
    name: "Leather Jacket",
    brand: "Clothbea",
    price: 86,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524900/Images/Sweaters-Women-5_mnvwwp.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 21,
    category: "Men",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 40,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459638/Images/Jeans-3-Men_r3ozri.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 22,
    category: "Men",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 60,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459643/Images/Jeans-2-Men_asohp9.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 23,
    category: "Men",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 70,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459642/Images/Jeans-1-Men_eac6kc.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 24,
    category: "Men",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 39,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524913/Images/Jeans-Men-4_memvzr.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 25,
    category: "Men",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 77,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524859/Images/Jeans-Men-5_o2zm9q.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 26,
    category: "Women",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 65,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459626/Images/Jeans-1-Women_a4fsa7.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 27,
    category: "Women",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 45,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459629/Images/Jeans-2-Women_q5wjjt.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 28,
    category: "Women",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 50,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459649/Images/Jeans-3-Women_mvavbr.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 29,
    category: "Women",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 56,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524865/Images/Jeans-Women-5_stymsf.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 30,
    category: "Women",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 46,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524864/Images/Jeans-Women-4_htojg0.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 31,
    category: "Men",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 33,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459652/Images/Pants-2-Men_pgtjnv.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 32,
    category: "Men",
    subcategory: "Pants",
    name: "Fuji Pant",
    brand: "Fuji",
    price: 67,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459654/Images/Pants-1-Men_b2dqol.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 33,
    category: "Men",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Asics",
    price: 40,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459676/Images/Pants-3-Men_jrscg7.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 35,
    category: "Men",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 40,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524899/Images/Pants-Men-5png_hchgxx.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 36,
    category: "Men",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 34,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524864/Images/Pants-Men-4_ljr3tp.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 37,
    category: "Women",
    subcategory: "Pants",
    name: "Nike Pant",
    brand: "Nike",
    price: 65,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459654/Images/Pants-3-Women_qamoww.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 38,
    category: "Women",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 25,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459648/Images/Pants-1-Women_yyblij.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 39,
    category: "Women",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 50,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459645/Images/Pants-2-Women_e3xro9.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 40,
    category: "Women",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 77,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524865/Images/Pants-Women-5_ialrsl.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 41,
    category: "Women",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 52,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524887/Images/Pants-Women-4_ajtqii.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 42,
    category: "Women",
    subcategory: "Dresses",
    name: "Clothbea Dress",
    brand: "Clothbea",
    price: 75,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459647/Images/Dress-2-Women_kkptp3.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 43,
    category: "Women",
    subcategory: "Dresses",
    name: "Clothbea Dress",
    brand: "Clothbea",
    price: 60,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459640/Images/Dress-3-Women_tm9zwe.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 44,
    category: "Women",
    subcategory: "Dresses",
    name: "Clothbea Dress",
    brand: "Clothbea",
    price: 45,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459633/Images/Dress-1-Women_gn35gj.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 45,
    category: "Women",
    subcategory: "Dresses",
    name: "Clothbea Dress",
    brand: "Clothbea",
    price: 56,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524860/Images/Dress-Women-5_jnng1e.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 46,
    category: "Women",
    subcategory: "Dresses",
    name: "Clothbea Dress",
    brand: "Clothbea",
    price: 64,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524857/Images/Dress-Women-4_zklzg3.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 47,
    category: "Men",
    subcategory: "Shirts",
    name: "Clothbea Shirt",
    brand: "Clothbea",
    price: 60,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459666/Images/Shirt-3-Men_wtj1vw.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 48,
    category: "Men",
    subcategory: "Shirts",
    name: "Clothbea Shirt",
    brand: "Clothbea",
    price: 80,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459660/Images/Shirt-2-Men_jwyoyo.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 49,
    category: "Men",
    subcategory: "Shirts",
    name: "Clothbea Shirt",
    brand: "Clothbea",
    price: 45,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623459655/Images/Shirt-1-Men_qc8l3k.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 50,
    category: "Men",
    subcategory: "Shirts",
    name: "Clothbea Shirt",
    brand: "Clothbea",
    price: 63,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524887/Images/Shirt-Men-5_lvnwev.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 34,
    category: "Men",
    subcategory: "Shirts",
    name: "Clothbea Shirt",
    brand: "Clothbea",
    price: 78,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1623524872/Images/Shirt-Men-4_r6pchu.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 51,
    category: "Men",
    subcategory: "Pants",
    name: "Clothbea Pant",
    brand: "Clothbea",
    price: 63,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929066/Images/Pants-Men-6_yyo0s8.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 52,
    category: "Men",
    subcategory: "Sweaters",
    name: "Black Sweater",
    brand: "Clothbea",
    price: 45,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929068/Images/Sweater-Man-6_dfty3y.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 53,
    category: "Women",
    subcategory: "Sweaters",
    name: "White Sweater",
    brand: "Clothbea",
    price: 39,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929075/Images/Sweater-Women-6_yky7h4.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 54,
    category: "Women",
    subcategory: "Dresses",
    name: "White Dress",
    brand: "Clothbea",
    price: 120,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929087/Images/Dresses-Women-6_sg28zh.png",
    size: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    Id: 55,
    category: "Men",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 63,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929066/Images/Jeans-Men-6_y6kteh.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 56,
    category: "Women",
    subcategory: "Jeans",
    name: "Clothbea Jean",
    brand: "Clothbea",
    price: 56,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929079/Images/Jean-Women-6_takk3a.png",
    size: ["S", "M", "L", "XL"],
    stock: 0,
  },
  {
    Id: 57,
    category: "Women",
    subcategory: "T-Shirt",
    name: "Black T-Shirt",
    brand: "Clothbea",
    price: 37,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929074/Images/T-Shirt-Women-6_wg0f0h.png",
    size: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    Id: 58,
    category: "Women",
    subcategory: "Pants",
    name: "Black Pants",
    brand: "Clothbea",
    price: 77,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929072/Images/Pants-Women-6_eov3uc.png",
    size: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    Id: 59,
    category: "Men",
    subcategory: "T-Shirt",
    name: "Red T-Shirt",
    brand: "Clothbea",
    price: 23,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929082/Images/T-Shirt-Men-6_k893m3.png",
    size: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    Id: 60,
    category: "Men",
    subcategory: "Shirts",
    name: "Clothbea Shirt",
    brand: "Clothbea",
    price: 73,
    image:
      "https://res.cloudinary.com/andreslogares/image/upload/v1624929087/Images/Shirt-Men-6_ggzztt.png",
    size: ["S", "M", "L", "XL"],
    stock: 40,
  },
];

export default products;
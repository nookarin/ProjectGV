// =====================================================================
// GEARVERSE - MongoDB setup & seed script (Node.js + mongodb driver)
// Source of truth: 04_ER_Diagram.mmd
//
// Run with:
//   npm install            (first time, installs the mongodb driver)
//   $env:MONGODB_URI="mongodb+srv://..." ; npm run db:init
// or on macOS/Linux:
//   MONGODB_URI="mongodb+srv://..." npm run db:init
//
// If MONGODB_URI is not set, it falls back to a local server at 127.0.0.1.
// =====================================================================

import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "gearverse";

const OWNED_COLLECTIONS = [
  "users",
  "products",
  "categories",
  "subcategories",
  "brands",
  "colors",
  "manufacturers",
  "orders",
  "orderitems",
  "shoppingcarts",
  "wishlists",
  "reviews",
  "bundles",
  "promocodes",
  "productvariants",
  "kbswitches",
  "keycaps",
  "distributors",
  "marketplaces",
];

const client = new MongoClient(URI);

// ---------------------------------------------------------------------
// Collection definitions: name -> { required, properties }
// ---------------------------------------------------------------------
const SCHEMAS = {
  users: {
    required: ["username", "password", "email", "role"],
    properties: {
      username: { bsonType: "string" },
      password: { bsonType: "string" },
      firstname: { bsonType: "string" },
      lastname: { bsonType: "string" },
      email: { bsonType: "string" },
      phone_number: { bsonType: "string" },
      address1: { bsonType: "string" },
      address2: { bsonType: "string" },
      role: { enum: ["customer", "admin"] },
      created_at: { bsonType: "date" },
    },
  },
  categories: {
    required: ["category_name"],
    properties: {
      category_name: { enum: ["keyboard", "mouse", "headphone"] },
      subcategory_id: { bsonType: "objectId" },
    },
  },
  subcategories: {
    required: ["subcategory_name"],
    properties: {
      subcategory_name: {
        enum: ["mechanical", "magnetic", "rubber-dome", "wired", "wireless", "headset"],
      },
    },
  },
  brands: {
    required: ["brand_name"],
    properties: {
      brand_name: {
        enum: ["Logitech", "Razer", "Keychron", "SteelSeries", "Corsair", "HyperX"],
      },
    },
  },
  colors: {
    required: ["color_name"],
    properties: { color_name: { bsonType: "string" } },
  },
  manufacturers: {
    required: ["manufacturer_name"],
    properties: {
      manufacturer_name: { bsonType: "string" },
      manufacturer_location: { bsonType: "string" },
    },
  },
  products: {
    required: ["product_name", "price", "stock"],
    properties: {
      product_name: { bsonType: "string" },
      description: { bsonType: "string" },
      image_url: { bsonType: "string" },
      category_id: { bsonType: "objectId" },
      subcategory_id: { bsonType: "objectId" },
      brand_id: { bsonType: "objectId" },
      color_id: { bsonType: "objectId" },
      manufacturer_id: { bsonType: "objectId" },
      connectivity_type: { bsonType: "string" },
      bluetooth_version: { bsonType: ["number", "null"] },
      price: { bsonType: "number" },
      weight: { bsonType: "number" },
      stock: { bsonType: "number" },
    },
  },
  kbswitches: {
    required: ["switch_name"],
    properties: { switch_name: { bsonType: "string" } },
  },
  keycaps: {
    required: ["keycap_name"],
    properties: { keycap_name: { bsonType: "string" } },
  },
  productvariants: {
    required: [],
    properties: {
      product_id: { bsonType: "objectId" },
      category_id: { bsonType: "objectId" },
      subcategory_id: { bsonType: "objectId" },
      // mouse
      dpi: { bsonType: "number" },
      sensor_type: { bsonType: "string" },
      button_count: { bsonType: "number" },
      // keyboard
      language: { bsonType: "string" },
      key_count: { bsonType: "number" },
      keyboard_form: { bsonType: "string" },
      switch_id: { bsonType: ["objectId", "null"] },
      keycap_id: { bsonType: ["objectId", "null"] },
      // headphone
      sound_support: { enum: ["stereo", "5.1", "7.1"] },
      is_headset: { bsonType: "bool" },
      freq_range: { bsonType: "string" },
    },
  },
  orders: {
    required: ["order_number", "status", "user_id"],
    properties: {
      order_number: { bsonType: "number" },
      status: { enum: ["pending", "paid", "shipped", "completed"] },
      user_id: { bsonType: "objectId" },
      payment_method: { bsonType: "string" },
      shipping_address: { bsonType: "string" },
      final_price: { bsonType: "number" },
      order_date: { bsonType: "date" },
    },
  },
  orderitems: {
    required: ["order_id", "product_id", "quantity"],
    properties: {
      order_id: { bsonType: "objectId" },
      product_id: { bsonType: "objectId" },
      quantity: { bsonType: "number" },
      unit_price: { bsonType: "number" },
    },
  },
  shoppingcarts: {
    required: ["product_id", "user_id"],
    properties: {
      product_id: { bsonType: "objectId" },
      user_id: { bsonType: "objectId" },
    },
  },
  wishlists: {
    required: ["product_id", "user_id"],
    properties: {
      product_id: { bsonType: "objectId" },
      user_id: { bsonType: "objectId" },
    },
  },
  reviews: {
    required: ["user_id", "username", "rating"],
    properties: {
      user_id: { bsonType: "objectId" },
      username: { bsonType: "string" },
      orderitem_id: { bsonType: "objectId" },
      rating: { bsonType: "number" },
      comment: { bsonType: "string" },
    },
  },
  bundles: {
    required: ["bundlename", "bundle_price"],
    properties: {
      bundlename: { bsonType: "string" },
      description: { bsonType: "string" },
      bundle_price: { bsonType: "number" },
      is_active: { bsonType: "bool" },
      quantity_limit: { bsonType: "number" },
    },
  },
  promocodes: {
    required: ["code"],
    properties: {
      code: { bsonType: "string" },
      promo_type: { bsonType: "string" },
      min_order_price: { bsonType: "number" },
      max_use: { bsonType: "number" },
      is_active: { bsonType: "bool" },
      promo_start: { bsonType: "date" },
      expire_at: { bsonType: "date" },
    },
  },
  distributors: {
    required: ["distributor_name"],
    properties: {
      distributor_name: { bsonType: "string" },
      distributor_location: { bsonType: "string" },
    },
  },
  marketplaces: {
    required: ["marketplace_name"],
    properties: {
      marketplace_name: { bsonType: "string" },
      marketplace_location: { bsonType: "string" },
    },
  },
};

async function createCollection(db, name) {
  const { required, properties } = SCHEMAS[name];
  const schema = {
    bsonType: "object",
    title: name,
    properties: {
      _id: { bsonType: "objectId" },
      ...properties,
    },
  };
  if (required.length > 0) schema.required = required;
  await db.createCollection(name, {
    validator: { $jsonSchema: schema },
    validationLevel: "moderate",
  });
  console.log(`+ created collection: ${name}`);
}

async function run() {
  await client.connect();
  console.log(`+ connected: ${URI}`);
  const db = client.db(DB_NAME);

  // Clean slate: drop only the collections this script owns
  for (const name of OWNED_COLLECTIONS) {
    await db.collection(name).drop().catch(() => {});
  }

  for (const name of Object.keys(SCHEMAS)) {
    await createCollection(db, name);
  }

  // Indexes
  const idx = [
    ["products", "category_id"],
    ["products", "subcategory_id"],
    ["products", "brand_id"],
    ["products", "manufacturer_id"],
    ["orders", "user_id"],
    ["orderitems", "order_id"],
    ["orderitems", "product_id"],
    ["shoppingcarts", "user_id"],
    ["wishlists", "user_id"],
    ["productvariants", "product_id"],
    ["productvariants", "switch_id"],
    ["productvariants", "keycap_id"],
  ];
  for (const [coll, field] of idx) {
    await db.collection(coll).createIndex({ [field]: 1 });
  }
  console.log("+ indexes created");

  // =====================================================================
  // SEED DATA
  // (products mirror the landing page in client/index.html)
  // =====================================================================
  const id = (hex) => new ObjectId(hex);

  const U_ADMIN = id("651111111111111111111111");
  const U_CUSTOMER = id("651111111111111111111112");

  const C_KEYBOARD = id("652111111111111111111111");
  const C_MOUSE = id("652111111111111111111112");
  const C_HEADPHONE = id("652111111111111111111113");

  const S_MECHANICAL = id("653111111111111111111111");
  const S_WIRELESS = id("653111111111111111111112");
  const S_HEADSET = id("653111111111111111111113");
  const S_MAGNETIC = id("653111111111111111111114");
  const S_WIRED = id("653111111111111111111115");
  const S_RUBBER_DOME = id("653111111111111111111116");

  const B_RAZER = id("654111111111111111111111");
  const B_LOGITECH = id("654111111111111111111112");
  const B_KEYCHRON = id("654111111111111111111113");
  const B_STEELSERIES = id("654111111111111111111114");
  const B_CORSAIR = id("654111111111111111111115");
  const B_HYPERX = id("654111111111111111111116");

  const CL_BLACK = id("655111111111111111111111");
  const CL_WHITE = id("655111111111111111111112");
  const CL_NEON_PURPLE = id("655111111111111111111113");
  const CL_NEON_PINK = id("655111111111111111111114");
  const CL_CRIMSON = id("655111111111111111111115");
  const CL_SLATE = id("655111111111111111111116");

  const M_NEON = id("656111111111111111111111");
  const M_CHASE = id("656111111111111111111112");
  const M_THUNDER = id("656111111111111111111113");

  const P_STRIKE85 = id("657111111111111111111111");
  const P_NEONV2 = id("657111111111111111111112");
  const P_PHANTOM = id("657111111111111111111113");
  const P_VOIDWALKER = id("657111111111111111111114");
  const P_SONIC = id("657111111111111111111115");
  const P_ECHO = id("657111111111111111111116");
  const P_NEBULOUS = id("657111111111111111111117");
  const P_VORTEX = id("657111111111111111111118");
  const P_NEBULA96 = id("657111111111111111111119");
  const P_GHOSTLINE = id("65711111111111111111111a");
  const P_HYPERSONIC = id("65711111111111111111111b");
  const P_NIGHTFALL = id("65711111111111111111111c");
  const P_ZEROG = id("65711111111111111111111d");
  const P_CRIMSON = id("65711111111111111111111e");
  const P_VOIDWALKER_HEADSET = id("65711111111111111111111f");

  const SW_LINEAR = id("658111111111111111111111");
  const SW_TACTILE = id("658111111111111111111112");
  const SW_MAGNETIC = id("658111111111111111111113");
  const KC_PBT = id("659111111111111111111111");
  const KC_ABS = id("659111111111111111111112");

  const O_1001 = id("65a111111111111111111111");
  const OI_1 = id("65b111111111111111111111");
  const OI_2 = id("65b111111111111111111112");

  await db.collection("users").insertMany([
    {
      _id: U_ADMIN,
      username: "admin",
      password: "hashed_admin_pw",
      firstname: "Admin",
      lastname: "Gearverse",
      email: "admin@gearverse.com",
      phone_number: "+66900000001",
      address1: "1 Neon St.",
      address2: "",
      role: "admin",
      created_at: new Date("2024-01-01T00:00:00Z"),
    },
    {
      _id: U_CUSTOMER,
      username: "pro_gamer_x",
      password: "hashed_customer_pw",
      firstname: "Jae",
      lastname: "Kim",
      email: "jae@example.com",
      phone_number: "+66900000002",
      address1: "88 Glitch Ave.",
      address2: "Room 404",
      role: "customer",
      created_at: new Date("2024-02-14T00:00:00Z"),
    },
  ]);

  await db.collection("categories").insertMany([
    { _id: C_KEYBOARD, category_name: "keyboard", subcategory_id: S_MECHANICAL },
    { _id: C_MOUSE, category_name: "mouse", subcategory_id: S_WIRELESS },
    { _id: C_HEADPHONE, category_name: "headphone", subcategory_id: S_HEADSET },
  ]);

  await db.collection("subcategories").insertMany([
    { _id: S_MECHANICAL, subcategory_name: "mechanical" },
    { _id: S_WIRELESS, subcategory_name: "wireless" },
    { _id: S_HEADSET, subcategory_name: "headset" },
    { _id: S_MAGNETIC, subcategory_name: "magnetic" },
    { _id: S_WIRED, subcategory_name: "wired" },
    { _id: S_RUBBER_DOME, subcategory_name: "rubber-dome" },
  ]);

  await db.collection("brands").insertMany([
    { _id: B_RAZER, brand_name: "Razer" },
    { _id: B_LOGITECH, brand_name: "Logitech" },
    { _id: B_KEYCHRON, brand_name: "Keychron" },
    { _id: B_STEELSERIES, brand_name: "SteelSeries" },
    { _id: B_CORSAIR, brand_name: "Corsair" },
    { _id: B_HYPERX, brand_name: "HyperX" },
  ]);

  await db.collection("colors").insertMany([
    { _id: CL_BLACK, color_name: "Black" },
    { _id: CL_WHITE, color_name: "White" },
    { _id: CL_NEON_PURPLE, color_name: "Neon Purple" },
    { _id: CL_NEON_PINK, color_name: "Neon Pink" },
    { _id: CL_CRIMSON, color_name: "Crimson Red" },
    { _id: CL_SLATE, color_name: "Slate Gray" },
  ]);

  await db.collection("manufacturers").insertMany([
    {
      _id: M_NEON,
      manufacturer_name: "NeonTech Manufacturing",
      manufacturer_location: "Bangkok, Thailand",
    },
    {
      _id: M_CHASE,
      manufacturer_name: "Chase Precision",
      manufacturer_location: "Shenzhen, China",
    },
    {
      _id: M_THUNDER,
      manufacturer_name: "Thunder Lab Co.",
      manufacturer_location: "Taipei, Taiwan",
    },
  ]);

  await db.collection("products").insertMany([
    {
      _id: P_STRIKE85,
      product_name: "STRIKE-85 PRO",
      image_url: "https://images.unsplash.com/photo-1775258533582-96f5c0b54374?w=800&q=80&auto=format&fit=crop",
      description: "Mechanical Gaming Keyboard",
      category_id: C_KEYBOARD,
      subcategory_id: S_MECHANICAL,
      brand_id: B_RAZER,
      color_id: CL_BLACK,
      manufacturer_id: M_NEON,
      connectivity_type: "wired",
      bluetooth_version: null,
      price: 189.0,
      weight: 0.85,
      stock: 40,
    },
    {
      _id: P_NEONV2,
      product_name: "NEON MECHANICAL V2",
      image_url: "https://images.unsplash.com/photo-1756694938594-e760b4bd3bfb?w=800&q=80&auto=format&fit=crop",
      description: "Mechanical Gaming Keyboard",
      category_id: C_KEYBOARD,
      subcategory_id: S_MECHANICAL,
      brand_id: B_LOGITECH,
      color_id: CL_NEON_PURPLE,
      manufacturer_id: M_NEON,
      connectivity_type: "wireless",
      bluetooth_version: 5.1,
      price: 149.0,
      weight: 0.72,
      stock: 55,
    },
    {
      _id: P_PHANTOM,
      product_name: "PHANTOM AIR",
      image_url: "https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=800&q=80&auto=format&fit=crop",
      description: "Ultra-light Wireless Mouse",
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      brand_id: B_RAZER,
      color_id: CL_WHITE,
      manufacturer_id: M_NEON,
      connectivity_type: "wireless",
      bluetooth_version: 5.3,
      price: 129.0,
      weight: 0.055,
      stock: 80,
    },
    {
      _id: P_VOIDWALKER,
      product_name: "VOIDWALKER G1",
      image_url: "https://images.unsplash.com/photo-1627745214193-2bcefc681524?w=800&q=80&auto=format&fit=crop",
      description: "Wireless Gaming Mouse",
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      brand_id: B_LOGITECH,
      color_id: CL_BLACK,
      manufacturer_id: M_NEON,
      connectivity_type: "wireless",
      bluetooth_version: 5.1,
      price: 99.0,
      weight: 0.063,
      stock: 90,
    },
    {
      _id: P_SONIC,
      product_name: "SONIC STRIKE",
      image_url: "https://images.unsplash.com/photo-1673669231301-09baa4d7761b?w=800&q=80&auto=format&fit=crop",
      description: "Spatial Audio Headset",
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      brand_id: B_RAZER,
      color_id: CL_BLACK,
      manufacturer_id: M_NEON,
      connectivity_type: "wired",
      bluetooth_version: null,
      price: 179.0,
      weight: 0.34,
      stock: 35,
    },
    {
      _id: P_ECHO,
      product_name: "ECHO NEON",
      image_url: "https://images.unsplash.com/photo-1760377821978-636dcc65eb48?w=800&q=80&auto=format&fit=crop",
      description: "RGB Wireless Headset",
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      brand_id: B_LOGITECH,
      color_id: CL_NEON_PURPLE,
      manufacturer_id: M_NEON,
      connectivity_type: "wireless",
      bluetooth_version: 5.2,
      price: 139.0,
      weight: 0.29,
      stock: 48,
    },
    {
      _id: P_NEBULOUS,
      product_name: "NEBULOUS CORE V3",
      image_url: "https://images.unsplash.com/photo-1679429973860-d430a100db8c?w=800&q=80&auto=format&fit=crop",
      description: "Spatial Audio Headset",
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      brand_id: B_RAZER,
      color_id: CL_BLACK,
      manufacturer_id: M_NEON,
      connectivity_type: "wireless",
      bluetooth_version: 5.4,
      price: 3499.0,
      weight: 0.32,
      stock: 5,
    },
    {
      _id: P_VORTEX,
      product_name: "VORTEX 75 TKL",
      image_url: "https://images.unsplash.com/photo-1756694938599-62e7960df6b0?w=800&q=80&auto=format&fit=crop",
      description: "Tenkeyless Mechanical Gaming Keyboard",
      category_id: C_KEYBOARD,
      subcategory_id: S_MECHANICAL,
      brand_id: B_KEYCHRON,
      color_id: CL_SLATE,
      manufacturer_id: M_CHASE,
      connectivity_type: "wired",
      bluetooth_version: null,
      price: 119.0,
      weight: 0.68,
      stock: 62,
    },
    {
      _id: P_NEBULA96,
      product_name: "NEBULA SWITCH 96",
      image_url: "https://images.unsplash.com/photo-1760656523257-4f89c1e41fb1?w=800&q=80&auto=format&fit=crop",
      description: "Magnetic Switch Gaming Keyboard",
      category_id: C_KEYBOARD,
      subcategory_id: S_MAGNETIC,
      brand_id: B_RAZER,
      color_id: CL_NEON_PINK,
      manufacturer_id: M_THUNDER,
      connectivity_type: "wired",
      bluetooth_version: null,
      price: 229.0,
      weight: 0.92,
      stock: 18,
    },
    {
      _id: P_GHOSTLINE,
      product_name: "GHOSTLINE 60",
      image_url: "https://images.unsplash.com/photo-1756388371735-cc845c578200?w=800&q=80&auto=format&fit=crop",
      description: "Slim Rubber-Dome Wireless Keyboard",
      category_id: C_KEYBOARD,
      subcategory_id: S_RUBBER_DOME,
      brand_id: B_LOGITECH,
      color_id: CL_WHITE,
      manufacturer_id: M_CHASE,
      connectivity_type: "wireless",
      bluetooth_version: 5.0,
      price: 59.0,
      weight: 0.41,
      stock: 120,
    },
    {
      _id: P_HYPERSONIC,
      product_name: "HYPERSONIC X2",
      image_url: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?w=800&q=80&auto=format&fit=crop",
      description: "Competitive Wireless Esports Mouse",
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      brand_id: B_STEELSERIES,
      color_id: CL_BLACK,
      manufacturer_id: M_THUNDER,
      connectivity_type: "wireless",
      bluetooth_version: 5.3,
      price: 159.0,
      weight: 0.048,
      stock: 70,
    },
    {
      _id: P_NIGHTFALL,
      product_name: "NIGHTFALL PRO",
      image_url: "https://images.unsplash.com/photo-1628832306751-ec751454119c?w=800&q=80&auto=format&fit=crop",
      description: "RGB Wired Gaming Mouse",
      category_id: C_MOUSE,
      subcategory_id: S_WIRED,
      brand_id: B_CORSAIR,
      color_id: CL_CRIMSON,
      manufacturer_id: M_NEON,
      connectivity_type: "wired",
      bluetooth_version: null,
      price: 89.0,
      weight: 0.082,
      stock: 95,
    },
    {
      _id: P_ZEROG,
      product_name: "ZERO-G LIGHTSPEED",
      image_url: "https://images.unsplash.com/photo-1658070429465-848c0796abf3?w=800&q=80&auto=format&fit=crop",
      description: "Ultra-low Latency Wireless Mouse",
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      brand_id: B_LOGITECH,
      color_id: CL_NEON_PURPLE,
      manufacturer_id: M_THUNDER,
      connectivity_type: "wireless",
      bluetooth_version: 5.2,
      price: 149.0,
      weight: 0.058,
      stock: 66,
    },
    {
      _id: P_CRIMSON,
      product_name: "CRIMSON PULSE",
      image_url: "https://images.unsplash.com/photo-1636489927844-21627085bf4a?w=800&q=80&auto=format&fit=crop",
      description: "Memory Foam Wired Headset",
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      brand_id: B_HYPERX,
      color_id: CL_CRIMSON,
      manufacturer_id: M_CHASE,
      connectivity_type: "wired",
      bluetooth_version: null,
      price: 119.0,
      weight: 0.31,
      stock: 44,
    },
    {
      _id: P_VOIDWALKER_HEADSET,
      product_name: "VOIDWALKER HEADSET",
      image_url: "https://images.unsplash.com/photo-1566055972289-c52022ae23b7?w=800&q=80&auto=format&fit=crop",
      description: "Pro-Grade Wireless Headset",
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      brand_id: B_STEELSERIES,
      color_id: CL_SLATE,
      manufacturer_id: M_THUNDER,
      connectivity_type: "wireless",
      bluetooth_version: 5.3,
      price: 169.0,
      weight: 0.27,
      stock: 38,
    },
  ]);

  await db.collection("kbswitches").insertMany([
    { _id: SW_LINEAR, switch_name: "Linear Red" },
    { _id: SW_TACTILE, switch_name: "Tactile Brown" },
    { _id: SW_MAGNETIC, switch_name: "Magnetic Hall Effect" },
  ]);

  await db.collection("keycaps").insertMany([
    { _id: KC_PBT, keycap_name: "Double-shot PBT" },
    { _id: KC_ABS, keycap_name: "ABS Keycap" },
  ]);

  await db.collection("productvariants").insertMany([
    {
      product_id: P_STRIKE85,
      category_id: C_KEYBOARD,
      subcategory_id: S_MECHANICAL,
      language: "US",
      key_count: 85,
      keyboard_form: "75%",
      switch_id: SW_LINEAR,
      keycap_id: KC_PBT,
    },
    {
      product_id: P_PHANTOM,
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      dpi: 30000,
      sensor_type: "optical",
      button_count: 8,
    },
    {
      product_id: P_SONIC,
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      sound_support: "7.1",
      is_headset: true,
      freq_range: "20Hz-40kHz",
    },
    {
      product_id: P_NEONV2,
      category_id: C_KEYBOARD,
      subcategory_id: S_MECHANICAL,
      language: "TH",
      key_count: 104,
      keyboard_form: "full-size",
      switch_id: SW_TACTILE,
      keycap_id: KC_ABS,
    },
    {
      product_id: P_VORTEX,
      category_id: C_KEYBOARD,
      subcategory_id: S_MECHANICAL,
      language: "US",
      key_count: 87,
      keyboard_form: "TKL",
      switch_id: SW_LINEAR,
      keycap_id: KC_PBT,
    },
    {
      product_id: P_NEBULA96,
      category_id: C_KEYBOARD,
      subcategory_id: S_MAGNETIC,
      language: "US",
      key_count: 96,
      keyboard_form: "96%",
      switch_id: SW_MAGNETIC,
      keycap_id: KC_PBT,
    },
    {
      product_id: P_GHOSTLINE,
      category_id: C_KEYBOARD,
      subcategory_id: S_RUBBER_DOME,
      language: "US",
      key_count: 60,
      keyboard_form: "60%",
      switch_id: null,
      keycap_id: null,
    },
    {
      product_id: P_HYPERSONIC,
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      dpi: 26000,
      sensor_type: "optical",
      button_count: 6,
    },
    {
      product_id: P_NIGHTFALL,
      category_id: C_MOUSE,
      subcategory_id: S_WIRED,
      dpi: 12000,
      sensor_type: "optical",
      button_count: 10,
    },
    {
      product_id: P_ZEROG,
      category_id: C_MOUSE,
      subcategory_id: S_WIRELESS,
      dpi: 32000,
      sensor_type: "optical",
      button_count: 8,
    },
    {
      product_id: P_ECHO,
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      sound_support: "5.1",
      is_headset: true,
      freq_range: "20Hz-30kHz",
    },
    {
      product_id: P_NEBULOUS,
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      sound_support: "7.1",
      is_headset: true,
      freq_range: "10Hz-45kHz",
    },
    {
      product_id: P_CRIMSON,
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      sound_support: "stereo",
      is_headset: true,
      freq_range: "15Hz-25kHz",
    },
    {
      product_id: P_VOIDWALKER_HEADSET,
      category_id: C_HEADPHONE,
      subcategory_id: S_HEADSET,
      sound_support: "7.1",
      is_headset: true,
      freq_range: "18Hz-38kHz",
    },
  ]);

  await db.collection("orders").insertMany([
    {
      _id: O_1001,
      order_number: 1001,
      status: "paid",
      user_id: U_CUSTOMER,
      payment_method: "credit_card",
      shipping_address: "88 Glitch Ave., Room 404",
      final_price: 318.0,
      order_date: new Date("2024-03-01T00:00:00Z"),
    },
  ]);

  await db.collection("orderitems").insertMany([
    {
      _id: OI_1,
      order_id: O_1001,
      product_id: P_STRIKE85,
      quantity: 1,
      unit_price: 189.0,
    },
    {
      _id: OI_2,
      order_id: O_1001,
      product_id: P_PHANTOM,
      quantity: 1,
      unit_price: 129.0,
    },
  ]);

  await db.collection("shoppingcarts").insertMany([
    { _id: id("65c111111111111111111111"), product_id: P_ECHO, user_id: U_CUSTOMER },
  ]);

  await db.collection("wishlists").insertMany([
    { _id: id("65d111111111111111111111"), product_id: P_NEBULOUS, user_id: U_CUSTOMER },
  ]);

  await db.collection("reviews").insertMany([
    {
      _id: id("65e111111111111111111111"),
      user_id: U_CUSTOMER,
      username: "pro_gamer_x",
      orderitem_id: OI_1,
      rating: 5.0,
      comment: "Feels incredible, the switches are buttery smooth.",
    },
  ]);

  await db.collection("bundles").insertMany([
    {
      _id: id("65f111111111111111111111"),
      bundlename: "Starter Pro Kit",
      description: "Keyboard + Mouse starter bundle",
      bundle_price: 259.0,
      is_active: true,
      quantity_limit: 20,
    },
  ]);

  await db.collection("promocodes").insertMany([
    {
      _id: id("660111111111111111111111"),
      code: "NEON10",
      promo_type: "percent",
      min_order_price: 100.0,
      max_use: 500,
      is_active: true,
      promo_start: new Date("2024-01-01T00:00:00Z"),
      expire_at: new Date("2024-12-31T00:00:00Z"),
    },
  ]);

  await db.collection("distributors").insertMany([
    {
      _id: id("661111111111111111111111"),
      distributor_name: "ASEAN Gear Distribution",
      distributor_location: "Singapore",
    },
  ]);

  await db.collection("marketplaces").insertMany([
    {
      _id: id("662111111111111111111111"),
      marketplace_name: "Gearverse Marketplace",
      marketplace_location: "Thailand",
    },
  ]);

  console.log("+ seed data inserted");
  console.log(`Done. Database "${DB_NAME}" ready.`);

  await client.close();
}

run().catch((err) => {
  console.error("Setup failed:", err.message);
  process.exit(1);
});

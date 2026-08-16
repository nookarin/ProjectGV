import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// Use the environment variable or fall back to the local connection string
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "gearverse";

const client = new MongoClient(URI);

const OWNED_COLLECTION = [
  "user",
  "product",
  "category",
  "subcategory",
  "order",
  "shoppingcart",
  "wishlist",
  "review",
  "bundle",
  "promo_code",
  "product_variant",
  "color",
  "kb_switch",
  "keycap",
  "manufacturer",
  "distributor",
];

const SCHEMAS = {
  user: {
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
  product: {
    required: [
      "product_name",
      "category_id",
      "price",
      "stock",
      "subcategory_id",
    ],
    properties: {
      product_name: { bsonType: "string" },
      description: { bsonType: "string" },

      // Foreign Keys (FK) ระบุเป็น objectId
      category_id: { bsonType: "objectId" },
      subcategory_id: { bsonType: "objectId" },
      color_id: { bsonType: "objectId" },

      connectivity_type: { bsonType: "string" },
      bluetooth_version: { bsonType: "double" },

      price: { bsonType: "double" },
      weight: { bsonType: "double" },
      stock: { bsonType: "int" },
    },
  },
  category: {
    required: ["category_name"],
    properties: {
      category_name: {
        enum: ["keyboard", "mouse", "headphone"],
      },
      // Foreign Key (FK) ระบุเป็น objectId
      subcategory_id: { bsonType: "objectId" },
    },
  },
  order: {
    required: [
      "distributor_id",
      "user_id",
      "total_quantity",
      "payment_method",
      "final_price",
      "order_date",
      "payment_status",
      "product_id",
    ],
    properties: {
      // Foreign Keys (FK) ระบุเป็น objectId
      distributor_id: { bsonType: "objectId" },
      user_id: { bsonType: "objectId" },
      product_id: { bsonType: "objectId" },

      total_quantity: { bsonType: "int" },
      payment_method: { bsonType: "string" },
      final_price: { bsonType: "double" },
      order_date: { bsonType: "date" },
      payment_status: {
        enum: ["pending", "paid"],
      },
    },
  },
  shopping_cart: {
    required: ["product_id", "user_id"],
    properties: {
      // Foreign Keys (FK) ระบุเป็น objectId
      product_id: { bsonType: "objectId" },
      user_id: { bsonType: "objectId" },
    },
  },
  wishlist: {
    required: ["product_id", "user_id"],
    properties: {
      // Foreign Keys (FK) ระบุเป็น objectId
      product_id: { bsonType: "objectId" },
      user_id: { bsonType: "objectId" },
    },
  },
  review: {
    required: ["user_id", "product_id", "review_date", "rating"],
    properties: {
      // Foreign Keys (FK) ระบุเป็น objectId
      user_id: { bsonType: "objectId" },
      product_id: { bsonType: "objectId" },
      review_date: { bsonType: "date" },
      rating: { bsonType: "double" },
      comment: { bsonType: "string" },
    },
  },
  bundle: {
    required: [
      "bundle_name",
      "bundle_price",
      "is_active",
      "quantity_limit",
      "product_id",
    ],
    properties: {
      bundlename: { bsonType: "string" },
      description: { bsonType: "string" },

      bundle_price: { bsonType: "double" },
      is_active: { bsonType: "bool" },
      quantity_limit: { bsonType: "int" },

      // Foreign Key (FK) ระบุเป็น objectId
      product_id: { bsonType: "objectId" },
    },
  },
  promo_code: {
    required: [
      "code",
      "min_order_price",
      "max_use",
      "is_active",
      "promo_start",
      "expire_at",
      "discount_amount",
    ],
    properties: {
      code: { bsonType: "string" },
      description: { bsonType: "string" },

      min_order_price: { bsonType: "double" },
      discount_amount: { bsonType: "double" },
      max_use: { bsonType: "int" },
      is_active: { bsonType: "bool" },

      promo_start: { bsonType: "date" },
      expire_at: { bsonType: "date" },

      // Foreign Key (FK) ระบุเป็น objectId (ไม่บังคับ required หากโค้ดยังไม่ถูกใช้กับ order ใด)
      order_id: { bsonType: "objectId" },
    },
  },

  color: {
    required: ["color_name"],
    properties: {
      color_name: { bsonType: "string" },
    },
  },

  product_color: {
    required: ["product_id", "color_id"],
    properties: {
      product_id: { bsonType: "objectId" },
      color_id: { bsonType: "objectId" },
    },
  },

  kb_switch: {
    required: ["switch_name"],
    properties: {
      switch_name: { bsonType: "string" },
    },
  },

  keycap: {
    required: ["keycap_name"],
    properties: {
      keycap_name: { bsonType: "string" },
    },
  },

  product_variant: {
    required: ["product_id"],
    properties: {
      product_id: { bsonType: "objectId" },
      // Mouse
      dpi: { bsonType: "double" },
      sensor_type: { bsonType: "string" },
      button_count: { bsonType: "int" },

      // Keyboard
      language: { bsonType: "string" },
      key_count: { bsonType: "int" },
      keyboard_form: { bsonType: "string" },
      switch_id: { bsonType: "objectId" },
      keycap_id: { bsonType: "objectId" },

      // Headphone
      sound_support: { bsonType: "string" }, // Note: Logic for enum can be handled at app level
      is_headset: { bsonType: "bool" },
      freq_range: { bsonType: "string" },
    },
  },

  manufacturer: {
    required: ["manufacturer_name", "manufacturer_location"],
    properties: {
      manufacturer_id: { bsonType: "objectId" },
      manufacturer_name: { bsonType: "string" },
      manufacturer_location: { bsonType: "string" },
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

//may add idx

async function connect() {
  try {
    // 1. Attempt to connect
    await client.connect();
    console.log("Successfully connected to MongoDB");

    console.log(`+ connected: ${URI}`);
    const db = client.db(DB_NAME);

    
    // Clean slate: drop only the collections this script owns
    for (const name of OWNED_COLLECTION) {
      await db
        .collection(name)
        .drop()
        .catch(() => {});
    }

    for (const name of Object.keys(SCHEMAS)) {
      //await db.dropDatabase();
      await createCollection(db, name);
      // 2. Select the database
      //const db = client.db(DB_NAME);

      // 3. Perform the drop operation inside the try block
      //console.log(`Dropping database: ${DB_NAME}...`);
      
      //console.log(`Database ${DB_NAME} has been dropped.`);

      // If you want to do more work after dropping, do it here
    }
  } catch (error) {
    console.error("Error during connection or operation:");
    console.error(error);
  } finally {
    // Close the connection when finished
    await client.close();
    console.log("Connection closed.");
  }
}

connect();


import Product from "../models/productModel.js";
import connectDB from "../config/db.js";
export async function getProductById(req, res) {
  console.log("call")
  await connectDB();
  const { id } = req.params;
  const product = await Product.findById(id);
  res.send(product);
}
export async function getQueryProducts(req, res) {
  try {
    await connectDB();
    const LIMIT = 9;
    const { page } = req.query || 1
    let { search } = req.query;
    search = search || ""
    console.log(typeof search)
    const { sortBy } = req.query;
    let { minPrice, maxPrice } = req.query;
    minPrice = minPrice ? Number(minPrice) : 0
    maxPrice = maxPrice ? Number(maxPrice) : 0
    console.log("minPrice", minPrice, "maxPrice", maxPrice)
    let { category } = req.query;
    let { brand } = req.query;
    category = category && JSON.parse(category);
    brand = brand && JSON.parse(brand);
    const query = { title: { $regex: search, $options: "i" } };

    if (category) {
      if (Array.isArray(category) && category.length > 0) {
        query.category = { $in: category }
      }
    }
    if (brand) {
      if (Array.isArray(brand) && brand.length > 0) {
        query.brand = { $in: brand }
      }
    }
    if (maxPrice != 0 && minPrice != 0) {
      query.price = { $gte: minPrice, $lte: maxPrice }
    }
    else if (maxPrice != 0) {
      query.price = { $lte: maxPrice }
    }
    else if (minPrice != 0) {
      query.price = { $gte: minPrice }
    }
    // category and brand are array of string values, some values may be null or undefined so we need to selectivly query the products
    console.log(query)
    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions[sortBy])
      .skip((page - 1) * LIMIT)
      .limit(LIMIT);
    res.send({ products, count });
  }
  catch (error) {
    console.log(error)
  }
}
const sortOptions = {
  latest: { createdAt: -1 },
  rating_high: { rating: -1 },
  rating_low: { rating: 1 },
  price_high: { price: -1 },
  price_low: { price: 1 },
}

const config = require("../config");
const Product = require("./model");
const Category = require("../categories/model");
const Tag = require('../tags/model')
const fs = require("fs");
const path = require("path");
const {policyFor} = require('../policy/index')


//gettAll
const index = async (req, res, next) => {
  try {
    let { limit = 10, skip = 10, q = '', category = '', tags = [] } = req.query;
    let criteria = {};
    if(q.length){ //cek si q itu ada isinya enggak
      criteria = {...criteria, name: {$regex: `${q}`, $options: 'i'}}
    }

    if(category.length){
      category = await Category.findOne({name: {$regex: `${category}`, $options: 'i'}});
      if(category){
        criteria = {...criteria, category: category._id}
      }
    }

    if(tags && tags.length){
      tags = await Tag.find({name: {$in: tags}});
      criteria = {...criteria, tags: {$in: tags.map(tag => tag._id)}}
    }

    let count = await Product.find(criteria).countDocuments();


    let products = await Product.find(criteria).limit(parseInt(limit)).skip(parseInt(skip)).populate('category').populate('tags').select('-__v')
    return res.json({data: products, count});
  } catch (err) {
    next(err);
  }
};

//getByID
const spesific = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (err) {
    next(err);
  }
};

//createProduct
const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if(!policy.can('create','Product')){
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk membuat produk`
      })
    }
    //|| kode diatas sudah dicoba dan berhasil
    let payload = req.body;

    if(payload.category){
      let category = await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
      if(category){
        payload = {...payload, category: category._id};
      }else{
        delete payload.category;
      }
    }

    if(payload.tags && payload.tags.length){
      let tags = await Tag.find({name: {$in: payload.tags}})
      if(tags.length){
        payload = {...payload, tags: tags.map( tag => tag._id )}
      }
    }

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ];
      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/upload/${filename}`
      );
      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);

      src.on("end", async () => {
        let product = new Product({ ...payload, image_url: filename });
        await product.save();
        return res.json(product);
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      let product = new Product(payload);
      await product.save();

      return res.json(product);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      //Untuk menangani jika gagal product.save karena tipe data beda
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

//updateProduct
const update = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if(!policy.can('update','Product')){
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk update produk`
      })
    }
    let payload = req.body;

    if(payload.category){
      let category = await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
      if(category){
        payload = {...payload, category: category._id};
      }else{
        delete payload.category;
      }
    }

    if(payload.tags && payload.tags.length){
      let tags = await Tag.find({name: {$in: payload.tags}})
      if(tags.length){
        payload = {...payload, tags: tags.map( tag => tag._id )}
      }
    }

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ];
      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/upload/${filename}`
      );
      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);

      src.on("end", async () => {
        let product = await Product.findOne({ _id: req.params.id });

        let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;
        // (3) cek apakah absolute path memang ada di file system
        if (fs.existsSync(currentImage)) {
          // (4) jika ada hapus dari file system
          fs.unlinkSync(currentImage);
        }

        product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          { ...payload, image_url: filename },
          { new: true, runValidators: true }
        );
        return res.json(product);
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      let product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        payload,
        { new: true, runValidators: true }
      );

      return res.json(product);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      //Untuk menangani jika gagal product.save karena tipe data beda
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

//deleteProduct
const destroy = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if(!policy.can('delete','Product')){
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk menghapus produk`
      })
    }
    let product = await Product.findByIdAndDelete(req.params.id);
    let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    return res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, spesific, store, update, destroy };

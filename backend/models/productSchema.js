import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
      },
      tag: {
        type: String,
      },
      price: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );


  const Product = mongoose.model('Product', productSchema);

export default Product;

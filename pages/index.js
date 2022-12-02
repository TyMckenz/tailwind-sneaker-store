import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItems from '../components/ProductItems';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existingItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added To Cart');
  };
  return (
    <div>
      <Layout>
        <h2 className="flex p-8 text-2xl font-bold underline justify-center items-center">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 pb-5 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <ProductItems
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
            ></ProductItems>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

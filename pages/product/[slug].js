import Router, { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="UhOh">Product Not available</Layout>;
  }

  const addToCartHandler = async () => {
    const existingItem = state.cart.cartItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back To Home</Link>
      </div>
      <div className="grid md: grid-cols-4 md:gap-3">
        <div className="md: col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div className="p-6">
          <ul>
            <li className="pb-3">
              <h1 className="text-2xl">{product.name}</h1>
            </li>
            <li>Brand: {product.brand}</li>
            <li>Catagory: {product.catagory}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex">
              <p>${product.price}</p>
            </div>
            <div className="mb-2 flex">
              <p>{product.countInStock > 0 ? 'In Stock' : 'Sold Out'}</p>
            </div>
            <button
              className="primary-button z-full"
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

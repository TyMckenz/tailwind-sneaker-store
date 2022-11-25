import Layout from '../components/Layout';
import ProductItems from '../components/ProductItems';
import mendata from '../utils/mendata';
import womendata from '../utils/womendata';

export default function Home() {
  return (
    <div>
      <Layout>
        <h2 className="flex p-8 text-2xl font-bold underline justify-center items-center">
          Mens Shoes
        </h2>
        <div className="grid grid-cols-1 pb-5 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {mendata.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
        <h2 className="flex p-8 text-2xl font-bold underline justify-center items-center">
          Womens Shoes
        </h2>
        <div className="grid grid-cols-1 pb-5 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {womendata.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
      </Layout>
    </div>
  );
}

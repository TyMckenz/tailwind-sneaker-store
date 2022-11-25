import Layout from '../components/Layout';
import ProductItems from '../components/ProductItems';
import mendata from '../utils/mendata';
import womendata from '../utils/womendata';

export default function Home() {
  return (
    <div>
      <Layout>
        <h2 className="flex p-8 font-bold justify-center items-center">
          Mens Shoes
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {mendata.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
        <h2 className="flex p-8 font-bold justify-center items-center">
          Womens Shoes
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {womendata.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
      </Layout>
    </div>
  );
}

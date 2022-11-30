import Layout from '../components/Layout';
import ProductItems from '../components/ProductItems';
import data from '../utils/data';

export default function Home() {
  return (
    <div>
      <Layout>
        <h2 className="flex p-8 text-2xl font-bold underline justify-center items-center">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 pb-5 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {data.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
      </Layout>
    </div>
  );
}

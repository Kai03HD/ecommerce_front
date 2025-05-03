import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";




export default function HomePage({featuredProduct, newProducts})
{
  
  return(
    <div>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProduct products={newProducts} />
    </div>
  );

}

export async function getServerSideProps(){
  const featuredProductId = '68163a6af10b2836a29b7d14'
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return{
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}
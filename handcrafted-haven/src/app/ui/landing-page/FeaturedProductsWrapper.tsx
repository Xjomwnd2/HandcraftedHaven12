import Image from "next/legacy/image";
import Link from "next/link";
import styles from "./FeaturedProducts.module.css"; // Import new styles


export default async function FeaturedProductsWrapper() {


 return (
   <section className="wrapper">
     <h2>Featured Products</h2>
     <div className='card-container'>
     <FeaturedProductCard
       imageUrl="/images/vases.jpeg"
       title="Handmade Vase"
       description="A beautifully crafted ceramic vase, perfect for any home decor."
     />
     <FeaturedProductCard
       imageUrl="/images/birch-bark.jpg"
       title="Wooden Sculpture"
       description="An intricately designed wooden sculpture to add charm to your space."
     />  
     <FeaturedProductCard
       imageUrl="/images/jewlery.jpg"
       title="Beaded Necklace"
       description="A stunning, handcrafted beaded necklace to elevate your style."
     />
     </div>
   </section>
 )
};


// Reusing ProductTypeCard but applying a different style
function FeaturedProductCard({ imageUrl, title, description }: {
 imageUrl: string;
 title: string;
 description: string;
}) {
 return (
   <Link className={styles.card} href="./src/app/featured-products">
     <div className={styles.details}>
       <h3>{title}</h3>
       <p>{description}</p>
     </div>
     <Image
       className={styles.image}
       src={imageUrl}
       alt={`${title} Image`}
       width={300}
       height={200}
       objectFit="cover"
     />
   </Link>
 )}



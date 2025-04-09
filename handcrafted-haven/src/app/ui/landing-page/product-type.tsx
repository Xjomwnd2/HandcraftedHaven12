import Image from "next/legacy/image";
import Link from "next/link";
import styles from "./ProductType.module.css";

export default async function ProductTypesWrapper () {

  return (
    <section className={styles.wrapper}>
        <h2>Categories</h2>
        <ProductTypeCard imageUrl="/images/artwork.jpg" title="Artwork" description="Discover stunning, one-of-a-kind artwork crafted to inspire and captivate."/>
        <ProductTypeCard imageUrl="/images/ceramic.jpg" title="Homegoods" description="Beautifully designed pieces that blend artistry and everyday utility."/>   
        <ProductTypeCard imageUrl="/images/textile.jpg" title="Clothing / Jewelry" description="Unique pieces handcrafted to suit your unique style."/>
    </section>)
};

function ProductTypeCard ({ imageUrl, title, description }:
    {
      imageUrl: string;
      title: string;
      description: string
    }) {
    return (
        <Link className={styles.card} href="/products">
            <div className={styles.details}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <Image className={styles.image}
                src={imageUrl}
                alt={title + "Image"}
                width={300}
                height={200}
                objectFit="cover"
            />
        </Link>
    )}

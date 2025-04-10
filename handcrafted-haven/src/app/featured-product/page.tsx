"use client";
import React from "react";
import Link from "next/link";
import styles from "../ui/featured-product/FeaturedProduct.module.css";

const featuredProduct = {
  product_id: 202,
  title: "Rustic Glazed Ceramic Vase",
  description:
    "This handcrafted ceramic vase features a natural rustic glaze with earthy tones. Perfect for dried flowers or as a standalone decor piece. Each piece is unique with subtle variations in texture and color.",
  price: 85.0,
  category: "Ceramics",
  images: [
    "/images/ceramic-vase-1.jpg",
    "/images/ceramic-vase-2.jpg",
    "/images/ceramic-vase-3.jpg",
  ],
};

export default function FeaturedProductPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>🌿 Featured Ceramic Piece</h1>
      <div className={styles.productCard}>
        <div className={styles.imageGallery}>
          {featuredProduct.images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Featured Product Image ${index + 1}`}
              className={styles.image}
            />
          ))}
        </div>
        <div className={styles.details}>
          <h2>{featuredProduct.title}</h2>
          <p className={styles.description}>{featuredProduct.description}</p>
          <p className={styles.price}>${featuredProduct.price.toFixed(2)}</p>
          <p className={styles.category}>Category: {featuredProduct.category}</p>
          <Link href={`/products/${featuredProduct.product_id}`}>
            <button className={styles.button}>Explore This Piece</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import styles from "./Header_Footer.module.css";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Social Media Links */}
        <div className={styles.socialMedia}>
          <div>
            <h4>Handcrafted Haven</h4>
            <p>Connecting Artisans with Buyers</p>
            <p>© {year} Handcrafted Haven. All rights reserved.</p>
          </div>
          <div className={styles.socialMediaIcons}>
            <FaFacebook />
            <FaLinkedin />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <div>
            <h4>About</h4>
            <Link href="/"> Who We Are</Link>
          </div>
          <div>
            <h4>Privacy</h4>
            <Link href="/">Terms And Conditions</Link>
            <Link href="/">Support Team</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';

import styles from './card.module.css';

function Card({ name, imgUrl, href, alt }) {
  return (
    <Link href={href} className={cls('glass', styles.cardLink)}>
      <div className={styles.cardContent}>
        <h2 className={styles.cardHeader}>{name}</h2>
        <Image
          src={imgUrl}
          width={260}
          height={200}
          className={styles.cardImage}
          alt={alt}
        />
      </div>
    </Link>
  );
}

export default Card;

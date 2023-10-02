import styles from '@/styles/Banner.module.css';

function Banner({ buttonText, onClick }) {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          <span>Coffee</span> Connoisseur
        </h1>
        <p className={styles.subTitle}>Discover your local coffee shop!</p>
      </div>
      <button className={styles.button} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default Banner;

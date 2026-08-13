import styles from "../HeroCarousel.module.css";

export function RitualServicesArtwork() {
  return (
    <div className={styles.ritualArtwork} aria-hidden="true">
      <span className={styles.ritualRays} />
      <span className={styles.ritualParticles} />
      <span className={styles.ritualOm}>ॐ</span>
      <span className={`${styles.ritualFlower} ${styles.ritualFlowerOne}`}>✿</span>
      <span className={`${styles.ritualFlower} ${styles.ritualFlowerTwo}`}>✿</span>
      <span className={`${styles.ritualDiya} ${styles.ritualDiyaOne}`}><i /></span>
      <span className={`${styles.ritualDiya} ${styles.ritualDiyaTwo}`}><i /></span>
      <span className={styles.ritualPlatform} />
    </div>
  );
}



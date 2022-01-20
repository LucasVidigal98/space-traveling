import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="/images/Logo.svg" alt="Logo" />

          <h1>
            spacetraveling<span>.</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

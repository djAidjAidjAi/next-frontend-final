import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LoginButton from '../components/LoginButton';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DJDJ - A New Way to Experience Music</title>
        <meta name="description" content="DJDJ - A New Way to Experience Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to DJDJ
        </h1>

        <p className={styles.description}>
          Click the button below to login with your Spotify account
        </p>

        <div className={styles.loginContainer}>
          <LoginButton />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://djdj.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          DJDJ © {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
}
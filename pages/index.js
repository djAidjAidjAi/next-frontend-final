import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LoginButton from '../components/LoginButton';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 로그인 상태 체크 후 리다이렉트
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // 로딩 중이거나 로그인되지 않은 경우 로딩 표시
  if (status === 'loading' || !session) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }
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
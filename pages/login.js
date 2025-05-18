import { getProviders, signIn } from "next-auth/react";
import styles from "../styles/Login.module.css";
import Image from 'next/image';

export default function Login({ providers }) {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>DJAI</h1>
        <p className={styles.subtitle}>Click once. Remix magic awaits.</p>
        
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={styles.spotifyButton}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with Spotify
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  
  return {
    props: { providers },
  };
}
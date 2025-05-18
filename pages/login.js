import { getProviders, signIn } from "next-auth/react";
import styles from "../styles/Login.module.css";

export default function Login({ providers }) {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Login to DJDJ</h1>
        <p>A New Way to Experience Music</p>
        
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={styles.loginButton}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
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
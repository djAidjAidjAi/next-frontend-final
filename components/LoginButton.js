import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/LoginButton.module.css";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={styles.loggedInContainer}>
        <p className={styles.welcomeText}>
          Welcome, {session.user.name || "User"}!
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/profile">
            <button className={styles.profileButton}>View Profile</button>
          </Link>
          <button
            className={styles.logoutButton}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className={styles.loginButton}
      onClick={() => signIn("spotify", { callbackUrl: "/" })}
    >
      <img
        src="/spotify-logo.png"
        alt="Spotify"
        className={styles.spotifyIcon}
      />
      Login with Spotify
    </button>
  );
}
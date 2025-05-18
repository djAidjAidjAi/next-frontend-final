import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import RemixModal from "../components/modal/RemixModal";

export default function Profile() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [remixModalOpen, setRemixModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const router = useRouter();
  
  // Redirect to login page if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // User profile information retrieval
  useEffect(() => {
    if (session?.accessToken) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserProfile(data);
        })
        .catch((err) => {
          console.error("Failed to fetch user profile:", err);
        });
    }
  }, [session]);

  // Fetch user's playlists
  const fetchPlaylists = async () => {
    if (session?.accessToken) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        if (data.items) {
          setPlaylists(data.items);
          setShowPlaylists(true);
        }
      } catch (err) {
        console.error("Failed to fetch playlists:", err);
      }
    }
  };

  if (status === "loading") {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>User Profile</h1>
      {userProfile ? (
        <div className={styles.profileContainer}>
          {userProfile.images && userProfile.images.length > 0 && (
            <img
              src={userProfile.images[0].url}
              alt="Profile"
              className={styles.profileImage}
            />
          )}
          <h2>{userProfile.display_name}</h2>
          <p>Email: {userProfile.email}</p>
          <p>Spotify ID: {userProfile.id}</p>
          <p>Followers: {userProfile.followers?.total || 0}</p>
          
          <div className={styles.buttonContainer}>
            <button 
              className={styles.profileButton}
              onClick={fetchPlaylists}
            >
              View Profile
            </button>
            
            <button 
              className={styles.logoutButton}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>
          
          {showPlaylists && (
            <div className={styles.playlistsContainer}>
              <h3>My Playlists</h3>
              {playlists.length > 0 ? (
                <div className={styles.playlistsGrid}>
                  {playlists.map((playlist) => (
                    <div key={playlist.id} className={styles.playlistCard}>
                      {playlist.images && playlist.images.length > 0 ? (
                        <img 
                          src={playlist.images[0].url} 
                          alt={playlist.name} 
                          className={styles.playlistImage} 
                        />
                      ) : (
                        <div className={styles.noImage}>No Image</div>
                      )}
                      <h4>{playlist.name}</h4>
                      <p>{playlist.tracks.total} tracks</p>
                      <div className={styles.buttonGroup}>
                        <Link href={`/playlist/${playlist.id}`} className={styles.viewButton}>
                          View Details
                        </Link>
                        <button 
                          className={styles.selectButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPlaylist({
                              id: playlist.id,
                              name: playlist.name
                            });
                            setRemixModalOpen(true);
                          }}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No playlists found.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
      
      {/* Remix Modal */}
      {selectedPlaylist && (
        <RemixModal 
          isOpen={remixModalOpen}
          onClose={() => setRemixModalOpen(false)}
          playlist={selectedPlaylist}
        />
      )}
    </div>
  );
}
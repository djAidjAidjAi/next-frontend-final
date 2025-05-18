import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Playlist.module.css";
import RemixModal from "../../components/modal/RemixModal";

export default function Playlist() {
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remixModalOpen, setRemixModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch playlist information
  useEffect(() => {
    if (session?.accessToken && id) {
      setLoading(true);
      
      // Fetch playlist information
      fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylist(data);
          
          // Get playlist tracks
          if (data.tracks && data.tracks.items) {
            setTracks(data.tracks.items);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch playlist:", err);
          setLoading(false);
        });
    }
  }, [session, id]);

  if (status === "loading" || loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/profile" className={styles.backButton}>
        ← Back to Profile
      </Link>

      {playlist ? (
        <div className={styles.playlistContainer}>
          <div className={styles.playlistHeader}>
            {playlist.images && playlist.images.length > 0 ? (
              <img 
                src={playlist.images[0].url} 
                alt={playlist.name} 
                className={styles.playlistImage} 
              />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
            
            <div className={styles.playlistInfo}>
              <h1>{playlist.name}</h1>
              <p className={styles.owner}>By: {playlist.owner.display_name}</p>
              <p className={styles.description}>{playlist.description}</p>
              <p className={styles.followers}>
                Followers: {playlist.followers?.total || 0} · {tracks.length} tracks
              </p>
              
              <button 
                className={styles.selectButton}
                onClick={() => {
                  setRemixModalOpen(true);
                }}
              >
                Select
              </button>
            </div>
          </div>

          <div className={styles.tracksList}>
            <div className={styles.trackHeader}>
              <div className={styles.trackNumber}>#</div>
              <div className={styles.trackTitle}>Title</div>
              <div className={styles.trackArtist}>Artist</div>
              <div className={styles.trackAlbum}>Album</div>
              <div className={styles.trackDuration}>Duration</div>
            </div>

            {tracks.map((item, index) => {
              const track = item.track;
              if (!track) return null;
              
              // 재생 시간을 분:초 형식으로 변환
              const duration = track.duration_ms;
              const minutes = Math.floor(duration / 60000);
              const seconds = ((duration % 60000) / 1000).toFixed(0);
              const formattedDuration = `${minutes}:${seconds.padStart(2, "0")}`;

              return (
                <div key={track.id} className={styles.trackItem}>
                  <div className={styles.trackNumber}>{index + 1}</div>
                  <div className={styles.trackTitle}>
                    <div className={styles.trackImageContainer}>
                      {track.album?.images && track.album.images.length > 0 ? (
                        <img 
                          src={track.album.images[track.album.images.length - 1].url} 
                          alt={track.name} 
                          className={styles.trackImage} 
                        />
                      ) : (
                        <div className={styles.noTrackImage}></div>
                      )}
                    </div>
                    <div>
                      <div className={styles.trackName}>{track.name}</div>
                    </div>
                  </div>
                  <div className={styles.trackArtist}>
                    {track.artists?.map(artist => artist.name).join(", ")}
                  </div>
                  <div className={styles.trackAlbum}>
                    {track.album?.name}
                  </div>
                  <div className={styles.trackDuration}>{formattedDuration}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.error}>
          Playlist not found.
        </div>
      )}
      
      {/* Remix Modal */}
      {playlist && (
        <RemixModal 
          isOpen={remixModalOpen}
          onClose={() => setRemixModalOpen(false)}
          playlist={{
            id: id,
            name: playlist.name
          }}
        />
      )}
    </div>
  );
}
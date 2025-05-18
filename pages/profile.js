import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import RemixModal from "../components/modal/RemixModal";

export default function Profile() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [remixModalOpen, setRemixModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();
  const carouselRef = useRef(null);

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

  // 컴포넌트 마운트시 바로 플레이리스트 가져오기
  useEffect(() => {
    if (session?.accessToken) {
      fetchPlaylists();
    }
  }, [session]);

  // 플레이리스트 가져오기
  const fetchPlaylists = async () => {
    if (session?.accessToken) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=9", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        if (data.items) {
          setPlaylists(data.items);
          console.log("Fetched playlists:", data.items);
        }
      } catch (err) {
        console.error("Failed to fetch playlists:", err);
      }
    }
  };

  // 캐러셀 다음 버튼 클릭 함수
  const scrollCarousel = () => {
    if (carouselRef.current && playlists.length > 3) {
      const cardWidth = 225; // 카드 폭 + 마진(200px + 25px)
      const nextIndex = carouselIndex + 3 >= playlists.length ? 0 : carouselIndex + 3;
      carouselRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
      setCarouselIndex(nextIndex);
    }
  };

  if (status === "loading") {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>DJAI</div>

      {userProfile ? (
        <div className={styles.mainContent}>
          <div className={styles.userInfo}>
            <h1 className={styles.welcomeTitle}>Welcome, {userProfile.display_name || 'user123'}!</h1>
            <p className={styles.statsInfo}>
              {playlists.length || 0} public playlists
            </p>
          </div>

          <div className={styles.playlistsSection}>
            <h2 className={styles.pickTitle}>Pick a playlist for the remix genre</h2>

            <div className={styles.playlistsCarousel} ref={carouselRef}>
              {/* 플레이리스트 표시 */}
              {playlists.length > 0 ? (
                playlists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className={styles.playlistCard}
                    onClick={() => {
                      setSelectedPlaylist({
                        id: playlist.id,
                        name: playlist.name
                      });
                      setRemixModalOpen(true);
                    }}
                  >
                    {playlist.images && playlist.images.length > 0 ? (
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className={styles.playlistImage}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                    <h3 className={styles.playlistName}>{playlist.name}</h3>
                    <p className={styles.playlistOwner}>
                      By {playlist.owner?.display_name || 'You'}
                    </p>
                  </div>
                ))
              ) : (
                // 기본 플레이리스트가 없을 때 표시할 내용
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={`placeholder-${index}`} className={styles.playlistCard}>
                    <div className={styles.noImage}>No Image</div>
                    <h3 className={styles.playlistName}>Playlist #{index + 1}</h3>
                    <p className={styles.playlistOwner}>By You</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading profile information...</p>
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

import { useState, useEffect } from 'react';
import styles from '../../styles/ShareModal.module.css';

export default function ShareModal({ isOpen, onClose, playlistId, playlistName }) {
  const [copied, setCopied] = useState(false);
  const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
  
  // ESC 키 누르면 모달 닫기
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // 모달 외부 클릭시 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // 링크 복사
  const copyToClipboard = () => {
    navigator.clipboard.writeText(playlistUrl);
    setCopied(true);
    
    // 3초 후 copied 상태 초기화
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h3>플레이리스트 공유</h3>
        <p className={styles.playlistName}>{playlistName}</p>
        
        <div className={styles.linkContainer}>
          <input 
            type="text" 
            value={playlistUrl}
            className={styles.linkInput}
            readOnly
          />
          <button 
            className={styles.copyButton} 
            onClick={copyToClipboard}
          >
            {copied ? '복사됨!' : '복사'}
          </button>
        </div>
        
        <div className={styles.shareOptions}>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(playlistUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles.facebook}`}
          >
            Facebook에 공유
          </a>
          
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${playlistName} 플레이리스트를 확인해보세요!`)}&url=${encodeURIComponent(playlistUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles.twitter}`}
          >
            Twitter에 공유
          </a>
          
          <a 
            href={`https://www.instagram.com/`}
            target="_blank" 
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles.instagram}`}
          >
            Instagram에 공유
          </a>
        </div>
      </div>
    </div>
  );
}
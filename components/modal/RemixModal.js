import { useState } from 'react';
import styles from '../../styles/RemixModal.module.css';

export default function RemixModal({ isOpen, onClose, playlist }) {
  const [youtubeLink, setYoutubeLink] = useState('');

  if (!isOpen) return null;
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for creating a remix using YouTube link and playlist
    console.log('YouTube Link:', youtubeLink);
    console.log('Playlist:', playlist);
    alert('Remix request completed!');
    onClose();
  };
  
  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h3>Create Remix with YouTube</h3>
        <p className={styles.playlistName}>{playlist.name}</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="youtubeLink">YouTube Link:</label>
            <input 
              id="youtubeLink"
              type="text" 
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className={styles.linkInput}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.remixButton}
          >
            Make Remix With This YouTube + Playlist
          </button>
        </form>
      </div>
    </div>
  );
}
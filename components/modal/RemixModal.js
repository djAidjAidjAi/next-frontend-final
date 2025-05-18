import { useState } from 'react';
import styles from '../../styles/RemixModal.module.css';

export default function RemixModal({ isOpen, onClose, playlist }) {
  console.log("playlist: ", playlist);
  const [youtubeLink, setYoutubeLink] = useState('');

  if (!isOpen) return null;
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://djai-t0vj.onrender.com/tracks?youtube=${youtubeLink}&url=${playlist.id}`);

            if (!response.ok) throw new Error('Failed to generate remix');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.wav';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            onClose(); // Close the modal
        } catch (error) {
            console.error('Error downloading remix:', error);
            alert('Failed to download remix. Please try again.');
        }
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
import React from "react";
import jogPantsImage from "../assets/TrendProductImage1.jpg"; 

export default function ProductDetail() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 20px',
      gap: '40px',
      maxWidth: '1200px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
      color: '#111',
    },
    imageSection: {
      width: '100%',
    },
    image: {
      width: '100%',
      borderRadius: '12px',
      objectFit: 'cover',
    },
    infoSection: {
      flex: 1,
      maxWidth: '500px',
    },
    brand: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: '#666',
      marginBottom: '10px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '20px',
    },
    noteBox: {
      backgroundColor: '#f5f5f5',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    price: {
      fontSize: '22px',
      fontWeight: '500',
      margin: '20px 0 5px 0',
    },
    shipping: {
      fontSize: '14px',
      color: '#777',
      marginBottom: '20px',
    },
    styleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    styleLabel: {
      fontSize: '14px',
      color: '#777',
    },
    styleTag: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '14px',
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    share: {
      fontSize: '14px',
      color: '#333',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    button: {
      padding: '14px 20px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    responsiveWrapper: {
      display: 'flex',
      flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
      gap: '40px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.responsiveWrapper}>
        <div style={styles.imageSection}>
          <img src={jogPantsImage} alt="Jog 2.0 Pants" style={styles.image} />
        </div>

        <div style={styles.infoSection}>
          <p style={styles.brand}>QYNDA ACTIVE WEAR (US)</p>
          <h1 style={styles.title}>Jog 2.0 Pants</h1>

          <div style={styles.noteBox}>
            <strong>Heads up</strong>
            <p>
              This item ships directly from one of our trusted brand partners.
              Delivery times and packaging may vary slightly — but we promise it’s worth the wait.
            </p>
          </div>

          <p style={styles.price}>$85.00 USD</p>
          <p style={styles.shipping}>Shipping calculated at checkout.</p>

          <div style={styles.styleRow}>
            <span style={styles.styleLabel}>Style</span>
            <span style={styles.styleTag}>Activewear</span>
          </div>

          <p style={styles.description}>
            Light Jogger suitable all year around
          </p>

          <div style={styles.share}>🔗 Share</div>

          <button style={styles.button}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

// components/Footer.js

const Footer = ({ loading }) => {
    return (
      <footer className="footer">
        <div className="footer-content">
          {loading ? (
            <>
              <div className="footer-skeleton"></div>
              <div className="footer-skeleton"></div>
              <div className="footer-skeleton"></div>
            </>
          ) : (
            <p>&copy; 2022 Your Company Name. All rights reserved.</p>
          )}
        </div>
      </footer>
    );
  };
  
  export default Footer;
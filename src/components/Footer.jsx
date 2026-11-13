import Icon from "./Icon.jsx";

export default function Footer() {
  return (
    <footer>
      <a className="logo" href="#home"><img src="/images/image.png" alt="Melody Mark logo" />Melody <span className="logo-mark">Mark</span></a>
      <div className="soc">
        Follow Us:
        <a className="social-icon facebook" href="https://www.facebook.com/" aria-label="Visit Facebook" title="Facebook" target="_blank" rel="noopener noreferrer"><Icon name="facebook" /></a>
        <a className="social-icon instagram" href="https://www.instagram.com/" aria-label="Visit Instagram" title="Instagram" target="_blank" rel="noopener noreferrer"><Icon name="instagram" /></a>
        <a className="social-icon x" href="https://x.com/" aria-label="Visit X" title="X" target="_blank" rel="noopener noreferrer"><Icon name="x" /></a>
        <a className="social-icon youtube" href="https://www.youtube.com/" aria-label="Visit YouTube" title="YouTube" target="_blank" rel="noopener noreferrer"><Icon name="youtube" /></a>
      </div>
    </footer>
  );
}

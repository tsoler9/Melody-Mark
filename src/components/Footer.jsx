import Icon from "./Icon.jsx";

export default function Footer() {
  return (
    <footer>
      <a className="logo" href="#home"><img src="/images/image.png" alt="Melody Mark logo" />Melody <span className="logo-mark">Mark</span></a>
      <div className="soc">
        Follow Us:
        <span className="social-icon facebook" role="img" aria-label="Facebook"><Icon name="facebook" /></span>
        <span className="social-icon instagram" role="img" aria-label="Instagram"><Icon name="instagram" /></span>
        <span className="social-icon x" role="img" aria-label="X"><Icon name="x" /></span>
        <span className="social-icon youtube" role="img" aria-label="YouTube"><Icon name="youtube" /></span>
      </div>
    </footer>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { useAccount } from "../context/AccountContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";
import Icon from "./Icon.jsx";

const Switch = ({ on, label, onClick }) => (
  <button role="switch" aria-checked={on} aria-label={label} className={"sw" + (on ? " on" : "")} onClick={onClick} />
);

const CONTACT_EMAIL = "solerteejaybryan@gmail.com";
const CONTACT_PHONE = "+62 21 5550 1984";

function ContactDialog({ onClose }) {
  const closeButton = useRef(null);

  useEffect(() => {
    closeButton.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const sendMessage = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      `Name: ${form.get("name") || "Not provided"}`,
      `Reply email: ${form.get("email") || "Not provided"}`,
      "",
      form.get("message"),
    ].join("\n");
    const subject = "Melody Mark contact message";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="contact-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <div className="contact-dialog-head">
          <div>
            <h2 id="contact-title">Contact us</h2>
            <p>We'd be happy to help.</p>
          </div>
          <button ref={closeButton} type="button" className="contact-close" aria-label="Close contact dialog" onClick={onClose}>×</button>
        </div>
        <div className="contact-methods">
          <a href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`}><Icon name="phone" /><span>{CONTACT_PHONE}</span></a>
          <a href={`mailto:${CONTACT_EMAIL}`}><Icon name="mail" /><span>{CONTACT_EMAIL}</span></a>
        </div>
        <form className="contact-form" onSubmit={sendMessage}>
          <h3>Leave a message</h3>
          <label>Name <input name="name" autoComplete="name" /></label>
          <label>Your email <input name="email" type="email" autoComplete="email" /></label>
          <label>Message <textarea name="message" required rows="4" /></label>
          <p className="contact-email-note">Your email app will open with your message addressed to {CONTACT_EMAIL}.</p>
          <button className="contact-send" type="submit">Continue to email</button>
        </form>
      </section>
    </div>
  );
}

export default function Prefs({ close }) {
  const { t, prefs, setPref } = useAccount();
  const toast = useToast();
  const [contactOpen, setContactOpen] = useState(false);
  const contactTrigger = useRef(null);
  const closeContact = useCallback(() => {
    setContactOpen(false);
    contactTrigger.current?.focus();
  }, []);

  return (
    <>
      <div className="pref" role="dialog" aria-label={t("prefs")}>
        <h5>{t("prefs")}</h5>
        <div className="cap">{t("notifs")}</div>
        <div className="row"><span>{t("orderUpd")}</span><Switch on={prefs.orderUpd} label={t("orderUpd")} onClick={() => setPref("orderUpd", !prefs.orderUpd)} /></div>
        <div className="row"><span>{t("promos")}</span><Switch on={prefs.promos} label={t("promos")} onClick={() => setPref("promos", !prefs.promos)} /></div>
        <hr />
        <button ref={contactTrigger} type="button" className="row lnk" style={{ width: "100%" }} onClick={() => setContactOpen(true)}><span>{t("help")}</span><span>›</span></button>
        <hr />
        <button className="lnk out" onClick={() => { close(); toast(t("loggedOut")); navigate("home"); }}>{t("logout")}</button>
      </div>
      {contactOpen && <ContactDialog onClose={closeContact} />}
    </>
  );
}

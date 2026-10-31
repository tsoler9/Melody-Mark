import { useAccount } from "../context/AccountContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";

const Switch = ({ on, label, onClick }) => (
  <button role="switch" aria-checked={on} aria-label={label} className={"sw" + (on ? " on" : "")} onClick={onClick} />
);

export default function Prefs({ close }) {
  const { t, prefs, setPref } = useAccount();
  const toast = useToast();
  return (
    <div className="pref" role="dialog" aria-label={t("prefs")}>
      <h5>{t("prefs")}</h5>
      <div className="cap">{t("notifs")}</div>
      <div className="row"><span>{t("orderUpd")}</span><Switch on={prefs.orderUpd} label={t("orderUpd")} onClick={() => setPref("orderUpd", !prefs.orderUpd)} /></div>
      <div className="row"><span>{t("promos")}</span><Switch on={prefs.promos} label={t("promos")} onClick={() => setPref("promos", !prefs.promos)} /></div>
      <hr />
      <button className="row lnk" style={{ width: "100%" }} onClick={() => toast("hello@melodymark.com · +62 21 5550 1984")}><span>{t("help")}</span><span>›</span></button>
      <hr />
      <button className="lnk out" onClick={() => { close(); toast(t("loggedOut")); navigate("home"); }}>{t("logout")}</button>
    </div>
  );
}

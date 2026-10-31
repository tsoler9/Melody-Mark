import { useState } from "react";
import Title from "../components/Title.jsx";
import { useAccount } from "../context/AccountContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";

const BLANK = { name: "", label: "", street: "", city: "", phone: "" };
const STATS = ["inspected", "shipped", "delivered", "cancelled"];

export default function Profile() {
  const { t, profile, setProfile, addresses, saveAddr, removeAddr, orders } = useAccount();
  const toast = useToast();
  const [f, setF] = useState(profile);
  const [photo, setPhoto] = useState("");
  const [edit, setEdit] = useState(null); // null = closed, object = address form

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setA = (k) => (e) => setEdit({ ...edit, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setProfile(f); toast("Profile saved"); };
  const submitAddr = (e) => { e.preventDefault(); saveAddr(edit); setEdit(null); toast("Address saved"); };
  const pick = (e) => { const file = e.target.files?.[0]; if (file) setPhoto(URL.createObjectURL(file)); };

  return (
    <div className="wrap">
      <Title text={t("myProfile")} />
      <div className="prof">
        <div>
          <form className="box" onSubmit={submit}>
            <h3 className="ac">{t("personal")}</h3>
            <p style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {photo ? <img className="av" src={photo} alt="" /> : <span className="av">MM</span>}
              <label className="btn o" style={{ cursor: "pointer" }}>{t("photo")}<input type="file" accept="image/*" hidden onChange={pick} /></label>
            </p>
            <div className="fg">
              <label>{t("first")}<input value={f.first} onChange={set("first")} required /></label>
              <label>{t("last")}<input value={f.last} onChange={set("last")} required /></label>
              <label>{t("email")}<input type="email" value={f.email} onChange={set("email")} required /></label>
              <label>{t("phone")}<input type="tel" value={f.phone} onChange={set("phone")} required /></label>
            </div>
            <p><button className="btn" type="submit">{t("save")}</button> <button className="btn o" type="button" onClick={() => setF(profile)}>{t("cancelBtn")}</button></p>
          </form>
          <button className="btn o out" onClick={() => { toast(t("loggedOut")); navigate("home"); }}>{t("logout")}</button>
        </div>

        <div>
          <div className="box">
            <div className="bh"><h3 className="ac">{t("myOrders")}</h3><button className="linkbtn ac" onClick={() => navigate("orders")}>{t("viewAll")}</button></div>
            <div className="stat">{STATS.map((s) => <div key={s}><b>{orders.filter((o) => o.status === s).length}</b>{t(s)}</div>)}</div>
          </div>
          <div className="box">
            <h3 className="ac">{t("saved")}</h3>
            {addresses.map((a) => (
              <div className="ad" style={{ cursor: "default" }} key={a.id}>
                <span />
                <span><b>{a.name} • {a.label}</b>{a.def && <em className="badge">{t("def")}</em>}<br /><small>{a.street}<br />{a.city}<br />{a.phone}</small></span>
                <span>
                  <button className="linkbtn ac" onClick={() => setEdit(a)}>{t("edit")}</button>{" "}
                  <button className="linkbtn out" onClick={() => removeAddr(a.id)}>{t("remove")}</button>
                </span>
              </div>
            ))}
            {edit ? (
              <form className="fg" onSubmit={submitAddr}>
                {[["name", "aName"], ["label", "aLabel"], ["street", "aStreet"], ["city", "aCity"], ["phone", "phone"]].map(([k, l]) => (
                  <label key={k}>{t(l)}<input value={edit[k]} onChange={setA(k)} required={k !== "label"} /></label>
                ))}
                <span><button className="btn" type="submit">{t("save")}</button> <button className="btn o" type="button" onClick={() => setEdit(null)}>{t("cancelBtn")}</button></span>
              </form>
            ) : (
              <button className="add" onClick={() => setEdit({ ...BLANK, name: `${f.first} ${f.last}`.trim(), phone: f.phone })}>{t("addAddr")}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

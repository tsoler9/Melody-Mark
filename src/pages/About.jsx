import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";

const STATS = [["12", "Years in business"], ["8,400+", "Instruments delivered"], ["4.8/5", "Average customer rating"], ["32", "Partner brands"]];
const VALUES = [
  ["🔧", "Built to last", "Every instrument is inspected, set up and play-tested in our workshop before it ships. No exceptions, no surprises in the box."],
  ["🛡️", "Made to perform", "We only stock gear we would take on stage ourselves. If it does not hold tune or hold up on tour, it does not make the shelf."],
  ["💬", "Honest guidance", "We would rather sell you the right instrument than the expensive one. Our team plays daily and gives advice, not a sales pitch."],
  ["🤝", "Care after the sale", "Free first setup, lifetime restringing and a repair bench that stays open long after your warranty ends."],
];
const TIMELINE = [
  ["2014", "A repair bench in a garage", "Melody Mark started as a one-person guitar repair bench, fixing instruments for local bands between gigs."],
  ["2017", "The first shop opens", "We moved into a storefront with a small stage in the back so players could try before they bought."],
  ["2021", "Online store launch", "Our catalog went nationwide, with the same in-house setup and inspection on every order that leaves the building."],
  ["2026", "A workshop and a school", "Today we run a full service workshop, a teaching studio and a community stage for local musicians."],
];

export default function About() {
  const toast = useToast();
  return (
    <div className="wrap">
      <div className="story">
        <div>
          <small className="ac">OUR STORY</small>
          <h1>We keep musicians <span className="ac">playing</span></h1>
          <p><b className="ac">Built to last. Made to perform.</b> Melody Mark began as a single repair bench and grew into a shop, a workshop and a small community stage, all run by people who play every day.</p>
          <button className="btn" onClick={() => navigate("shop")}>Browse the shop</button>{" "}
          <button className="btn o" onClick={() => toast("Workshop bookings open soon")}>Visit our workshop</button>
        </div>
        <div className="pic" style={{ "--h": 240 }}>🎹</div>
      </div>

      <div className="stats">
        {STATS.map(([a, b]) => <div key={b}><b>{a}</b><small className="mut">{b}</small></div>)}
      </div>

      <h2>What we stand for</h2>
      <div className="vals">
        {VALUES.map(([icon, title, text]) => (
          <div key={title}><b>{icon} {title}</b><p className="mut">{text}</p></div>
        ))}
      </div>

      <h2>How we got here</h2>
      <div className="tl">
        {TIMELINE.map(([year, title, text]) => (
          <div key={year}><h4>{year}</h4><b>{title}</b><p>{text}</p></div>
        ))}
      </div>

      <div className="story" style={{ marginTop: 30 }}>
        <div className="pic" style={{ "--h": 30 }}>🎸🥁</div>
        <div>
          <h2>Come play in person</h2>
          <p>Our shop floor is open seven days a week. Bring your own gear for a free health check, or book a slot at the workshop bench.</p>
          <p className="mut">📍 Jl. Melodi Raya No. 21, Jakarta Selatan<br />📞 +62 21 5550 1984<br />✉️ hello@melodymark.com</p>
          <button className="btn" onClick={() => navigate("shop")}>Shop instruments</button>
        </div>
      </div>
    </div>
  );
}

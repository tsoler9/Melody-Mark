// Page heading with the last word in the accent colour ("My <orders>").
export default function Title({ text }) {
  const w = text.split(" ");
  const last = w.pop();
  return <h1>{w.join(" ")} <span className="ac">{last}</span></h1>;
}

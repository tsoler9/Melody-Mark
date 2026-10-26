export default function Qty({ value, onChange }) {
  return (
    <span className="qty">
      <button aria-label="Decrease" onClick={() => onChange(-1)}>−</button>
      <b>{value}</b>
      <button aria-label="Increase" onClick={() => onChange(1)}>+</button>
    </span>
  );
}

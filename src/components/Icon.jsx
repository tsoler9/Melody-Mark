const ICONS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
  cart: <><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  settings: <><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /><path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.7a8.3 8.3 0 0 1-1.8 1l-.3 1.9h-3l-.3-1.9a8.3 8.3 0 0 1-1.8-1l-1.7.7-1.5-2.6 1.5-1.1a7.5 7.5 0 0 1 0-2l-1.5-1.1 1.5-2.6 1.7.7a8.3 8.3 0 0 1 1.8-1l.3-1.9h3l.3 1.9a8.3 8.3 0 0 1 1.8 1l1.7-.7 1.5 2.6-1.5 1.1a7.5 7.5 0 0 1 0 1Z" transform="translate(-1 -1)" /></>,
  wrench: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z" /></>,
  shield: <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />,
  message: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" /><path d="M8 12h8m-8-3h5" /></>,
  heart: <path d="M20.8 8.7c0 5.4-8.8 11.3-8.8 11.3S3.2 14.1 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />,
  piano: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v9m4-9v9m4-9v9m4-9v9M5 14h14" /></>,
  guitar: <><path d="M14.5 5.5 18 2l4 4-3.5 3.5M14.5 5.5l4 4M14.5 5.5l-3 3a5 5 0 0 0-6.5 6.5l-2 2a2.1 2.1 0 0 0 3 3l2-2a5 5 0 0 0 6.5-6.5l3-3" /><circle cx="9" cy="14" r="1.5" /></>,
  drums: <><path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v7c0 1.7 3.6 3 8 3m8-10v7c0 1.1-1.6 2-4 2" /><path d="M7 13v6c0 1.1 2.2 2 5 2s5-.9 5-2v-6m-10 0c0-1.1 2.2-2 5-2s5 .9 5 2-2.2 2-5 2-5-.9-5-2Zm7-5 5 12" /></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  filter: <><path d="M4 7h16M7 12h10m-7 5h4" /><circle cx="8" cy="7" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="10" cy="17" r="1.5" /></>,
  trash: <><path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
  truck: <><path d="M3 6h12v12H3zM15 10h4l3 4v4h-7" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="18.5" cy="19" r="1.5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  facebook: <path fill="currentColor" stroke="none" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6.5" r=".7" fill="currentColor" /></>,
  x: <path fill="currentColor" stroke="none" d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.5 21H3.3l7.3-8.4L2.8 3h6.5l4.5 5.9L18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z" />,
  youtube: <><rect x="2.5" y="5" width="19" height="14" rx="4" fill="currentColor" /><path d="m10 9 5 3-5 3V9Z" fill="#000" stroke="none" /></>,
};

export default function Icon({ name, size = 20, className = "" }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}

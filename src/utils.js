const money = new Intl.NumberFormat("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const peso = (n) => "₱" + money.format(n);
export const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
export const imgSrc = (id) => `${import.meta.env.BASE_URL}images/${id}.webp`;

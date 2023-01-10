function PriceFormat({ price }) {
  return new Intl.NumberFormat("hi-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export default PriceFormat;

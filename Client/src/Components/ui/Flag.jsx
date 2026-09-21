export default function Flag({ code, className = "" }) {
  if (!code) return null;
  const c = code.trim().toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/24x18/${c}.png`}
      srcSet={`https://flagcdn.com/48x36/${c}.png 2x`}
      width={20}
      height={15}
      alt=""
      loading="lazy"
      className={`inline-block shrink-0 rounded-[2px] object-cover ${className}`}
      // if a code somehow has no flag on the CDN, just hide it rather than
      // showing a broken-image icon
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden";
      }}
    />
  );
}
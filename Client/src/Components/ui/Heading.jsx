export default function Heading({ heading, subHeading }) {
  return (
    <div className="space-y-2 md:space-y-2.5">
      <h2 className="text-3xl md:text-5xl text-[#222222]">
        {heading}
      </h2>

      {subHeading && (
        <h5 className="text-xs font-bold text-[#0156D2]">
          {subHeading.toUpperCase()}
        </h5>
      )}
    </div>
  );
}
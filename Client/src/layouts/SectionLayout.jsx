export default function SectionLayout({ children, id, className = "scroll-mt-24" }) {
  return (
    <section id={id} className={`${className} max-w-11/12 mx-auto py-20`}>
      {children}
    </section>
  );
}
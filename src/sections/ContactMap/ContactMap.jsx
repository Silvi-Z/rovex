import './ContactMap.css';

/**
 * The frame places a flat map image here, full-bleed, not a live embed — so
 * this renders the exported image rather than introducing an iframe and a
 * third-party dependency the design does not ask for.
 */
export default function ContactMap() {
  return (
    <section className="cmap">
      <img
        className="cmap__img"
        src="/assets/contact-map.png"
        width="1440"
        height="351"
        alt="Նիկողայոս Ադոնց 4/3, Երևան"
      />
    </section>
  );
}

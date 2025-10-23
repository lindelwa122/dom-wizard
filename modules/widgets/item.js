export function Item({ text, onClick, styles = {} }) {
  return {
    tagName: "li",
    children: [text],
    options: {
      style: {
        cursor: onClick ? "pointer" : "default",
        padding: "6px 10px",
        transition: "background 0.2s ease",
        borderRadius: "6px",
        ...styles,
      },
      onclick: onClick || null,
      onmouseenter: onClick ? (e) => e.target.style.background = "#f3f3f3" : null,
      onmouseleave: onClick ? (e) => e.target.style.background = "" : null,
    },
  }

}

widget.Navbar = function ({
  icon,
  title,
  links = [],
  onLinkClick,
  styles = {},
  linkStyles = {},
  iconStyles = {},
  titleStyles = {},
  hamburgerIcon = "☰",
}) {
  // === Base Navbar Container ===
  const navbar = Div({
    class: "dw-navbar",
    style: Object.assign({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #ddd",
      position: "relative",
      zIndex: "10",
    }, styles),
  });

  // === Left Side (Icon + Title) ===
  const leftSection = Div({
    class: "dw-navbar-left",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  });

  if (icon) {
    const iconElement =
      typeof icon === "string"
        ? Span({ text: icon, style: Object.assign({ fontSize: "20px" }, iconStyles) })
        : icon; // if a DomWizard element was passed
    leftSection.append(iconElement);
  }

  if (title) {
    const titleElement = Span({
      text: title,
      style: Object.assign(
        {
          fontWeight: "600",
          fontSize: "18px",
          color: "#222",
        },
        titleStyles
      ),
    });
    leftSection.append(titleElement);
  }

  navbar.append(leftSection);

  // === Right Side (Links) ===
  const linkContainer = Div({
    class: "dw-navbar-links",
    style: {
      display: "flex",
      gap: "20px",
    },
  });

  links.forEach((link) => {
    const linkEl =
      link.tagName
        ? link // already a DomWizard element (like Item)
        : Span({
            text: link.text || link,
            style: Object.assign(
              {
                cursor: "pointer",
                color: "#333",
                textDecoration: "none",
                fontSize: "16px",
                transition: "color 0.3s",
              },
              linkStyles
            ),
            onclick: () => {
              if (onLinkClick) onLinkClick(link.text || link);
              if (link.onClick) link.onClick();
            },
          });

    linkEl.onmouseenter = () => (linkEl.style.color = "#007BFF");
    linkEl.onmouseleave = () => (linkEl.style.color = linkStyles.color || "#333");

    linkContainer.append(linkEl);
  });

  navbar.append(linkContainer);

  // === Hamburger Menu ===
  const hamburger = Span({
    class: "dw-navbar-hamburger",
    text: hamburgerIcon,
    style: {
      display: "none",
      fontSize: "24px",
      cursor: "pointer",
      userSelect: "none",
    },
  });

  navbar.append(hamburger);

  hamburger.onclick = () => {
    const isHidden = linkContainer.style.display === "none";
    linkContainer.style.display = isHidden ? "flex" : "none";
  };

  // === Responsive Behavior ===
  const handleResize = () => {
    if (window.innerWidth < 640) {
      linkContainer.style.display = "none";
      linkContainer.style.flexDirection = "column";
      linkContainer.style.backgroundColor = "#fff";
      linkContainer.style.position = "absolute";
      linkContainer.style.top = "60px";
      linkContainer.style.right = "20px";
      linkContainer.style.padding = "10px 20px";
      linkContainer.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
      hamburger.style.display = "block";
    } else {
      linkContainer.style.display = "flex";
      linkContainer.style.flexDirection = "row";
      linkContainer.style.position = "static";
      linkContainer.style.boxShadow = "none";
      hamburger.style.display = "none";
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize(); // initial check

  // === Return Navbar ===
  return navbar;
};

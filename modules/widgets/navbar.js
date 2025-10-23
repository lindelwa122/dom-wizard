/**
 * Creates a responsive Navbar widget using DomWizard elements.
 *
 * On desktop, displays the icon, title, and links inline.
 * On mobile, collapses into a hamburger menu that toggles a dropdown.
 *
 * @param {Object} options - Configuration for the Navbar widget.
 * @param {string|Object} [options.icon] - Logo or icon element; can be text, image URL, or custom element.
 * @param {string} [options.title] - Title displayed next to the icon.
 * @param {Array<Object>} options.links - List of link objects or widget.Item elements.
 * @param {function(string): void} [options.onLinkClick] - Callback when a link is clicked, receives the link text/value.
 * @param {Object} [options.styles] - Style overrides for the navbar container.
 * @param {Object} [options.linkStyles] - Style overrides for individual links.
 * @param {Object} [options.iconStyles] - Style overrides for the icon/logo.
 * @param {Object} [options.titleStyles] - Style overrides for the title text.
 * @returns {DomWizardElement} A DomWizard element representing the responsive navbar.
 *
 * @example
 * const links = [
 *   widget.Item({ text: 'Home', onClick: () => console.log('Home clicked') }),
 *   widget.Item({ text: 'About' }),
 *   widget.Item({ text: 'Contact' }),
 * ];
 *
 * const navbar = widget.Navbar({
 *   icon: '🌐',
 *   title: 'DomWizard',
 *   links,
 *   onLinkClick: (link) => console.log(`${link} clicked`),
 * });
 *
 * domManager.create(navbar, document.body);
 */
export const Navbar = ({
    icon,
    title,
    links,
    onLinkClick,
    styles = {},
    linkStyles = {},
    iconStyles = {},
    titleStyles = {},
}) => {
    if (!Array.isArray(links))
        throw new TypeError("Navbar requires an array of links.");

    let isMenuOpen = false;

    // default styles
    const defaultStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#111",
        color: "#fff",
        position: "relative",
        flexWrap: "wrap",
    };

    const defaultLinkStyles = {
        color: "#fff",
        textDecoration: "none",
        cursor: "pointer",
        padding: "8px 12px",
        display: "block",
    };

    let iconEl = null;
    if (typeof icon === "string") {
        iconEl =
            icon.startsWith("http") ||
            icon.endsWith(".png") ||
            icon.endsWith(".svg")
                ? {
                      tagName: "img",
                      options: {
                          src: icon,
                          style: {
                              width: "28px",
                              height: "28px",
                              ...iconStyles,
                          },
                      },
                  }
                : {
                      tagName: "span",
                      options: {
                          textContent: icon,
                          style: { fontSize: "22px", ...iconStyles },
                      },
                  };
    } else if (icon && typeof icon === "object") {
        iconEl = icon;
    }

    // Title element
    const titleEl = title
        ? {
              tagName: "span",
              options: {
                  textContent: title,
                  style: {
                      fontWeight: "600",
                      marginLeft: "8px",
                      fontSize: "18px",
                      ...titleStyles,
                  },
              },
          }
        : null;

    const brand = {
        tagName: "div",
        children: [iconEl, titleEl].filter(Boolean),
        options: {
            style: { display: "flex", alignItems: "center", gap: "6px" },
        },
    };

    const navLinks = {
        tagName: "div",
        children: links.map((link, i) =>
            link.text
                ? {
                      tagName: "a",
                      options: {
                          textContent: link.text,
                          onclick: () => {
                              onLinkClick && onLinkClick(link.text);
                              link.onClick && link.onClick();
                              if (window.innerWidth < 700) toggleMenu();
                          },
                          style: { ...defaultLinkStyles, ...linkStyles },
                      },
                  }
                : link
        ),
        options: {
            className: "navbar-links",
            style: {
                display: "flex",
                gap: "10px",
                flexDirection: "row",
            },
        },
    };

    const hamburger = {
        tagName: "div",
        options: {
            innerHTML: "&#9776;", // ☰
            className: "navbar-hamburger",
            onclick: () => toggleMenu(),
            style: {
                fontSize: "22px",
                cursor: "pointer",
                display: "none",
                userSelect: "none",
            },
        },
    };

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        const nav = document.querySelector(".navbar-links");
        if (nav) nav.style.display = isMenuOpen ? "flex" : "none";
    };

    const applyResponsive = () => {
        const nav = document.querySelector(".navbar-links");
        const ham = document.querySelector(".navbar-hamburger");
        if (window.innerWidth < 700) {
            nav.style.display = isMenuOpen ? "flex" : "none";
            nav.style.flexDirection = "column";
            nav.style.width = "100%";
            nav.style.backgroundColor = "#111";
            ham.style.display = "block";
        } else {
            nav.style.display = "flex";
            nav.style.flexDirection = "row";
            ham.style.display = "none";
        }
    };
    window.addEventListener("resize", applyResponsive);
    setTimeout(applyResponsive, 0);

    return {
        tagName: "nav",
        children: [brand, hamburger, navLinks],
        options: {
            className: "navbar",
            style: { ...defaultStyles, ...styles },
        },
    };
};

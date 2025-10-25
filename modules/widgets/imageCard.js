
/**
 * Creates an ImageCard widget — a card displaying an image and optional content below.
 *
 * @param {function(): (object[]|object)} renderContent - Callback returning elements (widgets or text) below the image.
 * @param {object} options - Configuration.
 * @param {string} options.imageSrc - URL or path to the image.
 * @param {string} [options.imageAlt=""] - Alt text for accessibility.
 * @param {object} [options.imageStyles={}] - Style overrides for the image.
 * @param {string} [options.heading] - Optional heading below the image.
 * @param {object} [options.styles={}] - Optional container style overrides.
 * @returns {DomWizardElement} A domManager element representing the image card.
 */
export const ImageCard = (renderContent, options = {}) => {
    const {
        imageSrc,
        imageAlt = "",
        imageStyles = {},
        heading,
        styles = {},
    } = options;

    const children = [
        {
            tagName: "img",
            options: {
                src: imageSrc,
                alt: imageAlt,
                style: {
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                    ...imageStyles,
                },
            },
        },
    ];

    if (heading) {
        children.push({
            tagName: "h3",
            options: {
                textContent: heading,
                style: {
                    margin: "10px 0 6px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                },
            },
        });
    }

    const rendered = renderContent();
    if (Array.isArray(rendered)) children.push(...rendered);
    else if (rendered) children.push(rendered);

    return {
        tagName: "div",
        children,
        options: {
            style: {
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "320px",
                ...styles,
            },
        },
    };
};

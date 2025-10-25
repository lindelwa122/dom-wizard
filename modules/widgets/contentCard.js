/**
 * Creates a ContentCard widget — a minimal, styled container for content or other widgets.
 *
 * @param {function(): (object[]|object)} renderContent - Callback returning elements (widgets or text) to display inside the card.
 * @param {object} [options={}] - Optional settings.
 * @param {string} [options.heading] - Optional heading displayed at the top.
 * @param {object} [options.styles={}] - Optional style overrides for the card container.
 * @returns {DomWizardElement} A domManager element representing the content card.
 */
export const ContentCard = (renderContent, options = {}) => {
    const { heading, styles = {} } = options;

    const children = [];

    if (heading) {
        children.push({
            tagName: "h3",
            options: {
                textContent: heading,
                style: {
                    margin: "0 0 8px 0",
                    fontSize: "18px",
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

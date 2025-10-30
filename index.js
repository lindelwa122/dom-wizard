import domManager from './modules/domManager';
import cssManager from './modules/cssManager';
import router from './modules/router';
import store from './modules/store';

cssManager.addRule({ body: 'transition: opacity .25s' });

const defaultCardStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    padding: '20px',
    margin: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    maxWidth: '400px',
    boxSizing: 'border-box',
};

const defaultImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
};

/**
 * A private helper function to encapsulate the common card structure logic.
 * @param {object} options - Options for building the base card.
 * @param {function(): (DomWizardElement|DomWizardElement[])} options.renderContent - Function returning content elements to be displayed inside the card.
 * @param {string} [options.heading] - Optional heading text for the card.
 * @param {object} [options.styles] - Optional additional styles to apply to the main card container, overriding defaults.
 * @returns {DomWizardElement} The fully constructed base card DOM element.
 */
function _buildCardBase({ renderContent, heading, styles = {} }) {
    const cardElement = domManager.createElement('div');

    const mergedCardStyles = { ...defaultCardStyles, ...styles };
    cssManager.applyStyles(cardElement, mergedCardStyles);

    if (heading) {
        const headingElement = domManager.createElement('h1');
        cssManager.applyStyles(headingElement, { margin: '0', fontSize: '1.5em', color: '#333' });
        headingElement.textContent = heading;
        domManager.appendChild(cardElement, headingElement);
    }

    const content = renderContent();
    if (Array.isArray(content)) {
        domManager.appendChildren(cardElement, content);
    } else if (content) {
        domManager.appendChild(cardElement, content);
    }

    return cardElement;
}

/**
 * Creates a card displaying custom content and an optional heading.
 * @param {object} options - Options for the content card.
 * @param {function(): (DomWizardElement|DomWizardElement[])} options.renderContent - Function returning content elements for the card.
 * @param {string} [options.heading] - Optional heading text.
 * @param {object} [options.styles] - Optional additional styles for the card container.
 * @returns {DomWizardElement} The constructed content card element.
 */
function ContentCard(options) {
    return _buildCardBase(options);
}

/**
 * Creates a card featuring an image at the top, followed by an optional heading and custom content.
 * @param {object} options - Options for the image card.
 * @param {string} options.imageSrc - The source URL for the image.
 * @param {string} [options.imageAlt=''] - The alt text for the image.
 * @param {object} [options.imageStyles] - Optional additional styles to apply to the image element, overriding defaults.
 * @param {function(): (DomWizardElement|DomWizardElement[])} options.renderContent - Function returning content elements for the card.
 * @param {string} [options.heading] - Optional heading text.
 * @param {object} [options.styles] - Optional additional styles for the card container.
 * @returns {DomWizardElement} The constructed image card element.
 */
function ImageCard({ imageSrc, imageAlt = '', imageStyles = {}, ...commonOptions }) {
    const cardElement = _buildCardBase(commonOptions);

    const imageElement = domManager.createElement('img');
    imageElement.setAttribute('src', imageSrc);
    imageElement.setAttribute('alt', imageAlt);

    const mergedImageStyles = { ...defaultImageStyles, ...imageStyles };
    cssManager.applyStyles(imageElement, mergedImageStyles);

    domManager.prependChild(cardElement, imageElement);

    return cardElement;
}

const DomWizard = {
    domManager,
    cssManager,
    router,
    store,
    widget: {
        ContentCard,
        ImageCard,
    },
};

export default DomWizard;
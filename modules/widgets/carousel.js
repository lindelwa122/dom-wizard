import { nanoid } from "nanoid";
import { cssManager } from "dom-wizard";

/**
 * Creates an ImageCarousel using domManager elements.
 *
 * @param {Array<Object>} images - Array of image objects: { src: 'url', alt: 'description' }.
 * @param {Object} [options] - Optional settings.
 * @param {number} [options.interval=3000] - Time in ms between automatic slides.
 * @param {boolean} [options.showControls=true] - Whether to show arrows and dots.
 * @param {Object} [options.styles] - CSS styles for the carousel container.
 * @param {Object} [options.imageStyles] - CSS styles for images.
 * @param {function} [options.onImageClick] - Called when an image is clicked: (src, index) => {}.
 * @throws an error if images is not a non empty array of {src, alt}
 * @returns {DomWizardElement} A domManager element representing the carousel.
 */

cssManager.createCSSRules([
    {
    ".slider-container": `
      position: relative;
      width: 500px;
      height: 300px;
      overflow: hidden;
      margin: 50px auto;
      border: 2px solid #ccc;
      border-radius: 10px;
    `,
    },
    {
    ".slider-image": `
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 0;
      transition: opacity 0.5s ease;
      position: absolute;
      top: 0;
      left: 0;
    `,
    },
    {
    ".slider-image.active": `
      opacity: 1;
      position: relative;
    `,
    },
    {
    ".slider-overlay": `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `,
    },
    {
    ".slider-prev, .slider-next": `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: auto;
      font-size: 2rem;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 0.5rem 1rem;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
    `,
    },
    {
    ".slider-prev": `
      left: 10px;
    `,
    },
    {
    ".slider-next": `
      right: 10px;
    `,
    },
    {
        ".slider-counter": `
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 5px;
      font-size: 0.9rem;
    `,
    },
    {
    ".slider-dots": `
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 5px;
    `,
    },
    {
    ".slider-dot": `
      width: 12px;
      height: 12px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      cursor: pointer;
    `,
    },
    {
    ".slider-dot.active": `
      background-color: #fff;
    `,
    },
]);

export const ImageCarousel = (images, options = {}) => {
    if (!Array.isArray(images) || images.length === 0)
        throw new Error("images must be a non-empty array of { src, alt }");

    images.forEach((img) => {
        if (!img.src || !img.alt)
            throw new Error("Each image must have src and alt");
    });

    const id = "d" + nanoid();

    const {
        interval = 3000,
        showControls = true,
        showDots = true,
        styles = {},
        imageStyles = {},
        onImageClick,
    } = options;

    let imagesEl = [];
    let currentIndex = 0;

    images.forEach((img, index) => {
        console.log("index" + index);

        imagesEl.push({
            tagName: "img",
            options: {
                src: img.src,
                alt: img.alt,
                className:
                    "slider-image" + (currentIndex == index ? " active" : ""),
                style: imageStyles,
                onclick: () => onImageClick && onImageClick(img.src, index),
            },
        });
    });

    let sliderPrev = {};
    let sliderNext = {};
    let sliderCounter = {};

    // Control switch
    if (showControls) {
        sliderPrev = {
            text: "❮",
            options: {
                className: "slider-prev",
                onclick: () => {
                    currentIndex =
                        (currentIndex - 1 + images.length) % images.length;
                    updateSlider();
                },
            },
        };

        sliderNext = {
            text: "❯",
            options: {
                className: "slider-next",
                onclick: () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateSlider();
                },
            },
        };

        sliderCounter = {
            text: `1 / ${images.length}`,
            options: {
                className: "slider-counter",
            },
        };
    }

    let sliderDots = {};

    // Dots switch
    if (showDots) {
        const allSliderDots = [];

        const imagesLen = images.length;

        for (let i = 0; i < imagesLen; i++) {
            const sliderDot = {
                options: {
                    className:
                        "slider-dot" + (currentIndex == i ? " active" : ""),
                },
            };
            allSliderDots.push(sliderDot);
        }

        sliderDots = {
            children: allSliderDots,
            options: {
                className: "slider-dots",
            },
        };
    }

    const sliderOverlay = {
        children: [sliderPrev, sliderNext, sliderCounter, sliderDots],
        options: { className: "slider-overlay" },
    };

    function updateSlider() {
        const slider = document.getElementById(id);
        const imageEl = slider.querySelectorAll(".slider-image");
        const counter = slider.querySelector(".slider-counter");

        imageEl.forEach((img, i) =>
            img.classList.toggle("active", i === currentIndex)
        );
        counter.textContent = `${currentIndex + 1} / ${imageEl.length}`;

        if (showDots) {
            const dots = slider.querySelectorAll(".slider-dot");
            dots.forEach((dot, i) =>
                dot.classList.toggle("active", i === currentIndex)
            );
        }
    }

    // Automatically scroll through the carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }, interval);

    // Finally return Dom Wizard Element
    return {
        children: [...imagesEl, sliderOverlay],
        options: {
            id: id,
            className: "slider-container",
            style: styles,
        },
    };
};

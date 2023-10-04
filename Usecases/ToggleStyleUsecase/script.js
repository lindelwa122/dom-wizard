const button = document.getElementById('toggleButton');
const oldStyles = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
};
const activeStyles = {
    backgroundColor: '#e74c3c',
};
let isButtonActive = false;
button.addEventListener('click', () => {
    isButtonActive = !isButtonActive;
    toggleStyles(button, activeStyles, oldStyles, isButtonActive);
});

function toggleStyles(element, styles, oldStyles, toggleOn = true) {
    for (const property in styles) {
        element.style[property] = toggleOn ? styles[property] : oldStyles[property];
    }
}

/**
 * Combines an existing Label and Input widget into a single, cohesive element.
 *
 * This widget does not create new label/input elements — it accepts already
 * created `widget.Label` and `widget.Input` instances and groups them in a
 * styled container. The container styles can be overridden via the `styles`
 * parameter.
 *
 * @param {widget.Label} label - An existing Label widget instance.
 * @param {widget.Input} input - An existing Input widget instance.
 * @param {Object} [styles={}] - Optional CSS style overrides for the container.
 * @returns {DomWizardElement} A DomWizard element wrapping the label and input.
 */
export const LabelInput = (label, input, styles = {}) => {
    const defaultStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginBottom: "12px",
        
        width: "100%",
    };

    return {
        children: [label, input],
        options: {
            style: { ...defaultStyles, ...styles },
        },
    };
};

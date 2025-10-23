/**
 * Creates a Table widget using DomWizard elements.
 *
 * Renders a fully styled and responsive table. Each row and cell can have
 * click handlers. Supports custom column definitions and empty state messages.
 *
 * @param {Array<Object>} data - Array of objects representing table rows.
 * @param {Array<string|Object>} columns - Defines which columns to display.
 *      If object: { key: 'propertyName', label: 'Column Label' }.
 * @param {Object} [options={}] - Optional configuration.
 * @param {Object} [options.styles={}] - CSS style overrides for the table.
 * @param {function(Object, number): void} [options.onRowClick] - Called when a row is clicked; receives (rowData, rowIndex).
 * @param {function(Object, string, number, number): void} [options.onCellClick] - Called when a cell is clicked; receives (rowData, key, rowIndex, colIndex).
 * @param {string} [options.caption] - Adds a caption/title above the table.
 * @param {string} [options.emptyMessage="No data available"] - Message to show when `data` is empty.
 *
 * @returns {DomWizardElement} A DomWizard element representing the table.
 *
 * @example
 * const data = [
 *   { name: "Elvis", age: 21 },
 *   { name: "Paris", age: 20 },
 * ];
 * const columns = [
 *   { key: "name", label: "Full Name" },
 *   "age"
 * ];
 *
 * const table = widget.Table(data, columns, {
 *   caption: "User List",
 *   onRowClick: (row) => console.log("Row clicked:", row),
 *   styles: { border: "1px solid #ccc", width: "100%" },
 * });
 *
 * domManager.create(table, document.body);
 */
export const Table = (data, columns, options = {}) => {
    const {
        styles = {},
        onRowClick,
        onCellClick,
        caption,
        emptyMessage = "No data available",
    } = options;

    // Map columns to objects { key, label }
    const cols = columns.map((col) =>
        typeof col === "string" ? { key: col, label: col } : col
    );

    // Table rows
    const rows = (data.length ? data : [null]).map((rowData, rowIndex) => {
        if (!rowData) {
            return {
                tagName: "tr",
                children: [
                    {
                        tagName: "td",
                        options: {
                            textContent: emptyMessage,
                            colSpan: cols.length,
                            style: { textAlign: "center", padding: "8px" },
                        },
                    },
                ],
            };
        }

        return {
            tagName: "tr",
            options: {
                onclick: () => onRowClick && onRowClick(rowData, rowIndex),
                style: { cursor: onRowClick ? "pointer" : "default" },
            },
            children: cols.map((col, colIndex) => ({
                tagName: "td",
                options: {
                    textContent: rowData[col.key],
                    onclick: (e) => {
                        e.stopPropagation();
                        onCellClick &&
                            onCellClick(rowData, col.key, rowIndex, colIndex);
                    },
                    style: { padding: "8px", border: "1px solid #ccc" },
                },
            })),
        };
    });

    // Table header
    const thead = {
        tagName: "thead",
        children: [
            {
                tagName: "tr",
                children: cols.map((col) => ({
                    tagName: "th",
                    options: {
                        textContent: col.label,
                        style: {
                            padding: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: "#787878",
                            textAlign: "left",
                        },
                    },
                })),
            },
        ],
    };

    // Table body
    const tbody = { tagName: "tbody", children: rows };

    // Caption element if provided
    const captionEl = caption
        ? {
              tagName: "caption",
              options: {
                  textContent: caption,
                  style: {
                      captionSide: "top",
                      fontWeight: "bold",
                      marginBottom: "8px",
                  },
              },
          }
        : null;

    return {
        tagName: "table",
        children: captionEl ? [captionEl, thead, tbody] : [thead, tbody],
        options: {
            style: { borderCollapse: "collapse", width: "100%", ...styles },
        },
    };
};

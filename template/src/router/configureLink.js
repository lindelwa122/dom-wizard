/**
 * Configures a link with the given linkInfo object.
 * @param {Object} linkInfo - The link information object.
 * @param {string} linkInfo.name - The name of the link.
 * @param {string} linkInfo.to - The ID of the page to link to.
 * @param {HTMLElement} linkInfo.element - The HTML element to attach the click event listener to.
 * @throws {Error} Invalid linkInfo object if name, to, or element is missing.
 * @throws {Error} Invalid page ID if the page with the given ID does not exist.
 */
function ConfigureLink(linkInfo) {
    // Validate linkInfo object
    if (!linkInfo.name || !linkInfo.to || !linkInfo.element) {
      throw new Error('Invalid linkInfo object');
    }
  
    // Get the page object from the private array
    const page = router.getPage(linkInfo.to);
    if (!page) {
      throw new Error('Invalid page ID');
    }
  
    // Add the linkInfo object to the private array
    router.links.push(linkInfo);
  
    // Add a click event listener to the element
    linkInfo.element.addEventListener('click', () => {
      // Deactivate all links
      router.deactivateLinks(linkInfo.name);
  
      // Create the element for the page
      const element = domManager(page, linkInfo.host);
  
      // Activate the link
      router.activateLink(linkInfo.name);
  
      // Append the element to the DOM
      document.querySelector('#root').appendChild(element);
    });
  }
  
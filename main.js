// This file is used to load the Stencil components
// It will be imported by the Storybook preview

// Create a global object to hold the Wire UI components
window.WireUI = window.WireUI || {};

// Add debugging for WireUI object
console.log('WireUI global object initialized', {
  hasDefineCustomElements: 'defineCustomElements' in window.WireUI,
  customElementsCount: Object.keys(window.customElements || {}).length
});

// Export an empty object to satisfy module requirements
export default {}; 
/**
 * Color Palette System for Elementary CA Visualizer
 *
 * Provides Synthwave/Neon and Vaporwave/Pastels color palettes with
 * gradient generation and interpolation utilities.
 *
 * @author Claude (Sonnet 4.5)
 * @date 2025-10-21
 */

// ============================================================================
// PALETTE DEFINITIONS
// ============================================================================

/**
 * All available color palettes
 * @constant {Object}
 */
const PALETTES = {
  synthwave: {
    name: 'Synthwave',
    description: 'Hot neon colors - pink, cyan, electric blue (toned down)',
    background: '#0a0a0a',
    alive: '#ff00ff',      // Hot pink - default for CA cells
    dead: '#0a0a0a',       // Near-black
    colors: {
      primary: '#ff00ff',   // Hot pink
      secondary: '#00b8b8', // Cyan (toned down from #00ffff)
      tertiary: '#ff0080',  // Pink
      quaternary: '#0066cc' // Electric blue (toned down from #0080ff)
    },
    gradients: [
      ['#ff00ff', '#ff0080', '#ff00ff'], // Pink cycle
      ['#00b8b8', '#0066cc', '#00b8b8']  // Blue cycle (toned down)
    ]
  },

  vaporwave: {
    name: 'Vaporwave',
    description: 'Soft pastel colors - pink, lavender, light blue',
    background: '#1a0033',
    alive: '#ff99cc',      // Soft pink - default for CA cells
    dead: '#1a0033',       // Deep purple-black
    colors: {
      primary: '#ff99cc',   // Soft pink
      secondary: '#99ccff', // Light blue
      tertiary: '#cc99ff',  // Lavender
      quaternary: '#ffccff' // Pale pink
    },
    gradients: [
      ['#ff99cc', '#cc99ff', '#99ccff'] // Pastel rainbow
    ]
  }
};

// ============================================================================
// COLOR UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert hex color to RGB array
 * @param {string} hex - Hex color string (e.g., '#ff00ff')
 * @returns {number[]} [r, g, b] array (0-255)
 */
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

/**
 * Convert RGB array to hex color
 * @param {number[]} rgb - [r, g, b] array (0-255)
 * @returns {string} Hex color string
 */
function rgbToHex(rgb) {
  const [r, g, b] = rgb.map(v => Math.round(Math.max(0, Math.min(255, v))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Linear interpolation between two colors
 * @param {string} color1 - Start color (hex)
 * @param {string} color2 - End color (hex)
 * @param {number} t - Interpolation factor (0-1)
 * @returns {string} Interpolated color (hex)
 */
function interpolateColor(color1, color2, t) {
  // Clamp t to [0, 1]
  t = Math.max(0, Math.min(1, t));

  // Convert to RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Interpolate each channel
  const rgb = rgb1.map((c1, i) => {
    const c2 = rgb2[i];
    return c1 + (c2 - c1) * t;
  });

  return rgbToHex(rgb);
}

/**
 * Create a gradient with specified number of steps
 * @param {string[]} colors - Array of hex colors to interpolate between
 * @param {number} steps - Total number of colors to generate
 * @returns {string[]} Array of hex colors
 */
function createGradient(colors, steps) {
  if (colors.length === 0) return [];
  if (colors.length === 1) return Array(steps).fill(colors[0]);
  if (steps <= 1) return [colors[0]];

  const gradient = [];
  const segmentCount = colors.length - 1;
  const stepsPerSegment = (steps - 1) / segmentCount;

  for (let i = 0; i < steps; i++) {
    const position = i / (steps - 1);
    const segmentIndex = Math.min(Math.floor(position * segmentCount), segmentCount - 1);
    const segmentT = (position * segmentCount) - segmentIndex;

    const color1 = colors[segmentIndex];
    const color2 = colors[segmentIndex + 1];

    gradient.push(interpolateColor(color1, color2, segmentT));
  }

  return gradient;
}

// ============================================================================
// PALETTE MANAGER CLASS
// ============================================================================

/**
 * Manages color palettes and provides palette switching functionality
 */
class PaletteManager {
  /**
   * Create a new PaletteManager
   * @param {string} defaultPalette - Name of default palette (default: 'synthwave')
   */
  constructor(defaultPalette = 'synthwave') {
    this.currentPalette = null;
    this.setPalette(defaultPalette);
  }

  /**
   * Get a palette by name
   * @param {string} name - Palette name
   * @returns {Object|null} Palette object or null if not found
   */
  getPalette(name) {
    return PALETTES[name] || null;
  }

  /**
   * Set the current active palette
   * @param {string} name - Palette name
   * @returns {boolean} True if successful, false if palette not found
   */
  setPalette(name) {
    const palette = this.getPalette(name);
    if (!palette) {
      console.warn(`Palette '${name}' not found. Available palettes:`, this.getPaletteNames());
      return false;
    }

    this.currentPalette = palette;
    console.log(`Palette switched to: ${palette.name}`);
    return true;
  }

  /**
   * Get the current active palette
   * @returns {Object} Current palette object
   */
  getCurrentPalette() {
    return this.currentPalette;
  }

  /**
   * Get all available palettes
   * @returns {Object} All palettes
   */
  getAllPalettes() {
    return PALETTES;
  }

  /**
   * Get array of palette names
   * @returns {string[]} Array of palette names
   */
  getPaletteNames() {
    return Object.keys(PALETTES);
  }

  /**
   * Get a color from the current palette
   * @param {string} colorKey - Key from palette.colors (e.g., 'primary', 'secondary')
   * @returns {string} Hex color string
   */
  getColor(colorKey) {
    if (!this.currentPalette) {
      console.warn('No palette selected');
      return '#000000';
    }

    return this.currentPalette.colors[colorKey] || this.currentPalette.colors.primary;
  }

  /**
   * Get a gradient from the current palette
   * @param {number} gradientIndex - Index of gradient (default: 0)
   * @param {number} steps - Number of steps to generate (optional)
   * @returns {string[]} Array of hex colors
   */
  getGradient(gradientIndex = 0, steps = null) {
    if (!this.currentPalette || !this.currentPalette.gradients) {
      return [this.currentPalette?.colors?.primary || '#ffffff'];
    }

    const gradient = this.currentPalette.gradients[gradientIndex] || this.currentPalette.gradients[0];

    if (steps && steps > gradient.length) {
      return createGradient(gradient, steps);
    }

    return gradient;
  }

  /**
   * Add a custom palette to the system
   * @param {string} name - Palette name (must be unique)
   * @param {Object} paletteData - Palette definition object
   * @returns {boolean} True if successful, false if name already exists
   */
  addCustomPalette(name, paletteData) {
    if (PALETTES[name]) {
      console.warn(`Palette '${name}' already exists`);
      return false;
    }

    // Validate required fields
    const required = ['name', 'background', 'alive', 'dead', 'colors'];
    const missing = required.filter(field => !paletteData[field]);

    if (missing.length > 0) {
      console.error(`Custom palette missing required fields: ${missing.join(', ')}`);
      return false;
    }

    PALETTES[name] = paletteData;
    console.log(`Custom palette '${name}' added successfully`);
    return true;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  // Node.js / CommonJS
  module.exports = {
    PALETTES,
    PaletteManager,
    interpolateColor,
    createGradient,
    hexToRgb,
    rgbToHex
  };
}

// Export for browser / ES6 modules
if (typeof window !== 'undefined') {
  window.PALETTES = PALETTES;
  window.PaletteManager = PaletteManager;
  window.interpolateColor = interpolateColor;
  window.createGradient = createGradient;
  window.hexToRgb = hexToRgb;
  window.rgbToHex = rgbToHex;
}

/**
 * AI News Weekly — Main Application Logic
 * Renders news data into the page, handles interactions, and manages display.
 * Features: article images (SVG-based), gadget section, usage trend chart.
 */

(function () {
    'use strict';

    const data = typeof AI_NEWS_DATA !== 'undefined' ? AI_NEWS_DATA : null;
    if (!data) { console.error('AI_NEWS_DATA not found'); return; }

    // ===== Utility Functions =====
    function getCategoryClass(cat) {
        const map = {
            research: 'cat-research',
            industry: 'cat-industry',
            tools: 'cat-tools',
            breakthrough: 'cat-breakthrough',
            policy: 'cat-policy',
            gadgets: 'cat-gadgets'
        };
        return map[cat] || 'cat-research';
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function renderTags(tags) {
        return tags.map(t => `<span class="tag">${t}</span>`).join('');
    }

    // ===== SVG Image Generator for Articles =====
    // Generates themed SVG illustrations based on category/theme
    function generateArticleImage(imgData, size) {
        // Photo type: return real image
        if (imgData && imgData.type === 'photo' && imgData.src) {
            const alt = imgData.alt || 'Article image';
            return `<div class="article-image"><img src="${imgData.src}" alt="${alt}" loading="lazy" /></div>`;
        }
        // SVG type (legacy): generate themed SVG
        if (!imgData || !imgData.gradient) return '';
        const w = size === 'large' ? 600 : 400;
        const h = size === 'large' ? 340 : 200;
        const icon = imgData.icon || '🤖';
        const gradient = imgData.gradient;
        const theme = imgData.theme || 'default';
        const seed = hashCode(theme);

        // Theme-specific decorative patterns
        const patternSVGs = {
            agents: `
                <circle cx="${w*0.3}" cy="${h*0.4}" r="${Math.min(w,h)*0.18}" fill="rgba(255,255,255,0.08)" />
                <circle cx="${w*0.7}" cy="${h*0.6}" r="${Math.min(w,h)*0.22}" fill="rgba(255,255,255,0.05)" />
                <path d="M${w*0.2},${h*0.5} Q${w*0.5},${h*0.15} ${w*0.8},${h*0.5}" stroke="rgba(255,255,255,0.12)" stroke-width="2" fill="none" />
                <path d="M${w*0.25},${h*0.62} Q${w*0.5},${h*0.32} ${w*0.75},${h*0.62}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" fill="none" />
                <!-- Neural nodes -->
                <circle cx="${w*0.25}" cy="${h*0.35}" r="6" fill="rgba(255,255,255,0.25)" />
                <circle cx="${w*0.5}" cy="${h*0.25}" r="8" fill="rgba(255,255,255,0.3)" />
                <circle cx="${w*0.75}" cy="${h*0.38}" r="6" fill="rgba(255,255,255,0.25)" />
                <circle cx="${w*0.38}" cy="${h*0.58}" r="5" fill="rgba(255,255,255,0.2)" />
                <circle cx="${w*0.62}" cy="${h*0.55}" r="7" fill="rgba(255,255,255,0.28)" />
            `,
            investment: `
                <polyline points="${w*0.15},${h*0.7} ${w*0.3},${h*0.55} ${w*0.45},${h*0.6} ${w*0.55},${h*0.35} ${w*0.7},${h*0.4} ${w*0.85},${h*0.15}" stroke="rgba(255,255,255,0.25)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <polygon points="${w*0.85},${h*0.12} ${w*0.82},${h*0.20} ${w*0.89},${h*0.19}" fill="rgba(0,230,118,0.6)" />
                <!-- Bars -->
                <rect x="${w*0.12}" y="${h*0.72}" width="${w*0.07}" height="${h*0.16}" rx="3" fill="rgba(255,255,255,0.1)" />
                <rect x="${w*0.23}" y="${h*0.57}" width="${w*0.07}" height="${h*0.31}" rx="3" fill="rgba(255,255,255,0.14)" />
                <rect x="${w*0.34}" y="${h*0.62}" width="${w*0.07}" height="${h*0.26}" rx="3" fill="rgba(255,255,255,0.12)" />
                <rect x="${w*0.45}" y="${h*0.42}" width="${w*0.07}" height="${h*0.46}" rx="3" fill="rgba(255,255,255,0.16)" />
                <rect x="${w*0.56}" y="${h*0.37}" width="${w*0.07}" height="${h*0.51}" rx="3" fill="rgba(255,255,255,0.13)" />
            `,
            research: `
                <!-- DNA helix suggestion -->
                <ellipse cx="${w*0.35}" cy="${h*0.5}" rx="${w*0.06}" ry="${h*0.35}" stroke="rgba(255,255,255,0.12)" stroke-width="2" fill="none" transform="rotate(-10 ${w*0.35} ${h*0.5})" />
                <ellipse cx="${w*0.65}" cy="${h*0.5}" rx="${w*0.06}" ry="${h*0.35}" stroke="rgba(255,255,255,0.12)" stroke-width="2" fill="none" transform="rotate(10 ${w*0.65} ${h*0.5})" />
                <!-- Connecting lines -->
                <line x1="${w*0.36}" y1="${h*0.22}" x2="${w*0.64}" y2="${h*0.25}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <line x1="${w*0.33}" y1="${h*0.37}" x2="${w*0.67}" y2="${h*0.35}" stroke="rgba(255,255,255,0.14)" stroke-width="1.5" />
                <line x1="${w*0.34}" y1="${h*0.52}" x2="${w*0.66}" y2="${h*0.50}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <line x1="${w*0.36}" y1="${h*0.67}" x2="${w*0.64}" y2="${h*0.65}" stroke="rgba(255,255,255,0.14)" stroke-width="1.5" />
                <!-- Atoms -->
                <circle cx="${w*0.5}" cy="${h*0.3}" r="${Math.min(w,h)*0.09}" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
                <circle cx="${w*0.5}" cy="${h*0.3}" r="${Math.min(w,h)*0.03}" fill="rgba(255,255,255,0.25)" />
            `,
            multimodal: `
                <!-- Eye shape -->
                <ellipse cx="${w*0.5}" cy="${h*0.48}" rx="${w*0.22}" ry="${h*0.13}" stroke="rgba(255,255,255,0.2)" stroke-width="2.5" fill="none" />
                <circle cx="${w*0.5}" cy="${h*0.48}" r="${Math.min(w,h)*0.065}" fill="rgba(255,255,255,0.2)" />
                <circle cx="${w*0.5}" cy="${h*0.48}" r="${Math.min(w,h)*0.025}" fill="rgba(255,255,255,0.45)" />
                <!-- Light rays -->
                <line x1="${w*0.12}" y1="${h*0.2}" x2="${w*0.4}" y2="${h*0.42}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <line x1="${w*0.88}" y1="${h*0.2}" x2="${w*0.6}" y2="${h*0.42}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <line x1="${w*0.15}" y1="${h*0.75}" x2="${w*0.42}" y2="${h*0.56}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
                <line x1="${w*0.85}" y1="${h*0.75}" x2="${w*0.58}" y2="${h*0.56}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
            `,
            transformers: `
                <!-- Lightning bolt -->
                <path d="M${w*0.55},${h*0.12} L${w*0.38},${h*0.48} L${w*0.54},${h*0.48} L${w*0.43},${h*0.86} L${w*0.62},${h*0.44} L${w*0.46},${h*0.44} Z" fill="rgba(255,255,255,0.22)" />
                <!-- Speed lines -->
                <line x1="${w*0.1}" y1="${h*0.30}" x2="${w*0.3}" y2="${h*0.30}" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-linecap="round" />
                <line x1="${w*0.68}" y1="${h*0.65}" x2="${w*0.9}" y2="${h*0.65}" stroke="rgba(255,255,255,0.1)" stroke-width="2" stroke-linecap="round" />
                <line x1="${w*0.15}" y1="${h*0.70}" x2="${w*0.32}" y2="${h*0.70}" stroke="rgba(255,255,255,0.07)" stroke-width="2" stroke-linecap="round" />
                <!-- Circuit traces -->
                <path d="M${w*0.7},${h*0.2} H${w*0.82} V${w*0.32}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" fill="none" />
                <circle cx="${w*0.82}" cy="${h*0.32}" r="3" fill="rgba(255,255,255,0.15)" />
            `,
            emergence: `
                <!-- Circular arrows suggesting emergence -->
                <path d="M${w*0.5},${h*0.18} A${w*0.2},${h*0.18} 0 1 1 ${w*0.5},${h*0.54}" stroke="rgba(255,255,255,0.15)" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
                <path d="M${w*0.5},${h*0.78} A${w*0.2},${h*0.18} 0 1 1 ${w*0.5},${h*0.42}" stroke="rgba(255,255,255,0.12)" stroke-width="2" fill="none" marker-end="url(#arrowhead2)" />
                <defs>
                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.2)" /></marker>
                    <marker id="arrowhead2" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.16)" /></marker>
                </defs>
                <!-- Central spark -->
                <circle cx="${w*0.5}" cy="${h*0.48}" r="${Math.min(w,h)*0.05}" fill="rgba(255,255,255,0.15)" />
                <circle cx="${w*0.5}" cy="${h*0.48}" r="${Math.min(w,h)*0.02}" fill="rgba(255,255,255,0.35)" />
            `,
            cloud: `
                <!-- Cloud shapes -->
                <ellipse cx="${w*0.4}" cy="${h*0.45}" rx="${w*0.16}" ry="${h*0.14}" fill="rgba(255,255,255,0.1)" />
                <ellipse cx="${w*0.55}" cy="${h*0.40}" rx="${w*0.14}" ry="${h*0.12}" fill="rgba(255,255,255,0.12)" />
                <ellipse cx="${w*0.68}" cy="${h*0.47}" rx="${w*0.12}" ry="${h*0.11}" fill="rgba(255,255,255,0.09)" />
                <ellipse cx="${w*0.5}" cy="${h*0.52}" rx="${w*0.22}" ry="${h*0.1}" fill="rgba(255,255,255,0.08)" />
                <!-- Upload arrows -->
                <line x1="${w*0.5}" y1="${h*0.68}" x2="${w*0.5}" y2="${h*0.38}" stroke="rgba(255,255,255,0.2)" stroke-width="2.5" stroke-linecap="round" />
                <polyline points="${w*0.43},${h*0.47} ${w*0.5},${h*0.36} ${w*0.57},${h*0.47}" stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            `,
            policy: `
                <!-- Gavel -->
                <rect x="${w*0.44}" y="${h*0.22}" width="${w*0.12}" height="${h*0.24}" rx="3" fill="rgba(255,255,255,0.1)" transform="rotate(-8 ${w*0.5} ${h*0.34})" />
                <rect x="${w*0.36}" y="${h*0.42}" width="${w*0.28}" height="${h*0.04}" rx="2" fill="rgba(255,255,255,0.12)" transform="rotate(-8 ${w*0.5} ${h*0.44})" />
                <!-- Document lines -->
                <rect x="${w*0.62}" y="${h*0.28}" width="${w*0.16}" height="${h*0.36}" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
                <line x1="${w*0.66}" y1="${h*0.36}" x2="${w*0.74}" y2="${h*0.36}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <line x1="${w*0.66}" y1="${h*0.44}" x2="${w*0.74}" y2="${h*0.44}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <line x1="${w*0.66}" y1="${h*0.52}" x2="${w*0.72}" y2="${h*0.52}" stroke="rgba(255,255,255,0.1" stroke-width="1.5" />
            `,
            security: `
                <!-- Shield shape -->
                <path d="M${w*0.5},${h*0.14} L${w*0.72},${h*0.24} L${w*0.72},${h*0.48} Q${w*0.72},${h*0.76} ${w*0.5},${h*0.84} Q${w*0.28},${h*0.76} ${w*0.28},${h*0.48} L${w*0.28},${h*0.24} Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
                <path d="M${w*0.5},${h*0.28} L${w*0.58},${h*0.42} L${w*0.5},${h*0.56} L${w*0.42},${h*0.42} Z" fill="rgba(0,230,118,0.25)" />
                <!-- Checkmark -->
                <polyline points="${w*0.43},${h*0.63} ${w*0.48},${h*0.69} ${w*0.59},${h*0.56}" stroke="rgba(0,230,118,0.3)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            `,
            code: `
                <!-- Code window -->
                <rect x="${w*0.15}" y="${h*0.18}" width="${w*0.7}" height="${h*0.6}" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <rect x="${w*0.15}" y="${h*0.18}" width="${w*0.7}" height="${h*0.07}" rx="8" fill="rgba(255,255,255,0.06)" />
                <circle cx="${w*0.23}" cy="${h*0.215}" r="${w*0.01}" fill="#ff5f57" />
                <circle cx="${w*0.27}" cy="${h*0.215}" r="${w*0.01}" fill="#febc2e" />
                <circle cx="${w*0.31}" cy="${h*0.215}" r="${w*0.01}" fill="#28c840" />
                <!-- Code lines -->
                <text x="${w*0.22}" y="${h*0.36}" font-family="monospace" font-size="${size==='large'?14:11}" fill="rgba(255,255,255,0.2)">const ai = await train();</text>
                <text x="${w*0.22}" y="${h*0.48}" font-family="monospace" font-size="${size==='large'?14:11}" fill="rgba(108,99,255,0.35)">ai.deploy('production');</text>
                <text x="${w*0.22}" y="${h*0.60}" font-family="monospace" font-size="${size==='large'?14:11}" fill="rgba(0,212,255,0.25)">console.log('Ready!');</text>
                <text x="${w*0.30}" y="${h*0.71}" font-family="monospace" font-size="${size==='large'?14:11}" fill="rgba(0,230,118,0.2)">✓ Success</text>
            `,
            'image-gen': `
                <!-- Image frame -->
                <rect x="${w*0.2}" y="${h*0.17}" width="${w*0.6}" height="${h*0.6}" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
                <!-- Mountains/landscape abstraction -->
                <polygon points="${w*0.2},${h*0.62} ${w*0.4},${h*0.32} ${w*0.55},${h*0.52} ${w*0.8},${h*0.22} ${w*0.8},${h*0.77} ${w*0.2},${h*0.77}" fill="rgba(255,0,110,0.12)" />
                <polygon points="${w*0.2},${h*0.67} ${w*0.35},${h*0.45} ${w*0.5},${h*0.58} ${w*0.68},${h*0.38} ${w*0.8},${h*0.55} ${w*0.8},${h*0.77} ${w*0.2},${h*0.77}" fill="rgba(255,171,64,0.1)" />
                <!-- Sun/moon -->
                <circle cx="${w*0.68}" cy="${h*0.3}" r="${Math.min(w,h)*0.06}" fill="rgba(255,171,64,0.2)" />
                <!-- Magic wand effect -->
                <line x1="${w*0.38}" y1="${h*0.78}" x2="${w*0.5}" y2="${h*0.5}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
                <circle cx="${w*0.5}" cy="${h*0.5}" r="3" fill="rgba(255,255,255,0.2)" />
                <circle cx="${w*0.53}" cy="${h*0.46}" r="2" fill="rgba(255,255,255,0.15)" />
                <circle cx="${w*0.47}" cy="${h*0.47}" r="1.5" fill="rgba(255,255,255,0.12)" />
            `,
            voice: `
                <!-- Sound waves -->
                <ellipse cx="${w*0.5}" cy="${h*0.5}" rx="${w*0.06}" ry="${h*0.1}" fill="rgba(0,230,118,0.2)" />
                <path d="M${w*0.38},${h*0.28} Q${w*0.32},${h*0.5} ${w*0.38},${h*0.72}" stroke="rgba(0,230,118,0.18)" stroke-width="2.5" fill="none" />
                <path d="M${w*0.29},${h*0.18} Q${w*0.2},${h*0.5} ${w*0.29},${h*0.82}" stroke="rgba(0,230,118,0.13)" stroke-width="2.5" fill="none" />
                <path d="M${w*0.62},${h*0.28} Q${w*0.68},${h*0.5} ${w*0.62},${h*0.72}" stroke="rgba(0,212,255,0.18)" stroke-width="2.5" fill="none" />
                <path d="M${w*0.71},${h*0.18} Q${w*0.8},${h*0.5} ${w*0.71},${h*0.82}" stroke="rgba(0,212,255,0.13)" stroke-width="2.5" fill="none" />
                <!-- Mic stand -->
                <rect x="${w*0.48}" y="${h*0.58}" width="${w*0.04}" height="${h*0.18}" fill="rgba(255,255,255,0.1)" />
                <line x1="${w*0.3}" y1="${h*0.78}" x2="${w*0.7}" y2="${h*0.78}" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-linecap="round" />
            `,
            'pocket-ai': `
                <!-- Phone/device outline -->
                <rect x="${w*0.38}" y="${h*0.15}" width="${w*0.24}" height="${h*0.62}" rx="${w*0.03}" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
                <rect x="${w*0.41}" y="${h*0.21}" width="${w*0.18}" height="${h*0.48}" rx="2" fill="rgba(108,99,255,0.08)" />
                <!-- Screen content - AI brain icon -->
                <circle cx="${w*0.5}" cy="${h*0.40}" r="${Math.min(w,h)*0.06}" fill="none" stroke="rgba(255,107,107,0.2)" stroke-width="1.5" />
                <path d="M${w*0.47},${h*0.39} Q${w*0.5},${h*0.35} ${w*0.53},${h*0.39} Q${w*0.5},${h*0.43} ${w*0.47},${h*0.39}" stroke="rgba(255,107,107,0.2)" stroke-width="1" fill="none" />
                <!-- Home button -->
                <circle cx="${w*0.5}" cy="${h*0.73}" r="${w*0.015}" fill="rgba(255,255,255,0.1)" />
                <!-- Glow around device -->
                <circle cx="${w*0.5}" cy="${h*0.46}" r="${Math.min(w,h)*0.2}" fill="none" stroke="rgba(255,107,107,0.06)" stroke-width="1" />
            `,
            'smart-glasses': `
                <!-- Glasses frame -->
                <path d="M${w*0.15},${h*0.45} H${w*0.38} Q${w*0.42},${h*0.45} ${w*0.42},${h*0.49} V${h*0.55} Q${w*0.42},${h*0.59} ${w*0.38},${h*0.59} H${w*0.15} Q${w*0.11},${h*0.59} ${w*0.11},${h*0.55} V${h*0.49} Q${w*0.11},${h*0.45} ${w*0.15},${h*0.45}" fill="rgba(83,39,205,0.12)" stroke="rgba(0,212,255,0.2)" stroke-width="1.5" />
                <path d="M${w*0.62},${h*0.45} H${w*0.85} Q${w*0.89},${h*0.45} ${w*0.89},${h*0.49} V${h*0.55} Q${w*0.89},${h*0.59} ${w*0.85},${h*0.59} H${w*0.62} Q${w*0.58},${h*0.59} ${w*0.58},${h*0.55} V${h*0.49} Q${w*0.58},${h*0.45} ${w*0.62},${h*0.45}" fill="rgba(83,39,205,0.12)" stroke="rgba(0,212,255,0.2)" stroke-width="1.5" />
                <path d="M${w*0.42},${h*0.48} Q${w*0.5},${h*0.44} ${w*0.58},${h*0.48}" stroke="rgba(0,212,255,0.2)" stroke-width="1.5" fill="none" />
                <!-- Lens reflection -->
                <path d="M${w*0.14},${h*0.48} L${w*0.24},${h*0.56}" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" stroke-linecap="round" />
                <!-- Translation text hint -->
                <text x="${w*0.5}" y="${h*0.80}" font-size="${size==='large'?12:9}" fill="rgba(0,212,255,0.2)" text-anchor="middle">Hello → 你好</text>
            `,
            wearable: `
                <!-- Pin/badge shape -->
                <circle cx="${w*0.5}" cy="${h*0.42}" r="${Math.min(w,h)*0.14}" fill="rgba(255,159,243,0.1)" stroke="rgba(84,160,255,0.2)" stroke-width="2" />
                <circle cx="${w*0.5}" cy="${h*0.42}" r="${Math.min(w,h)*0.08}" fill="rgba(255,159,243,0.08)" />
                <!-- Projection rays from pin -->
                <path d="M${w*0.42},${h*0.50} L${w*0.2},${h*0.78}" stroke="rgba(255,159,243,0.1)" stroke-width="1" />
                <path d="M${w*0.5},${h*0.54} L${w*0.5},${h*0.82}" stroke="rgba(255,159,243,0.12)" stroke-width="1" />
                <path d="M${w*0.58},${h*0.50} L${w*0.8},${h*0.78}" stroke="rgba(255,159,243,0.1)" stroke-width="1" />
                <!-- Projected area -->
                <ellipse cx="${w*0.5}" cy="${h*0.82}" rx="${w*0.22}" ry="${h*0.04}" fill="rgba(84,160,255,0.06)" />
            `,
            smartwatch: `
                <!-- Watch body -->
                <rect x="${w*0.4}" y="${h*0.22}" width="${w*0.2}" height="${h*0.5}" rx="${w*0.04}" fill="rgba(87,101,116,0.15)" stroke="rgba(131,149,167,0.25)" stroke-width="2" />
                <!-- Screen -->
                <rect x="${w*0.43}" y="${h*0.28}" width="${w*0.14}" height="${h*0.34}" rx="${w*0.02}" fill="rgba(131,149,167,0.08)" />
                <!-- Crown/button -->
                <rect x="${w*0.61}" y="${h*0.38}" width="${w*0.015}" height="${h*0.06}" rx="2" fill="rgba(131,149,167,0.2)" />
                <!-- Band top -->
                <path d="M${w*0.44},${h*0.22} V${h*0.12} H${w*0.56} V${h*0.22}" fill="rgba(87,101,116,0.12)" stroke="rgba(131,149,167,0.15)" stroke-width="1" />
                <!-- Band bottom -->
                <path d="M${w*0.44},${h*0.72} V${h*0.82} H${w*0.56} V${h*0.72}" fill="rgba(87,101,116,0.12)" stroke="rgba(131,149,167,0.15)" stroke-width="1" />
                <!-- Screen content - heartbeat line -->
                <polyline points="${w*0.45},${h*0.43} ${w*0.48},${h*0.43} ${w*0.49},${h*0.38} ${w*0.505},${h*0.48} ${w*0.52},${h*0.41} ${w*0.55},${h*0.43}" stroke="rgba(0,230,118,0.25)" stroke-width="1.2" fill="none" />
            `,
            default: `
                <!-- Generic AI brain / circuit pattern -->
                <circle cx="${w*0.5}" cy="${h*0.45}" r="${Math.min(w,h)*0.16}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
                <circle cx="${w*0.5}" cy="${h*0.45}" r="${Math.min(w,h)*0.08}" fill="rgba(255,255,255,0.05)" />
                <circle cx="${w*0.35}" cy="${h*0.32}" r="5" fill="rgba(255,255,255,0.15)" />
                <circle cx="${w*0.65}" cy="${h*0.32}" r="5" fill="rgba(255,255,255,0.15)" />
                <circle cx="${w*0.35}" cy="${h*0.58}" r="4" fill="rgba(255,255,255,0.12)" />
                <circle cx="${w*0.65}" cy="${h*0.58}" r="4" fill="rgba(255,255,255,0.12)" />
                <line x1="${w*0.35}" y1="${h*0.32}" x2="${w*0.5}" y2="${h*0.45}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <line x1="${w*0.65}" y1="${h*0.32}" x2="${w*0.5}" y2="${h*0.45}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <line x1="${w*0.35}" y1="${h*0.58}" x2="${w*0.5}" y2="${h*0.45}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
                <line x1="${w*0.65}" y1="${h*0.58}" x2="${w*0.5}" y2="${h*0.45}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
            `
        };

        const pattern = patternSVGs[theme] || patternSVGs['default'];

        return `<div class="article-image" style="background:${gradient}">
            <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="bg-grad-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:rgba(255,255,255,0.06)" />
                        <stop offset="100%" style="stop-color:rgba(255,255,255,0.02)" />
                    </linearGradient>
                </defs>
                <rect width="${w}" height="${h}" fill="url(#bg-grad-${seed})" />
                ${pattern}
                <!-- Large watermark emoji -->
                <text x="${w*0.5}" y="${size === 'large' ? h*0.75 : h*0.78}" font-size="${size === 'large' ? 56 : 38}" text-anchor="middle" opacity="0.2">${icon}</text>
            </svg>
        </div>`;
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char | 0;
        }
        return Math.abs(hash);
    }

    // ===== Render Top Stories (with images) =====
    function renderTopStories(stories) {
        const container = document.getElementById('top-stories');
        if (!container || !stories.length) return;

        container.innerHTML = stories.map(s => `
            <article class="story-card ${s.featured ? 'featured' : ''}">
                <div class="story-banner">${generateArticleImage(s.image, s.featured ? 'large' : 'small')}</div>
                <div class="story-body">
                    <div class="story-meta">
                        <span class="story-category ${getCategoryClass(s.category)}">${capitalize(s.category)}</span>
                        <span class="story-date">${s.date}</span>
                    </div>
                    <h3 class="story-title">${s.title}</h3>
                    <p class="story-desc">${s.description}</p>
                    ${s.tags ? `<div class="card-tags">${renderTags(s.tags)}</div>` : ''}
                    <div class="story-footer">
                        <span class="story-source">📰 ${s.source}</span>
                        ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener" class="story-link">Read More →</a>` : ''}
                    </div>
                </div>
            </article>
        `).join('');
    }

    // ===== Render Card Grid with Images (Research / Industry / Tools / Gadgets) =====
    function renderCards(items, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !items.length) return;

        // Store item data for modal access
        if (!window._cardDataMap) window._cardDataMap = {};
        items.forEach((item, idx) => {
            window._cardDataMap[`${containerId}-${idx}`] = item;
        });

        container.innerHTML = items.map((item, idx) => `
            <article class="card card-with-image" data-card-index="${idx}" data-card-container="${containerId}">
                <div class="card-image">${generateArticleImage(item.image, 'card')}</div>
                <div class="card-body">
                    <div class="card-header">
                        <span class="card-category ${getCategoryClass(item.category)}">${capitalize(item.category)}</span>
                        <span class="card-date" style="font-size:0.76rem;color:var(--text-muted);font-family:var(--font-mono);">${item.date}</span>
                    </div>
                    <h4 class="card-title">${item.title}</h4>
                    <p class="card-desc">${item.description}</p>
                    ${item.tags ? `<div class="card-tags">${renderTags(item.tags)}</div>` : ''}
                    <div class="card-footer">
                        <span class="card-source">${item.source}</span>
                        ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener" class="card-link">View →</a>` : `<button class="card-link details-btn">Details</button>`}
                    </div>
                </div>
            </article>
        `).join('');
    }

    // ===== Render Summary =====
    function renderSummary(htmlContent) {
        const el = document.getElementById('weekly-summary');
        if (el && htmlContent) el.innerHTML = htmlContent;
    }

    // ===== Render Archive =====
    function renderArchive(archiveItems) {
        const container = document.getElementById('archive-list');
        if (!container) return;

        if (!archiveItems.length) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-muted);">
                    <p style="font-size:1.1rem;margin-bottom:8px;">📭 No past issues yet</p>
                    <p style="font-size:0.85rm;">Check back after the next Sunday update!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = archiveItems.map(a => `
            <a href="${a.file}" class="archive-item">
                <div class="archive-week">Week of ${a.weekOf}</div>
                <div class="archive-date">${a.generatedAt}</div>
                <span class="archive-count">${a.count} articles</span>
            </a>
        `).join('');
    }

    // ===== Render Usage Trend Chart =====
    function renderUsageChart(trendData) {
        if (!trendData || !trendData.datasets || !window.Chart) return;

        const ctx = document.getElementById('usage-chart');
        if (!ctx) return;

        const noteEl = document.getElementById('chart-note');
        if (noteEl && trendData.note) {
            noteEl.textContent = trendData.note + ' · Last updated: ' + trendData.lastUpdated;
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendData.labels,
                datasets: trendData.datasets.map(ds => ({
                    label: ds.name,
                    data: ds.data,
                    borderColor: ds.color,
                    backgroundColor: ds.color + '15',
                    borderWidth: 2.5,
                    pointBackgroundColor: ds.color,
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    pointHoverBorderWidth: 2,
                    tension: 0.35,
                    fill: true,
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#9898b0',
                            font: { family: "'Inter', sans-serif", size: 12, weight: '500' },
                            padding: 16,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1a1a2e',
                        titleColor: '#e8e8f0',
                        bodyColor: '#9898b0',
                        borderColor: '#2a2a4a',
                        borderWidth: 1,
                        cornerRadius: 10,
                        padding: 12,
                        titleFont: { family: "'Inter', sans-serif", weight: '700', size: 13 },
                        bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + 'M DAU';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(42, 42, 74, 0.4)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6a6a85',
                            font: { family: "'JetBrains Mono', monospace", size: 11 }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(42, 42, 74, 0.4)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6a6a85',
                            font: { family: "'JetBrains Mono', monospace", size: 11 },
                            callback: function(value) { return value + 'M'; }
                        },
                        title: {
                            display: true,
                            text: 'Daily Active Users (millions)',
                            color: '#6a6a85',
                            font: { family: "'Inter', sans-serif", size: 11, weight: '500' }
                        }
                    }
                }
            }
        });
    }

    // ===== Update Meta Info =====
    function updateMeta(meta) {
        const weekEl = document.getElementById('week-range');
        if (weekEl && meta.weekOf) weekEl.textContent = `Week of ${meta.weekOf}`;

        animateNumber('stat-articles', meta.totalArticles || 0);
        animateNumber('stat-topics', meta.totalTopics || 0);
        animateNumber('stat-sources', meta.totalSources || 0);

        const timeEl = document.getElementById('update-time');
        if (timeEl && meta.generatedAt) {
            const d = new Date(meta.generatedAt);
            timeEl.textContent = d.toLocaleString('en-US', {
                month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }

        const footerDate = document.getElementById('footer-date');
        if (footerDate && meta.generatedAt) {
            footerDate.textContent = new Date(meta.generatedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        }
    }

    function animateNumber(id, target) {
        const el = document.getElementById(id);
        if (!el) return;

        let current = 0;
        const duration = 1200;
        const step = Math.max(1, Math.ceil(target / (duration / 16)));

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 16);
    }

    // ===== Modal / Detail Popup =====
    function setupModal() {
        const overlay = document.getElementById('detail-modal');
        if (!overlay) return;

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Close button (bound after content is created)
        overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close-btn')) closeModal();
        });

        // Event delegation for Details buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.details-btn');
            if (!btn) return;
            const card = btn.closest('article.card');
            if (!card) return;
            const idx = card.getAttribute('data-card-index');
            const containerId = card.getAttribute('data-card-container');
            const item = window._cardDataMap && window._cardDataMap[`${containerId}-${idx}`];
            if (item) openModal(item);
        });
    }

    function openModal(item) {
        const overlay = document.getElementById('detail-modal');
        if (!overlay || !item) return;

        const container = overlay.querySelector('.modal-container');
        const imgHtml = generateArticleImage(item.image, 'card');

        container.innerHTML = `
            <div class="modal-image">${imgHtml}</div>
            <div class="modal-body">
                <div class="modal-meta">
                    <span class="modal-category ${getCategoryClass(item.category)}">${capitalize(item.category)}</span>
                    <span class="modal-date">${item.date}</span>
                </div>
                <h3 class="modal-title">${item.title}</h3>
                <p class="modal-desc">${item.description}</p>
                ${item.tags && item.tags.length ? `<div class="modal-tags">${renderTags(item.tags)}</div>` : ''}
                <div class="modal-footer">
                    <span class="modal-source">📰 ${item.source || 'Unknown'}</span>
                    <button class="modal-close-btn">Close</button>
                </div>
            </div>
        `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const overlay = document.getElementById('detail-modal');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== Active Nav Link on Scroll =====
    function setupScrollSpy() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${entry.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        sections.forEach(sec => observer.observe(sec));
    }

    // ===== Initialize =====
    function init() {
        updateMeta(data.meta);
        renderTopStories(data.topStories || []);
        renderCards(data.research || [], 'research-cards');
        renderCards(data.industry || [], 'industry-cards');
        renderCards(data.tools || [], 'tools-cards');
        renderCards(data.gadgets || [], 'gadgets-cards');
        renderUsageChart(data.usageTrend || null);
        renderSummary(data.summary);
        renderArchive(data.archive || []);
        setupModal();
        setupScrollSpy();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

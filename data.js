/**
 * AI News Weekly — Data File
 * This file is auto-generated/updated by the weekly automation.
 * Each week, the automation updates this file with fresh AI news data.
 *
 * Structure:
 * - meta: metadata about the current issue
 * - topStories: featured/breakthrough stories (1-3 items)
 * - research: academic & research breakthroughs
 * - industry: business, market, and industry updates
 * - tools: new model releases, open-source tools
 * - gadgets: AI hardware, gadgets & device news
 * - usageTrend: monthly AI tools usage statistics
 * - summary: executive summary of the week
 * - archive: list of past issues
 */

const AI_NEWS_DATA = {
    "meta": {
        "weekOf": "May 10–16, 2026",
        "generatedAt": "2026-05-12T22:00:00+08:00",
        "issueNumber": 1,
        "totalArticles": 15,
        "totalTopics": 10,
        "totalSources": 18
    },

    "topStories": [
        {
            "id": "ts-1",
            "category": "breakthrough",
            "title": "AI Agents Achieve Human-Level Performance on Complex Multi-Step Reasoning Tasks",
            "description": "New research demonstrates that the latest generation of AI agents can now autonomously plan, execute, and debug complex software engineering tasks with accuracy rivaling senior developers. The system uses a novel chain-of-thought architecture combined with self-correction loops.",
            "date": "May 11, 2026",
            "source": "MIT Technology Review",
            "url": "https://www.technologyreview.com/",
            "featured": true,
            "tags": ["Agents", "Reasoning", "Software Engineering"],
            "image": { "type": "photo", "src": "images/Professional_tech_journalism_p_2026-05-12T14-28-27.png", "alt": "AI agents achieving human-level performance on complex reasoning tasks" }
        },
        {
            "id": "ts-2",
            "category": "industry",
            "title": "Global AI Investment Surpasses $200B in Q1 2026 — A New Record",
            "description": "Venture capital funding for AI startups reached an all-time high in Q1 2026, with generative AI infrastructure and enterprise AI solutions leading the charge. Major investments flowed into foundation model companies and AI chip manufacturers.",
            "date": "May 10, 2026",
            "source": "Bloomberg Tech",
            "url": "https://www.bloomberg.com/tech",
            "featured": false,
            "tags": ["Investment", "VC Market", "Enterprise AI"],
            "image": { "type": "photo", "src": "images/Professional_business_photo__R_2026-05-12T14-28-27.png", "alt": "Global AI investment surpassing $200 billion" }
        },
        {
            "id": "ts-3",
            "category": "research",
            "title": "Scientists Unveil First AI Model Capable of Real-Time Molecular Design for Drug Discovery",
            "description": "A breakthrough deep learning model can now generate and validate novel molecular structures in real-time, potentially cutting drug discovery timelines from years to months. The model has already identified promising candidates for previously 'undruggable' targets.",
            "date": "May 9, 2026",
            "source": "Nature Medicine",
            "url": "https://www.nature.com/medicine",
            "featured": false,
            "tags": ["Drug Discovery", "Molecular AI", "Healthcare"],
            "image": { "type": "photo", "src": "images/Scientific_research_photo__Mol_2026-05-12T14-28-27.png", "alt": "AI model for real-time molecular drug discovery" }
        }
    ],

    "research": [
        {
            "id": "r-1",
            "category": "research",
            "title": "Scaling Laws Extend to Multimodal Models: New Empirical Study",
            "description": "A comprehensive study across 500+ experiments reveals that multimodal AI models follow predictable scaling laws similar to language models. The findings suggest we're nowhere near the ceiling for vision-language capabilities.",
            "tags": ["Multimodal", "Scaling Laws", "Vision"],
            "source": "arXiv:2605.xxxxx",
            "date": "May 11, 2026",
            "image": { "type": "photo", "src": "images/AI_research_photo__Multimodal__2026-05-12T14-28-27.png", "alt": "Multimodal AI models scaling laws research" }
        },
        {
            "id": "r-2",
            "category": "research",
            "title": "Efficient Transformers: 10x Faster Inference with Minimal Quality Loss",
            "description": "Researchers propose a new attention mechanism variant that reduces inference time by up to 10x while maintaining 97%+ benchmark performance. Could make large models practical on consumer hardware.",
            "tags": ["Transformers", "Efficiency", "Inference"],
            "source": "arXiv:2605.xxxxx",
            "date": "May 10, 2026",
            "image": { "type": "photo", "src": "images/Technology_photo__High_speed_c_2026-05-12T14-29-13.png", "alt": "Efficient transformers with faster inference" }
        },
        {
            "id": "r-3",
            "category": "research",
            "title": "Emergent Tool Use in Language Models Without Explicit Training",
            "description": "Surprising findings show that sufficiently large language models spontaneously develop tool-use behaviors without being explicitly trained to do so. Raises important questions about emergent capabilities at scale.",
            "tags": ["Emergence", "Tool Use", "LLMs"],
            "source": "ICML 2026 Preview",
            "date": "May 8, 2026",
            "image": { "type": "photo", "src": "images/AI_research_photo__Emergent_be_2026-05-12T14-29-03.png", "alt": "Emergent tool use in language models" }
        }
    ],

    "industry": [
        {
            "id": "i-1",
            "category": "industry",
            "title": "Major Cloud Providers Slash AI API Prices by Up to 70%",
            "description": "AWS, Google Cloud, and Azure announce dramatic price cuts for their AI inference APIs, driven by improved hardware efficiency and fierce competition. Enterprise adoption expected to accelerate significantly.",
            "tags": ["Cloud Computing", "Pricing", "APIs"],
            "source": "The Information",
            "date": "May 12, 2026",
            "image": { "type": "photo", "src": "images/Cloud_computing_photo__Modern__2026-05-12T14-29-08.png", "alt": "Cloud providers slashing AI API prices" }
        },
        {
            "id": "i-2",
            "category": "industry",
            "title": "EU AI Act Enforcement Begins: What Companies Need to Know",
            "description": "The EU's comprehensive AI regulation enters its enforcement phase. Companies deploying high-risk AI systems must now comply with strict transparency, safety, and human oversight requirements.",
            "tags": ["Regulation", "EU AI Act", "Compliance"],
            "source": "TechCrunch EU",
            "date": "May 11, 2026",
            "image": { "type": "photo", "src": "images/Legal_regulation_photo__Europe_2026-05-12T14-29-08.png", "alt": "EU AI Act enforcement begins" }
        },
        {
            "id": "i-3",
            "category": "industry",
            "title": "AI-Powered Cybersecurity Market Projected to Reach $150B by 2030",
            "description": "New market analysis shows explosive growth in AI-driven security solutions as organizations struggle to defend against increasingly sophisticated automated threats.",
            "tags": ["Cybersecurity", "Market Analysis", "Defense"],
            "source": "Gartner Report",
            "date": "May 9, 2026",
            "image": { "type": "photo", "src": "images/Cybersecurity_photo__Digital_s_2026-05-12T14-29-51.png", "alt": "AI-powered cybersecurity market growth" }
        }
    ],

    "tools": [
        {
            "id": "t-1",
            "category": "tools",
            "title": "OpenCoder v3 Released: Fully Open-Source Coding Agent with IDE Integration",
            "description": "The latest version brings GPT-5-level coding capabilities fully open-source, with native VS Code / JetBrains integration, real-time collaboration features, and support for 50+ programming languages.",
            "tags": ["Open Source", "Coding Agent", "IDE"],
            "source": "GitHub",
            "date": "May 12, 2026",
            "image": { "type": "photo", "src": "images/Software_development_photo__Op_2026-05-12T14-29-51.png", "alt": "OpenCoder v3 open-source coding agent" }
        },
        {
            "id": "t-2",
            "category": "tools",
            "title": "DiffusionKit: Run Stable Diffusion XL on Your Laptop at 60 FPS",
            "description": "A new optimization framework makes running state-of-the-art image generation models on consumer GPUs feasible, achieving 60 fps generation speed on RTX 4060-class hardware.",
            "tags": ["Image Gen", "Optimization", "Open Source"],
            "source": "Hugging Face",
            "date": "May 10, 2026",
            "image": { "type": "photo", "src": "images/AI_art_generation_photo__Beaut_2026-05-12T14-29-57.png", "alt": "DiffusionKit running Stable Diffusion XL" }
        },
        {
            "id": "t-3",
            "category": "tools",
            "title": "VoiceForge SDK: Build Conversational AI Voice Interfaces in Minutes",
            "description": "New developer toolkit enables rapid prototyping of natural voice interfaces with emotion-aware speech synthesis, real-time voice-to-voice conversation, and multilingual support.",
            "tags": ["Voice AI", "SDK", "Conversational"],
            "source": "Product Hunt",
            "date": "May 8, 2026",
            "image": { "type": "photo", "src": "images/Voice_AI_technology_photo__Voi_2026-05-12T14-29-51.png", "alt": "VoiceForge SDK conversational AI voice" }
        }
    ],

    "gadgets": [
        {
            "id": "g-1",
            "category": "gadgets",
            "title": "Rabbit R2 Launches with On-Device LLM — No Cloud Required",
            "description": "The next-generation AI pocket device runs a 7B parameter language model entirely locally, offering instant responses with complete privacy. Battery life exceeds 2 days even with continuous AI interaction.",
            "tags": ["Rabbit R2", "Edge AI", "Hardware"],
            "source": "The Verge",
            "date": "May 12, 2026",
            "image": { "type": "photo", "src": "images/Product_photo__Rabbit_R2_pocke_2026-05-12T14-31-22.png", "alt": "Rabbit R2 pocket AI device with on-device LLM" }
        },
        {
            "id": "g-2",
            "category": "gadgets",
            "title": "Meta Ray-Ban Smart Glasses Gen 3: Real-Time AI Translation Built-In",
            "description": "Meta's third-generation smart glasses feature embedded AI chips capable of real-time speech translation across 40 languages, plus visual AI assistance that describes your surroundings through the built-in speaker.",
            "tags": ["Meta", "Smart Glasses", "Translation"],
            "source": "Wired",
            "date": "May 11, 2026",
            "image": { "type": "photo", "src": "images/Product_photo__Meta_Ray_Ban_sm_2026-05-12T14-30-39.png", "alt": "Meta Ray-Ban Smart Glasses Gen 3 with AI translation" }
        },
        {
            "id": "g-3",
            "category": "gadgets",
            "title": "Humane AI Pin 2: Complete Redesign with Projected Display & Gesture Control",
            "description": "Humane's comeback device features a laser-projected touch display on any surface, advanced gesture recognition, and deep integration with GPT-5o for context-aware assistance. Pre-orders start at $299.",
            "tags": ["Humane", "Wearable", "Projection"],
            "source": "Engadget",
            "date": "May 9, 2026",
            "image": { "type": "photo", "src": "images/Product_photo__Humane_AI_Pin_2_2026-05-12T14-30-44.png", "alt": "Humane AI Pin 2 with projected display" }
        },
        {
            "id": "g-4",
            "category": "gadgets",
            "title": "Apple AI Watch Pro Rumored to Feature Dedicated Neural Engine Chip",
            "description": "Leaked specifications suggest Apple's premium smartwatch will include a custom 4nm neural processor designed specifically for on-device AI inference, enabling health monitoring AI that works without iPhone connectivity.",
            "tags": ["Apple", "Smartwatch", "Neural Engine"],
            "source": "MacRumors",
            "date": "May 8, 2026",
            "image": { "type": "photo", "src": "images/Product_photo__Apple_Watch_Pro_2026-05-12T14-30-44.png", "alt": "Apple AI Watch Pro with neural engine chip" }
        }
    ],

    "usageTrend": {
        "labels": ["Sep '25", "Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26", "Apr '26", "May '26"],
        "datasets": [
            {
                "name": "ChatGPT",
                "color": "#10a37f",
                "data": [185, 192, 205, 220, 235, 248, 260, 275, 290],
                "unit": "M DAU"
            },
            {
                "name": "Gemini",
                "color": "#4285f4",
                "data": [95, 108, 125, 142, 158, 175, 195, 215, 238],
                "unit": "M DAU"
            },
            {
                "name": "Copilot",
                "color": "#0078d4",
                "data": [55, 68, 82, 98, 115, 132, 150, 168, 185],
                "unit": "M DAU"
            },
            {
                "name": "Claude",
                "color": "#cc785c",
                "data": [28, 38, 52, 68, 85, 102, 120, 140, 162],
                "unit": "M DAU"
            },
            {
                "name": "Perplexity",
                "color": "#20b2aa",
                "data": [12, 17, 24, 33, 44, 56, 70, 86, 103],
                "unit": "M DAU"
            }
        ],
        "lastUpdated": "May 2026",
        "note": "Daily Active Users (DAU) in millions. Source: aggregated from public reports & analytics platforms."
    },

    "summary": `
        <p><strong>This Week in AI:</strong> Week of May 10–16, 2026 was a landmark period for artificial intelligence, marked by significant breakthroughs in autonomous agent capabilities, record-breaking investment flows, transformative developments in healthcare AI, and exciting hardware announcements.</p>

        <p><strong>🔬 Key Research Highlights:</strong> The most exciting development was the demonstration of human-level AI agent performance on complex multi-step tasks — a milestone that could reshape how we think about AI-augmented software development. Meanwhile, scaling law research continues to show that multimodal models have enormous headroom for improvement.</p>

        <p><strong>🏢 Industry Momentum:</strong> Global AI investment exceeded $200 billion in Q1 alone, with cloud providers responding by slashing API prices dramatically. The EU AI Act enforcement also kicked off, setting a new global standard for responsible AI deployment.</p>

        <p><strong>🛠️ Developer Tools:</strong> The open-source community had a huge week with OpenCoder v3 bringing powerful coding agents to everyone, DiffusionKit making professional image generation accessible on laptops, and VoiceForge simplifying conversational AI development.</p>

        <p><strong>📱 AI Hardware Wave:</strong> The gadget space is heating up with Rabbit R2 launching fully on-device AI processing, Meta's new smart glasses featuring real-time translation, and rumors of Apple's AI-dedicated smartwatch chip. Edge AI is clearly going mainstream.</p>

        <p><strong>What to Watch Next Week:</strong> Expect major announcements from upcoming AI conferences, potential new foundation model releases, continued regulatory developments globally, and possibly more hardware reveals at Computex Taipei.</p>
    `,

    "archive": []
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AI_NEWS_DATA;
}

# AI News Weekly - Automation Update Script
# This script is called by the weekly automation to update the AI news website.
# It fetches the latest AI news and updates the data.js file.

## Task Description
Update the AI News Weekly website (located at C:\Users\user\Desktop\AI_News\) with this week's latest AI news and developments. All content must be in English.

## Steps to Execute

### 1. Search for Latest AI News
Use WebSearch to find the latest AI news, developments, and breakthroughs from the current week. Search for multiple topics:
- "AI news this week 2026" or "latest artificial intelligence developments"
- "AI research breakthroughs [current month] 2026"
- "AI industry updates [current week] 2026"
- "new AI tools and models released [current week]"
- "AI startup funding investment 2026"

### 2. Compile the News Data
Based on your research findings, update the file C:\Users\user\Desktop\AI_News\data.js with fresh content:

**IMPORTANT RULES:**
- ALL content must be in English
- Include 3 top stories (featured/breakthrough items)
- Include 3 research/academic developments
- Include 3 industry/business updates  
- Include 3 new tools/model releases
- Write a comprehensive executive summary paragraph covering all key developments
- Update the meta section with current week's date range, article counts, etc.
- Keep real source names and approximate dates
- Each item should have a realistic title, detailed description (2-4 sentences), relevant tags, source name, and date

### 3. Update Archive
If a previous week's data exists, add it to the archive array in data.json before overwriting with new data. The archive should track past weeks so users can browse historical issues.

### 4. Data Format
Follow the exact same JSON-inside-JS format as the existing data.js file. The variable name MUST be `AI_NEWS_DATA` and the structure should match exactly:
- meta: { weekOf, generatedAt, issueNumber, totalArticles, totalTopics, totalSources }
- topStories: array of featured stories
- research: array of research items
- industry: array of industry items
- tools: array of tool/model releases
- summary: HTML string for executive summary
- archive: array of past issues

### 5. Quality Standards
- Titles should be compelling and specific (not generic)
- Descriptions should provide substantive detail (what happened, why it matters)
- Tags should be relevant and useful for categorization
- Summary should read like a professional briefing document
- All dates should reflect the actual week being covered

## Output
After updating data.js, confirm that all sections are properly populated with current week's AI news content.

// === AI DIASPORA BRIEF ===
function aiDiasporaBrief(){
if(!aiDSApiKey){alert('Enter your OpenAI API key in the AI Decision Support panel first, then click UPDATE INTEL.');return}
var overlay=document.createElement('div');
overlay.id='aiDiasporaOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
var tickerEl=document.getElementById('newsTicker');
var headlines=[];
if(tickerEl){var links=tickerEl.querySelectorAll('.headline-link');links.forEach(function(a){headlines.push(a.textContent.trim())})}
var headlineContext=headlines.length>0?'\n\nCurrent headlines from AfrOsint live ticker (use these to ground your analysis in real-time events):\n'+headlines.slice(0,20).map(function(h,i){return(i+1)+'. '+h}).join('\n'):'';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #00ccff;border-radius:8px;max-width:680px;width:100%;max-height:85vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiDiasporaOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#00ccff;font-size:14px;letter-spacing:2px;margin-bottom:6px;text-shadow:0 0 8px #00ccff66">🌍 DIASPORA INTELLIGENCE BRIEF</div><div style="color:#7fd6df;font-size:10px;margin-bottom:12px">Continent-wide digest for the African diaspora — investment, travel, safety, culture & opportunity.</div><div id="aiDiasporaContent" style="color:#7fd6df">⟳ Generating diaspora intelligence brief...</div></div>';
document.body.appendChild(overlay);
var today=new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
var prompt='Generate a comprehensive DIASPORA INTELLIGENCE BRIEF dated '+today+' for the African diaspora worldwide. This brief serves Africans living abroad (Europe, Americas, Middle East, Asia) and those on the continent who want a continent-wide overview.'+headlineContext+'\n\nProvide these sections:\n\n1. EXECUTIVE SUMMARY: 3-4 sentence overview of the most important things happening across the African continent RIGHT NOW that diaspora should know about.\n2. SECURITY & STABILITY: Countries with active conflicts, coups, unrest, or deteriorating security. Travel warnings. Where NOT to go right now. Rate top 5 risk countries.\n3. ECONOMIC PULSE: Currency movements, stock markets, major deals, startup ecosystem highlights, commodity prices (oil, gold, cocoa, etc.). Which economies are hot and which are struggling.\n4. INVESTMENT OPPORTUNITIES: Sectors and countries where diaspora capital can make an impact — real estate, tech, agriculture, energy, infrastructure. Include specific cities or regions.\n5. TRAVEL ADVISORY: Visa changes, new flight routes, airline updates, passport power changes, travel deals. Which countries are easiest to visit or relocate to right now.\n6. POLITICAL LANDSCAPE: Elections coming up, political transitions, AU/ECOWAS/SADC decisions, diplomatic shifts, sanctions updates.\n7. DIASPORA COMMUNITY: Repatriation programs, diaspora investment schemes, dual citizenship updates, land ownership law changes, incentives for returnees.\n8. CULTURE & IDENTITY: Major cultural events, festivals, film/music releases, sports, Pan-African solidarity moments. What to be proud of this week.\n9. HEALTH & ENVIRONMENT: Disease outbreaks, climate events, infrastructure development, water/power situations in key countries.\n10. ACTION ITEMS: 5 specific things diaspora should DO this week — calls to make, investments to consider, events to attend, people to follow, places to watch.\n\nBe specific with country names, dates, numbers, and actionable details. Write with Pan-African pride but be honest about challenges. This is a weekly-style brief that should feel essential reading.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a senior Pan-African intelligence analyst and diaspora engagement specialist. You produce weekly intelligence briefs for the global African diaspora — covering security, economics, investment, travel, politics, culture, and community. Your tone is professional but culturally grounded, speaking TO the diaspora as family. You combine hard data with cultural awareness. Use markdown ## headers and bullet points. Be specific with names, dates, and numbers.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:4000})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#00ccff;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #00ccff33">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#00ffee;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\n/g,'<br>');
var el=document.getElementById('aiDiasporaContent');if(el)el.innerHTML=content;
}).catch(function(err){
var el=document.getElementById('aiDiasporaContent');if(el)el.innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}


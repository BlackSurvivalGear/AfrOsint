// === AI SITREP ===
function aiSitRep(countryName){
if(!aiDSApiKey){alert('Enter your OpenAI API key in the AI Decision Support panel first, then click UPDATE INTEL.');return}
var overlay=document.createElement('div');
overlay.id='aiSitRepOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #00ffee;border-radius:8px;max-width:650px;width:100%;max-height:85vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiSitRepOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#00ffee;font-size:14px;letter-spacing:2px;margin-bottom:12px;text-shadow:0 0 8px #00ffee66">📋 AI SITREP: '+esc(countryName)+'</div><div id="aiSitRepContent" style="color:#7fd6df">⟳ Generating situational report...</div></div>';
document.body.appendChild(overlay);
var prompt='Generate a comprehensive SITREP (Situational Report) for '+countryName+' from a Pan-African perspective. This report is for someone evaluating the country for potential relocation or long-term stay. Include these sections:\n\n1. PAN-AFRICAN NEWS DIGEST: Key recent events, headlines, and developments affecting this country within the African context. Focus on regional relationships, AU involvement, and pan-African implications.\n2. CONFLICT & SECURITY STATUS: Active conflicts, armed groups, insurgencies, crime levels, safe vs dangerous regions. Include border tensions with neighbors.\n3. POLITICAL LANDSCAPE: Government type, stability, corruption index, rule of law, press freedom, political trajectory (improving/declining). Recent elections or power changes.\n4. ECONOMIC OVERVIEW: GDP trend, currency stability, inflation, cost of living, job market, key industries, trade relationships. Compare to regional averages.\n5. RELOCATION VIABILITY ASSESSMENT: Rate 1-10 with detailed justification. Cover: visa/residency options, healthcare quality, education, infrastructure, internet connectivity, English/French proficiency, diaspora community, quality of life, safety for foreigners, property ownership rights.\n6. OPPORTUNITIES & RISKS: Key opportunities for entrepreneurs/professionals and major risks to be aware of.\n7. VERDICT: A clear, honest 2-3 sentence summary on whether this country is viable for relocation and for whom it would be best suited.\n\nBe honest, specific, and data-driven. Include numbers where possible. Write from a Pan-African lens — consider how this country fits into the broader African landscape.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a senior Pan-African intelligence analyst and relocation advisor. You provide honest, detailed situational reports focused on African countries from a pan-African perspective. Your audience is African diaspora and pan-African professionals evaluating countries for relocation, business, or long-term stay. Use markdown-style formatting with ## headers and bullet points. Be data-driven and specific.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:4000})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#00ffee;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #00ffee33">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#ffaa00;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\n/g,'<br>');
document.getElementById('aiSitRepContent').innerHTML=content;
}).catch(function(err){
document.getElementById('aiSitRepContent').innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}


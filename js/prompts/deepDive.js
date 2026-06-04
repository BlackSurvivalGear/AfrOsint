// === AI DEEP DIVE ===
function aiDeepDive(countryName){
if(typeof window.userApiKeys !== 'undefined' && window.userApiKeys.openai) aiDSApiKey = window.userApiKeys.openai; if(!aiDSApiKey){alert('Enter your OpenAI API key in the Profile dropdown menu first.');return}
var overlay=document.createElement('div');
overlay.id='aiDeepDiveOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #00ffee;border-radius:8px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiDeepDiveOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#00ffee;font-size:14px;letter-spacing:2px;margin-bottom:12px;text-shadow:0 0 8px #00ffee66">🔬 DEEP DIVE: '+esc(countryName)+'</div><div id="aiDeepDiveContent" style="color:#7fd6df">⟳ Generating comprehensive intelligence brief...</div></div>';
document.body.appendChild(overlay);
var prompt='Generate a comprehensive intelligence brief for '+countryName+'. Include these sections:\n\n1. POLITICAL LANDSCAPE: Key political actors, factions, power dynamics, government structure\n2. SECURITY ENVIRONMENT: Armed groups, crime networks, areas of control, no-go zones\n3. KEY ACTORS & ALLIANCES: Major domestic and foreign players, their interests and alliances\n4. ENTRY/EXIT ROUTES: Major border crossings, airports, ports, and their safety status\n5. COMMUNICATIONS: Internet/phone reliability, censorship, secure comms recommendations\n6. ECONOMIC FACTORS: Currency stability, inflation, sanctions, black market\n7. RECOMMENDED ACTIONS: For travelers/operators in this country\n\nFormat with clear headers. Be specific with names, locations, and actionable details. Write concisely.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a senior intelligence analyst specializing in African geopolitics. Provide detailed, actionable intelligence briefs. Use markdown-style formatting with ## headers and bullet points.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:3000})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#00ffee;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #00ffee33">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#ffaa00;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\n/g,'<br>');
document.getElementById('aiDeepDiveContent').innerHTML=content;
}).catch(function(err){
document.getElementById('aiDeepDiveContent').innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}

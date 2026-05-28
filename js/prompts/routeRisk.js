// === ROUTE RISK ASSESSMENT ===
function aiRouteRisk(){
var from=document.getElementById('afrGFrom').value.trim();
var to=document.getElementById('afrGTo').value.trim();
if(!to){alert('Enter a destination in the "To" field first.');return}
if(!aiDSApiKey){alert('Enter your OpenAI API key in the AI Decision Support panel first.');return}
var overlay=document.createElement('div');
overlay.id='aiRouteRiskOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #00ffee;border-radius:8px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiRouteRiskOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#00ffee;font-size:14px;letter-spacing:2px;margin-bottom:12px;text-shadow:0 0 8px #00ffee66">🛣️ ROUTE RISK ASSESSMENT</div><div style="color:#ffcc00;margin-bottom:10px">'+esc(from||'Current Location')+' → '+esc(to)+'</div><div id="aiRouteRiskContent" style="color:#7fd6df">⟳ Analyzing route risks...</div></div>';
document.body.appendChild(overlay);
var prompt='Analyze the travel route from '+(from||'a general starting point in Africa')+' to '+to+' in Africa. Provide:\n\n1. ROUTE OVERVIEW: Best route options and approximate distance/time\n2. RISK LEVEL: Overall risk rating (CRITICAL/HIGH/ELEVATED/MODERATE/LOW)\n3. CHECKPOINTS & BORDERS: Known checkpoints, border crossings, what to expect\n4. DANGER ZONES: Specific areas along the route to avoid or be cautious about\n5. SECURITY THREATS: Banditry, insurgents, military presence, kidnapping risk\n6. BEST TIME TO TRAVEL: Time of day, season, and conditions recommendations\n7. COMMUNICATIONS: Network coverage along the route, dead zones\n8. RECOMMENDATIONS: Practical safety advice for this journey\n\nBe specific with location names and distances where possible.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a security consultant specializing in African travel risk assessment. Provide specific, actionable travel risk analysis. Use markdown formatting.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:3000})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#00ffee;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #00ffee33">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#ffaa00;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\n/g,'<br>');
document.getElementById('aiRouteRiskContent').innerHTML=content;
}).catch(function(err){
document.getElementById('aiRouteRiskContent').innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}


// === REAL-TIME NEWS ANALYSIS ===
function aiNewsAnalysis(){
if(typeof window.userApiKeys !== 'undefined' && window.userApiKeys.openai) aiDSApiKey = window.userApiKeys.openai; if(!aiDSApiKey){alert('Enter your OpenAI API key in the Profile dropdown menu first.');return}
var tickerEl=document.getElementById('newsTicker');
var headlines=[];
if(tickerEl){var links=tickerEl.querySelectorAll('.headline-link');links.forEach(function(a){headlines.push(a.textContent.trim())})}
if(headlines.length===0){alert('No headlines loaded in the ticker. Wait for headlines to load first.');return}
var overlay=document.createElement('div');
overlay.id='aiNewsOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #ffaa00;border-radius:8px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiNewsOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#ffaa00;font-size:14px;letter-spacing:2px;margin-bottom:12px;text-shadow:0 0 8px #ffaa0066">📡 AI NEWS INTELLIGENCE</div><div style="color:#7fd6df;margin-bottom:10px;font-size:10px">Analyzing '+headlines.length+' headlines...</div><div id="aiNewsContent" style="color:#7fd6df">⟳ Generating situational intelligence from live headlines...</div></div>';
document.body.appendChild(overlay);
var prompt='You are an OSINT intelligence analyst. Analyze these current African news headlines and generate an intelligence brief:\n\n'+headlines.map(function(h,i){return(i+1)+'. '+h}).join('\n')+'\n\nProvide:\n1. SITUATION SUMMARY: What is happening right now in 2-3 sentences\n2. KEY DEVELOPMENTS: Most important stories ranked by threat/impact level\n3. THREAT IMPLICATIONS: What these headlines mean for security, stability, and humanitarian conditions\n4. REGIONAL HOTSPOTS: Which regions are most affected and why\n5. RECOMMENDED MONITORING: What to watch in the next 24-48 hours\n6. ACTIONABLE INTELLIGENCE: Specific actions or precautions based on these headlines\n\nBe concise and specific.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a senior intelligence analyst providing actionable OSINT analysis. Format with clear headers. Be concise and focus on implications.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:2500})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#ffaa00;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #ffaa0033">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#00ffee;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\n/g,'<br>');
document.getElementById('aiNewsContent').innerHTML=content;
}).catch(function(err){
document.getElementById('aiNewsContent').innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}


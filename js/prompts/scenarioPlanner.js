// === SCENARIO PLANNER ===
function aiScenarioPlanner(){
var input=document.getElementById('aiScenarioInput');
var scenario=input.value.trim();
if(!scenario){alert('Enter a "What if..." scenario to analyze.');return}
if(!aiDSApiKey){alert('Enter your OpenAI API key in the AI Decision Support panel first.');return}
var overlay=document.createElement('div');
overlay.id='aiScenarioOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #cc88ff;border-radius:8px;max-width:620px;width:100%;max-height:80vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiScenarioOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#cc88ff;font-size:14px;letter-spacing:2px;margin-bottom:6px;text-shadow:0 0 8px #cc88ff66">🔮 SCENARIO ANALYSIS</div><div style="color:#ffcc00;font-size:11px;margin-bottom:12px;padding:6px 8px;background:#ffcc0008;border-left:2px solid #ffcc00;border-radius:0 4px 4px 0">'+esc(scenario)+'</div><div id="aiScenarioContent" style="color:#7fd6df">⟳ Generating scenario forecast...</div></div>';
document.body.appendChild(overlay);
var prompt='You are a senior geopolitical intelligence analyst and scenario planner. Analyze this hypothetical scenario:\n\n"'+scenario+'"\n\nProvide a structured analysis:\n\n1. SCENARIO PROBABILITY: Rate likelihood (HIGH/MEDIUM/LOW) with percentage estimate and rationale\n2. TIMELINE: Estimated timeframe for this scenario to unfold, with key milestones\n3. TRIGGER CONDITIONS: What would need to happen for this scenario to materialize\n4. IMMEDIATE IMPACT: First 72 hours — what happens immediately if this occurs\n5. CASCADING EFFECTS: Regional and continental ripple effects over weeks/months\n6. KEY ACTORS: Who benefits, who loses, and how they would likely respond\n7. HUMANITARIAN IMPLICATIONS: Civilian impact, displacement, aid requirements\n8. ECONOMIC FALLOUT: Markets, trade routes, resources, sanctions implications\n9. COUNTERBALANCING FACTORS: What could prevent or mitigate this scenario\n10. RECOMMENDED PREPARATIONS: What operators/analysts should do NOW to prepare\n\nBe specific with names, locations, timelines, and numbers. Think like an intelligence analyst briefing a decision-maker.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a senior geopolitical scenario planner and intelligence forecaster specializing in Africa. Provide detailed, structured scenario analysis with probabilities, timelines, and actionable intelligence. Use markdown formatting with ## headers.'},{role:'user',content:prompt}],temperature:0.8,max_tokens:3500})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#cc88ff;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #cc88ff33">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#ffaa00;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\n/g,'<br>');
document.getElementById('aiScenarioContent').innerHTML=content;
}).catch(function(err){
document.getElementById('aiScenarioContent').innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}


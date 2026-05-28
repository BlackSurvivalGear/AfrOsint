// === AI STRATEGIC RELOCATION OVERVIEW ===
function aiStrategicRelocation(countryName){
if(!aiDSApiKey){alert('Enter your OpenAI API key in the AI Decision Support panel first, then click UPDATE INTEL.');return}
var overlay=document.createElement('div');
overlay.id='aiStrategicReloOverlay';
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
overlay.innerHTML='<div style="background:rgba(6,16,24,0.98);border:1px solid #cc44ff;border-radius:8px;max-width:700px;width:100%;max-height:85vh;overflow-y:auto;padding:20px;font-family:Share Tech Mono,monospace;color:#d7ffff;font-size:12px;line-height:1.6;position:relative"><button onclick="document.getElementById(\'aiStrategicReloOverlay\').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:#ff4444;font-size:18px;cursor:pointer">✕</button><div style="color:#cc44ff;font-size:14px;letter-spacing:2px;margin-bottom:12px;text-shadow:0 0 8px #cc44ff66">🏠 STRATEGIC RELOCATION: '+esc(countryName)+'</div><div id="aiStrategicReloContent" style="color:#7fd6df">⟳ Generating strategic relocation overview...</div></div>';
document.body.appendChild(overlay);
var prompt='Generate a Strategic Relocation Overview for '+countryName+'.\n\nThe report should focus specifically on African diaspora relocation, remote workers, investors, entrepreneurs, and professionals considering relocation or long-term positioning in the country.\n\nUse a professional geopolitical/intelligence briefing style.\n\nOnly include the following sections:\n\n1. COST OF LIVING SNAPSHOT\nInclude estimated monthly cost ranges for: Single Professional, Family of 3. Include: Budget lifestyle, Comfortable middle-class lifestyle, Upper/luxury lifestyle.\n\n2. DIASPORA RETURN DIFFICULTY\nProvide a table rating difficulty for: Opening Business, Residency/Permits, Buying Property, Importing Goods, Banking Access, Bureaucracy, Corruption Exposure, Cultural Reintegration.\n\n3. BEST BUSINESS TYPES\nList the strongest sectors and business opportunities for diaspora returnees and foreign-based Africans.\n\n4. WHO SHOULD NOT RELOCATE\nProvide realistic assessment of people or business types that may struggle in this environment.\n\n5. PASSPORT & MOBILITY\nAssess: Regional access, International connectivity, Airport quality, Visa openness, Driving conditions, Border efficiency.\n\n6. FAMILY SUITABILITY\nRate: Child safety, International schools, Healthcare, Recreation, Air quality, Traffic stress.\n\n7. POWER & INTERNET REALITY\nAssess: Electricity reliability, Internet quality, Mobile data quality, Water reliability, Need for backup power.\n\n8. REMOTE WORK SCORE\nScore out of 10: Internet, Cafes & workspaces, Safety, Power reliability, Mobile connectivity, Lifestyle balance.\n\n9. AFRICAN DIASPORA SCORE\nScore out of 10: Ease of Return, Wealth Building Potential, Stability, Lifestyle Quality, Family Raising, Remote Work, Business Environment, Long-Term Potential.\n\nUse clear markdown headers and tables where appropriate. Keep tone professional, concise, and intelligence-report style. Be realistic but balanced. Focus on practical relocation intelligence and actionable information.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a senior relocation intelligence analyst specializing in African diaspora relocation assessment. You produce professional strategic relocation overviews for Africans in the diaspora considering return, investment, or long-term positioning. Your tone is professional, realistic, and data-driven. Use markdown ## headers, tables, and scores. Prioritize actionable relocation intelligence over tourism-style writing.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:4096})
}).then(function(r){if(!r.ok)throw new Error('API error: '+r.status);return r.json()}).then(function(data){
var content=data.choices[0].message.content;
content=content.replace(/^## (.+)$/gm,'<div style="color:#cc44ff;font-size:12px;letter-spacing:1px;margin-top:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid #cc44ff33">$1</div>');
content=content.replace(/^### (.+)$/gm,'<div style="color:#ffaa00;font-size:11px;margin-top:10px;margin-bottom:4px">$1</div>');
content=content.replace(/^\- (.+)$/gm,'<div style="padding-left:12px;margin:2px 0">• $1</div>');
content=content.replace(/\*\*(.+?)\*\*/g,'<span style="color:#ffffff;font-weight:bold">$1</span>');
content=content.replace(/\|(.+?)\|/g,function(m){return '<span style="color:#d7ffff;font-size:11px">'+m+'</span>'});
content=content.replace(/\n/g,'<br>');
document.getElementById('aiStrategicReloContent').innerHTML=content;
}).catch(function(err){
document.getElementById('aiStrategicReloContent').innerHTML='<span style="color:#ff4444">Error: '+err.message+'</span>';
});
}

// === AI DECISION SUPPORT LAYER DATA ===
var aiDSCountryRisk=[
{name:'Somalia',lat:5.2,lng:46.2,risk:'CRITICAL',score:9.2,travel:'DO NOT TRAVEL',color:'#ff0000',threats:['Al-Shabaab insurgency','Clan warfare','Kidnapping','Piracy'],stability:'Failed state — no central government control over most territory',humanitarian:'Drought & famine affecting 6.9M people; IDP crisis',forecast:'Deteriorating — Al-Shabaab expanding; climate shocks worsening food insecurity'},
{name:'Sudan',lat:15.5,lng:32.5,risk:'CRITICAL',score:9.5,travel:'DO NOT TRAVEL',color:'#ff0000',threats:['Civil war (RSF vs SAF)','Ethnic cleansing in Darfur','Mass displacement','Famine risk'],stability:'Active civil war since April 2023; state collapse accelerating',humanitarian:'25M+ in need; Darfur genocide warnings; health system collapsed',forecast:'Catastrophic — no ceasefire in sight; regional spillover into Chad & South Sudan'},
{name:'DR Congo (East)',lat:-1.5,lng:29.0,risk:'CRITICAL',score:8.8,travel:'DO NOT TRAVEL',color:'#ff0000',threats:['M23 offensive (Rwanda-backed)','ADF-ISIS','Mai-Mai militias','Sexual violence as weapon of war'],stability:'Eastern provinces ungoverned; Goma under threat',humanitarian:'7M+ displaced — largest IDP crisis in Africa',forecast:'Escalating — M23 advances; regional proxy war deepening'},
{name:'Libya',lat:28.0,lng:17.0,risk:'HIGH',score:7.8,travel:'AVOID ALL TRAVEL',color:'#ff4400',threats:['Militia fragmentation','Arms trafficking hub','Migrant exploitation','Oil blockades'],stability:'Dual government paralysis; no elections since 2014',humanitarian:'Migrants subjected to slavery, trafficking & torture in detention',forecast:'Stagnant — frozen conflict with periodic escalation around oil revenues'},
{name:'Burkina Faso',lat:12.3,lng:-1.5,risk:'HIGH',score:8.1,travel:'DO NOT TRAVEL',color:'#ff2200',threats:['JNIM & ISGS expansion','Military junta instability','Mass displacement','Wagner/Africa Corps presence'],stability:'Military coup government unable to stem jihadist advance; 40%+ territory lost',humanitarian:'2M+ displaced; food crisis in north',forecast:'Deteriorating — jihadists encircling Ouagadougou; state capacity collapsing'},
{name:'Mali',lat:17.5,lng:-4.0,risk:'HIGH',score:8.0,travel:'DO NOT TRAVEL',color:'#ff2200',threats:['JNIM control of north','Tuareg rebellion revival','Wagner operations','Governance vacuum'],stability:'Junta isolated diplomatically; Wagner replacing French forces',humanitarian:'Rising food insecurity; displacement from north',forecast:'Unstable — Wagner departure risk would create power vacuum'},
{name:'Mozambique (Cabo Delgado)',lat:-12.5,lng:40.5,risk:'HIGH',score:7.5,travel:'AVOID ALL TRAVEL',color:'#ff4400',threats:['ASWJ/ISIS insurgency','LNG project disruption','Displacement','Rwandan military intervention'],stability:'Rwandan forces containing but not defeating insurgency',humanitarian:'1M+ displaced from northern province',forecast:'Contained but fragile — dependent on Rwandan military support'},
{name:'Nigeria',lat:9.1,lng:7.5,risk:'HIGH',score:7.2,travel:'RECONSIDER TRAVEL',color:'#ff6600',threats:['Boko Haram/ISWAP (NE)','Banditry (NW)','IPOB separatism (SE)','Kidnapping industry'],stability:'Multiple concurrent security crises; economic pressure rising',humanitarian:'Flooding, displacement, food insecurity affecting millions',forecast:'Stable-declining — security vacuum in north; economic deterioration fueling unrest'},
{name:'South Sudan',lat:6.8,lng:31.6,risk:'CRITICAL',score:8.5,travel:'DO NOT TRAVEL',color:'#ff0000',threats:['Inter-ethnic violence','Sudan war spillover','Oil revenue collapse','Armed factions'],stability:'Fragile peace deal barely holding; elections repeatedly delayed',humanitarian:'2/3 of population food insecure; cholera outbreaks',forecast:'High risk of renewed civil war — Sudan conflict destabilizing border regions'},
{name:'Ethiopia',lat:9.0,lng:38.7,risk:'HIGH',score:7.4,travel:'RECONSIDER TRAVEL',color:'#ff6600',threats:['Amhara insurgency (Fano)','Oromia-OLA conflict','Tigray instability','Eritrea tensions'],stability:'Post-Tigray war fragmentation; multiple regional insurgencies',humanitarian:'20M+ food insecure; Tigray recovery stalled',forecast:'Volatile — Amhara crisis escalating; ethnic federalism under strain'},
{name:'Central African Republic',lat:6.6,lng:20.9,risk:'HIGH',score:8.0,travel:'DO NOT TRAVEL',color:'#ff2200',threats:['Armed groups control 80% of territory','Wagner/Africa Corps','Ethnic militias','Cross-border raids'],stability:'Government controls only Bangui; Wagner propping up regime',humanitarian:'3.4M in need; displacement ongoing',forecast:'Frozen instability — Wagner maintains status quo but no state building'},
{name:'Cameroon',lat:5.9,lng:10.1,risk:'ELEVATED',score:6.5,travel:'RECONSIDER TRAVEL',color:'#ff8800',threats:['Anglophone crisis (NW/SW)','Boko Haram spillover (Far North)','Political succession crisis'],stability:'Aging president (91); succession uncertainty; separatist war in west',humanitarian:'Anglophone IDP crisis; refugees from Nigeria & CAR',forecast:'Succession risk — Biya regime transition could trigger instability'},
{name:'Kenya',lat:-1.3,lng:36.8,risk:'MODERATE',score:4.8,travel:'EXERCISE CAUTION',color:'#ffcc00',threats:['Al-Shabaab cross-border attacks','Political unrest risk','Cyber crime hub','Border insecurity (Somalia)'],stability:'Democratic but strained; Gen-Z protest movement; economic pressure',humanitarian:'Drought recovery in north; refugee hosting burden',forecast:'Stable with risks — economic grievances could trigger unrest'},
{name:'South Africa',lat:-30.6,lng:22.9,risk:'MODERATE',score:5.2,travel:'EXERCISE CAUTION',color:'#ffcc00',threats:['Violent crime','Xenophobic attacks','Infrastructure collapse (Eskom)','Political instability (GNU)'],stability:'Coalition government (GNU) holding but fragile; ANC decline',humanitarian:'Unemployment at 32%; service delivery protests',forecast:'Gradual decline — load-shedding crisis easing but structural issues persist'},
{name:'Egypt',lat:26.8,lng:30.8,risk:'MODERATE',score:5.0,travel:'EXERCISE CAUTION',color:'#ffcc00',threats:['Sinai militants (contained)','Economic crisis','Suez Canal revenue loss','Political repression blowback'],stability:'Authoritarian stability; economic fragility from IMF reforms',humanitarian:'Currency devaluation impacting food security for poorest',forecast:'Stable-fragile — economic pressure is key risk; Sisi regime unchallenged'},
{name:'Ghana',lat:7.9,lng:-1.0,risk:'LOW',score:3.2,travel:'NORMAL PRECAUTIONS',color:'#44cc44',threats:['Sahel spillover risk (northern border)','Economic recovery challenges','Cocoa sector stress'],stability:'Democratic; peaceful power transitions; IMF program stabilizing economy',humanitarian:'Northern poverty; flood vulnerability',forecast:'Positive — economic recovery underway; democratic institutions strong'},
{name:'Senegal',lat:14.7,lng:-17.4,risk:'LOW-MODERATE',score:3.8,travel:'NORMAL PRECAUTIONS',color:'#88cc44',threats:['Political volatility (Sonko movement)','Casamance residual','Youth unemployment','Democratic backsliding risk'],stability:'New government (Faye/Sonko); democratic transition; oil revenue incoming',humanitarian:'Casamance displacement (low-level); urban poverty',forecast:'Cautiously positive — new government honeymoon; oil production starting'},
{name:'Rwanda',lat:-1.9,lng:29.9,risk:'LOW',score:3.5,travel:'NORMAL PRECAUTIONS',color:'#44cc44',threats:['DRC proxy war blowback','Authoritarian governance','Regional isolation risk'],stability:'Highly stable internally; strong state capacity; authoritarian model',humanitarian:'Refugee hosting (DRC); limited political freedoms',forecast:'Stable — but DRC conflict and international pressure are key risks'},
{name:'Tanzania',lat:-6.4,lng:34.9,risk:'LOW',score:3.0,travel:'NORMAL PRECAUTIONS',color:'#44cc44',threats:['Cabo Delgado spillover (south border)','Political space narrowing'],stability:'Stable; President Hassan maintaining reform trajectory',humanitarian:'Climate-related food stress in some regions',forecast:'Positive — economic growth strong; regional stability anchor'},
{name:'Morocco',lat:31.8,lng:-7.1,risk:'LOW',score:2.8,travel:'NORMAL PRECAUTIONS',color:'#44cc44',threats:['Western Sahara tensions','Terrorism (low probability)','Migration pressure'],stability:'Stable monarchy; strong security apparatus; economic development focused',humanitarian:'Earthquake recovery (2023); drought stress',forecast:'Stable-positive — World Cup 2030 driving infrastructure investment'}
];

var aiDSLayer=null;var aiDSVisible=false;
function initAiDecisionSupport(){
if(!afrMapInstance.getPane('aiDSPane')){var p=afrMapInstance.createPane('aiDSPane');p.style.zIndex=650}
aiDSLayer=L.layerGroup();
aiDSCountryRisk.forEach(function(c){
var riskColor=c.color;
var marker=L.circleMarker([c.lat,c.lng],{radius:c.score*1.8,color:riskColor,fillColor:riskColor,fillOpacity:0.25,weight:2,opacity:0.8,pane:'aiDSPane'});
marker.bindPopup('<div style="font-family:Share Tech Mono,monospace;font-size:11px;max-width:320px;line-height:1.5;color:#d7ffff">'+
'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #44ff8833"><strong style="color:'+riskColor+';font-size:14px;text-shadow:0 0 8px '+riskColor+'66">'+c.name+'</strong><span style="background:'+riskColor+';color:#000;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:bold;letter-spacing:1px">'+c.risk+'</span></div>'+
'<div style="margin-bottom:8px;color:#7fd6df;font-size:12px">RISK SCORE: <span style="color:'+riskColor+';font-weight:bold;text-shadow:0 0 6px '+riskColor+'44">'+c.score+'/10</span> — Travel: <span style="color:#ffcc00">'+c.travel+'</span></div>'+
'<div style="margin-bottom:8px;padding:6px 8px;background:rgba(255,100,100,0.08);border-left:2px solid #ff6666;border-radius:0 4px 4px 0"><span style="color:#ff6666;font-weight:bold">⚠ THREATS:</span><br><span style="color:#e0e8ef">'+c.threats.map(function(t){return'• '+t}).join('<br>')+'</span></div>'+
'<div style="margin-bottom:8px;padding:6px 8px;background:rgba(255,170,0,0.08);border-left:2px solid #ffaa00;border-radius:0 4px 4px 0"><span style="color:#ffaa00;font-weight:bold">⊕ STABILITY:</span><br><span style="color:#e0e8ef">'+c.stability+'</span></div>'+
'<div style="margin-bottom:8px;padding:6px 8px;background:rgba(102,204,255,0.08);border-left:2px solid #66ccff;border-radius:0 4px 4px 0"><span style="color:#66ccff;font-weight:bold">♜ HUMANITARIAN:</span><br><span style="color:#e0e8ef">'+c.humanitarian+'</span></div>'+
'<div style="padding:6px 8px;background:rgba(68,255,136,0.08);border-left:2px solid #44ff88;border-radius:0 4px 4px 0"><span style="color:#44ff88;font-weight:bold">⟳ AI FORECAST:</span><br><span style="color:#e0e8ef">'+c.forecast+'</span></div>'+
'<div style="margin-top:10px;border-top:1px solid #44ff8833;padding-top:8px"><button onclick="aiDeepDive(\''+c.name.replace(/'/g,"\\'")+'\')" style="width:100%;padding:7px;background:#0a2a1a;border:1px solid #44ff88;color:#44ff88;font-size:10px;cursor:pointer;border-radius:3px;font-family:Share Tech Mono,monospace;letter-spacing:1px">🔬 AI DEEP DIVE</button></div>'+
'</div>',{maxWidth:360,className:'ai-ds-popup'});
marker.addTo(aiDSLayer);
});
aiDSVisible=false;
}
function toggleAiDSLayer(){
if(!aiDSLayer)initAiDecisionSupport();
if(aiDSVisible){afrMapInstance.removeLayer(aiDSLayer);aiDSVisible=false}
else{aiDSLayer.addTo(afrMapInstance);aiDSVisible=true}
var leg=document.getElementById('aiDSLegend');if(leg)leg.style.display=aiDSVisible?'block':'none';
var cb=document.getElementById('aiDSRiskToggle');if(cb)cb.checked=aiDSVisible;
var btn=document.getElementById('aiDSToggleBtn');if(btn){btn.style.borderColor=aiDSVisible?'#44ff88':'#00ffee44';btn.style.color=aiDSVisible?'#44ff88':'#00ffee'}
}

var aiDSApiKey='';
function refreshAiIntel(){
var statusEl=document.getElementById('aiDSRefreshStatus');
var btn=document.getElementById('aiDSRefreshBtn');
var keyField=document.getElementById('aiDSKeyField');
if(!aiDSApiKey){
var k=keyField.value.trim();
if(!k){statusEl.style.display='block';statusEl.innerHTML='<span style="color:#ffaa00">⚠ Enter your OpenAI API key above first</span>';return}
aiDSApiKey=k.replace(/[^\x20-\x7E]/g,'');
keyField.style.display='none';
document.getElementById('aiDSKeyInput').style.display='none';
}
statusEl.style.display='block';
statusEl.innerHTML='<span style="color:#44ff88">⟳ Generating fresh intel via GPT-4...</span>';
btn.disabled=true;btn.style.opacity='0.5';
var countries=aiDSCountryRisk.map(function(c){return c.name+' ('+c.lat+','+c.lng+')'}).join(', ');
var prompt='You are an OSINT intelligence analyst. Generate an updated threat assessment for these African countries/regions: '+countries+'. For EACH country return a JSON object with these exact fields: name, lat (number), lng (number), risk (one of: CRITICAL, HIGH, ELEVATED, MODERATE, LOW, LOW-MODERATE), score (number 1-10, one decimal), travel (one of: DO NOT TRAVEL, AVOID ALL TRAVEL, RECONSIDER TRAVEL, EXERCISE CAUTION, NORMAL PRECAUTIONS), color (hex: #ff0000 for CRITICAL, #ff2200/#ff4400 for HIGH, #ff6600/#ff8800 for ELEVATED, #ffcc00 for MODERATE, #44cc44/#88cc44 for LOW/LOW-MODERATE), threats (array of 2-4 short strings), stability (1 sentence), humanitarian (1 sentence), forecast (1 sentence). Return ONLY a JSON array, no markdown, no explanation. Base your assessment on current geopolitical conditions as of 2024-2025.';
fetch('https://api.openai.com/v1/chat/completions',{
method:'POST',
headers:{'Content-Type':'application/json','Authorization':'Bearer '+aiDSApiKey},
body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:'You are a geopolitical intelligence analyst specializing in African security. Respond only with valid JSON.'},{role:'user',content:prompt}],temperature:0.7,max_tokens:4000})
}).then(function(r){
if(!r.ok)throw new Error('API error: '+r.status);
return r.json();
}).then(function(data){
var content=data.choices[0].message.content.trim();
if(content.startsWith('```'))content=content.replace(/^```json?\n?/,'').replace(/\n?```$/,'');
var newData=JSON.parse(content);
if(!Array.isArray(newData)||newData.length===0)throw new Error('Invalid response format');
aiDSCountryRisk.length=0;
newData.forEach(function(c){aiDSCountryRisk.push(c)});
if(aiDSVisible){afrMapInstance.removeLayer(aiDSLayer);aiDSLayer=null;initAiDecisionSupport();aiDSLayer.addTo(afrMapInstance)}
else{aiDSLayer=null;initAiDecisionSupport()}
statusEl.innerHTML='<span style="color:#44ff88">✓ Intel updated — '+newData.length+' countries refreshed</span>';
setTimeout(function(){statusEl.style.display='none'},5000);
}).catch(function(err){
statusEl.innerHTML='<span style="color:#ff4444">✗ Error: '+err.message+'</span>';
if(err.message.indexOf('401')>-1){aiDSApiKey='';document.getElementById('aiDSKeyInput').style.display='block';document.getElementById('aiDSKeyField').style.display='block';document.getElementById('aiDSKeyField').value='';statusEl.innerHTML+='<br><span style="color:#ffaa00">Invalid API key — try again</span>'}
}).finally(function(){
btn.disabled=false;btn.style.opacity='1';
});
}

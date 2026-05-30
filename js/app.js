let headerTz=null,headerTzLabel='',headerTzIso='';
function updateClock(){const now=new Date();const flagEl=document.getElementById('gmtClockFlag');if(headerTz){const time=new Intl.DateTimeFormat('en-GB',{timeZone:headerTz,weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);gmtClock.textContent=time+' | '+headerTzLabel;if(flagEl){flagEl.innerHTML=`<img src='https://flagcdn.com/w80/${headerTzIso}.png' alt='${headerTzLabel.replace(/'/g,"&#39;")}' style='width:36px;height:auto;border-radius:3px'>`;flagEl.style.display='block'}}else{const utc=new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',weekday:'short',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);gmtClock.textContent=utc+' GMT / ZULU';if(flagEl){flagEl.innerHTML='';flagEl.style.display='none'}}}setInterval(updateClock,1000);updateClock();
function setHeaderTime(tz,label,iso){headerTz=tz;headerTzLabel=label;headerTzIso=iso||'';const setBtn=document.getElementById('setCountryBtn');if(setBtn){setBtn.style.display=tz?'none':'block'}updateClock();atwRender();atwUpdateTimes()}

let africaTimePanelOpen=false,africaTimeHideTimer=null;
function toggleAfricaTime(){const p=document.getElementById('africaTimePanel');if(africaTimePanelOpen){p.classList.remove('open');africaTimePanelOpen=false}else{p.classList.add('open');africaTimePanelOpen=true;atwRender();atwUpdateTimes()}}
function scheduleAfricaTimeHide(){africaTimeHideTimer=setTimeout(()=>{document.getElementById('africaTimePanel').classList.remove('open');africaTimePanelOpen=false},600)}
function clearAfricaTimeHide(){if(africaTimeHideTimer){clearTimeout(africaTimeHideTimer);africaTimeHideTimer=null}}
const atwAllCities=[
{iso:"dz",name:"Algeria",city:"Algiers",tz:"Africa/Algiers"},
{iso:"ao",name:"Angola",city:"Luanda",tz:"Africa/Luanda"},
{iso:"bj",name:"Benin",city:"Porto-Novo",tz:"Africa/Porto-Novo"},
{iso:"bw",name:"Botswana",city:"Gaborone",tz:"Africa/Gaborone"},
{iso:"bf",name:"Burkina Faso",city:"Ouagadougou",tz:"Africa/Ouagadougou"},
{iso:"bi",name:"Burundi",city:"Gitega",tz:"Africa/Bujumbura"},
{iso:"cm",name:"Cameroon",city:"Yaound\u00e9",tz:"Africa/Douala"},
{iso:"cv",name:"Cape Verde",city:"Praia",tz:"Atlantic/Cape_Verde"},
{iso:"cf",name:"Central African Republic",city:"Bangui",tz:"Africa/Bangui"},
{iso:"td",name:"Chad",city:"N'Djamena",tz:"Africa/Ndjamena"},
{iso:"km",name:"Comoros",city:"Moroni",tz:"Indian/Comoro"},
{iso:"cg",name:"Congo (Brazzaville)",city:"Brazzaville",tz:"Africa/Brazzaville"},
{iso:"cd",name:"Congo (Kinshasa)",city:"Kinshasa",tz:"Africa/Kinshasa"},
{iso:"ci",name:"C\u00f4te d'Ivoire",city:"Yamoussoukro",tz:"Africa/Abidjan"},
{iso:"dj",name:"Djibouti",city:"Djibouti",tz:"Africa/Djibouti"},
{iso:"eg",name:"Egypt",city:"Cairo",tz:"Africa/Cairo"},
{iso:"gq",name:"Equatorial Guinea",city:"Malabo",tz:"Africa/Malabo"},
{iso:"er",name:"Eritrea",city:"Asmara",tz:"Africa/Asmara"},
{iso:"sz",name:"Eswatini",city:"Mbabane",tz:"Africa/Mbabane"},
{iso:"et",name:"Ethiopia",city:"Addis Ababa",tz:"Africa/Addis_Ababa"},
{iso:"ga",name:"Gabon",city:"Libreville",tz:"Africa/Libreville"},
{iso:"gm",name:"Gambia",city:"Banjul",tz:"Africa/Banjul"},
{iso:"gh",name:"Ghana",city:"Accra",tz:"Africa/Accra"},
{iso:"gn",name:"Guinea",city:"Conakry",tz:"Africa/Conakry"},
{iso:"gw",name:"Guinea-Bissau",city:"Bissau",tz:"Africa/Bissau"},
{iso:"ke",name:"Kenya",city:"Nairobi",tz:"Africa/Nairobi"},
{iso:"ls",name:"Lesotho",city:"Maseru",tz:"Africa/Maseru"},
{iso:"lr",name:"Liberia",city:"Monrovia",tz:"Africa/Monrovia"},
{iso:"ly",name:"Libya",city:"Tripoli",tz:"Africa/Tripoli"},
{iso:"mg",name:"Madagascar",city:"Antananarivo",tz:"Indian/Antananarivo"},
{iso:"mw",name:"Malawi",city:"Lilongwe",tz:"Africa/Blantyre"},
{iso:"ml",name:"Mali",city:"Bamako",tz:"Africa/Bamako"},
{iso:"mr",name:"Mauritania",city:"Nouakchott",tz:"Africa/Nouakchott"},
{iso:"mu",name:"Mauritius",city:"Port Louis",tz:"Indian/Mauritius"},
{iso:"ma",name:"Morocco",city:"Rabat",tz:"Africa/Casablanca"},
{iso:"mz",name:"Mozambique",city:"Maputo",tz:"Africa/Maputo"},
{iso:"na",name:"Namibia",city:"Windhoek",tz:"Africa/Windhoek"},
{iso:"ne",name:"Niger",city:"Niamey",tz:"Africa/Niamey"},
{iso:"ng",name:"Nigeria",city:"Abuja",tz:"Africa/Lagos"},
{iso:"rw",name:"Rwanda",city:"Kigali",tz:"Africa/Kigali"},
{iso:"st",name:"S\u00e3o Tom\u00e9 and Pr\u00edncipe",city:"S\u00e3o Tom\u00e9",tz:"Africa/Sao_Tome"},
{iso:"sn",name:"Senegal",city:"Dakar",tz:"Africa/Dakar"},
{iso:"sc",name:"Seychelles",city:"Victoria",tz:"Indian/Mahe"},
{iso:"sl",name:"Sierra Leone",city:"Freetown",tz:"Africa/Freetown"},
{iso:"so",name:"Somalia",city:"Mogadishu",tz:"Africa/Mogadishu"},
{iso:"za",name:"South Africa",city:"Pretoria",tz:"Africa/Johannesburg"},
{iso:"ss",name:"South Sudan",city:"Juba",tz:"Africa/Juba"},
{iso:"sd",name:"Sudan",city:"Khartoum",tz:"Africa/Khartoum"},
{iso:"tz",name:"Tanzania",city:"Dodoma",tz:"Africa/Dar_es_Salaam"},
{iso:"tg",name:"Togo",city:"Lom\u00e9",tz:"Africa/Lome"},
{iso:"tn",name:"Tunisia",city:"Tunis",tz:"Africa/Tunis"},
{iso:"ug",name:"Uganda",city:"Kampala",tz:"Africa/Kampala"},
{iso:"zm",name:"Zambia",city:"Lusaka",tz:"Africa/Lusaka"},
{iso:"zw",name:"Zimbabwe",city:"Harare",tz:"Africa/Harare"},
{iso:"ag",name:"Antigua and Barbuda",city:"St. John's",tz:"America/Antigua"},
{iso:"bb",name:"Barbados",city:"Bridgetown",tz:"America/Barbados"},
{iso:"br",name:"Brazil",city:"Brasília",tz:"America/Sao_Paulo"},
{iso:"gd",name:"Grenada",city:"St. George's",tz:"America/Grenada"},
{iso:"gy",name:"Guyana",city:"Georgetown",tz:"America/Guyana"},
{iso:"jm",name:"Jamaica",city:"Kingston",tz:"America/Jamaica"},
{iso:"lc",name:"Saint Lucia",city:"Castries",tz:"America/St_Lucia"},
{iso:"tt",name:"Trinidad and Tobago",city:"Port of Spain",tz:"America/Port_of_Spain"}
];
function atwFlagImg(iso,size){return `<img src='https://flagcdn.com/w40/${iso}.png' alt='' style='width:${size||20}px;height:auto;vertical-align:middle;border-radius:2px'>`}
let atwShowAll=false;const atwTopCount=8;
let atwGrid=document.getElementById('atwCityGrid');
let atwSearchBox=document.getElementById('atwSearchBox');
let atwSelect=document.getElementById('atwCountrySelect');
let atwToggleBtn=document.getElementById('atwToggleShow');
let atwHourFormat=document.getElementById('atwHourFormat');
const atwOriginalHTML=document.getElementById('africaTimeWidget').innerHTML;
function atwGetFiltered(){const q=atwSearchBox.value.toLowerCase();return atwAllCities.filter(c=>c.name.toLowerCase().includes(q)||c.city.toLowerCase().includes(q))}
function atwRender(){
const filtered=atwGetFiltered();
const list=atwShowAll?filtered:filtered.slice(0,atwTopCount);
atwGrid.innerHTML='';
list.forEach((c,i)=>{const card=document.createElement('div');card.className='atw-card';card.id='atw-card-'+i;const isActive=headerTz===c.tz;card.innerHTML=`<div class='atw-country'><span class='atw-flag'>${atwFlagImg(c.iso)}</span>${c.name}</div><div class='atw-city'>${c.city}</div><div class='atw-time' id='atw-time-${i}'>--:--</div><div class='atw-date' id='atw-date-${i}'></div><div style='display:flex;gap:6px;margin-top:6px'><button class="atw-set-btn${isActive?' active':''}" data-tz="${c.tz}" data-iso="${c.iso}">${isActive?'RESET':'SET'}</button></div>`;card.querySelector('.atw-set-btn').onclick=function(){if(isActive){setHeaderTime(null,'','')}else{setHeaderTime(c.tz,c.name,c.iso);atwViewCountry(c.name,c.iso)}};atwGrid.appendChild(card)});
atwSelect.innerHTML='<option value="">Jump to country...</option>'+filtered.map((c,i)=>`<option value="${i}">${c.name}</option>`).join('')}
function atwUpdateTimes(){
if(!africaTimePanelOpen)return;
const now=new Date();const fv=atwHourFormat.value;const h12=fv==='auto'?undefined:(fv==='12');
const filtered=atwGetFiltered();const list=atwShowAll?filtered:filtered.slice(0,atwTopCount);
list.forEach((c,i)=>{const te=document.getElementById('atw-time-'+i);const de=document.getElementById('atw-date-'+i);if(te&&de){try{te.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:c.tz,hour:'2-digit',minute:'2-digit',hour12:h12}).format(now);de.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:c.tz,weekday:'short',month:'short',day:'numeric'}).format(now)}catch(e){te.textContent='Error'}}})}
setInterval(atwUpdateTimes,1000);
atwSearchBox.addEventListener('input',()=>{atwRender();atwUpdateTimes()});
atwToggleBtn.addEventListener('click',()=>{atwShowAll=!atwShowAll;atwToggleBtn.textContent=atwShowAll?'Collapse List':'Show All Countries';atwRender();atwUpdateTimes()});
atwSelect.addEventListener('change',()=>{const idx=atwSelect.value;if(idx!==''){let card=document.getElementById('atw-card-'+idx);if(!card){atwShowAll=true;atwToggleBtn.textContent='Collapse List';atwRender();atwUpdateTimes();card=document.getElementById('atw-card-'+idx)}if(card){card.classList.add('highlight');card.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>card.classList.remove('highlight'),2000)}}});
atwHourFormat.addEventListener('change',atwUpdateTimes);
document.addEventListener('click',function(e){const panel=document.getElementById('africaTimePanel');const clock=document.getElementById('gmtClock');const flag=document.getElementById('gmtClockFlag');const setBtn=document.getElementById('setCountryBtn');if(africaTimePanelOpen&&document.contains(e.target)&&!panel.contains(e.target)&&!clock.contains(e.target)&&!(flag&&flag.contains(e.target))&&!(setBtn&&setBtn.contains(e.target))){panel.classList.remove('open');africaTimePanelOpen=false}});
function atwRestoreWidget(){
document.getElementById('africaTimePanel').onmouseleave=scheduleAfricaTimeHide;
const w=document.getElementById('africaTimeWidget');
w.innerHTML=atwOriginalHTML;
atwGrid=document.getElementById('atwCityGrid');
atwSearchBox=document.getElementById('atwSearchBox');
atwSelect=document.getElementById('atwCountrySelect');
atwToggleBtn=document.getElementById('atwToggleShow');
atwHourFormat=document.getElementById('atwHourFormat');
atwSearchBox.addEventListener('input',()=>{atwRender();atwUpdateTimes()});
atwToggleBtn.addEventListener('click',()=>{atwShowAll=!atwShowAll;atwToggleBtn.textContent=atwShowAll?'Collapse List':'Show All Countries';atwRender();atwUpdateTimes()});
atwSelect.addEventListener('change',()=>{const idx=atwSelect.value;if(idx!==''){let card=document.getElementById('atw-card-'+idx);if(!card){atwShowAll=true;atwToggleBtn.textContent='Collapse List';atwRender();atwUpdateTimes();card=document.getElementById('atw-card-'+idx)}if(card){card.classList.add('highlight');card.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>card.classList.remove('highlight'),2000)}}});
atwHourFormat.addEventListener('change',atwUpdateTimes);
atwRender();atwUpdateTimes()}
function bugoutLink(item){if(!item.url)return `<span style='color:#7fd6df;font-size:13px;padding:6px 0;display:inline-block'>${esc(item.name)}</span>`;return `<a href='${safeHref(item.url)}' target='_blank' style='display:inline-block;padding:6px 12px;background:#081821;border:1px solid #00ffee44;border-radius:6px;color:#00ffee;text-decoration:none;font-family:Share Tech Mono,monospace;font-size:12px;transition:background 0.15s,box-shadow 0.15s' onmouseover="this.style.background='#0c2430';this.style.boxShadow='0 0 12px #00ffee66'" onmouseout="this.style.background='#081821';this.style.boxShadow='none'">${esc(item.name)}</a>`}
function bugoutSection(icon,title,content){return `<div style='margin-bottom:16px'><div style='color:#ff8800;font-family:Share Tech Mono,monospace;font-size:14px;margin-bottom:6px;text-shadow:0 0 6px #ff880066'>${icon} ${title}</div><div style='display:flex;flex-wrap:wrap;gap:6px'>${content}</div></div>`}
async function renderBugoutPanel(name,iso){
const p=document.getElementById('africaTimePanel');p.onmouseleave=null;clearAfricaTimeHide();p.scrollTop=0;
const w=document.getElementById('africaTimeWidget');
w.innerHTML=`<div style='text-align:center;padding:40px;color:#ff8800;font-family:Share Tech Mono,monospace'>Loading ${name} Travel Panel...</div>`;
const d=bugoutData[name];
if(!d){w.innerHTML=`<div style='padding:12px'><button class='atw-small-button' onclick="atwViewCountry('${name.replace(/'/g,"\\'")}','${iso}')">⬅ BACK</button><div style='text-align:center;color:#ff4444;padding:20px'>No bugout data available for ${name}.</div></div>`;return}
const flag=`https://flagcdn.com/w80/${iso}.png`;
let fxHtml='';
if(d.fx&&d.currency){
try{const r=await fetch('https://api.exchangerate-api.com/v4/latest/'+d.currency);const ed=await r.json();if(ed.rates){fxHtml=d.fx.map(c=>{const rate=ed.rates[c];return rate?`<div style='display:inline-block;padding:6px 12px;background:#081821;border:1px solid #ff880044;border-radius:6px;font-family:Share Tech Mono,monospace;font-size:12px;color:#ff8800'>${c}/${d.currency}: ${(1/rate).toFixed(2)}</div>`:''}).join('')}}catch(e){fxHtml='<span style="color:#7fd6df;font-size:12px">FX data unavailable</span>'}
}
let travelHtml=d.travel.map(t=>bugoutLink(t)).join('');
let airHtml='';
if(d.air.national)airHtml+=bugoutLink({name:d.air.national+' (National)',url:d.air.nationalUrl});
airHtml+=d.air.regional.map(a=>bugoutLink(a)).join('');
airHtml+=bugoutLink(d.air.search);
let groundHtml=d.ground.map(g=>bugoutLink(g)).join('');
let accomHtml=d.accommodation.map(a=>bugoutLink(a)).join('');
let commsHtml=d.comms.map(c=>bugoutLink(c)).join('');
let finHtml=d.financial.map(f=>bugoutLink(f)).join('');
let visaFreeHtml='';
if(d.visaFree&&d.visaFree.length){visaFreeHtml=bugoutSection('🌐','VISA-FREE DESTINATIONS ('+d.visaFree.length+')',d.visaFree.map(v=>visaFreeClickable(v)).join(''))}
let newsHtml='';
const dNews=typeof diasporaNewsSources!=='undefined'?diasporaNewsSources[name]:null;
if(dNews&&dNews.length){newsHtml=bugoutSection('📰','NEWS SOURCES',dNews.map(s=>bugoutLink({name:s[0],url:s[1]})).join(''))}
const panNews=typeof panAfricanDiasporaSources!=='undefined'?panAfricanDiasporaSources:[];
let panHtml='';
if(panNews.length){panHtml=bugoutSection('🌍','PAN-AFRICAN / DIASPORA',panNews.map(s=>bugoutLink({name:s[0],url:s[1]})).join(''))}
w.innerHTML=`<div style='padding:12px'>
<button class='atw-small-button' onclick="atwViewCountry('${name.replace(/'/g,"\\'")}','${iso}')" style='margin-bottom:16px'>⬅ BACK</button>
<div style='display:flex;align-items:center;gap:12px;margin-bottom:16px'><img src='${flag}' style='width:60px;border-radius:4px'><div><h2 style='margin:0;color:#ff8800;font-family:Share Tech Mono,monospace'>${name} — TRAVEL PANEL</h2><div style='color:#7fd6df;font-size:13px'>Mobility / Resilience</div></div></div>
${bugoutSection('🛂','TRAVEL DOCUMENTS',travelHtml)}
${bugoutSection('✈️','AIR MOBILITY',airHtml)}
${bugoutSection('🚕','GROUND TRANSPORT',groundHtml)}
${bugoutSection('🏨','ACCOMMODATION',accomHtml)}
${bugoutSection('📡','COMMUNICATIONS',commsHtml)}
${bugoutSection('💰','FINANCIAL',finHtml)}
${fxHtml?bugoutSection('📊','FX WATCH (LIVE)',fxHtml):''}
${visaFreeHtml}
${newsHtml}
${panHtml}
</div>`;
}
var iframeBlockedSites=new Set(['https://www.aps.dz','https://english.ahram.org.eg','https://www.almasryalyoum.com','https://www.dailynewsegypt.com','https://www.egyptindependent.com','https://alakhbar.info','https://www.map.ma','https://www.moroccoworldnews.com','https://sudantribune.com','https://www.24haubenin.info','https://www.burkina24.com','https://www.santiagomagazine.cv','https://thepoint.gm','https://graphic.com.gh','https://citinewsroom.com','https://guinee24.com','https://www.fratmat.info','https://www.frontpageafricaonline.com','https://www.liberianobserver.com','https://www.maliweb.net','https://www.premiumtimesng.com','https://www.channelstv.com','https://leadership.ng','https://tribuneonlineng.com','https://www.thecable.ng','https://www.sunnewsonline.com','https://www.ripplesnigeria.com','https://www.saharareporters.com','https://www.vanguardngr.com','https://www.punchng.com','https://www.dailytrust.com','https://www.seneweb.com','https://www.crtv.cm','https://www.radiookapi.net','https://www.lepotentiel.cd','https://actualite.cd','https://www.lanouvellerepublique.com','https://www.iwacu-burundi.org','https://hornobserver.com','https://addisstandard.com','https://nation.africa','https://www.the-star.co.ke','https://www.midi-madagasikara.mg','https://malawi24.com','https://clubofmozambique.com','https://www.newtimes.co.rw','https://www.rwandatoday.africa','https://www.ktpress.rw','https://www.garoweonline.com','https://radiotamazuj.org','https://www.thecitizen.co.tz','https://www.ippmedia.com','https://www.monitor.co.ug','https://www.postzambia.com','https://www.lusakatimes.com','https://www.herald.co.zw','https://www.newsday.co.zw','https://www.zimlive.com','https://www.mmegi.bw','https://informativenews.co.ls','https://www.namibian.com.na','https://www.news24.com','https://www.iol.co.za','https://jamaica-gleaner.com','https://guardian.co.tt','https://www.cnc3.co.tt','https://nowgrenada.com','https://thevoiceslu.com','https://antiguaobserver.com','https://antiguanewsroom.com','https://guyanachronicle.com','https://almapreta.com.br','https://www.geledes.org.br']);
function ucpSwitch(btn,url){document.querySelectorAll('#ucpBar .ucp-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var frame=document.getElementById('ucpFrame');frame.style.opacity='0';setTimeout(function(){frame.src=url;frame.onload=function(){frame.style.opacity='1'};setTimeout(function(){frame.style.opacity='1'},3000)},200)}
const liveuamapUrls={
'Algeria':'https://algeria.liveuamap.com/',
'Angola':'https://drcongo.liveuamap.com/',
'Benin':'https://sahel.liveuamap.com/',
'Botswana':'https://southafrica.liveuamap.com/',
'Burkina Faso':'https://sahel.liveuamap.com/',
'Burundi':'https://drcongo.liveuamap.com/',
'Cameroon':'https://cameroon.liveuamap.com/',
'Cape Verde':'https://sahel.liveuamap.com/',
'Central African Republic':'https://centralafrica.liveuamap.com/',
'Chad':'https://sahel.liveuamap.com/',
'Comoros':'https://tanzania.liveuamap.com/',
'Congo (Brazzaville)':'https://drcongo.liveuamap.com/',
'Congo (Kinshasa)':'https://drcongo.liveuamap.com/',
"C\u00f4te d'Ivoire":'https://sahel.liveuamap.com/',
'Djibouti':'https://somalia.liveuamap.com/',
'Egypt':'https://egypt.liveuamap.com/',
'Equatorial Guinea':'https://cameroon.liveuamap.com/',
'Eritrea':'https://ethiopia.liveuamap.com/',
'Eswatini':'https://southafrica.liveuamap.com/',
'Ethiopia':'https://ethiopia.liveuamap.com/',
'Gabon':'https://cameroon.liveuamap.com/',
'Gambia':'https://sahel.liveuamap.com/',
'Ghana':'https://sahel.liveuamap.com/',
'Guinea':'https://sahel.liveuamap.com/',
'Guinea-Bissau':'https://sahel.liveuamap.com/',
'Kenya':'https://kenya.liveuamap.com/',
'Lesotho':'https://southafrica.liveuamap.com/',
'Liberia':'https://sahel.liveuamap.com/',
'Libya':'https://libya.liveuamap.com/',
'Madagascar':'https://tanzania.liveuamap.com/',
'Malawi':'https://tanzania.liveuamap.com/',
'Mali':'https://sahel.liveuamap.com/',
'Mauritania':'https://sahel.liveuamap.com/',
'Mauritius':'https://southafrica.liveuamap.com/',
'Morocco':'https://algeria.liveuamap.com/',
'Mozambique':'https://tanzania.liveuamap.com/',
'Namibia':'https://southafrica.liveuamap.com/',
'Niger':'https://sahel.liveuamap.com/',
'Nigeria':'https://nigeria.liveuamap.com/',
'Rwanda':'https://drcongo.liveuamap.com/',
"S\u00e3o Tom\u00e9 and Pr\u00edncipe":'https://cameroon.liveuamap.com/',
'Senegal':'https://sahel.liveuamap.com/',
'Seychelles':'https://kenya.liveuamap.com/',
'Sierra Leone':'https://sahel.liveuamap.com/',
'Somalia':'https://somalia.liveuamap.com/',
'South Africa':'https://southafrica.liveuamap.com/',
'South Sudan':'https://sudan.liveuamap.com/',
'Sudan':'https://sudan.liveuamap.com/',
'Tanzania':'https://tanzania.liveuamap.com/',
'Togo':'https://sahel.liveuamap.com/',
'Tunisia':'https://tunisia.liveuamap.com/',
'Uganda':'https://uganda.liveuamap.com/',
'Zambia':'https://zimbabwe.liveuamap.com/',
'Zimbabwe':'https://zimbabwe.liveuamap.com/'
};
const blackPopPct={'Algeria':1,'Angola':98,'Benin':98,'Botswana':79,'Burkina Faso':98,'Burundi':85,'Cameroon':98,'Cape Verde':71,'Central African Republic':98,'Chad':53,"Congo (Brazzaville)":98,"Congo (Kinshasa)":98,"C\u00f4te d'Ivoire":98,'Djibouti':60,'Egypt':2,'Equatorial Guinea':98,'Eritrea':98,'Eswatini':97,'Ethiopia':98,'Gabon':98,'Gambia':98,'Ghana':98,'Guinea':98,'Guinea-Bissau':98,'Kenya':97,'Lesotho':99,'Liberia':95,'Libya':5,'Madagascar':36,'Malawi':98,'Mali':98,'Mauritania':40,'Morocco':1,'Mozambique':99,'Namibia':87,'Niger':98,'Nigeria':98,'Rwanda':98,"S\u00e3o Tom\u00e9 and Pr\u00edncipe":90,'Senegal':98,'Seychelles':76,'Sierra Leone':98,'Somalia':98,'South Africa':81,'South Sudan':98,'Sudan':52,'Tanzania':99,'Togo':98,'Tunisia':1,'Uganda':98,'Zambia':98,'Zimbabwe':98,'Antigua and Barbuda':87,'Barbados':92,'Brazil':56,'Grenada':82,'Guyana':29,'Jamaica':92,'Saint Lucia':83,'Trinidad and Tobago':35};
var _autoShowFx=false;
var _autoShowBugout=false;
var popupNewsChannels={"Nigeria":[{name:"NAN",embed:"https://www.youtube.com/embed/d4zDorDl5UE"},{name:"News Central TV",embed:"https://www.youtube.com/embed/mmZ7-HsnCuM"},{name:"Channels TV",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"}],"Ghana":[{name:"GhanaWeb TV",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Kenya":[{name:"Citizen TV Kenya",embed:"https://www.youtube.com/embed/Cy2Pc0X1P7w"},{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"CGTN Africa",embed:"https://www.youtube.com/embed/kChcuQUcn4Q"}],"South Africa":[{name:"SABC News",embed:"https://www.youtube.com/embed/6OCEj0030-s"},{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Ethiopia":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"CGTN Africa",embed:"https://www.youtube.com/embed/kChcuQUcn4Q"}],"Egypt":[{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"},{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"}],"Tanzania":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"CGTN Africa",embed:"https://www.youtube.com/embed/kChcuQUcn4Q"}],"Uganda":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"CGTN Africa",embed:"https://www.youtube.com/embed/kChcuQUcn4Q"}],"Rwanda":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Somalia":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"}],"Sudan":[{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"},{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"}],"South Sudan":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"}],"Libya":[{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"},{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"}],"Zimbabwe":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"SABC News",embed:"https://www.youtube.com/embed/6OCEj0030-s"}],"Zambia":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"SABC News",embed:"https://www.youtube.com/embed/6OCEj0030-s"}],"Mozambique":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Namibia":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"SABC News",embed:"https://www.youtube.com/embed/6OCEj0030-s"}],"Botswana":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"SABC News",embed:"https://www.youtube.com/embed/6OCEj0030-s"}],"Malawi":[{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},{name:"SABC News",embed:"https://www.youtube.com/embed/6OCEj0030-s"}],"Angola":[{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Senegal":[{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Cameroon":[{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"C\u00f4te d'Ivoire":[{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Mali":[{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}],"Burkina Faso":[{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},{name:"Africa 24 TV",embed:"https://africa24tv.com/live-english"}]};
var popupNewsEmbed={"Nigeria":{name:"NAN",embed:"https://www.youtube.com/embed/d4zDorDl5UE"},"Ghana":{name:"GhanaWeb TV",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Kenya":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"South Africa":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Ethiopia":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Egypt":{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"},"Tanzania":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Uganda":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Rwanda":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Somalia":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Sudan":{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"},"South Sudan":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Libya":{name:"Al Jazeera",embed:"https://www.youtube.com/embed/gCNeDWCI0vo"},"Zimbabwe":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Zambia":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Mozambique":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Namibia":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Botswana":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Malawi":{name:"Africanews",embed:"https://www.youtube.com/embed/NQjabLGdP5g"},"Angola":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Senegal":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Cameroon":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"C\u00f4te d'Ivoire":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Mali":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Burkina Faso":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Niger":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Chad":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Guinea":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Benin":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Togo":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Congo (Brazzaville)":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Congo (Kinshasa)":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Gabon":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Central African Republic":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Djibouti":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Madagascar":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Mauritania":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Burundi":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Morocco":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Algeria":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Tunisia":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Equatorial Guinea":{name:"Africanews FR",embed:"https://www.youtube.com/embed/b6R9-7KZ8YM"},"Jamaica":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"},"Trinidad and Tobago":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"},"Barbados":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"},"Antigua and Barbuda":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"},"Grenada":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"},"Guyana":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"},"Saint Lucia":{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"}};
function _renderCpApiKey(){
var w=document.getElementById('cpApiKeyWrap');
if(!w)return;
if(aiDSApiKey){
w.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;width:100%"><span style="color:#44ff88;font-size:10px;font-family:Share Tech Mono,monospace">🔑 AI modules enabled</span><span onclick="_cpApiKeyReset()" style="color:#ff444488;font-size:9px;cursor:pointer;font-family:Share Tech Mono,monospace;text-decoration:underline">reset</span></div>';
}else{
w.innerHTML='<div style="display:flex;align-items:center;gap:6px;width:100%"><input id="countryPanelApiKey" type="password" placeholder="Integrate your API key..." style="flex:1;min-width:0;padding:4px 6px;background:#081821;border:1px solid #44ff8833;color:#d7ffff;font-size:10px;border-radius:3px;font-family:Share Tech Mono,monospace;box-sizing:border-box" /><span onclick="_cpApiKeySet()" style="color:#44ff88;font-size:10px;cursor:pointer;font-family:Share Tech Mono,monospace;white-space:nowrap;text-decoration:underline">Enable AI</span></div>';
}
}
function _cpApiKeySet(){
var inp=document.getElementById('countryPanelApiKey');
if(!inp)return;
var k=inp.value.trim();
if(!k){alert('Enter an API key');return}
aiDSApiKey=k.replace(/[^\x20-\x7E]/g,'');
_renderCpApiKey();
var b=document.getElementById('aiCardBody');if(b)b.style.display='block';var a=document.getElementById('aiCardCollapseArrow');if(a)a.textContent='\u25bc';
}
function _cpApiKeyReset(){
aiDSApiKey='';
_renderCpApiKey();
}
async function atwViewCountry(name,iso){
const w=document.getElementById('africaTimeWidget');
w.innerHTML=`<div style='text-align:center;padding:40px;color:#00ffee;font-family:Share Tech Mono,monospace'>Loading ${name}...</div>`;
try{
const r=await fetch('https://restcountries.com/v3.1/name/'+encodeURIComponent(name)+'?fullText=true');
const d=await r.json();
if(!d||!d.length)throw new Error('Not found');
const c=d[0];
const flag=c.flags?c.flags.png:'';
const region=c.region||'N/A';
const subregion=c.subregion||'N/A';
const capital=c.capital?c.capital[0]:'N/A';
const code=(c.idd&&c.idd.root?c.idd.root:'')+(c.idd&&c.idd.suffixes?c.idd.suffixes[0]:'');
const pop=c.population?c.population.toLocaleString():'N/A';
const area=c.area?c.area.toLocaleString()+' km²':'N/A';
const curr=c.currencies?Object.values(c.currencies)[0]:{};
const currName=curr.name||'N/A';
const currTicker=c.currencies?Object.keys(c.currencies)[0]:'N/A';
const lang=c.languages?Object.values(c.languages).join(', '):'N/A';
const coords=c.latlng||[];
const gmap=coords.length?`https://www.google.com/maps/search/?q=${coords[0]},${coords[1]}`:`https://www.google.com/maps/search/?q=${capital}`;
const passIdx=`https://www.passportindex.org/passport/${name.toLowerCase().replace(/ /g,'-')}/`;
let exRate='N/A';
try{const er=await fetch('https://api.exchangerate-api.com/v4/latest/USD');const ed=await er.json();if(ed.rates&&ed.rates[currTicker])exRate=ed.rates[currTicker].toFixed(2)}catch(e){}
const bpop=blackPopPct[name];const bpopStr=bpop!==undefined?bpop+'%':'N/A';
const liveMapUrl=liveuamapUrls[name]||'https://africa.liveuamap.com/';
const countryNameMap={'Algeria':'Algeria','Angola':'Angola','Benin':'Benin','Botswana':'Botswana','Burkina Faso':'BurkinaFaso','Burundi':'Burundi','Cameroon':'Cameroon','Cape Verde':'CapeVerde','Central African Republic':'CentralAfricanRepublic','Chad':'Chad','Congo (Brazzaville)':'Congo','Congo (Kinshasa)':'DRCongo',"C\u00f4te d'Ivoire":'IvoryCoast','Djibouti':'Djibouti','Egypt':'Egypt','Equatorial Guinea':'EquatorialGuinea','Eritrea':'Eritrea','Eswatini':'Eswatini','Ethiopia':'Ethiopia','Gabon':'Gabon','Gambia':'Gambia','Ghana':'Ghana','Guinea':'Guinea','Guinea-Bissau':'GuineaBissau','Kenya':'Kenya','Lesotho':'Lesotho','Liberia':'Liberia','Libya':'Libya','Madagascar':'Madagascar','Malawi':'Malawi','Mali':'Mali','Mauritania':'Mauritania','Morocco':'Morocco','Mozambique':'Mozambique','Namibia':'Namibia','Niger':'Niger','Nigeria':'Nigeria','Rwanda':'Rwanda',"S\u00e3o Tom\u00e9 and Pr\u00edncipe":'SaoTome','Senegal':'Senegal','Sierra Leone':'SierraLeone','Somalia':'Somalia','South Africa':'SouthAfrica','South Sudan':'SouthSudan','Sudan':'Sudan','Tanzania':'Tanzania','Togo':'Togo','Tunisia':'Tunisia','Uganda':'Uganda','Zambia':'Zambia','Zimbabwe':'Zimbabwe','Antigua and Barbuda':'AntiguaAndBarbuda','Barbados':'Barbados','Brazil':'Brazil','Grenada':'Grenada','Guyana':'Guyana','Jamaica':'Jamaica','Saint Lucia':'SaintLucia','Trinidad and Tobago':'TrinidadAndTobago'};
const dataKey=countryNameMap[name]||'';
let newsSources=[];
if(dataKey){for(const reg of Object.values(africaData)){if(reg[dataKey]){newsSources=reg[dataKey];break}}}
let localBtns='';
if(newsSources.length){var iframeSrcs=[];var extSrcs=[];newsSources.forEach(function(s){if(typeof iframeBlockedSites!=='undefined'&&iframeBlockedSites.has(s[1])){extSrcs.push(s)}else{iframeSrcs.push(s)}});localBtns=iframeSrcs.map(function(s){return '<button class="ucp-btn" onclick="ucpSwitch(this,\''+safeHref(s[1])+'\')">'+esc(s[0])+'</button>'}).join('');if(extSrcs.length){localBtns+=extSrcs.map(function(s){return '<a class="ucp-btn" href="'+safeHref(s[1])+'" target="_blank" style="text-decoration:none;opacity:0.7" title="Opens in new tab">'+esc(s[0])+' ↗</a>'}).join('')}}
const escapedName=name.replace(/'/g,"\\'");
w.innerHTML=`<div style='padding:12px;position:relative'>
<button class='atw-small-button' onclick='atwRestoreWidget()' style='margin-bottom:16px'>⬅ BACK</button>
<div style='display:flex;align-items:center;gap:12px;margin-bottom:12px'><img src='${flag}' style='width:60px;border-radius:4px'><div><h2 style='margin:0;color:#00ffee;font-family:Share Tech Mono,monospace'>${name}</h2><div style='color:#7fd6df;font-size:13px'>${region} — ${subregion}</div></div></div>
<div style='display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;font-family:Rajdhani,sans-serif;font-size:13px;margin-bottom:10px'>
<div><span style='color:#7fd6df'>Capital:</span> <span style='color:#d7ffff'>${capital}</span></div>
<div><span style='color:#7fd6df'>Population:</span> <span style='color:#d7ffff'>${pop}</span></div>
<div><span style='color:#7fd6df'>Currency:</span> <span style='color:#d7ffff'>${currName} (${currTicker})</span></div>
<div><span style='color:#7fd6df'>Area:</span> <span style='color:#d7ffff'>${area}</span></div>
<div><span style='color:#7fd6df'>FX Rate (USD):</span> <span style='color:#d7ffff'>${exRate}</span></div>
<div><span style='color:#7fd6df'>Calling Code:</span> <span style='color:#d7ffff'>${code}</span></div>
<div><span style='color:#7fd6df'>Black Pop.:</span> <span style='color:#ffcc00'>${bpopStr}</span></div>
<div><span style='color:#7fd6df'>Language:</span> <span style='color:#d7ffff'>${lang}</span></div>
<div><a href='${passIdx}' target='_blank' style='color:#00ffee;text-decoration:none'>🛃 Passport Index</a></div>
<div id='countryWeather' style='grid-column:span 2'><span style='color:#7fd6df'>☀️ Weather:</span> <span style='color:#88aacc'>Loading...</span></div>
</div>
<div style='display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px'><button class='atw-small-button' onclick="showBugoutSlidePanel('${escapedName}','${iso}')" style='background:#0c2430;border-color:#ff8800;color:#ff8800;text-shadow:0 0 6px #ff880088'>✈️ TRAVEL</button><button class='atw-small-button' onclick="showFxPanel('${currTicker}','${escapedName}')" style='background:#0c2430;border-color:#ffcc00;color:#ffcc00;text-shadow:0 0 6px #ffcc0088'>💱 FX RATES</button><button class='atw-small-button' onclick="showLiveNewsPanel('${escapedName}')" style='background:#0c2430;border-color:#44ff88;color:#44ff88;text-shadow:0 0 6px #44ff8888'>📺 LIVE NEWS</button></div>
<div id='aiCardPanel' style='position:absolute;top:12px;right:12px;z-index:10;display:flex;flex-direction:column;align-items:stretch;gap:6px;background:#081821;border:1px solid #00ffee44;border-radius:8px;padding:0;min-width:200px;box-shadow:0 4px 20px rgba(0,255,238,0.1)'>
<div id='aiCardHeader' style='cursor:pointer;padding:6px 12px;border-bottom:1px solid #00ffee22;display:flex;align-items:center;justify-content:space-between;user-select:none;transition:background 0.2s' onmouseover="this.style.background='#0c2a35'" onmouseout="this.style.background='transparent'"><span style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66'>⚡ AI Reports ${name}</span><span id='aiCardCollapseArrow' style='color:#00ffee88;font-size:9px;padding:2px 4px'>▶</span></div>
<div id='aiCardBody' style='padding:8px 12px;display:none'>
<div id='cpApiKeyWrap' style='display:flex;align-items:center;gap:4px;margin-bottom:8px'></div>
<div style='display:flex;flex-wrap:wrap;gap:6px'><button class='atw-small-button' onclick="aiCountrySitrepMaster('${escapedName}')" style='background:#0c2430;border-color:#ff4444;color:#ff4444;text-shadow:0 0 6px #ff444488;font-size:10px;padding:5px 10px'>📋 SitRep</button><button class='atw-small-button' onclick="aiStrategicRelocation('${escapedName}')" style='background:#0c2430;border-color:#cc44ff;color:#cc44ff;text-shadow:0 0 6px #cc44ff88;font-size:10px;padding:5px 10px'>🏠 RELOCATE</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#00aaff;color:#00aaff;text-shadow:0 0 6px #00aaff88;font-size:10px;padding:5px 10px'>📊 ECON</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#ff8844;color:#ff8844;text-shadow:0 0 6px #ff884488;font-size:10px;padding:5px 10px'>🛡️ SECURITY</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#44ddaa;color:#44ddaa;text-shadow:0 0 6px #44ddaa88;font-size:10px;padding:5px 10px'>🏗️ INFRA</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#ff6600;color:#ff6600;text-shadow:0 0 6px #ff660088;font-size:10px;padding:5px 10px'>🚁 BUGOUT</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#88ccff;color:#88ccff;text-shadow:0 0 6px #88ccff88;font-size:10px;padding:5px 10px'>📡 INTEL 1</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#ffdd44;color:#ffdd44;text-shadow:0 0 6px #ffdd4488;font-size:10px;padding:5px 10px'>📡 INTEL 2</button><button class='atw-small-button' onclick="alert('Coming soon')" style='background:#0c2430;border-color:#66ffcc;color:#66ffcc;text-shadow:0 0 6px #66ffcc88;font-size:10px;padding:5px 10px'>📡 INTEL 3</button></div>
</div>
</div>
<div style='position:relative;overflow:hidden'><div id='countryDataMain'>
<div id="ucpBar" class="ucp-bar">
${localBtns}
<button class="ucp-btn map-btn active" onclick="ucpSwitch(this,'${liveMapUrl}')" style="margin-left:auto">🗺 CONFLICT MAP</button>
</div>
<iframe id="ucpFrame" src="${liveMapUrl}" style="width:100%;height:400px;border:1px solid #00ffee33;border-radius:8px;background:#081821" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
</div>
<div id='fxPanel' style='position:absolute;top:0;left:0;width:100%;min-height:100%;background:#061018;transform:translateX(100%);transition:transform 0.3s ease;display:none;overflow-y:auto;padding:12px;box-sizing:border-box'></div>
<div id='bugoutSlidePanel' style='position:absolute;top:0;left:0;width:100%;min-height:100%;background:#061018;transform:translateX(100%);transition:transform 0.3s ease;display:none;overflow-y:auto;padding:12px;box-sizing:border-box'></div>
<div id='liveNewsPanel' style='position:absolute;top:0;left:0;width:100%;min-height:100%;background:#061018;transform:translateX(100%);transition:transform 0.3s ease;display:none;overflow-y:auto;padding:12px;box-sizing:border-box'></div>
</div>
</div>`;
_renderCpApiKey();
(function(){var card=document.getElementById('aiCardPanel');var header=document.getElementById('aiCardHeader');if(!card||!header)return;function toggleCollapse(){var b=document.getElementById('aiCardBody');var a=document.getElementById('aiCardCollapseArrow');if(!b||!a)return;if(b.style.display==='none'){b.style.display='block';a.textContent='\u25bc'}else{b.style.display='none';a.textContent='\u25b6'}}header.addEventListener('click',function(){toggleCollapse()});var parentEl=card.parentElement;if(parentEl){parentEl.addEventListener('click',function(e){var b=document.getElementById('aiCardBody');if(b&&b.style.display!=='none'&&!card.contains(e.target)){b.style.display='none';var a=document.getElementById('aiCardCollapseArrow');if(a)a.textContent='\u25b6'}})}})();
if(coords.length>=2){fetch('https://api.open-meteo.com/v1/forecast?latitude='+coords[0]+'&longitude='+coords[1]+'&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto').then(r=>r.json()).then(wd=>{
var el=document.getElementById('countryWeather');
if(!el||!wd.current)return;
var t=wd.current.temperature_2m,wc=wd.current.weather_code,ws=wd.current.wind_speed_10m,rh=wd.current.relative_humidity_2m;
var desc={0:'☀️ Clear',1:'🌤 Mostly Clear',2:'⛅ Partly Cloudy',3:'☁️ Overcast',45:'🌫️ Fog',48:'🌫️ Rime Fog',51:'🌦 Light Drizzle',53:'🌦 Drizzle',55:'🌦 Heavy Drizzle',61:'🌧 Light Rain',63:'🌧 Rain',65:'🌧 Heavy Rain',71:'❄️ Light Snow',73:'❄️ Snow',75:'❄️ Heavy Snow',80:'🌧 Showers',81:'🌧 Heavy Showers',82:'⛈️ Violent Showers',95:'⚡ Thunderstorm',96:'⚡ Thunderstorm + Hail',99:'⚡ Severe Thunderstorm'};
var w=desc[wc]||'Unknown';
el.innerHTML='<span style="color:#7fd6df">☀️ Weather ('+capital+'):</span> <span style="color:#d7ffff">'+w+' '+t+'°C, Wind '+ws+' km/h, Humidity '+rh+'%</span>';
}).catch(function(){})}
if(_autoShowFx){_autoShowFx=false;setTimeout(function(){showFxPanel(currTicker,name)},200)}
if(_autoShowBugout){_autoShowBugout=false;setTimeout(function(){showBugoutSlidePanel(name,iso)},200)}
}catch(e){w.innerHTML=`<div style='padding:20px'><button class='atw-small-button' onclick='atwRestoreWidget()'>⬅ BACK</button><div style='text-align:center;color:#ff4444;padding:20px'>Failed to load country data.</div></div>`}}
function showFxPanel(currTicker,countryName){
_hideAllCountryPanels();
var panel=document.getElementById('fxPanel');if(!panel)return;
panel.innerHTML="<div style='text-align:center;padding:30px;color:#00ffee;font-family:Share Tech Mono,monospace'>Loading FX rates...</div>";
panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);
fetch('https://api.exchangerate-api.com/v4/latest/USD').then(function(r){return r.json()}).then(function(data){
var targets=['USD','GBP','EUR','CNY','RUB','CAD'];var localRate=data.rates[currTicker]||1;
var h="<button class='atw-small-button' onclick='hideFxPanel()' style='margin-bottom:12px'>\u2B05 BACK</button>";
h+="<h3 style='color:#00ffee;font-family:Share Tech Mono,monospace;margin-bottom:12px;text-shadow:0 0 8px #00ffee66'>\uD83D\uDCB1 FX RATES</h3>";
h+="<div style='color:#7fd6df;font-size:12px;margin-bottom:12px'>"+countryName+" ("+currTicker+")</div>";
h+="<div style='display:flex;gap:12px;flex-wrap:wrap'>";
h+="<div style='flex:1;min-width:200px;display:grid;gap:8px;align-content:start'>";
targets.forEach(function(t){if(t===currTicker)return;var targetRate=data.rates[t]||1;var crossRate=localRate/targetRate;var tvUrl='https://www.tradingview.com/symbols/'+t+currTicker+'/';
h+="<a href='"+tvUrl+"' target='_blank' style='display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#081821;border:1px solid #00ffee33;border-radius:6px;text-decoration:none;cursor:pointer;transition:border-color 0.2s' onmouseover=\"this.style.borderColor='#00ffee88'\" onmouseout=\"this.style.borderColor='#00ffee33'\">";
h+="<span style='color:#7fd6df;font-family:Share Tech Mono,monospace;font-size:13px'>1 "+t+"</span>";
h+="<span style='color:#ffcc00;font-family:Share Tech Mono,monospace;font-size:15px;font-weight:bold'>"+crossRate.toFixed(2)+" "+currTicker+"</span></a>"});
h+="</div>";
h+="<div id='tvChartWrap' style='flex:2;min-width:300px;height:400px;border:1px solid #00ffee33;border-radius:8px;overflow:hidden'><div class='tradingview-widget-container' style='height:100%;width:100%'><div class='tradingview-widget-container__widget' style='height:calc(100% - 32px);width:100%'></div></div></div>";
h+="</div>";
panel.innerHTML=h;
setTimeout(function(){var c=panel.querySelector('#tvChartWrap .tradingview-widget-container');if(!c)return;var s=document.createElement('script');s.type='text/javascript';s.src='https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';s.async=true;s.textContent=JSON.stringify({"allow_symbol_change":true,"calendar":false,"details":false,"hide_side_toolbar":true,"hide_top_toolbar":false,"hide_legend":false,"hide_volume":false,"hotlist":false,"interval":"D","locale":"en","save_image":true,"style":"1","symbol":"FX_IDC:USD"+currTicker,"theme":"dark","timezone":"Etc/UTC","backgroundColor":"#0F0F0F","gridColor":"rgba(242, 242, 242, 0.06)","watchlist":["FX_IDC:GBP"+currTicker,"FX_IDC:EUR"+currTicker,"FX_IDC:CAD"+currTicker,"FX_IDC:CNY"+currTicker],"withdateranges":false,"compareSymbols":[],"studies":[],"autosize":true});c.appendChild(s)},100);
}).catch(function(){panel.innerHTML="<button class='atw-small-button' onclick='hideFxPanel()' style='margin-bottom:12px'>\u2B05 BACK</button><div style='color:#ff4444;padding:20px;text-align:center'>Failed to load FX rates.</div>"})}
function _hideAllCountryPanels(){['fxPanel','bugoutSlidePanel','liveNewsPanel'].forEach(function(id){var p=document.getElementById(id);if(p){p.style.transform='translateX(100%)';p.style.display='none';var ifr=p.querySelector('iframe');if(ifr)ifr.src='about:blank'}});var atp=document.getElementById('africaTimePanel');if(atp)atp.scrollTop=0}
function hideFxPanel(){_hideAllCountryPanels()}
var _liveNewsPanelIdx=0;
function showLiveNewsPanel(countryName){
_hideAllCountryPanels();
var panel=document.getElementById('liveNewsPanel');if(!panel)return;
panel.dataset.country=countryName;
var channels=_getPopupChannels(countryName);
_liveNewsPanelIdx=0;
_renderLiveNewsPanel(panel,countryName,channels);
panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10)}
function _renderLiveNewsPanel(panel,countryName,channels){
var ch=channels[_liveNewsPanelIdx%channels.length];
var embedSrc=ch.embed.indexOf('youtube.com')>=0?(ch.embed+'?autoplay=1&mute=1'):ch.embed;
var h="<button class='atw-small-button' onclick='hideLiveNewsPanel()' style='margin-bottom:12px'>\u2B05 BACK</button>";
h+="<h3 style='color:#44ff88;font-family:Share Tech Mono,monospace;margin-bottom:8px;text-shadow:0 0 8px #44ff8866'>\uD83D\uDCFA LIVE NEWS</h3>";
h+="<div style='color:#7fd6df;font-size:12px;margin-bottom:10px'>"+countryName+"</div>";
h+="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:8px'>";
if(channels.length>1){h+="<button onclick='event.stopPropagation();liveNewsPanelPrev()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:14px;cursor:pointer;padding:4px 12px;border-radius:3px;font-family:Share Tech Mono,monospace'>&#9664;</button>"}else{h+="<span></span>"}
h+="<div style='display:flex;align-items:center;gap:6px'><span style='color:#ff4444;font-size:10px'>&#9679;</span><span style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:1px'>"+ch.name+"</span></div>";
if(channels.length>1){h+="<button onclick='event.stopPropagation();liveNewsPanelNext()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:14px;cursor:pointer;padding:4px 12px;border-radius:3px;font-family:Share Tech Mono,monospace'>&#9654;</button>"}else{h+="<span></span>"}
h+="</div>";
h+="<iframe src='"+embedSrc+"' style='width:100%;height:400px;border:1px solid #00ffee33;border-radius:8px;background:#081821' frameborder='0' allow='autoplay;encrypted-media' allowfullscreen></iframe>";
if(channels.length>1){h+="<div style='text-align:center;margin-top:8px'><span style='color:#7fd6df;font-size:11px;font-family:Share Tech Mono,monospace'>"+(_liveNewsPanelIdx%channels.length+1)+" / "+channels.length+"</span></div>"}
panel.innerHTML=h}
function liveNewsPanelPrev(){var panel=document.getElementById('liveNewsPanel');if(!panel)return;var countryName=panel.dataset.country;var channels=_getPopupChannels(countryName);_liveNewsPanelIdx=(_liveNewsPanelIdx-1+channels.length)%channels.length;_renderLiveNewsPanel(panel,countryName,channels)}
function liveNewsPanelNext(){var panel=document.getElementById('liveNewsPanel');if(!panel)return;var countryName=panel.dataset.country;var channels=_getPopupChannels(countryName);_liveNewsPanelIdx=(_liveNewsPanelIdx+1)%channels.length;_renderLiveNewsPanel(panel,countryName,channels)}
function hideLiveNewsPanel(){_hideAllCountryPanels()}
function showBugoutSlidePanel(name,iso){
_hideAllCountryPanels();
var panel=document.getElementById('bugoutSlidePanel');if(!panel)return;
var d=bugoutData[name];
if(!d){panel.innerHTML="<button class='atw-small-button' onclick='hideBugoutSlidePanel()' style='margin-bottom:12px'>\u2B05 BACK</button><div style='color:#ff4444;padding:20px;text-align:center'>No bugout data for "+name+".</div>";panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);return}
panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);
function ml(item){if(!item||!item.url)return '<div style="color:#7fd6df;font-size:11px;padding:2px 0">'+(item?item.name:'')+'</div>';return '<div style="padding:2px 0"><a href="'+item.url+'" target="_blank" style="color:#00ffee;text-decoration:none;font-size:11px;font-family:Share Tech Mono,monospace">'+item.name+'</a></div>'}
function card(icon,title,links){return '<div style="flex:1 1 calc(33.3% - 8px);min-width:140px;padding:10px;background:#081821;border:1px solid #ff880033;border-radius:6px"><div style="color:#ff8800;font-family:Share Tech Mono,monospace;font-size:11px;margin-bottom:6px;text-shadow:0 0 6px #ff880066">'+icon+' '+title+'</div>'+links+'</div>'}
var h="<button class='atw-small-button' onclick='hideBugoutSlidePanel()' style='margin-bottom:12px'>\u2B05 BACK</button>";
h+="<h3 style='color:#ff8800;font-family:Share Tech Mono,monospace;margin-bottom:12px;text-shadow:0 0 8px #ff880066'>\u2708\uFE0F TRAVEL \u2014 "+name+"</h3>";
var tl=d.travel.map(ml).join('');
var al='';if(d.air.national)al+=ml({name:d.air.national+' (National)',url:d.air.nationalUrl});al+=d.air.regional.map(ml).join('');al+=ml(d.air.search);
h+='<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">';
h+=card('\uD83D\uDEC2','TRAVEL DOCUMENTS',tl);
h+=card('\u2708\uFE0F','AIR MOBILITY',al);
h+=card('\uD83D\uDE95','GROUND TRANSPORT',d.ground.map(ml).join(''));
h+=card('\uD83C\uDFE8','ACCOMMODATION',d.accommodation.map(ml).join(''));
h+=card('\uD83D\uDCE1','COMMUNICATIONS',d.comms.map(ml).join(''));
h+=card('\uD83D\uDCB0','FINANCIAL',d.financial.map(ml).join(''));
h+='</div>';
if(d.visaFree&&d.visaFree.length){h+='<div style="margin-bottom:12px"><div style="color:#ff8800;font-family:Share Tech Mono,monospace;font-size:11px;margin-bottom:6px;text-shadow:0 0 6px #ff880066">\uD83C\uDF10 VISA-FREE DESTINATIONS ('+d.visaFree.length+')</div><div style="display:flex;flex-wrap:wrap;gap:6px">'+d.visaFree.map(function(v){var label=v.name+(v.days?' ('+v.days+' days)':'');var nameEsc=v.name.replace(/'/g,"\\'");return '<span onclick="navigateToVisaFreeCountry(\''+nameEsc+'\')" style="display:inline-block;padding:4px 8px;background:#081821;border:1px solid #ff880033;border-radius:4px;color:#7fd6df;font-size:11px;font-family:Share Tech Mono,monospace;cursor:pointer;transition:background 0.15s" onmouseover="this.style.background=\'#0c2430\'" onmouseout="this.style.background=\'#081821\'">'+label+'</span>'}).join('')+'</div></div>'}
panel.innerHTML=h}
function hideBugoutSlidePanel(){_hideAllCountryPanels()}
function showPopupFxRates(){_autoShowFx=true;popupSetCountry(_lastPopupInfo.name);_globeClosePopup()}
function showPopupBugout(){_autoShowBugout=true;popupSetCountry(_lastPopupInfo.name);_globeClosePopup()}
function showPopupFxSlide(){
var panel=document.getElementById('popupFxSlide');if(!panel)return;
var bp=document.getElementById('popupBugoutSlide');if(bp){bp.style.transform='translateX(100%)';bp.style.display='none'}
var np=document.getElementById('popupNewsSlide');if(np){np.style.transform='translateX(100%)';np.style.display='none'}
var hp=document.getElementById('popupHeadlineSlide');if(hp){hp.style.transform='translateX(100%)';hp.style.display='none'}
var info=_lastPopupInfo;var currTicker=(info.currCodes&&info.currCodes.length>0)?info.currCodes[0]:'USD';
panel.innerHTML="<div style='text-align:center;padding:20px;color:#00ffee;font-size:11px'>Loading FX rates...</div>";
panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);
fetch('https://api.exchangerate-api.com/v4/latest/USD').then(function(r){return r.json()}).then(function(data){
var targets=['USD','GBP','EUR','CNY','RUB','CAD'];var localRate=data.rates[currTicker]||1;
var h="<button class='popup-action-btn' onclick='hidePopupFxSlide()' style='margin-bottom:8px;font-size:10px'>\u2B05 BACK</button>";
h+="<div style='color:#00ffee;font-size:11px;margin-bottom:8px;text-shadow:0 0 6px #00ffee66'>\uD83D\uDCB1 FX \u2014 "+info.name+" ("+currTicker+")</div>";
h+="<div style='display:grid;gap:4px'>";
targets.forEach(function(t){if(t===currTicker)return;var targetRate=data.rates[t]||1;var crossRate=localRate/targetRate;
h+="<div style='display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:#081821;border:1px solid #00ffee22;border-radius:4px'>";
h+="<span style='color:#7fd6df;font-size:11px'>1 "+t+"</span>";
h+="<span style='color:#ffcc00;font-size:12px;font-weight:bold'>"+crossRate.toFixed(2)+" "+currTicker+"</span></div>"});
h+="</div>";panel.innerHTML=h;
}).catch(function(){panel.innerHTML="<button class='popup-action-btn' onclick='hidePopupFxSlide()' style='margin-bottom:8px;font-size:10px'>\u2B05 BACK</button><div style='color:#ff4444;padding:12px;text-align:center;font-size:11px'>Failed to load FX rates.</div>"})}
function hidePopupFxSlide(){var panel=document.getElementById('popupFxSlide');if(!panel)return;panel.style.transform='translateX(100%)';setTimeout(function(){panel.style.display='none'},300)}
function showPopupHeadlineSlide(){
var panel=document.getElementById('popupHeadlineSlide');if(!panel)return;
var fp=document.getElementById('popupFxSlide');if(fp){fp.style.transform='translateX(100%)';fp.style.display='none'}
var bp=document.getElementById('popupBugoutSlide');if(bp){bp.style.transform='translateX(100%)';bp.style.display='none'}
var np=document.getElementById('popupNewsSlide');if(np){np.style.transform='translateX(100%)';np.style.display='none'}
var info=_lastPopupInfo;
panel.innerHTML="<button class='popup-action-btn' onclick='hidePopupHeadlineSlide()' style='margin-bottom:8px;font-size:10px'>\u2B05 BACK</button><div style='color:#d7a0ff;font-size:11px;margin-bottom:8px;text-shadow:0 0 6px #d7a0ff66'>\uD83D\uDCCB HEADLINES \u2014 "+info.name+"</div><div id='popupHeadlineList' style='text-align:center;color:#7fd6df;font-size:10px;padding:12px'>Loading headlines...</div>";
panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);
_fetchPopupHeadlines(info.name)}
function _getCountryNewsSources(countryName){
var dataKey=countryNameMap[countryName]||'';
if(!dataKey)return[];
for(var reg of Object.values(africaData)){if(reg[dataKey])return reg[dataKey]}
return[]}
function _fetchPopupHeadlines(countryName){
var container=document.getElementById('popupHeadlineList');if(!container)return;
var feed;
if(countryName==='Nigeria'){feed={url:'https://nannews.ng/feed/',tag:'NAN'}}
else{var sources=_getCountryNewsSources(countryName);if(sources.length){var base=sources[0][1].replace(/\/$/,'');feed={url:base+'/feed',tag:sources[0][0]}}}
if(!feed){container.innerHTML='<div style="color:#7fd6df;padding:12px;text-align:center;font-size:10px">No headline source for '+esc(countryName)+'.</div>';return}
fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(feed.url)).then(function(r){return r.json()}).then(function(d){
if(d.status!=='ok'||!d.items||!d.items.length){container.innerHTML='<div style="color:#7fd6df;padding:12px;text-align:center;font-size:10px">No recent headlines from '+esc(feed.tag)+'.</div>';return}
var h='';d.items.slice(0,30).forEach(function(item){
var timeStr=item.pubDate?new Date(item.pubDate).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'';
h+='<a href="'+safeHref(item.link)+'" target="_blank" style="text-decoration:none;display:block;margin-bottom:4px">';
h+='<div style="background:#081821;border-left:3px solid #d7a0ff;border-radius:0 4px 4px 0;padding:6px 8px;transition:background 0.15s" onmouseenter="this.style.background=\'#0c2a35\'" onmouseleave="this.style.background=\'#081821\'">';
h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px"><span style="color:#d7a0ff;font-family:Share Tech Mono,monospace;font-size:9px;letter-spacing:1px">'+esc(feed.tag)+'</span><span style="color:#7fd6df;font-family:Share Tech Mono,monospace;font-size:9px">'+timeStr+'</span></div>';
h+='<div style="color:#f1f5f9;font-family:Rajdhani,sans-serif;font-size:12px;line-height:1.3">'+esc(item.title)+'</div>';
h+='</div></a>'});container.innerHTML=h
}).catch(function(){container.innerHTML='<div style="color:#ff4444;padding:12px;text-align:center;font-size:10px">Failed to load headlines from '+esc(feed.tag)+'.</div>'})}
function hidePopupHeadlineSlide(){var panel=document.getElementById('popupHeadlineSlide');if(!panel)return;panel.style.transform='translateX(100%)';setTimeout(function(){panel.style.display='none'},300)}
function showPopupBugoutSlide(){
var panel=document.getElementById('popupBugoutSlide');if(!panel)return;
var fp=document.getElementById('popupFxSlide');if(fp){fp.style.transform='translateX(100%)';fp.style.display='none'}
var np=document.getElementById('popupNewsSlide');if(np){np.style.transform='translateX(100%)';np.style.display='none'}
var hp=document.getElementById('popupHeadlineSlide');if(hp){hp.style.transform='translateX(100%)';hp.style.display='none'}
var info=_lastPopupInfo;var d=bugoutData[info.name];
if(!d){panel.innerHTML="<button class='popup-action-btn' onclick='hidePopupBugoutSlide()' style='margin-bottom:8px;font-size:10px'>\u2B05 BACK</button><div style='color:#ff4444;padding:12px;text-align:center;font-size:11px'>No bugout data for "+info.name+".</div>";panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);return}
panel.style.display='block';setTimeout(function(){panel.style.transform='translateX(0)'},10);
function ml(item){if(!item||!item.url)return '<div style="padding:1px 0"><span style="color:#7fd6df;font-size:11px">'+(item?item.name:'')+'</span></div>';return '<div style="padding:1px 0"><a href="'+item.url+'" target="_blank" style="color:#00ffee;text-decoration:none;font-size:11px">'+item.name+'</a></div>'}
function ms(icon,title,links){return '<div style="margin-bottom:8px"><div style="color:#ff8800;font-size:10px;margin-bottom:2px;text-shadow:0 0 4px #ff880044">'+icon+' '+title+'</div><div style="padding-left:6px">'+links+'</div></div>'}
var h="<button class='popup-action-btn' onclick='hidePopupBugoutSlide()' style='margin-bottom:8px;font-size:10px'>\u2B05 BACK</button>";
h+="<div style='color:#ff8800;font-size:11px;margin-bottom:8px;text-shadow:0 0 6px #ff880066'>\uD83D\uDE81 BUGOUT \u2014 "+info.name+"</div>";
var tl=d.travel.map(ml).join('');h+=ms('\uD83D\uDEC2','TRAVEL DOCUMENTS',tl);
var al='';if(d.air.national)al+=ml({name:d.air.national+' (National)',url:d.air.nationalUrl});al+=d.air.regional.map(ml).join('');al+=ml(d.air.search);h+=ms('\u2708\uFE0F','AIR MOBILITY',al);
h+=ms('\uD83D\uDE95','GROUND TRANSPORT',d.ground.map(ml).join(''));
h+=ms('\uD83C\uDFE8','ACCOMMODATION',d.accommodation.map(ml).join(''));
h+=ms('\uD83D\uDCE1','COMMUNICATIONS',d.comms.map(ml).join(''));
h+=ms('\uD83D\uDCB0','FINANCIAL',d.financial.map(ml).join(''));
if(d.visaFree&&d.visaFree.length){h+=ms('\uD83C\uDF10','VISA-FREE DESTINATIONS ('+d.visaFree.length+')',d.visaFree.map(function(v){var label=v.name+(v.days?' ('+v.days+' days)':'');var nameEsc=v.name.replace(/'/g,"\\'");return '<div style="padding:1px 0"><span onclick="navigateToVisaFreeCountry(\''+nameEsc+'\')" style="color:#7fd6df;font-size:11px;cursor:pointer;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px" onmouseover="this.style.color=\'#00ffee\'" onmouseout="this.style.color=\'#7fd6df\'">'+label+'</span></div>'}).join(''))}
panel.innerHTML=h}
function hidePopupBugoutSlide(){var panel=document.getElementById('popupBugoutSlide');if(!panel)return;panel.style.transform='translateX(100%)';setTimeout(function(){panel.style.display='none'},300)}
var _popupChIdx=0;
function _getPopupChannels(countryName){var list=popupNewsChannels[countryName];if(list&&list.length)return list;var single=popupNewsEmbed[countryName];if(single)return [single];return [{name:"Arise News",embed:"https://www.youtube.com/embed/TJ5V8KRSu9Y"}]}
function showPopupNewsSlide(){
var panel=document.getElementById('popupNewsSlide');if(!panel)return;
var fp=document.getElementById('popupFxSlide');if(fp){fp.style.transform='translateX(100%)';fp.style.display='none'}
var bp=document.getElementById('popupBugoutSlide');if(bp){bp.style.transform='translateX(100%)';bp.style.display='none'}
var hp=document.getElementById('popupHeadlineSlide');if(hp){hp.style.transform='translateX(100%)';hp.style.display='none'}
var info=_lastPopupInfo;
_popupChIdx=0;
_renderPopupChannel(panel,info)}
var _popupNewsFull=false;
function _renderPopupChannel(panel,info,skipAnim){
var channels=_getPopupChannels(info.name);var ch=channels[_popupChIdx%channels.length];
var h="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:8px'><button class='popup-action-btn' onclick='event.stopPropagation();hidePopupNewsSlide()' style='font-size:10px'>\u2B05 BACK</button><button onclick='event.stopPropagation();togglePopupNewsFull()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 8px;border-radius:3px;font-family:Share Tech Mono,monospace' title='Toggle Full Screen'>\u26F6</button></div>";
h+="<div style='color:#44ff88;font-size:11px;margin-bottom:6px;text-shadow:0 0 6px #44ff8866'>\uD83D\uDCF0 "+ch.name+" \u2014 "+info.name+"</div>";
var embedSrc=ch.embed.indexOf('youtube.com')>=0?(ch.embed+'?autoplay=1&mute=1'):ch.embed;
h+="<iframe id='popupNewsIframe' src='"+embedSrc+"' style='width:100%;flex:1;min-height:180px;border:1px solid #00ffee33;border-radius:4px' frameborder='0' allow='autoplay;encrypted-media' allowfullscreen></iframe>";
if(channels.length>1){h+="<div style='display:flex;align-items:center;justify-content:center;gap:10px;margin-top:6px;flex-shrink:0'>";h+="<button onclick='event.stopPropagation();popupNewsChPrev()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:12px;cursor:pointer;padding:3px 10px;border-radius:3px;font-family:Share Tech Mono,monospace'>&#9664;</button>";h+="<span style='color:#7fd6df;font-size:10px;font-family:Share Tech Mono,monospace'>"+(_popupChIdx%channels.length+1)+" / "+channels.length+"</span>";h+="<button onclick='event.stopPropagation();popupNewsChNext()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:12px;cursor:pointer;padding:3px 10px;border-radius:3px;font-family:Share Tech Mono,monospace'>&#9654;</button>";h+="</div>"}
panel.innerHTML=h;panel.style.display='flex';panel.style.flexDirection='column';
if(!skipAnim){setTimeout(function(){panel.style.transform='translateX(0)'},10)}}
function popupNewsChPrev(){var info=_lastPopupInfo;var channels=_getPopupChannels(info.name);_popupChIdx=(_popupChIdx-1+channels.length)%channels.length;var panel=document.getElementById('popupNewsSlide');if(panel)_renderPopupChannel(panel,info,true)}
function popupNewsChNext(){var info=_lastPopupInfo;var channels=_getPopupChannels(info.name);_popupChIdx=(_popupChIdx+1)%channels.length;var panel=document.getElementById('popupNewsSlide');if(panel)_renderPopupChannel(panel,info,true)}
function togglePopupNewsFull(){var panel=document.getElementById('popupNewsSlide');if(!panel)return;_popupNewsFull=!_popupNewsFull;var info=_lastPopupInfo;var channels=_getPopupChannels(info.name);var ch=channels[_popupChIdx%channels.length];if(_popupNewsFull){var popupIfr=document.getElementById('popupNewsIframe');if(popupIfr)popupIfr.src='about:blank';var mapC=document.getElementById('afrMapContainer');if(!mapC)return;var overlay=document.createElement('div');overlay.id='popupNewsFsOverlay';overlay.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;z-index:9999;background:#0a1a24;display:flex;flex-direction:column;padding:10px;box-sizing:border-box';var embedSrc=ch.embed.indexOf('youtube.com')>=0?(ch.embed+'?autoplay=1&mute=1'):ch.embed;overlay.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-shrink:0"><div style="display:flex;align-items:center;gap:8px">'+(channels.length>1?'<button onclick="event.stopPropagation();popupNewsFsPrev()" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:14px;cursor:pointer;padding:4px 12px;border-radius:3px;font-family:Share Tech Mono,monospace">&#9664;</button>':'')+'<span style="color:#ff4444;font-size:10px">&#9679;</span><span id="popupFsLabel" style="color:#00ffee;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66">'+ch.name+' \u2014 '+info.name+'</span>'+(channels.length>1?'<button onclick="event.stopPropagation();popupNewsFsNext()" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:14px;cursor:pointer;padding:4px 12px;border-radius:3px;font-family:Share Tech Mono,monospace">&#9654;</button>':'')+'</div><button onclick="event.stopPropagation();togglePopupNewsFull()" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:12px;cursor:pointer;padding:4px 12px;border-radius:3px;font-family:Share Tech Mono,monospace">EXIT</button></div><iframe id="popupFsIframe" src="'+embedSrc+'" style="width:100%;flex:1;border:1px solid #00ffee33;border-radius:4px" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>'+(channels.length>1?'<div style="text-align:center;margin-top:6px;flex-shrink:0"><span style="color:#7fd6df;font-size:11px;font-family:Share Tech Mono,monospace" id="popupFsCounter">'+(_popupChIdx%channels.length+1)+' / '+channels.length+'</span></div>':'');mapC.appendChild(overlay)}else{var overlay=document.getElementById('popupNewsFsOverlay');if(overlay)overlay.remove();_renderPopupChannel(panel,info,true)}}
function popupNewsFsPrev(){var info=_lastPopupInfo;var channels=_getPopupChannels(info.name);_popupChIdx=(_popupChIdx-1+channels.length)%channels.length;var ch=channels[_popupChIdx%channels.length];var lbl=document.getElementById('popupFsLabel');if(lbl)lbl.textContent=ch.name+' \u2014 '+info.name;var embedSrc=ch.embed.indexOf('youtube.com')>=0?(ch.embed+'?autoplay=1&mute=1'):ch.embed;var ifr=document.getElementById('popupFsIframe');if(ifr)ifr.src=embedSrc;var ctr=document.getElementById('popupFsCounter');if(ctr)ctr.textContent=(_popupChIdx%channels.length+1)+' / '+channels.length}
function popupNewsFsNext(){var info=_lastPopupInfo;var channels=_getPopupChannels(info.name);_popupChIdx=(_popupChIdx+1)%channels.length;var ch=channels[_popupChIdx%channels.length];var lbl=document.getElementById('popupFsLabel');if(lbl)lbl.textContent=ch.name+' \u2014 '+info.name;var embedSrc=ch.embed.indexOf('youtube.com')>=0?(ch.embed+'?autoplay=1&mute=1'):ch.embed;var ifr=document.getElementById('popupFsIframe');if(ifr)ifr.src=embedSrc;var ctr=document.getElementById('popupFsCounter');if(ctr)ctr.textContent=(_popupChIdx%channels.length+1)+' / '+channels.length}
function hidePopupNewsSlide(){var panel=document.getElementById('popupNewsSlide');if(!panel)return;if(_popupNewsFull){_popupNewsFull=false;var overlay=document.getElementById('popupNewsFsOverlay');if(overlay)overlay.remove()}panel.style.transform='translateX(100%)';setTimeout(function(){panel.style.display='none'},300)}
function esc(s){let d=document.createElement('div');d.textContent=s;return d.innerHTML}
function safeHref(u){let s=String(u).trim();if(!(s.startsWith('https://')||s.startsWith('http://')))return'#';return esc(s).replace(/'/g,'&#39;')}
function navigateToVisaFreeCountry(rawName){
var clean=rawName.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]\s*/g,'').trim();
var p=document.getElementById('africaTimePanel');if(p){p.classList.remove('open');africaTimePanelOpen=false}
if(afrMapInstance)_globeClosePopup();
fetch('https://restcountries.com/v3.1/name/'+encodeURIComponent(clean)+'?fullText=true').then(function(r){return r.json()}).then(function(data){
var c=Array.isArray(data)?data[0]:data;if(!c||!c.latlng)return;
var lat=c.latlng[0],lng=c.latlng[1];
var iso3=c.cca3||'';var latlng={lat:lat,lng:lng};
if(afrMapInstance){afrMapInstance.pointOfView({lat:lat,lng:lng,altitude:1.5},1200)}
setTimeout(function(){showCountryPopup(c.name&&c.name.common||clean,iso3,latlng)},1400);
}).catch(function(){})}
function visaFreeClickable(v){
var label=esc(v.name+(v.days?' ('+v.days+' days)':''));
var nameEsc=v.name.replace(/'/g,"\\'");
return '<span onclick="navigateToVisaFreeCountry(\''+nameEsc+'\')" style="color:#7fd6df;font-size:13px;padding:6px 0;display:inline-block;cursor:pointer;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px" onmouseover="this.style.color=\'#00ffee\'" onmouseout="this.style.color=\'#7fd6df\'">'+label+'</span>'}
let full=false,idx=0;
function active(id){document.querySelectorAll('.command-btn').forEach(b=>b.classList.remove('active'));document.getElementById(id).classList.add('active')}
function renderOps(menu,content){opsBay.style.cssText='';full=false;opsBay.innerHTML=`<div id='opsShell'><div id='opsMenu'><button class='panel-trigger' onclick="document.getElementById('opsMenu').classList.toggle('open')" title='COMMAND PANEL'>☰</button><div class='menu-content'>${menu}</div></div><div id='opsViewport' style='height:100%;overflow-y:auto;min-height:0'>${content}</div></div>`;hideLayerPanels()}

const globalFeeds=[['RT','https://rumble.com/embed/v33aw1a/?pub=4jw3x3'],['AL JAZEERA','https://www.youtube.com/embed/gCNeDWCI0vo'],['AFRICA','https://www.youtube.com/embed/W8nThq62Vb4'],['BLOOMBERG','https://www.youtube.com/embed/iEpJwprxDdk'],['DW','https://www.youtube.com/embed/LuKwFajn37U'],['SKY','https://www.youtube.com/embed/YDvsBbKfLPA']];


const africanChannels=[['DW Africa','https://www.youtube.com/embed/W8nThq62Vb4'],['Africanews','https://www.youtube.com/embed/NQjabLGdP5g'],['Africa Now','https://www.youtube.com/embed/Mv14aabg4mA'],['Arise News','https://www.youtube.com/embed/TJ5V8KRSu9Y'],['News Central TV','https://www.youtube.com/embed/mmZ7-HsnCuM'],['Citizen TV Kenya','https://www.youtube.com/embed/Cy2Pc0X1P7w']];
const americanChannels=[['ABC News','https://www.youtube.com/embed/iipR5yUp36o'],['Bloomberg','https://www.youtube.com/embed/iEpJwprxDdk'],['C5N','https://www.youtube.com/embed/SF06Qy1Ct6Y'],['CBC News','https://www.youtube.com/embed/jxP_h3V-Dv8'],['CNBC','https://www.youtube.com/embed/9NyxcX3rhQs'],['CNN Brasil','https://www.youtube.com/embed/qcTn899skkc'],['TN Argentina','https://www.youtube.com/embed/cb12KmMMDJA']];
const asianChannels=[['ABP News','https://www.youtube.com/embed/nyd-xznCpJc'],['Al Jazeera','https://www.youtube.com/embed/gCNeDWCI0vo'],['Al Jazeera Arabic','https://www.youtube.com/embed/bNyUyrR0PHo'],['Al Arabiya','https://www.youtube.com/embed/n7eQejkXbnM'],['Al Hadath','https://www.youtube.com/embed/xWXpl7azI8k'],['Asharq News','https://www.youtube.com/embed/f6VpkfV7m4Y'],['CNA','https://www.youtube.com/embed/XWq5kBlakcQ'],['i24NEWS','https://www.youtube.com/embed/myKybZUK0IA'],['India Today','https://www.youtube.com/embed/sYZtOFzM78M'],['NHK World','https://www.youtube.com/embed/f0lYkdA-Gtw'],['TRT World','https://www.youtube.com/embed/ABfFhWzWs0s'],['WION','https://www.youtube.com/embed/vfszY1JYbMc']];
const chineseChannels=[['CGTN','https://www.youtube.com/embed/BOy2xDU1LC8'],['Phoenix InfoNews','https://www.youtube.com/embed/fN9uYWCjQaw']];
const europeanChannels=[['ABC News Australia','https://www.youtube.com/embed/vOTiJkg1voo'],['BBC News','https://www.youtube.com/embed/bjgQzJzCZKs'],['DW','https://www.youtube.com/embed/LuKwFajn37U'],['Euronews','https://www.youtube.com/embed/pykpO5kQJ98'],['France 24','https://www.youtube.com/embed/Ap-UM1O9RBU'],['France 24 FR','https://www.youtube.com/embed/l8PMl7tUDIE'],['Sky News','https://www.youtube.com/embed/uvviIF4725I'],['Telewizja Republika','https://www.youtube.com/embed/dzntyCTgJMQ'],['TVP Info','https://www.youtube.com/embed/3jKb-uThfrg']];
const russianChannels=[['RT','https://rumble.com/embed/vtp5hp/'],['RT News','https://rumble.com/embed/vtp5hp/']];

const africaData={
NorthAfrica:{Algeria:[['Algeria Press Service','https://www.aps.dz'],['El Watan','https://www.elwatan.com'],['TSA','https://www.tsa-algerie.com'],['Echorouk','https://www.echoroukonline.com']],Egypt:[['Al-Ahram','https://english.ahram.org.eg'],['Al-Masry Al-Youm','https://www.almasryalyoum.com'],['Daily News Egypt','https://www.dailynewsegypt.com'],['Egypt Independent','https://www.egyptindependent.com']],Libya:[['Libya Herald','https://www.libyaherald.com'],['Libyan Observer','https://www.libyanobserver.ly'],['Libyan Express','https://www.libyanexpress.com']],Mauritania:[['Al-Akhbar','https://alakhbar.info'],['Sahara Media','https://saharamedias.net'],['Cridem','https://www.cridem.org']],Morocco:[['Le Matin','https://lematin.ma'],['MAP','https://www.map.ma'],['Morocco World News','https://www.moroccoworldnews.com']],Sudan:[['Sudan Tribune','https://sudantribune.com'],['Sudanese News','https://www.sudanews.net'],['Dabanga','https://www.dabangasudan.org']],Tunisia:[['TAP','https://www.tap.info.tn'],['La Presse','https://lapresse.tn'],['Business News','https://www.businessnews.com.tn']]},
WestAfrica:{AES:[['Sputnik Africa','https://en.sputniknews.africa/search/?query=AES'],['leFaso','https://www.lefaso.net'],['Burkina24','https://www.burkina24.com'],['Maliweb','https://www.maliweb.net'],['Le Republicain','https://www.maliweb.net'],['Niamey24','https://www.niameysoir.com'],['Le Sahel','https://www.lesahel.org']],Benin:[['Fraternite','https://www.fraternitebj.info'],['Le Matinal','https://www.lematinal.bj'],['24h au Benin','https://www.24haubenin.info']],BurkinaFaso:[['leFaso','https://www.lefaso.net'],['Burkina24','https://www.burkina24.com'],['Sidwaya','https://www.sidwaya.info']],CapeVerde:[['A Semana','https://www.asemana.cv'],['Santiago Magazine','https://www.santiagomagazine.cv'],['Inforpress','https://www.inforpress.cv']],Gambia:[['The Point','https://thepoint.gm'],['Foroyaa','https://foroyaa.net'],['Standard','https://standard.gm']],Ghana:[['Graphic','https://graphic.com.gh'],['Daily Guide','https://dailyguidenetwork.com'],['GhanaWeb','https://www.ghanaweb.com'],['Citi Newsroom','https://citinewsroom.com']],Guinea:[['Guinee24','https://guinee24.com'],['Conakry Infos','https://www.conakryinfos.com'],['Mosaique Guinee','https://www.mosaiqueguinee.com']],GuineaBissau:[['O Gologb','https://www.ogologb.com'],['Novidades','https://novidades.gw'],['Ditadura do Consenso','https://www.ditaduradoconsenso.info']],IvoryCoast:[['Abidjan.net','https://www.abidjan.net'],['Le Patriote','https://www.lepatriote.net'],['Fratmat','https://www.fratmat.info']],Liberia:[['New Dawn','https://www.newdawnliberia.com'],['FrontPageAfrica','https://www.frontpageafricaonline.com'],['Daily Observer','https://www.liberianobserver.com']],Mali:[['Maliweb','https://www.maliweb.net'],['Le Republicain','https://www.maliweb.net'],['Journal du Mali','https://www.journaldumali.com']],Niger:[['Niamey24','https://www.niameysoir.com'],['Le Sahel','https://www.lesahel.org'],['ActuNiger','https://www.actuniger.com']],Nigeria:[['Premium Times','https://www.premiumtimesng.com'],['Channels TV','https://www.channelstv.com'],['Leadership','https://leadership.ng'],['The Nation','https://thenationonlineng.net'],['ThisDay','https://www.thisdaylive.com'],['Tribune','https://tribuneonlineng.com'],['Naija News','https://www.naijanews.com'],['The Cable','https://www.thecable.ng'],['Daily Sun','https://www.sunnewsonline.com'],['Ripples','https://www.ripplesnigeria.com'],['Sahara Reporters','https://www.saharareporters.com'],['Vanguard','https://www.vanguardngr.com'],['Punch','https://www.punchng.com'],['Daily Trust','https://www.dailytrust.com']],Senegal:[['Le Soleil','https://www.lesoleil.sn'],['Seneweb','https://www.seneweb.com'],['DakarActu','https://www.dakaractu.com']],SierraLeone:[['Concord Times','https://www.concordtimes.com'],['Sierra Express','https://www.sierraexpressmedia.com'],['Awareness Times','https://www.awarenesstimes.com']],Togo:[['Togo Presse','https://www.togopresse.tg'],['Le Correcteur','https://lecorrecteur.info'],['Republic of Togo','https://www.republiquetogolaise.com']]},
CentralAfrica:{Angola:[['Jornal de Angola','https://www.jornaldeangola.ao'],['O Pais','https://www.opais.co.ao'],['Novo Jornal','https://novojornal.co.ao']],Cameroon:[['Cameroon Tribune','https://www.cameroon-tribune.cm'],['CRTV','https://www.crtv.cm'],['Journal du Cameroun','https://www.journalducameroun.com']],CentralAfricanRepublic:[['Journal de Bangui','https://www.journaldebangui.com'],['Radio Ndeke Luka','https://www.radiondekeluka.org'],['Corbeau News','https://corbeaunews-centrafrique.com']],Chad:[['Alwihda','https://www.alwihdainfo.com'],['Le Progres','https://www.leprogres.td'],['Tchadinfos','https://tchadinfos.com']],Congo:[['Les Depeches','https://www.lesdepechesdebrazzaville.fr'],['Congo24','https://www.congo24.net'],['ADIAC','https://www.adiac-congo.com']],DRCongo:[['Radio Okapi','https://www.radiookapi.net'],['Le Potentiel','https://www.lepotentiel.cd'],['Actualite.cd','https://actualite.cd']],Gabon:[['Gabon24','https://www.gabon24.ga'],['Nouvelle Republique','https://www.lanouvellerepublique.com'],['Gabon Review','https://www.gabonreview.com']],EquatorialGuinea:[['Diario Rombe','https://www.diariorombe.es'],['Radio Macuto','https://radiomacuto.net'],['GE Press','https://www.guineaecuatorialpress.com']],SaoTome:[['Tela Non','https://www.telanon.info'],['STP24','https://www.stp24.com'],['Jornal Transparencia','https://www.jornaltransparencia.st']]},
EastAfrica:{Burundi:[['Iwacu','https://www.iwacu-burundi.org'],['Renouveau','https://www.renouveau.digital'],['ABP','https://www.abpinfos.com']],Djibouti:[['La Nation','https://www.lanation.dj'],['Djibouti24','https://www.djibouti24.com'],['Horn Observer','https://hornobserver.com']],Eritrea:[['ENA','http://www.shabait.com'],['Asmarino','https://www.asmarino.com'],['Madote','https://www.madote.com']],Ethiopia:[['Addis Standard','https://addisstandard.com'],['Reporter','https://www.ethiopianreporter.com'],['Fana BC','https://www.fanabc.com']],Kenya:[['Nation','https://nation.africa'],['Capital FM','https://www.capitalfm.co.ke'],['The Star','https://www.the-star.co.ke'],['Citizen Digital','https://www.citizen.digital']],Madagascar:[['Midi Madagasikara','https://www.midi-madagasikara.mg'],["L'Express",'https://lexpress.mg'],['NewsMada','https://www.newsmada.com']],Malawi:[['Nation MW','https://www.mwnation.com'],['Malawi24','https://malawi24.com'],['Times','https://times.mw']],Mozambique:[['Noticias','https://www.jornalnoticias.co.mz'],['O Pais','https://www.opais.co.mz'],['Club of Mozambique','https://clubofmozambique.com']],Rwanda:[['New Times','https://www.newtimes.co.rw'],['Rwanda Today','https://www.rwandatoday.africa'],['KT Press','https://www.ktpress.rw']],Somalia:[['Radio Muqdisho','https://www.radiomuqdisho.so'],['SONNA','https://sonna.so'],['Garowe Online','https://www.garoweonline.com']],SouthSudan:[['Juba Monitor','https://www.jubamonitor.com'],['Radio Tamazuj','https://radiotamazuj.org'],['Eye Radio','https://eyeradio.org']],Tanzania:[['Citizen','https://www.thecitizen.co.tz'],['Daily News','https://www.dailynews.co.tz'],['The Guardian','https://www.ippmedia.com']],Uganda:[['New Vision','https://www.newvision.co.ug'],['Observer','https://www.observer.ug'],['Daily Monitor','https://www.monitor.co.ug']],Zambia:[['Daily Mail','https://www.daily-mail.co.zm'],['Post','https://www.postzambia.com'],['Lusaka Times','https://www.lusakatimes.com']],Zimbabwe:[['Herald','https://www.herald.co.zw'],['NewsDay','https://www.newsday.co.zw'],['ZimLive','https://www.zimlive.com']]},
SouthernAfrica:{Botswana:[['Mmegi','https://www.mmegi.bw'],['Patriot','https://www.thepatriot.co.bw'],['Weekend Post','https://weekendpost.co.bw']],Lesotho:[['Lesotho Times','https://lestimes.com'],['Public Eye','https://publiceyenews.com'],['Informative','https://informativenews.co.ls']],Namibia:[['New Era','https://www.ne.com.na'],['Namibian','https://www.namibian.com.na'],['Windhoek Observer','https://www.observer24.com.na']],SouthAfrica:[['SABC News','https://www.sabcnews.com'],['News24','https://www.news24.com'],['Mail & Guardian','https://mg.co.za'],['Daily Maverick','https://www.dailymaverick.co.za'],['IOL','https://www.iol.co.za']],Eswatini:[['Observer','https://www.observer.org.sz'],['Times','https://www.times.co.sz'],['Eswatini News','https://eswatininews.com']]},
Diaspora:{Jamaica:[['Jamaica Gleaner','https://jamaica-gleaner.com'],['Jamaica Observer','https://www.jamaicaobserver.com'],['Nationwide 90FM','https://nationwideradiojm.com'],['PBC Jamaica','https://pbcjamaica.com']],TrinidadAndTobago:[['Newsday','https://newsday.co.tt'],['Trinidad Guardian','https://guardian.co.tt'],['CNC3','https://www.cnc3.co.tt']],Barbados:[['Nation News','https://nationnews.com'],['Barbados Today','https://barbadostoday.bb'],['Loop Barbados','https://barbados.loopnews.com']],Grenada:[['The New Today','https://thenewtodaygrenada.com'],['Now Grenada','https://nowgrenada.com'],['GBN','https://www.gaboradio.com']],SaintLucia:[['St Lucia Times','https://stluciatimes.com'],['The Voice St Lucia','https://thevoiceslu.com'],['St Lucia Star','https://stluciastar.com']],AntiguaAndBarbuda:[['Antigua Observer','https://antiguaobserver.com'],['Antigua News Room','https://antiguanewsroom.com'],['ABS Antigua','https://abstvmradio.com']],Guyana:[['Stabroek News','https://www.stabroeknews.com'],['Kaieteur News','https://www.kaieteurnewsonline.com'],['Guyana Chronicle','https://guyanachronicle.com'],['Village Voice News','https://villagevoicenews.com']],Brazil:[['Alma Preta','https://almapreta.com.br'],['Gelede\u0301s','https://www.geledes.org.br'],['Mundo Negro','https://mundonegro.inf.br']]}
};

function renderNews(){
let feeds=_newsWallMode==='africa'?africanChannels:globalFeeds;
let viewport=document.getElementById('newsViewport');
if(full){document.getElementById('opsBay').style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;border:none';let shell=document.getElementById('opsShell');if(shell)shell.classList.add('fullscreen');if(idx===-1){newsGridIdx=feeds.map(f=>{let i=splitChannels.findIndex(c=>c[1]===f[1]);return i>=0?i:0});let cols=Math.min(feeds.length,3);let rows=Math.ceil(feeds.length/cols);let h=`<div style='position:relative;width:100%;height:100%'><button onclick="exitFullScreen()" style='position:absolute;top:10px;right:10px;z-index:10000;padding:8px 16px;background:#081821;border:1px solid #00ffee66;color:#00ffee;cursor:pointer;font-family:Share Tech Mono'>EXIT</button><div style='height:100%;display:grid;grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);gap:2px'>`;feeds.forEach((f,i)=>h+=`<div class='feed-panel' style='display:flex;flex-direction:column'><div style='display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#081821,#0c2a35);padding:4px 8px;border-bottom:1px solid #00ffee33;z-index:2;flex-shrink:0'><button onclick='newsGridChangeChannel(${i},-1)' style='${splitArrowStyle}' onmouseover="this.style.background='#0c2430'" onmouseout="this.style.background='transparent'">&#9664;</button><div style='display:flex;align-items:center;gap:6px'><span style='color:#ff4444;font-size:8px'>&#9679;</span><span id='newsLabel${i}' style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66'>${f[0]}</span></div><div style='display:flex;gap:4px'><button onclick='newsGridFullScreen(${i})' style='${splitArrowStyle}' onmouseover="this.style.background='#0c2430'" onmouseout="this.style.background='transparent'" title='Full Screen'>&#x26F6;</button><button onclick='newsGridChangeChannel(${i},1)' style='${splitArrowStyle}' onmouseover="this.style.background='#0c2430'" onmouseout="this.style.background='transparent'">&#9654;</button></div></div><iframe id='newsFrame${i}' src='${_autoMute(f[1])}' style='flex:1;width:100%;border:none'></iframe></div>`);viewport.innerHTML=h+'</div></div>'}else{viewport.innerHTML=`<div style='position:relative;width:100%;height:100%'><button onclick="exitFullScreen()" style='position:absolute;top:10px;right:10px;z-index:10000;padding:8px 16px;background:#081821;border:1px solid #00ffee66;color:#00ffee;cursor:pointer;font-family:Share Tech Mono'>EXIT</button><iframe src='${_autoMute(feeds[idx][1])}' style='width:100%;height:100%;border:none'></iframe></div>`}return}
document.getElementById('opsBay').style.cssText='';
newsGridIdx=feeds.map(f=>{let i=splitChannels.findIndex(c=>c[1]===f[1]);return i>=0?i:0});
let h="<div id='newsGrid' style='height:100%;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:2px'>";
feeds.forEach((f,i)=>h+=`<div id='newsPanel${i}' class='feed-panel' style='display:flex;flex-direction:column'><div style='display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#081821,#0c2a35);padding:4px 8px;border-bottom:1px solid #00ffee33;z-index:2;flex-shrink:0'><button onclick='newsGridChangeChannel(${i},-1)' style='${splitArrowStyle}' onmouseover="this.style.background='#0c2430'" onmouseout="this.style.background='transparent'">&#9664;</button><div style='display:flex;align-items:center;gap:6px'><span style='color:#ff4444;font-size:8px'>&#9679;</span><span id='newsLabel${i}' style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66'>${f[0]}</span></div><div style='display:flex;gap:4px'><button onclick='newsGridFullScreen(${i})' style='${splitArrowStyle}' onmouseover="this.style.background='#0c2430'" onmouseout="this.style.background='transparent'" title='Full Screen'>&#x26F6;</button><button onclick='newsGridChangeChannel(${i},1)' style='${splitArrowStyle}' onmouseover="this.style.background='#0c2430'" onmouseout="this.style.background='transparent'">&#9654;</button></div></div><iframe id='newsFrame${i}' src='${_autoMute(f[1])}' style='flex:1;width:100%;border:none'></iframe></div>`);
viewport.innerHTML=h+'</div>'}

function loadPanAfricaHub(){
active('newsBtn');
renderOps(`
<button class='command-btn' onclick='loadNews()'>⬅ BACK</button><br><br>
<button class='command-btn' onclick="loadRegionFeeds('NorthAfrica')">NORTH AFRICA</button><br><br>
<button class='command-btn' onclick="loadRegionFeeds('WestAfrica')">WEST AFRICA</button><br><br>
<button class='command-btn' onclick="loadRegionFeeds('CentralAfrica')">CENTRAL AFRICA</button><br><br>
<button class='command-btn' onclick="loadRegionFeeds('EastAfrica')">EAST AFRICA</button><br><br>
<button class='command-btn' onclick="loadRegionFeeds('SouthernAfrica')">SOUTHERN AFRICA</button>
`,`<div id='panAfricaViewport' style='height:100%;overflow-y:auto'></div>`);
loadRegionFeeds('WestAfrica');
}
function loadRegionFeeds(region){
const countries=africaData[region];
let html="<div style='display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:14px'>";
Object.entries(countries).forEach(([country,sources])=>{
html+=`<div class='feed-panel'><div class='feed-label'>${country}</div><div style='padding:54px 14px'>`;
sources.forEach(src=>html+=`<p style='margin:12px 0'><a href='${src[1]}' target='_blank'>${src[0]}</a></p>`);
html+='</div></div>'});
html+='</div>';
document.getElementById('panAfricaViewport').innerHTML=html;
}

function loadRegionHub(channels,label){
active('newsBtn');
let feeds=channels;
let cols=Math.min(feeds.length,3);
let rows=Math.ceil(feeds.length/cols);
let menu=`<button class='command-btn' onclick='loadNews()'>⬅ BACK</button><br><br>`;
menu+=`<button class='command-btn' onclick="regionFullScreen(currentRegionChannels)">FULL SCREEN</button><br><br>`;
menu+=`<button class='command-btn' onclick='exitFullScreen()'>EXIT FULL SCREEN</button>`;
renderOps(menu,`<div style='display:flex;flex-direction:column;height:100%'><div id='hubChannelBar'></div><div id='channelHubViewport' style='flex:1;min-height:0;overflow-y:auto'></div></div>`);
let bar="<div style='display:flex;gap:0;overflow-x:auto;border-bottom:1px solid #00ffee44;background:#061018;flex-shrink:0'>";
feeds.forEach((f,i)=>bar+=`<button onclick="document.querySelectorAll('#hubChannelBar .channel').forEach(x=>x.classList.remove('active'));this.classList.add('active');switchHubChannel('${f[1]}')" class='channel' style='padding:6px 12px;border-right:1px solid #00ffee22;font-size:11px;white-space:nowrap'>${f[0]}</button>`);
bar+='</div>';
let hubBar=document.getElementById('hubChannelBar');if(hubBar)hubBar.innerHTML=bar;
let html=`<div style='height:100%;display:grid;grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);gap:2px'>`;
feeds.forEach(f=>html+=`<div class='feed-panel'><div class='feed-label'>${f[0]}</div><iframe src='${_autoMute(f[1])}' allow='autoplay;encrypted-media' allowfullscreen></iframe></div>`);
html+='</div>';
document.getElementById('channelHubViewport').innerHTML=html;
}
function switchHubChannel(url){let vp=document.getElementById('channelHubViewport');if(full){vp.innerHTML=`<div style='position:relative;width:100%;height:100%'><button onclick="exitFullScreen()" style='position:absolute;top:10px;right:10px;z-index:10000;padding:8px 16px;background:#081821;border:1px solid #00ffee66;color:#00ffee;cursor:pointer;font-family:Share Tech Mono'>EXIT</button><iframe src='${_autoMute(url)}' style='width:100%;height:100%;border:none' allow='autoplay;encrypted-media' allowfullscreen></iframe></div>`}else{vp.innerHTML=`<iframe src='${_autoMute(url)}' style='width:100%;height:100%;border:none' allow='autoplay;encrypted-media' allowfullscreen></iframe>`}}
let currentRegionChannels=[];
function regionFullScreen(channels){
full=true;currentRegionChannels=channels;
let viewport=document.getElementById('channelHubViewport');
document.getElementById('opsBay').style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;border:none';let shell=document.getElementById('opsShell');if(shell)shell.classList.add('fullscreen');
let cols=Math.min(channels.length,3);let rows=Math.ceil(channels.length/cols);
let h=`<div style='position:relative;width:100%;height:100%'><button onclick="exitFullScreen()" style='position:absolute;top:10px;right:10px;z-index:10000;padding:8px 16px;background:#081821;border:1px solid #00ffee66;color:#00ffee;cursor:pointer;font-family:Share Tech Mono'>EXIT</button><div style='height:100%;display:grid;grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);gap:2px'>`;
channels.forEach(f=>h+=`<div class='feed-panel'><div class='feed-label'>${f[0]}</div><iframe src='${_autoMute(f[1])}' style='width:100%;height:100%;border:none' allow='autoplay;encrypted-media' allowfullscreen></iframe></div>`);
viewport.innerHTML=h+'</div></div>';
}

function exitFullScreen(){if(newsGridFsPanel>=0){newsGridExitFs();return}full=false;document.getElementById('opsBay').style.cssText='';let shell=document.getElementById('opsShell');if(shell)shell.classList.remove('fullscreen');loadNews()}
function _autoMute(url){if(url.indexOf('youtube.com')>=0)return url+(url.indexOf('?')>=0?'&':'?')+'autoplay=1&mute=1';if(url.indexOf('rumble.com')>=0)return url+(url.indexOf('?')>=0?'&':'?')+'autoplay=1&mute=1';return url}
var _newsWallMode='global';
function updateChannelBar(){let bar=document.getElementById('channelBar');if(bar)bar.innerHTML=_renderModeBar()}
function _renderModeBar(){
var gActive=_newsWallMode==='global';var aActive=_newsWallMode==='africa';
var gStyle=gActive?'background:#00ffee;color:#061018;text-shadow:none;box-shadow:0 0 12px #00ffee66':'background:transparent;color:#00ffee;text-shadow:0 0 6px #00ffee88';
var aStyle=aActive?'background:#00ffee;color:#061018;text-shadow:none;box-shadow:0 0 12px #00ffee66':'background:transparent;color:#00ffee;text-shadow:0 0 6px #00ffee88';
return '<div style="display:flex;gap:0;border-bottom:1px solid #00ffee44;background:#061018;flex-shrink:0"><button onclick="_newsWallMode=\'africa\';updateChannelBar();_newsWallSwitch()" style="padding:8px 24px;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:2px;border:none;border-right:1px solid #00ffee22;cursor:pointer;transition:all 0.2s;'+aStyle+'">AFRICA</button><button onclick="_newsWallMode=\'global\';updateChannelBar();_newsWallSwitch()" style="padding:8px 24px;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:2px;border:none;border-right:1px solid #00ffee22;cursor:pointer;transition:all 0.2s;'+gStyle+'">GLOBAL</button></div>'}
function _newsWallSwitch(){var feeds=_newsWallMode==='africa'?africanChannels:globalFeeds;idx=-1;full=false;
newsGridIdx=feeds.map(function(f){var i=splitChannels.findIndex(function(c){return c[1]===f[1]});return i>=0?i:0});
var viewport=document.getElementById('newsViewport');if(!viewport)return;
var cols=Math.min(feeds.length,3);var rows=Math.ceil(feeds.length/cols);
var h="<div id='newsGrid' style='height:100%;display:grid;grid-template-columns:repeat("+cols+",1fr);grid-template-rows:repeat("+rows+",1fr);gap:2px'>";
feeds.forEach(function(f,i){h+='<div id="newsPanel'+i+'" class="feed-panel" style="display:flex;flex-direction:column"><div style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#081821,#0c2a35);padding:4px 8px;border-bottom:1px solid #00ffee33;z-index:2;flex-shrink:0"><button onclick="newsGridChangeChannel('+i+',-1)" style="'+splitArrowStyle+'" onmouseover="this.style.background=\'#0c2430\'" onmouseout="this.style.background=\'transparent\'">&#9664;</button><div style="display:flex;align-items:center;gap:6px"><span style="color:#ff4444;font-size:8px">&#9679;</span><span id="newsLabel'+i+'" style="color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66">'+f[0]+'</span></div><div style="display:flex;gap:4px"><button onclick="newsGridFullScreen('+i+')" style="'+splitArrowStyle+'" onmouseover="this.style.background=\'#0c2430\'" onmouseout="this.style.background=\'transparent\'" title="Full Screen">&#x26F6;</button><button onclick="newsGridChangeChannel('+i+',1)" style="'+splitArrowStyle+'" onmouseover="this.style.background=\'#0c2430\'" onmouseout="this.style.background=\'transparent\'">&#9654;</button></div></div><iframe id="newsFrame'+i+'" src="'+_autoMute(f[1])+'" style="flex:1;width:100%;border:none" allow="autoplay;encrypted-media" allowfullscreen></iframe></div>'});
viewport.innerHTML=h+'</div>'}
function loadNews(){
var nb=document.getElementById('persistentNewsBoxes');if(nb)nb.innerHTML='';
afrNewsBoxCount=0;
active('newsBtn');
renderOps(`
<button class='command-btn' onclick="full=true;idx=-1;renderNews()">FULL SCREEN</button><br><br>
<button class='command-btn' onclick='exitFullScreen()'>EXIT FULL SCREEN</button><br><br>
<button class='command-btn' onclick='loadPanAfricaHub()'>PAN AFRICAN</button>
`,`<div style='display:flex;flex-direction:column;height:100%'><div style='display:flex;align-items:center'><div id='channelBar' style='flex:1'></div></div><div id='newsViewport' style='flex:1;min-height:0'></div></div>`);
document.getElementById('channelBar').innerHTML=_renderModeBar();
_newsWallSwitch();
}

function setConflict(z){const m={iran:'https://iran.liveuamap.com/',sudan:'https://sudan.liveuamap.com/',nigeria:'https://nigeria.liveuamap.com/',sahel:'https://sahel.liveuamap.com/',drcongo:'https://drcongo.liveuamap.com/',ethiopia:'https://ethiopia.liveuamap.com/',somalia:'https://somalia.liveuamap.com/'};document.getElementById('opsViewport').innerHTML=`<iframe class='map-frame' src='${m[z]}'></iframe>`}
function loadConflict(){active('afrMapBtn');renderOps(`
<button class='command-btn' onclick='loadAfrMap()'>← BACK</button><br><br>
<button class='command-btn' onclick=\"setConflict('iran')\">MIDDLE EAST</button><br><br>
<button class='command-btn' onclick=\"setConflict('sudan')\">SUDAN</button><br><br>
<button class='command-btn' onclick=\"setConflict('nigeria')\">NIGERIA</button><br><br>
<button class='command-btn' onclick=\"setConflict('sahel')\">SAHEL</button><br><br>
<button class='command-btn' onclick=\"setConflict('drcongo')\">DR CONGO</button><br><br>
<button class='command-btn' onclick=\"setConflict('ethiopia')\">ETHIOPIA</button><br><br>
<button class='command-btn' onclick=\"setConflict('somalia')\">SOMALIA</button>
`,`<iframe class='map-frame' src='https://drcongo.liveuamap.com/'></iframe>`);showLayerPanels()}
function setMarine(z){const f={hormuz:'https://www.marinetraffic.com/en/ais/embed/zoom:6/centery:25.9/centerx:57.6/maptype:4',bab:'https://www.marinetraffic.com/en/ais/embed/zoom:6/centery:12.6/centerx:43.3/maptype:4',suez:'https://www.marinetraffic.com/en/ais/embed/zoom:7/centery:30.5/centerx:32.3/maptype:4',bosporus:'https://www.marinetraffic.com/en/ais/embed/zoom:8/centery:41/centerx:29/maptype:4',malacca:'https://www.marinetraffic.com/en/ais/embed/zoom:5/centery:3.5/centerx:100.5/maptype:4',panama:'https://www.marinetraffic.com/en/ais/embed/zoom:8/centery:9.1/centerx:-79.7/maptype:4',gibraltar:'https://www.marinetraffic.com/en/ais/embed/zoom:8/centery:36/centerx:-5.5/maptype:4'};document.getElementById('marineFrame').innerHTML=`<iframe class='map-frame' src='${f[z]}'></iframe>`}
function loadMarine(){active('afrMapBtn');renderOps(`
<button class='command-btn' onclick='loadAfrMap()'>← BACK</button><br><br>
<button class='command-btn' onclick=\"setMarine('hormuz')\">HORMUZ</button><br><br>
<button class='command-btn' onclick=\"setMarine('bab')\">BAB EL MANDEB</button><br><br>
<button class='command-btn' onclick=\"setMarine('suez')\">SUEZ</button><br><br>
<button class='command-btn' onclick=\"setMarine('bosporus')\">BOSPORUS</button><br><br>
<button class='command-btn' onclick=\"setMarine('malacca')\">MALACCA</button><br><br>
<button class='command-btn' onclick=\"setMarine('panama')\">PANAMA</button><br><br>
<button class='command-btn' onclick=\"setMarine('gibraltar')\">GIBRALTAR</button>
`,`<div id='marineFrame' style='height:100%'></div>`);setMarine('hormuz');showLayerPanels()}
function setFlight(z){const m={global:'https://globe.adsbexchange.com/',africa:'https://globe.adsbexchange.com/?lat=5&lon=20&zoom=3',europe:'https://globe.adsbexchange.com/?lat=50&lon=10&zoom=4',americas:'https://globe.adsbexchange.com/?lat=25&lon=-90&zoom=3',me:'https://globe.adsbexchange.com/?lat=26&lon=45&zoom=5',asia:'https://globe.adsbexchange.com/?lat=25&lon=100&zoom=3'};document.getElementById('flightFrame').innerHTML=`<iframe class='map-frame' src='${m[z]}'></iframe>`}
function loadFlight(){active('afrMapBtn');renderOps(`
<button class='command-btn' onclick='loadAfrMap()'>← BACK</button><br><br>
<button class='command-btn' onclick=\"setFlight('global')\">GLOBAL</button><br><br>
<button class='command-btn' onclick=\"setFlight('africa')\">AFRICA</button><br><br>
<button class='command-btn' onclick=\"setFlight('europe')\">EUROPE</button><br><br>
<button class='command-btn' onclick=\"setFlight('americas')\">AMERICAS</button><br><br>
<button class='command-btn' onclick=\"setFlight('me')\">MIDDLE EAST</button><br><br>
<button class='command-btn' onclick=\"setFlight('asia')\">ASIA</button>
`,`<div id='flightFrame' style='height:100%'></div>`);setFlight('global');showLayerPanels()}
const tvWidgets={
overview:{src:'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js',cfg:{"allow_symbol_change":true,"calendar":false,"details":false,"hide_side_toolbar":false,"hide_top_toolbar":false,"hide_legend":false,"hide_volume":false,"hotlist":false,"interval":"D","locale":"en","save_image":true,"style":"1","symbol":"BINANCE:BTCUSD","theme":"dark","timezone":"Europe/London","backgroundColor":"#0F0F0F","gridColor":"rgba(242, 242, 242, 0.06)","watchlist":["BINANCE:ETHUSD","BINANCE:SOLUSDT","BINANCE:AVAXUSDT","VELOCITY:BRENT","TVC:GOLD","TVC:SILVER"],"withdateranges":true,"compareSymbols":[],"studies":["STD;Divergence%1Indicator"],"autosize":true}},
stocks:{src:'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',cfg:{"dataSource":"SPX500","blockSize":"market_cap_basic","blockColor":"change","grouping":"sector","locale":"en","symbolUrl":"","colorTheme":"dark","exchanges":[],"hasTopBar":false,"isDataSetEnabled":false,"isZoomEnabled":true,"hasSymbolTooltip":true,"isMonoSize":false,"width":"100%","height":"100%"}},
crypto:{src:'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js',cfg:{"dataSource":"Crypto","blockSize":"market_cap_calc","blockColor":"24h_close_change|5","locale":"en","symbolUrl":"","colorTheme":"dark","hasTopBar":false,"isDataSetEnabled":false,"isZoomEnabled":true,"hasSymbolTooltip":true,"isMonoSize":false,"width":"100%","height":"100%"}},
charts:{src:'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js',cfg:{"allow_symbol_change":true,"calendar":false,"details":false,"hide_side_toolbar":false,"hide_top_toolbar":false,"hide_legend":false,"hide_volume":false,"hotlist":false,"interval":"D","locale":"en","save_image":true,"style":"1","symbol":"BINANCE:BTCUSD","theme":"dark","timezone":"Europe/London","backgroundColor":"#0F0F0F","gridColor":"rgba(242, 242, 242, 0.06)","watchlist":["BINANCE:ETHUSD","BINANCE:SOLUSDT","BINANCE:AVAXUSDT","VELOCITY:BRENT","TVC:GOLD","TVC:SILVER"],"withdateranges":true,"compareSymbols":[],"studies":["STD;Divergence%1Indicator"],"autosize":true}}
};
function marketView(mode){const f=document.getElementById('marketFrame');const w=tvWidgets[mode];f.innerHTML='<div class="tradingview-widget-container"><div class="tradingview-widget-container__widget"></div></div>';const s=document.createElement('script');s.type='text/javascript';s.src=w.src;s.async=true;s.textContent=JSON.stringify(w.cfg);f.querySelector('.tradingview-widget-container').appendChild(s)}
function loadMarkets(){active('marketsBtn');renderOps(`
<button class='command-btn' onclick=\"marketView('overview')\">OVERVIEW</button><br><br>
<button class='command-btn' onclick=\"marketView('stocks')\">STOCKS</button><br><br>
<button class='command-btn' onclick=\"marketView('crypto')\">CRYPTO</button><br><br>
<button class='command-btn' onclick='loadAfricanExchange()'>AFRICAN FX RATES</button>
`,`<div id='marketFrame' style='height:100%'></div>`);marketView('overview')}
function loadAfricanExchange(){
const f=document.getElementById('marketFrame');
f.innerHTML=`<div style='height:100%;overflow-y:auto;padding:20px;background:#061018;font-family:Rajdhani,sans-serif;display:flex;align-items:flex-start;justify-content:center'>
<div style='display:flex;gap:20px;width:100%;max-width:1200px;flex-wrap:wrap;justify-content:center'>
<div style='flex:1;min-width:300px;max-width:450px'>
<h2 style='text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;letter-spacing:2px;text-shadow:0 0 10px #00ffee88;margin-bottom:16px'>AFRICAN CURRENCY CONVERTER</h2>
<input type='number' id='exchAmount' placeholder='Enter amount' style='width:100%;padding:10px;margin:8px 0;font-size:16px;border:1px solid #00ffee44;border-radius:5px;background:#081821;color:#00ffee;font-family:Share Tech Mono,monospace'>
<select id='exchFrom' style='width:100%;padding:10px;margin:8px 0;font-size:14px;border:1px solid #00ffee44;border-radius:5px;background:#081821;color:#00ffee;font-family:Share Tech Mono,monospace'></select>
<select id='exchTo' style='width:100%;padding:10px;margin:8px 0;font-size:14px;border:1px solid #00ffee44;border-radius:5px;background:#081821;color:#00ffee;font-family:Share Tech Mono,monospace'></select>
<button onclick='exchConvert()' style='width:100%;padding:10px;margin:8px 0;background:#081821;border:1px solid #00ffee66;color:#00ffee;font-weight:bold;cursor:pointer;font-family:Share Tech Mono,monospace;font-size:16px;border-radius:5px;transition:background 0.15s,box-shadow 0.15s'>CONVERT</button>
<div id='exchResult' style='font-size:18px;font-weight:bold;text-align:center;margin-top:16px;color:#00ffee;text-shadow:0 0 8px #00ffee88'></div>
<div id='exchError' style='color:#ff4444;text-align:center;margin-top:8px'></div>
</div>
<div style='flex:1;min-width:250px;max-width:350px'>
<h2 style='color:#00ffee;font-family:Share Tech Mono,monospace;letter-spacing:2px;text-shadow:0 0 10px #00ffee88;margin-bottom:16px;text-align:center'>NGN EXCHANGE RATES</h2>
<table style='width:100%;border-collapse:collapse'>
<thead><tr><th style='border:1px solid #00ffee33;padding:10px;background:#081821;color:#00ffee;font-family:Share Tech Mono,monospace'>Currency</th><th style='border:1px solid #00ffee33;padding:10px;background:#081821;color:#00ffee;font-family:Share Tech Mono,monospace'>NGN Rate</th></tr></thead>
<tbody id='exchTableBody'>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>GBP</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-gbp'>-</td></tr>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>USD</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-usd'>-</td></tr>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>CAD</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-cad'>-</td></tr>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>EUR</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-eur'>-</td></tr>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>RUB</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-rub'>-</td></tr>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>CNY</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-cny'>-</td></tr>
<tr><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#7fd6df;text-align:center'>ZAR</td><td style='border:1px solid #00ffee22;padding:10px;background:#0a1520;color:#00ffee;text-align:center;font-family:Share Tech Mono,monospace' id='rate-zar'>-</td></tr>
</tbody></table>
</div>
</div>
</div>`;
exchPopulate();exchUpdateTable()}
const exchFixedCurrencies=[{code:'USD',country:'United States Dollar'},{code:'GBP',country:'United Kingdom Pound'},{code:'EUR',country:'Euro'},{code:'CAD',country:'Canadian Dollar'},{code:'RUB',country:'Russian Ruble'},{code:'CNY',country:'Chinese Yuan'}];
const exchAfricanCurrencies=[{code:'NGN',country:'Nigeria'},{code:'XOF',country:'Benin (XOF)'},{code:'XOF',country:'Burkina Faso (XOF)'},{code:'XOF',country:'Guinea-Bissau (XOF)'},{code:'XOF',country:"Ivory Coast (XOF)"},{code:'XOF',country:'Mali (XOF)'},{code:'XOF',country:'Niger (XOF)'},{code:'XOF',country:'Senegal (XOF)'},{code:'XOF',country:'Togo (XOF)'},{code:'XAF',country:'Cameroon (XAF)'},{code:'XAF',country:'Central African Republic (XAF)'},{code:'XAF',country:'Chad (XAF)'},{code:'XAF',country:'Republic of the Congo (XAF)'},{code:'XAF',country:'Equatorial Guinea (XAF)'},{code:'XAF',country:'Gabon (XAF)'},{code:'KES',country:'Kenya (Shilling)'},{code:'GHS',country:'Ghana (Cedi)'},{code:'EGP',country:'Egypt (Pound)'},{code:'MAD',country:'Morocco (Dirham)'},{code:'DZD',country:'Algeria (Dinar)'},{code:'TND',country:'Tunisia (Dinar)'},{code:'SLL',country:'Sierra Leone (Leone)'},{code:'LRD',country:'Liberia (Dollar)'},{code:'ETB',country:'Ethiopia (Birr)'},{code:'TZS',country:'Tanzania (Shilling)'},{code:'UGX',country:'Uganda (Shilling)'},{code:'RWF',country:'Rwanda (Franc)'},{code:'BIF',country:'Burundi (Franc)'},{code:'MWK',country:'Malawi (Kwacha)'},{code:'MZN',country:'Mozambique (Metical)'},{code:'SZL',country:'Eswatini (Lilangeni)'},{code:'NAD',country:'Namibia (Dollar)'},{code:'BWP',country:'Botswana (Pula)'},{code:'ZMW',country:'Zambia (Kwacha)'},{code:'CDF',country:'DR Congo (Franc)'},{code:'SCR',country:'Seychelles (Rupee)'},{code:'MUR',country:'Mauritius (Rupee)'},{code:'SOS',country:'Somalia (Shilling)'},{code:'DJF',country:'Djibouti (Franc)'},{code:'ERN',country:'Eritrea (Nakfa)'},{code:'LSL',country:'Lesotho (Loti)'},{code:'AOA',country:'Angola (Kwanza)'},{code:'GMD',country:'Gambia (Dalasi)'},{code:'STD',country:'Sao Tome and Principe (Dobra)'},{code:'LYD',country:'Libya (Dinar)'},{code:'ZAR',country:'South Africa (Rand)'}].sort((a,b)=>a.country.localeCompare(b.country));
function exchPopulate(){const all=[...exchFixedCurrencies,...exchAfricanCurrencies];const opts=all.map(c=>`<option value="${c.code}">${c.code} - ${c.country}</option>`).join('');const f=document.getElementById('exchFrom');const t=document.getElementById('exchTo');if(f&&t){f.innerHTML=opts;t.innerHTML=opts;f.value='USD';t.value='NGN'}}
async function exchFetchRates(base){const r=await fetch('https://api.exchangerate-api.com/v4/latest/'+base);const d=await r.json();return d.rates}
async function exchUpdateTable(){try{const rates=await exchFetchRates('NGN');const pairs={gbp:'GBP',usd:'USD',cad:'CAD',eur:'EUR',rub:'RUB',cny:'CNY',zar:'ZAR'};for(const[id,code]of Object.entries(pairs)){const el=document.getElementById('rate-'+id);if(el){const rate=rates[code];el.textContent=rate?(1/rate).toFixed(2):'0.00'}}}catch(e){}}
async function exchConvert(){const amount=parseFloat(document.getElementById('exchAmount').value);const from=document.getElementById('exchFrom').value;const to=document.getElementById('exchTo').value;const res=document.getElementById('exchResult');const err=document.getElementById('exchError');if(isNaN(amount)||amount<=0){err.textContent='Please enter a valid amount.';res.textContent='';return}err.textContent='';res.textContent='';try{const rates=await exchFetchRates(from);const rate=rates[to];if(rate){res.textContent=amount+' '+from+' = '+(amount*rate).toFixed(2)+' '+to}else{res.textContent='Conversion not available.'}}catch(e){res.textContent='';err.textContent='Failed to fetch rates.'}}

newsBtn.onclick=loadNews;marketsBtn.onclick=loadMarkets;headlinesBtn.onclick=loadHeadlines;radioBtn.onclick=loadRadio;aiLaunchpadBtn.onclick=loadAILaunchpad;afrMapBtn.onclick=loadAfrMap;commsBtn.onclick=loadComms;liveFeedBtn.onclick=loadLiveFeed;
var afrMapInstance=null;var afrConflictVisible=false;var afrBasesVisible=false;var afrShippingVisible=false;var afrOilVisible=false;var afrDisputedVisible=false;var afrLangVisible=false;var afrUseGoogle=false;var afrRegionIdx=0;var afrRegions=[{name:'AFRICA',lat:5,lng:20,alt:2.2},{name:'NORTH',lat:32,lng:10,alt:1.5},{name:'WEST',lat:10,lng:-2,alt:1.5},{name:'SAHEL',lat:15,lng:18,alt:1.5},{name:'CENTRAL',lat:-5,lng:28,alt:1.5},{name:'EAST',lat:2,lng:38,alt:1.5},{name:'SOUTHERN',lat:-25,lng:28,alt:1.5},{name:'HORN',lat:12,lng:44,alt:1.5},{name:'CARIBBEAN',lat:18,lng:-70,alt:1.5},{name:'MIDDLE EAST',lat:30,lng:44,alt:1.5}];var _globeCountryFeatures=null;var _globePopupEl=null;
const afrLangZones=[
// English-speaking
{name:'Nigeria',lat:9.08,lng:7.49,radius:450000,lang:'en',info:'English (official)'},
{name:'Ghana',lat:7.95,lng:-1.02,radius:250000,lang:'en',info:'English (official)'},
{name:'Kenya',lat:0.02,lng:37.91,radius:350000,lang:'en',info:'English (official)'},
{name:'Tanzania',lat:-6.37,lng:34.89,radius:400000,lang:'en',info:'English (official)'},
{name:'Uganda',lat:1.37,lng:32.29,radius:250000,lang:'en',info:'English (official)'},
{name:'South Africa',lat:-30.56,lng:22.94,radius:500000,lang:'en',info:'English (official)'},
{name:'Zimbabwe',lat:-19.02,lng:29.15,radius:250000,lang:'en',info:'English (official)'},
{name:'Zambia',lat:-13.13,lng:27.85,radius:350000,lang:'en',info:'English (official)'},
{name:'Malawi',lat:-13.25,lng:34.30,radius:200000,lang:'en',info:'English (official)'},
{name:'Botswana',lat:-22.33,lng:24.68,radius:300000,lang:'en',info:'English (official)'},
{name:'Sierra Leone',lat:8.46,lng:-11.78,radius:150000,lang:'en',info:'English (official)'},
{name:'Liberia',lat:6.43,lng:-9.43,radius:150000,lang:'en',info:'English (official)'},
{name:'Gambia',lat:13.44,lng:-15.31,radius:80000,lang:'en',info:'English (official)'},
{name:'Sudan',lat:12.86,lng:30.22,radius:500000,lang:'en',info:'English (co-official)'},
{name:'South Sudan',lat:6.88,lng:31.31,radius:300000,lang:'en',info:'English (official)'},
{name:'Rwanda',lat:-1.94,lng:29.87,radius:130000,lang:'en',info:'English (co-official)'},
{name:'Lesotho',lat:-29.61,lng:28.23,radius:100000,lang:'en',info:'English (co-official)'},
{name:'Eswatini',lat:-26.52,lng:31.47,radius:80000,lang:'en',info:'English (co-official)'},
// French-speaking
{name:'DRC',lat:-4.04,lng:21.76,radius:600000,lang:'fr',info:'French (official)'},
{name:'Mali',lat:17.57,lng:-4.00,radius:450000,lang:'fr',info:'French (official)'},
{name:'Niger',lat:17.61,lng:8.08,radius:450000,lang:'fr',info:'French (official)'},
{name:'Chad',lat:15.45,lng:18.73,radius:450000,lang:'fr',info:'French (co-official)'},
{name:'Senegal',lat:14.50,lng:-14.45,radius:200000,lang:'fr',info:'French (official)'},
{name:'Guinea',lat:9.95,lng:-9.70,radius:200000,lang:'fr',info:'French (official)'},
{name:'Burkina Faso',lat:12.24,lng:-1.56,radius:200000,lang:'fr',info:'French (official)'},
{name:'Ivory Coast',lat:7.54,lng:-5.55,radius:250000,lang:'fr',info:'French (official)'},
{name:'Cameroon',lat:7.37,lng:12.35,radius:300000,lang:'fr',info:'French (co-official)'},
{name:'Madagascar',lat:-18.77,lng:46.87,radius:350000,lang:'fr',info:'French (co-official)'},
{name:'Benin',lat:9.31,lng:2.32,radius:150000,lang:'fr',info:'French (official)'},
{name:'Togo',lat:8.62,lng:1.21,radius:120000,lang:'fr',info:'French (official)'},
{name:'CAR',lat:6.61,lng:20.94,radius:300000,lang:'fr',info:'French (co-official)'},
{name:'Congo',lat:-4.27,lng:15.28,radius:200000,lang:'fr',info:'French (official)'},
{name:'Gabon',lat:-0.80,lng:11.61,radius:200000,lang:'fr',info:'French (official)'},
{name:'Mauritania',lat:21.01,lng:-10.94,radius:350000,lang:'fr',info:'French (lingua franca)'},
{name:'Djibouti',lat:11.59,lng:43.15,radius:60000,lang:'fr',info:'French (co-official)'},
{name:'Comoros',lat:-11.88,lng:43.87,radius:50000,lang:'fr',info:'French (co-official)'},
{name:'Burundi',lat:-3.37,lng:29.92,radius:120000,lang:'fr',info:'French (co-official)'},
// Portuguese-speaking
{name:'Angola',lat:-11.20,lng:17.87,radius:450000,lang:'pt',info:'Portuguese (official)'},
{name:'Mozambique',lat:-18.67,lng:35.53,radius:400000,lang:'pt',info:'Portuguese (official)'},
{name:'Guinea-Bissau',lat:11.80,lng:-15.18,radius:100000,lang:'pt',info:'Portuguese (official)'},
{name:'Cape Verde',lat:16.00,lng:-24.01,radius:60000,lang:'pt',info:'Portuguese (official)'},
{name:'Sao Tome',lat:0.19,lng:6.61,radius:30000,lang:'pt',info:'Portuguese (official)'},
{name:'Equatorial Guinea',lat:1.65,lng:10.27,radius:100000,lang:'pt',info:'Portuguese (co-official)'},
// North Africa (French)
{name:'Algeria',lat:28.03,lng:1.66,radius:600000,lang:'fr',info:'French (lingua franca)'},
{name:'Tunisia',lat:33.89,lng:9.54,radius:150000,lang:'fr',info:'French (widely used)'},
{name:'Morocco',lat:31.79,lng:-7.09,radius:300000,lang:'fr',info:'French (business/govt)'},
// North Africa (English)
{name:'Egypt',lat:26.82,lng:30.80,radius:400000,lang:'en',info:'English (widely used)'},
{name:'Libya',lat:26.34,lng:17.23,radius:450000,lang:'en',info:'English (used in business)'},
// Arabic-speaking — North Africa
{name:'Egypt (Arabic)',lat:26.82,lng:30.80,radius:400000,lang:'ar',info:'Arabic (official)'},
{name:'Libya (Arabic)',lat:26.34,lng:17.23,radius:450000,lang:'ar',info:'Arabic (official)'},
{name:'Algeria (Arabic)',lat:28.03,lng:1.66,radius:600000,lang:'ar',info:'Arabic (official)'},
{name:'Tunisia (Arabic)',lat:33.89,lng:9.54,radius:150000,lang:'ar',info:'Arabic (official)'},
{name:'Morocco (Arabic)',lat:31.79,lng:-7.09,radius:300000,lang:'ar',info:'Arabic (official)'},
{name:'Mauritania (Arabic)',lat:21.01,lng:-10.94,radius:350000,lang:'ar',info:'Arabic (official)'},
{name:'Sudan (Arabic)',lat:12.86,lng:30.22,radius:500000,lang:'ar',info:'Arabic (official)'},
{name:'Chad (Arabic)',lat:15.45,lng:18.73,radius:450000,lang:'ar',info:'Arabic (co-official)'},
{name:'Comoros (Arabic)',lat:-11.88,lng:43.87,radius:50000,lang:'ar',info:'Arabic (co-official)'},
{name:'Djibouti (Arabic)',lat:11.59,lng:43.15,radius:60000,lang:'ar',info:'Arabic (co-official)'},
{name:'Somalia (Arabic)',lat:5.15,lng:46.20,radius:300000,lang:'ar',info:'Arabic (co-official)'},
// Arabic-speaking — Middle East
{name:'Saudi Arabia',lat:23.89,lng:45.08,radius:600000,lang:'ar',info:'Arabic (official)'},
{name:'Iraq',lat:33.22,lng:43.68,radius:300000,lang:'ar',info:'Arabic (official)'},
{name:'Syria',lat:34.80,lng:38.99,radius:200000,lang:'ar',info:'Arabic (official)'},
{name:'Yemen',lat:15.55,lng:48.52,radius:250000,lang:'ar',info:'Arabic (official)'},
{name:'Jordan',lat:30.59,lng:36.24,radius:150000,lang:'ar',info:'Arabic (official)'},
{name:'Lebanon',lat:33.85,lng:35.86,radius:50000,lang:'ar',info:'Arabic (official)'},
{name:'Kuwait',lat:29.31,lng:47.48,radius:60000,lang:'ar',info:'Arabic (official)'},
{name:'Qatar',lat:25.35,lng:51.18,radius:40000,lang:'ar',info:'Arabic (official)'},
{name:'Bahrain',lat:26.07,lng:50.56,radius:20000,lang:'ar',info:'Arabic (official)'},
{name:'UAE',lat:23.42,lng:53.85,radius:120000,lang:'ar',info:'Arabic (official)'},
{name:'Oman',lat:21.51,lng:55.92,radius:200000,lang:'ar',info:'Arabic (official)'},
{name:'Palestine',lat:31.95,lng:35.23,radius:40000,lang:'ar',info:'Arabic (official)'},
// German (historical — Namibia)
{name:'Namibia',lat:-22.96,lng:18.49,radius:350000,lang:'de',info:'German (recognized national language)'},
// Caribbean — English
{name:'Jamaica',lat:18.11,lng:-77.30,radius:80000,lang:'en',info:'English (official)'},
{name:'Trinidad & Tobago',lat:10.69,lng:-61.22,radius:50000,lang:'en',info:'English (official)'},
{name:'Barbados',lat:13.19,lng:-59.54,radius:25000,lang:'en',info:'English (official)'},
{name:'Bahamas',lat:25.03,lng:-77.40,radius:80000,lang:'en',info:'English (official)'},
{name:'Belize',lat:17.19,lng:-88.50,radius:80000,lang:'en',info:'English (official)'},
{name:'Guyana',lat:4.86,lng:-58.93,radius:150000,lang:'en',info:'English (official)'},
{name:'Grenada',lat:12.12,lng:-61.68,radius:20000,lang:'en',info:'English (official)'},
{name:'St Lucia',lat:13.91,lng:-60.98,radius:20000,lang:'en',info:'English (official)'},
{name:'Dominica',lat:15.41,lng:-61.37,radius:20000,lang:'en',info:'English (official)'},
{name:'Antigua & Barbuda',lat:17.06,lng:-61.80,radius:20000,lang:'en',info:'English (official)'},
{name:'St Vincent',lat:13.25,lng:-61.20,radius:15000,lang:'en',info:'English (official)'},
{name:'St Kitts & Nevis',lat:17.36,lng:-62.78,radius:15000,lang:'en',info:'English (official)'},
// Caribbean — French
{name:'Haiti',lat:18.97,lng:-72.29,radius:100000,lang:'fr',info:'French (co-official)'},
{name:'Guadeloupe',lat:16.27,lng:-61.55,radius:30000,lang:'fr',info:'French (official)'},
{name:'Martinique',lat:14.64,lng:-61.02,radius:25000,lang:'fr',info:'French (official)'},
{name:'French Guiana',lat:3.93,lng:-53.13,radius:120000,lang:'fr',info:'French (official)'},
// Caribbean — Spanish
{name:'Cuba',lat:21.52,lng:-77.78,radius:200000,lang:'es',info:'Spanish (official)'},
{name:'Dominican Republic',lat:18.74,lng:-70.16,radius:100000,lang:'es',info:'Spanish (official)'},
{name:'Puerto Rico',lat:18.22,lng:-66.59,radius:60000,lang:'es',info:'Spanish (co-official)'},
{name:'Venezuela',lat:6.42,lng:-66.59,radius:400000,lang:'es',info:'Spanish (official)'},
{name:'Colombia',lat:4.57,lng:-74.30,radius:400000,lang:'es',info:'Spanish (official)'},
// Caribbean — Portuguese
{name:'Brazil (North)',lat:0.0,lng:-51.0,radius:400000,lang:'pt',info:'Portuguese (official)'},
// Caribbean — Dutch
{name:'Suriname',lat:3.92,lng:-56.03,radius:100000,lang:'nl',info:'Dutch (official)'},
{name:'Curacao',lat:12.17,lng:-68.98,radius:20000,lang:'nl',info:'Dutch (official)'},
{name:'Aruba',lat:12.51,lng:-69.97,radius:15000,lang:'nl',info:'Dutch (official)'},
{name:'Sint Maarten',lat:18.04,lng:-63.05,radius:10000,lang:'nl',info:'Dutch (official)'},
{name:'Bonaire',lat:12.14,lng:-68.26,radius:10000,lang:'nl',info:'Dutch (official)'}
];
const afrConflictZones=[
{name:'Ukraine',lat:48.5,lng:36.0,radius:200000,color:'#ff4444',info:'Russia-Ukraine War — Active front lines'},
{name:'Sudan',lat:14.5,lng:30.5,radius:180000,color:'#ff6600',info:'Sudanese Civil War — RSF vs SAF'},
{name:'Gaza',lat:31.4,lng:34.4,radius:30000,color:'#ff0000',info:'Israel-Palestine Conflict — Active hostilities'},
{name:'Myanmar',lat:19.5,lng:96.5,radius:150000,color:'#ff8800',info:'Myanmar Civil War — Junta vs resistance'},
{name:'DR Congo',lat:-2.0,lng:28.5,radius:120000,color:'#ff6600',info:'Eastern DRC — M23 & armed groups'},
{name:'Somalia',lat:5.0,lng:45.0,radius:100000,color:'#ff8800',info:'Al-Shabaab insurgency'},
{name:'Sahel',lat:15.0,lng:1.0,radius:250000,color:'#ff8800',info:'Sahel — JNIM/ISGS insurgency (Mali, Burkina Faso, Niger)'},
{name:'Ethiopia',lat:8.5,lng:39.5,radius:100000,color:'#ff9900',info:'Ethiopia — Amhara & Oromia unrest'},
{name:'Yemen',lat:15.5,lng:44.0,radius:120000,color:'#ff4444',info:'Yemen — Houthi conflict & Red Sea attacks'},
{name:'Syria',lat:35.5,lng:38.0,radius:100000,color:'#ff6600',info:'Syria — Ongoing instability & HTS'},
{name:'Haiti',lat:18.9,lng:-72.3,radius:40000,color:'#ff8800',info:'Haiti — Gang violence crisis'},
{name:'Mozambique',lat:-14.0,lng:40.0,radius:80000,color:'#ff9900',info:'Cabo Delgado — Islamist insurgency'}
];
const afrMilitaryBases=[
// US — Africa
{name:'Camp Lemonnier',lat:11.55,lng:43.15,info:'US — Djibouti (AFRICOM hub, ~4000 personnel)',co:'US'},
{name:'Agadez (Air Base 201)',lat:16.97,lng:7.99,info:'US — Niger (Drone base, MQ-9 ops)',co:'US'},
{name:'Manda Bay',lat:-2.27,lng:40.95,info:'US — Kenya (Camp Simba, ISR & CT ops)',co:'US'},
{name:'Entebbe',lat:0.04,lng:32.44,info:'US — Uganda (SOF forward base)',co:'US'},
{name:'Ouagadougou',lat:12.35,lng:-1.51,info:'US — Burkina Faso (ISR, status uncertain)',co:'US'},
{name:'Arlit',lat:18.74,lng:7.39,info:'US — Niger (ISR site)',co:'US'},
{name:'Garoua',lat:9.34,lng:13.38,info:'US — Cameroon (ISR & drone ops)',co:'US'},
{name:'Nzara',lat:4.65,lng:28.53,info:'US — South Sudan (SOF forward site)',co:'US'},
// US — Middle East & Central Asia
{name:'Al Udeid',lat:25.12,lng:51.31,info:'US — Qatar (CENTCOM air ops HQ)',co:'US'},
{name:'Al Dhafra',lat:24.25,lng:54.55,info:'US — UAE (Air base, F-35 & tanker ops)',co:'US'},
{name:'Camp Arifjan',lat:29.16,lng:48.10,info:'US — Kuwait (Army logistics hub)',co:'US'},
{name:'Ali Al Salem',lat:29.35,lng:47.52,info:'US — Kuwait (Air base)',co:'US'},
{name:'Al Minhad',lat:25.03,lng:55.37,info:'US — UAE (Coalition air support)',co:'US'},
{name:'Incirlik',lat:37.0,lng:35.43,info:'US — Turkey (Air base, NATO)',co:'US'},
{name:'Bahrain (NSA)',lat:26.23,lng:50.60,info:'US — Bahrain (5th Fleet HQ)',co:'US'},
// US — Europe
{name:'Ramstein',lat:49.44,lng:7.60,info:'US — Germany (EUCOM/AFRICOM HQ)',co:'US'},
{name:'Landstuhl',lat:49.41,lng:7.57,info:'US — Germany (Medical center)',co:'US'},
{name:'Spangdahlem',lat:49.97,lng:6.70,info:'US — Germany (Air base)',co:'US'},
{name:'Grafenwöhr',lat:49.69,lng:11.93,info:'US — Germany (Army training area)',co:'US'},
{name:'Aviano',lat:46.03,lng:12.60,info:'US — Italy (Air base)',co:'US'},
{name:'Naval Station Naples',lat:40.82,lng:14.28,info:'US — Italy (6th Fleet)',co:'US'},
{name:'NAS Sigonella',lat:37.40,lng:14.92,info:'US — Sicily (ISR & logistics hub)',co:'US'},
{name:'Rota',lat:36.64,lng:-6.35,info:'US — Spain (Naval station, BMD)',co:'US'},
{name:'Morón',lat:37.17,lng:-5.62,info:'US — Spain (AFRICOM crisis response)',co:'US'},
{name:'Lajes Field',lat:38.76,lng:-27.09,info:'US — Azores/Portugal (Air base)',co:'US'},
{name:'RAF Lakenheath',lat:52.41,lng:0.56,info:'US — UK (F-35 wing)',co:'US'},
{name:'RAF Mildenhall',lat:52.36,lng:0.49,info:'US — UK (Tanker & SOF)',co:'US'},
{name:'Souda Bay',lat:35.49,lng:24.12,info:'US — Crete/Greece (Naval support)',co:'US'},
{name:'Deveselu',lat:44.05,lng:24.28,info:'US — Romania (Aegis Ashore BMD)',co:'US'},
{name:'Redzikowo',lat:54.48,lng:17.10,info:'US — Poland (Aegis Ashore BMD)',co:'US'},
{name:'Keflavik',lat:63.98,lng:-22.61,info:'US — Iceland (P-8 & NATO ASW)',co:'US'},
// US — Asia-Pacific
{name:'Diego Garcia',lat:-7.32,lng:72.42,info:'US/UK — Indian Ocean (Bomber & sub base)',co:'US'},
{name:'Camp Humphreys',lat:36.96,lng:127.03,info:'US — South Korea (USFK HQ)',co:'US'},
{name:'Kadena',lat:26.35,lng:127.77,info:'US — Okinawa/Japan (Air base)',co:'US'},
{name:'Yokosuka',lat:35.28,lng:139.67,info:'US — Japan (7th Fleet HQ)',co:'US'},
{name:'Guam (Andersen)',lat:13.58,lng:144.92,info:'US — Guam (Bomber & tanker base)',co:'US'},
{name:'Camp Smith',lat:21.39,lng:-157.92,info:'US — Hawaii (INDOPACOM HQ)',co:'US'},
{name:'Clark (EDCA)',lat:15.19,lng:120.56,info:'US — Philippines (Rotational EDCA site)',co:'US'},
{name:'Darwin',lat:-12.47,lng:130.84,info:'US — Australia (USMC rotation)',co:'US'},
// US — Americas
{name:'Guantánamo Bay',lat:19.90,lng:-75.10,info:'US — Cuba (Naval station)',co:'US'},
{name:'Soto Cano',lat:14.38,lng:-87.62,info:'US — Honduras (JTF-Bravo)',co:'US'},
// UK — Africa & Middle East
{name:'BFC Kenya (BATUK)',lat:-0.04,lng:37.07,info:'UK — Kenya (Training & SOF)',co:'UK'},
{name:'Minhad (UK)',lat:25.03,lng:55.36,info:'UK — UAE (Logistics hub)',co:'UK'},
{name:'Duqm',lat:19.66,lng:57.71,info:'UK — Oman (Naval logistics)',co:'UK'},
{name:'Bahrain (UK NSF)',lat:26.22,lng:50.61,info:'UK — Bahrain (Naval support)',co:'UK'},
{name:'Akrotiri',lat:34.59,lng:32.99,info:'UK — Cyprus (Sovereign base, air ops)',co:'UK'},
{name:'Dhekelia',lat:34.98,lng:33.72,info:'UK — Cyprus (Sovereign base, SIGINT)',co:'UK'},
// UK — Europe & Atlantic
{name:'HMNB Portsmouth',lat:50.80,lng:-1.11,info:'UK — England (Home Fleet)',co:'UK'},
{name:'HMNB Devonport',lat:50.38,lng:-4.18,info:'UK — England (Submarine base)',co:'UK'},
{name:'HMNB Clyde',lat:56.07,lng:-4.82,info:'UK — Scotland (Trident submarine base)',co:'UK'},
{name:'RAF Brize Norton',lat:51.75,lng:-1.58,info:'UK — England (Transport hub)',co:'UK'},
{name:'RAF Coningsby',lat:53.09,lng:-0.17,info:'UK — England (Typhoon QRA)',co:'UK'},
{name:'RAF Lossiemouth',lat:57.71,lng:-3.34,info:'UK — Scotland (Typhoon & P-8)',co:'UK'},
{name:'RAF Waddington',lat:53.17,lng:-0.52,info:'UK — England (ISR & Reaper HQ)',co:'UK'},
{name:'Gibraltar',lat:36.14,lng:-5.35,info:'UK — Gibraltar (Naval base, Med access)',co:'UK'},
{name:'Mount Pleasant',lat:-51.82,lng:-59.00,info:'UK — Falkland Islands (Typhoon det)',co:'UK'},
{name:'Ascension Island',lat:-7.97,lng:-14.39,info:'UK — South Atlantic (Air staging)',co:'UK'},
// UK — Asia-Pacific
{name:'Diego Garcia (UK)',lat:-7.31,lng:72.41,info:'UK — Indian Ocean (Joint UK/US)',co:'UK'},
{name:'Sembawang',lat:1.46,lng:103.82,info:'UK — Singapore (Naval logistics)',co:'UK'},
{name:'BFC Brunei',lat:4.93,lng:114.95,info:'UK — Brunei (Gurkha garrison)',co:'UK'},
// France — Africa
{name:'Djibouti (FFDj)',lat:11.60,lng:43.16,info:'FR — Djibouti (1,500 troops, air & naval)',co:'FR'},
{name:'N\'Djamena',lat:12.13,lng:15.03,info:'FR — Chad (Op Barkhane successor)',co:'FR'},
{name:'Abidjan (FFCI)',lat:5.26,lng:-3.93,info:'FR — Côte d\'Ivoire (950 troops)',co:'FR'},
{name:'Libreville',lat:0.45,lng:9.41,info:'FR — Gabon (EFG, 350 troops)',co:'FR'},
{name:'Dakar',lat:14.74,lng:-17.49,info:'FR — Senegal (EFS, 350 troops)',co:'FR'},
{name:'Port-Bouët (Abidjan)',lat:5.25,lng:-3.93,info:'FR — Côte d\'Ivoire (Air detachment)',co:'FR'},
{name:'Niamey (former)',lat:13.51,lng:2.11,info:'FR — Niger (Withdrew 2023, formerly 1,500)',co:'FR'},
{name:'Bamako (former)',lat:12.63,lng:-8.03,info:'FR — Mali (Withdrew 2022, formerly Barkhane)',co:'FR'},
{name:'Ouagadougou (former)',lat:12.37,lng:-1.52,info:'FR — Burkina Faso (Withdrew 2023)',co:'FR'},
{name:'La Réunion',lat:-21.34,lng:55.48,info:'FR — Réunion (FAZSOI, Indian Ocean garrison)',co:'FR'},
{name:'Mayotte',lat:-12.78,lng:45.23,info:'FR — Mayotte (DLEM, Foreign Legion)',co:'FR'},
// France — Europe & Med
{name:'Toulon',lat:43.12,lng:5.93,info:'FR — France (Mediterranean Fleet HQ)',co:'FR'},
{name:'Istres',lat:43.52,lng:4.93,info:'FR — France (Nuclear strike, strategic tankers)',co:'FR'},
{name:'Saint-Dizier',lat:48.63,lng:4.90,info:'FR — France (Rafale nuclear squadron)',co:'FR'},
{name:'Corsica (Solenzara)',lat:41.93,lng:9.40,info:'FR — Corsica (Air base, Med ops)',co:'FR'},
// France — Middle East
{name:'Al Dhafra (FR)',lat:24.24,lng:54.54,info:'FR — UAE (Rafale detachment)',co:'FR'},
{name:'Abu Dhabi (Naval)',lat:24.45,lng:54.40,info:'FR — UAE (Naval base)',co:'FR'},
// France — Americas & Pacific
{name:'Kourou',lat:5.17,lng:-52.68,info:'FR — French Guiana (Space center & garrison)',co:'FR'},
{name:'Fort-de-France',lat:14.60,lng:-61.07,info:'FR — Martinique (Caribbean garrison)',co:'FR'},
{name:'Nouméa',lat:-22.27,lng:166.44,info:'FR — New Caledonia (Pacific garrison)',co:'FR'},
{name:'Papeete',lat:-17.53,lng:-149.57,info:'FR — French Polynesia (Pacific forces)',co:'FR'}
];
const afrShippingRoutes=[
{name:'Suez Canal',points:[[31.27,32.31],[30.45,32.35],[29.95,32.56]],info:'Suez Canal — ~12% of global trade'},
{name:'Bab el-Mandeb',points:[[12.6,43.3],[12.4,43.5],[12.0,43.8]],info:'Bab el-Mandeb Strait — Red Sea chokepoint'},
{name:'Strait of Hormuz',points:[[26.6,56.2],[26.2,56.5],[25.8,56.8]],info:'Strait of Hormuz — ~21% of global oil'},
{name:'Strait of Malacca',points:[[4.2,100.0],[2.5,102.0],[1.3,103.8]],info:'Strait of Malacca — Key Asia-Europe route'},
{name:'Cape of Good Hope',points:[[-34.4,18.5],[-35.0,20.0],[-34.8,22.0]],info:'Cape of Good Hope — Alternative to Suez'},
{name:'Gulf of Guinea',points:[[4.0,2.0],[3.5,5.0],[4.0,8.0]],info:'Gulf of Guinea — Piracy hotspot'},
{name:'Turkish Straits',points:[[41.2,29.0],[41.0,29.1],[40.7,29.5]],info:'Bosphorus/Dardanelles — Black Sea access'}
];
const afrOilGas=[
{name:'Ghawar Field',lat:25.4,lng:49.5,info:'Saudi Arabia — World\'s largest oil field'},
{name:'Niger Delta',lat:5.0,lng:6.5,info:'Nigeria — Major oil production region'},
{name:'Hassi Messaoud',lat:31.7,lng:6.1,info:'Algeria — Largest oil field in Africa'},
{name:'Kirkuk',lat:35.5,lng:44.4,info:'Iraq — Major northern oil field'},
{name:'Kashagan',lat:46.3,lng:52.0,info:'Kazakhstan — Caspian mega-field'},
{name:'Mossel Bay',lat:-34.2,lng:22.1,info:'South Africa — PetroSA GTL refinery'},
{name:'Jubilee Field',lat:4.5,lng:-3.1,info:'Ghana — Offshore deep-water oil'},
{name:'Brega',lat:30.4,lng:19.6,info:'Libya — Key oil terminal'},
{name:'Ruwais',lat:24.1,lng:52.7,info:'UAE — ADNOC mega-refinery'},
{name:'Tema LNG',lat:5.6,lng:0.0,info:'Ghana — LNG import terminal'}
];
const afrDisputedTerritories=[
{name:'Western Sahara',lat:24.2,lng:-13.0,radius:150000,info:'Western Sahara — Morocco vs Polisario (SADR)'},
{name:'Crimea',lat:45.3,lng:34.0,radius:80000,info:'Crimea — Annexed by Russia (2014), claimed by Ukraine'},
{name:'Kashmir',lat:34.5,lng:75.5,radius:100000,info:'Kashmir — Disputed between India, Pakistan & China'},
{name:'Golan Heights',lat:33.0,lng:35.8,radius:30000,info:'Golan Heights — Occupied by Israel, claimed by Syria'},
{name:'Somaliland',lat:9.5,lng:46.0,radius:100000,info:'Somaliland — Self-declared republic, unrecognized'},
{name:'Abyei',lat:9.6,lng:28.4,radius:40000,info:'Abyei — Disputed between Sudan & South Sudan'},
{name:'Taiwan Strait',lat:24.0,lng:119.5,radius:100000,info:'Taiwan — PRC claims sovereignty'},
{name:'South China Sea',lat:12.0,lng:114.0,radius:250000,info:'South China Sea — Multiple overlapping claims'}
];


function loadAfrMap(){afrRegionIdx=0;active('afrMapBtn');renderOps(`
<button class='command-btn' onclick='toggleMapFeedPanel()' id='mapFeedToggleBtn' style='border-color:#ff444444;color:#ff4444'>LIVE FEED</button><br><br>
<button class='command-btn' onclick='afrAddNewsBox()'>+ LIVE NEWS</button><br><br>
<button class='command-btn' onclick='cycleAfrRegion()' id='afrRegionBtn'>REGION: AFRICA</button><br><br>
<button class='command-btn' onclick='toggleAfrTiles()' id='afrTileToggleBtn'>GOOGLE MAP</button><br><br>
<button class='command-btn' onclick='toggleAiDSLayer();this.style.borderColor=aiDSVisible?"#44ff88":"#00ffee44";this.style.color=aiDSVisible?"#44ff88":"#00ffee"' id='aiDSToggleBtn' style='border-color:#00ffee44'>⚡ AI INTEL</button><br><br>
<button class='command-btn' onclick='aiNewsAnalysis()' style='border-color:#ffaa0044;color:#ffaa00'>📡 NEWS INTEL</button><br><br>
<button class='command-btn' onclick='aiDiasporaBrief()' style='border-color:#00ccff44;color:#00ccff'>🌍 DIASPORA BRIEF</button><br><br>
<button class='command-btn' onclick='aiBugoutPlan()' style='border-color:#ff880044;color:#ff8800'>🚁 AI BUGOUT</button><br><br>
<button class='command-btn' onclick='toggleWebcamPanel()' id='webcamToggleBtn' style='border-color:#cc44ff44;color:#cc44ff'>📹 LIVE CAMS</button>
`,`<div id='afrMapContainer' style='height:100%;width:100%;position:relative'><div id='afrGoogleDirections' style='position:absolute;bottom:10px;left:10px;z-index:1001;background:rgba(6,16,24,0.92);border:1px solid #00ffee44;border-radius:6px;padding:0;font-family:Share Tech Mono,monospace;width:280px;cursor:default'><div id='afrGDragHandle' style='color:#00ffee;font-size:11px;letter-spacing:2px;padding:10px 14px 8px;text-shadow:0 0 6px #00ffee66;cursor:move;display:flex;justify-content:space-between;align-items:center;user-select:none' onmousedown='afrStartDrag(event)'><span>AfrOSINT MAP TOOL</span><span style='cursor:pointer;font-size:9px' onclick='var body=document.getElementById("afrGBody");var arrow=this;if(body.style.display==="none"){body.style.display="block";arrow.textContent="▼"}else{body.style.display="none";arrow.textContent="▶"}'>▼</span></div><div id='afrGBody' style='padding:0 14px 10px'><input id='afrGFrom' placeholder='From (or leave blank for map center)' style='width:100%;padding:6px;margin-bottom:6px;background:#0a1a28;border:1px solid #00ffee44;color:#d7ffff;font-size:11px;border-radius:3px;font-family:Share Tech Mono,monospace;box-sizing:border-box' /><input id='afrGTo' placeholder='To (destination)' style='width:100%;padding:6px;margin-bottom:8px;background:#0a1a28;border:1px solid #00ffee44;color:#d7ffff;font-size:11px;border-radius:3px;font-family:Share Tech Mono,monospace;box-sizing:border-box' /><button onclick='afrGoogleDirectionsGo()' style='width:100%;padding:6px;background:#00ffee22;border:1px solid #00ffee;color:#00ffee;font-size:11px;cursor:pointer;border-radius:3px;font-family:Share Tech Mono,monospace;letter-spacing:1px'>DIRECTIONS</button><button onclick='aiRouteRisk()' style='width:100%;padding:6px;margin-top:6px;background:#44ff8811;border:1px solid #44ff8844;color:#44ff88;font-size:10px;cursor:pointer;border-radius:3px;font-family:Share Tech Mono,monospace;letter-spacing:1px'>🛡️ AI ROUTE RISK</button><div style='margin-top:6px;display:flex;gap:6px'><button onclick='afrGoogleSearch()' style='flex:1;padding:5px;background:#00ffee11;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;border-radius:3px;font-family:Share Tech Mono,monospace'>SEARCH</button><button onclick='afrGoogleStreetView()' style='flex:1;padding:5px;background:#00ffee11;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;border-radius:3px;font-family:Share Tech Mono,monospace'>STREET VIEW</button></div></div></div><div id='afrNewsBoxes' style='position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1100'></div><div id='mapFeedPanel' style='position:absolute;top:50px;right:10px;width:380px;height:65%;z-index:1150;background:rgba(6,16,24,0.75);border:1px solid #00ffee44;border-radius:6px;pointer-events:auto;display:flex;flex-direction:column;box-shadow:0 4px 24px rgba(0,0,0,0.5)'><div id='mapFeedDragHandle' style='display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #00ffee44;flex-shrink:0;cursor:move;user-select:none'><div style='display:flex;align-items:center;gap:8px'><span style='color:#ff4444;font-size:10px'>&#9679;</span><span style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:12px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66'>LIVE FEED</span></div><div style='display:flex;gap:6px'><button id='mapFeedCollapseBtn' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:11px;cursor:pointer;padding:2px 8px;border-radius:3px;font-family:Share Tech Mono,monospace' title='Collapse'>&#9660;</button><button id='mapFeedCloseBtn' style='background:transparent;border:1px solid #ff444444;color:#ff4444;font-size:11px;cursor:pointer;padding:2px 8px;border-radius:3px;font-family:Share Tech Mono,monospace' title='Close'>&#10005;</button></div></div><div id='mapFeedTabs' style='display:flex;gap:0;border-bottom:1px solid #00ffee44;flex-shrink:0'><button id='mapFeedTabGlobal' style='flex:1;padding:6px 0;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:#00ffee;color:#061018'>GLOBAL</button><button id='mapFeedTabAfrica' style='flex:1;padding:6px 0;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;border-left:1px solid #00ffee22;cursor:pointer;background:transparent;color:#00ffee'>AFRICA</button><button id='mapFeedTabAes' style='flex:1;padding:6px 0;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;border-left:1px solid #00ffee22;cursor:pointer;background:transparent;color:#00ffee'>AES</button><button id='mapFeedTabIran' style='flex:1;padding:6px 0;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;border-left:1px solid #00ffee22;cursor:pointer;background:transparent;color:#00ffee'>IRAN</button></div><div id='mapFeedContent' style='flex:1;overflow-y:auto;padding:10px;min-height:0'></div></div><div id='webcamPanel' style='position:absolute;top:50px;left:10px;width:520px;height:75%;z-index:1150;background:rgba(10,10,12,0.95);border:1px solid #33333366;border-radius:6px;pointer-events:auto;display:none;flex-direction:column;box-shadow:0 4px 24px rgba(0,0,0,0.7)'><div id='webcamDragHandle' style='display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #333;flex-shrink:0;cursor:move;user-select:none'><div style='display:flex;align-items:center;gap:10px'><span style='color:#fff;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:3px;font-weight:bold'>LIVE WEBCAMS</span><span style='color:#ff4444;font-size:8px'>&#9679;</span><span id='wcCount' style='color:#ff4444;font-family:Share Tech Mono,monospace;font-size:12px;font-weight:bold'>22</span></div><div style='display:flex;gap:6px'><button id='webcamCollapseBtn' style='background:transparent;border:1px solid #444;color:#aaa;font-size:11px;cursor:pointer;padding:2px 8px;border-radius:3px;font-family:Share Tech Mono,monospace' title='Collapse'>&#9660;</button><button id='webcamCloseBtn' style='background:transparent;border:1px solid #ff444444;color:#ff4444;font-size:11px;cursor:pointer;padding:2px 8px;border-radius:3px;font-family:Share Tech Mono,monospace' title='Close'>&#10005;</button></div></div><div style='display:flex;gap:0;border-bottom:1px solid #333;flex-shrink:0;padding:0 8px'><button id='wcTab_all' onclick='_setWebcamTab(\"all\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:#ff4444;color:#fff;border-radius:4px 4px 0 0'>ALL</button><button id='wcTab_africa' onclick='_setWebcamTab(\"africa\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:transparent;color:#aaa;border-radius:4px 4px 0 0'>AFRICA</button><button id='wcTab_mideast' onclick='_setWebcamTab(\"mideast\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:transparent;color:#aaa;border-radius:4px 4px 0 0'>MIDEAST</button><button id='wcTab_europe' onclick='_setWebcamTab(\"europe\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:transparent;color:#aaa;border-radius:4px 4px 0 0'>EUROPE</button><button id='wcTab_americas' onclick='_setWebcamTab(\"americas\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:transparent;color:#aaa;border-radius:4px 4px 0 0'>AMERICAS</button><button id='wcTab_asia' onclick='_setWebcamTab(\"asia\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:transparent;color:#aaa;border-radius:4px 4px 0 0'>ASIA</button><button id='wcTab_global' onclick='_setWebcamTab(\"global\")' style='padding:8px 12px;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;border:none;cursor:pointer;background:transparent;color:#aaa;border-radius:4px 4px 0 0'>SPACE</button></div><div id='webcamContent' style='flex:1;overflow-y:auto;padding:8px;min-height:0'></div></div></div>`);setTimeout(()=>{if(afrMapInstance){afrMapInstance._destructor&&afrMapInstance._destructor();var oldCanvas=document.querySelector('#afrMapContainer > div:first-child');if(oldCanvas&&oldCanvas.tagName!=='DIV')oldCanvas.remove();afrMapInstance=null}_globeCountryFeatures=null;
var container=document.getElementById('afrMapContainer');
var globeDiv=document.createElement('div');globeDiv.id='globeMount';globeDiv.style.cssText='width:100%;height:100%;position:absolute;top:0;left:0;z-index:1;background:#000';
container.insertBefore(globeDiv,container.firstChild);
var vp=document.getElementById('opsViewport');if(vp)vp.style.overflow='hidden';
try{if(typeof Globe==='undefined')throw new Error('Globe library not loaded');afrMapInstance=Globe()
.globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
.bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
.backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
.atmosphereColor('#00ffee')
.atmosphereAltitude(0.15)
.showGraticules(true)
.showAtmosphere(true)
.pointsMerge(false)
.onGlobeClick(function(coords){_globeClosePopup()})
.onPointClick(function(point,event){
if(point._cat==='aiDS'&&point._aiDS){var c=point._aiDS;var html='<div style="font-family:Share Tech Mono,monospace;font-size:11px;max-width:320px;line-height:1.5;color:#d7ffff;padding:10px">'+'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #44ff8833"><strong style="color:'+c.color+';font-size:14px;text-shadow:0 0 8px '+c.color+'66">'+c.name+'</strong><span style="background:'+c.color+';color:#000;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:bold;letter-spacing:1px">'+c.risk+'</span></div>'+'<div style="margin-bottom:8px;color:#7fd6df;font-size:12px">RISK SCORE: <span style="color:'+c.color+';font-weight:bold">'+c.score+'/10</span> — Travel: <span style="color:#ffcc00">'+c.travel+'</span></div>'+'<div style="margin-bottom:8px;padding:6px 8px;background:rgba(255,100,100,0.08);border-left:2px solid #ff6666;border-radius:0 4px 4px 0"><span style="color:#ff6666;font-weight:bold">THREATS:</span><br><span style="color:#e0e8ef">'+c.threats.map(function(t){return'• '+t}).join('<br>')+'</span></div>'+'<div style="margin-bottom:8px;padding:6px 8px;background:rgba(255,170,0,0.08);border-left:2px solid #ffaa00;border-radius:0 4px 4px 0"><span style="color:#ffaa00;font-weight:bold">STABILITY:</span><br><span style="color:#e0e8ef">'+c.stability+'</span></div>'+'<div style="padding:6px 8px;background:rgba(68,255,136,0.08);border-left:2px solid #44ff88;border-radius:0 4px 4px 0"><span style="color:#44ff88;font-weight:bold">AI FORECAST:</span><br><span style="color:#e0e8ef">'+c.forecast+'</span></div>'+'<div style="margin-top:10px;border-top:1px solid #44ff8833;padding-top:8px"><button onclick="aiDeepDive(\''+c.name.replace(/'/g,"\\'")+'\')" style="width:100%;padding:7px;background:#0a2a1a;border:1px solid #44ff88;color:#44ff88;font-size:10px;cursor:pointer;border-radius:3px;font-family:Share Tech Mono,monospace;letter-spacing:1px">AI DEEP DIVE</button></div></div>';var rect=container.getBoundingClientRect();_globeShowPopup(html,event.clientX-rect.left,event.clientY-rect.top)}
else{var html='<div style="font-family:Share Tech Mono,monospace;font-size:12px;padding:10px;color:#d7ffff"><strong style="color:'+point.color+'">'+point.name+'</strong><br>'+point.info+'</div>';var rect=container.getBoundingClientRect();_globeShowPopup(html,event.clientX-rect.left,event.clientY-rect.top)}
})
(globeDiv);
afrMapInstance.pointOfView({lat:5,lng:20,altitude:2.2},0);
afrMapInstance.controls().autoRotate=true;afrMapInstance.controls().autoRotateSpeed=0.3;
afrUseGoogle=false;var tb=document.getElementById('afrTileToggleBtn');if(tb)tb.textContent='DARK MODE';
initCountryBorders();
_globeRefreshLayers();}catch(e){console.error('Globe init error:',e);globeDiv.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ff4444;font-family:Share Tech Mono,monospace;font-size:14px;text-align:center;padding:20px">⚠ 3D Globe requires WebGL.<br>Please enable hardware acceleration in your browser settings.</div>'}
afrNewsBoxCount=0;document.getElementById('afrNewsBoxes').innerHTML='';afrAddNewsBox();showLayerPanels();_showMapFeedOnLoad();_webcamScrollInit=false;_webcamVisible=false;_webcamCollapsed=false;_webcamTab='all'},100)}
function _globeRefreshLayers(){if(!afrMapInstance)return;
var pts=[];
var rings=[];
var arcs=[];
const baseColors={US:'#4488ff',UK:'#44cc44',FR:'#ffffff'};
if(afrConflictVisible){afrConflictZones.forEach(z=>{rings.push({lat:z.lat,lng:z.lng,maxR:z.radius/80000,propagationSpeed:2,repeatPeriod:1200,color:z.color,name:z.name,info:z.info,_cat:'conflict'})})}
if(afrBasesVisible){afrMilitaryBases.forEach(b=>{const c=baseColors[b.co]||'#4488ff';pts.push({lat:b.lat,lng:b.lng,size:0.12,color:c,name:b.name,info:b.info,_cat:'bases'})})}
if(afrShippingVisible){afrShippingRoutes.forEach(r=>{for(var i=0;i<r.points.length-1;i++){arcs.push({startLat:r.points[i][0],startLng:r.points[i][1],endLat:r.points[i+1][0],endLng:r.points[i+1][1],color:'#44ddff',name:r.name,info:r.info,_cat:'shipping'})}})}
if(afrOilVisible){afrOilGas.forEach(o=>{pts.push({lat:o.lat,lng:o.lng,size:0.1,color:'#ffaa00',name:o.name,info:o.info,_cat:'oil'})})}
if(afrDisputedVisible){afrDisputedTerritories.forEach(d=>{rings.push({lat:d.lat,lng:d.lng,maxR:d.radius/80000,propagationSpeed:1,repeatPeriod:2000,color:'#cc44ff',name:d.name,info:d.info,_cat:'disputed'})})}
const langColors={en:'#ff6666',fr:'#6699ff',pt:'#66ff66',de:'#ffcc00',es:'#ff9933',nl:'#ff66cc',ar:'#00ffcc'};
if(afrLangVisible){afrLangZones.forEach(z=>{const c=langColors[z.lang]||'#ffffff';rings.push({lat:z.lat,lng:z.lng,maxR:z.radius/80000,propagationSpeed:1,repeatPeriod:2500,color:c,name:z.name,info:z.info,_cat:'lang'})})}
if(aiDSVisible&&typeof aiDSCountryRisk!=='undefined'){aiDSCountryRisk.forEach(function(c){pts.push({lat:c.lat,lng:c.lng,size:c.score*0.04,color:c.color,name:c.name,info:c.risk+' — '+c.travel,_cat:'aiDS',_aiDS:c})})}
if(afrSafeVisible&&typeof safeZones!=='undefined'){safeZones.forEach(function(z){rings.push({lat:z.lat,lng:z.lng,maxR:z.radius/80000,propagationSpeed:1,repeatPeriod:2000,color:'#00ff66',name:z.name,info:z.info,_cat:'safe'})})}
if(afrRiskyVisible&&typeof riskyZones!=='undefined'){riskyZones.forEach(function(z){rings.push({lat:z.lat,lng:z.lng,maxR:z.radius/80000,propagationSpeed:1,repeatPeriod:2000,color:'#ff4444',name:z.name,info:z.info,_cat:'risky'})})}
afrMapInstance.pointsData(pts).pointLat('lat').pointLng('lng').pointAltitude(0.01).pointRadius('size').pointColor('color').pointLabel(function(d){return '<div style="font-family:Share Tech Mono,monospace;font-size:12px;background:rgba(6,16,24,0.95);border:1px solid #00ffee44;padding:8px 12px;border-radius:4px;color:#d7ffff"><strong style="color:'+d.color+'">'+d.name+'</strong><br>'+d.info+'</div>'});
afrMapInstance.ringsData(rings).ringLat('lat').ringLng('lng').ringMaxRadius('maxR').ringPropagationSpeed('propagationSpeed').ringRepeatPeriod('repeatPeriod').ringColor(function(d){return[d.color]});
afrMapInstance.arcsData(arcs).arcStartLat('startLat').arcStartLng('startLng').arcEndLat('endLat').arcEndLng('endLng').arcColor(function(d){return[d.color,d.color]}).arcStroke(0.5).arcDashLength(0.4).arcDashGap(0.2).arcDashAnimateTime(1500);
}
function _globeShowPopup(html,screenX,screenY){_globeClosePopup();var el=document.createElement('div');el.id='globePopupOverlay';el.style.cssText='position:absolute;z-index:2000;background:rgba(6,16,24,0.97);border:1px solid #00ffee44;border-radius:6px;padding:0;max-width:340px;max-height:80vh;overflow-y:auto;box-shadow:0 4px 24px rgba(0,255,238,0.15);pointer-events:auto';el.innerHTML=html;var container=document.getElementById('afrMapContainer');if(!container)return;container.appendChild(el);var cw=container.offsetWidth,ch2=container.offsetHeight;var ew=Math.min(340,cw-20),eh=el.offsetHeight;var left=Math.min(Math.max(10,screenX-ew/2),cw-ew-10);var top=Math.min(Math.max(10,screenY-eh-20),ch2-eh-10);el.style.left=left+'px';el.style.top=top+'px';_globePopupEl=el}
function _globeClosePopup(){var el=document.getElementById('globePopupOverlay');if(el)el.remove();_globePopupEl=null}
var _globeHighlightedCountry=null,afrCountryDataCache={};
function initCountryBorders(){
if(!afrMapInstance||_globeCountryFeatures)return;
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
.then(r=>r.json()).then(data=>{
_globeCountryFeatures=data.features;
afrMapInstance.polygonsData(_globeCountryFeatures)
.polygonCapColor(function(d){
var name=d.properties.ADMIN||d.properties.name||'';
return name===_globeHighlightedCountry?'rgba(0,255,238,0.15)':'rgba(0,0,0,0)'})
.polygonSideColor(function(){return'rgba(0,0,0,0)'})
.polygonStrokeColor(function(d){
var name=d.properties.ADMIN||d.properties.name||'';
return name===_globeHighlightedCountry?'#00ffee':'rgba(0,255,238,0.35)'})
.polygonAltitude(function(d){
var name=d.properties.ADMIN||d.properties.name||'';
return name===_globeHighlightedCountry?0.008:0.001})
.onPolygonClick(function(polygon,event,coords){
var name=polygon.properties.ADMIN||polygon.properties.name||'Unknown';
var iso=polygon.properties.ISO_A3||polygon.properties.ISO_A2||'';
_globeHighlightedCountry=name;
afrMapInstance.polygonsData(_globeCountryFeatures);
var container=document.getElementById('afrMapContainer');
var rect=container.getBoundingClientRect();
showCountryPopup(name,iso,{lat:coords.lat,lng:coords.lng},event.clientX-rect.left,event.clientY-rect.top);
})
.onPolygonHover(function(polygon){
if(afrMapInstance){
document.querySelector('#afrMapContainer').style.cursor=polygon?'pointer':'grab'}
});
}).catch(function(){});
}
function showCountryPopup(name,iso,latlng,screenX,screenY){
var cacheKey=name+'_'+iso;
var cached=afrCountryDataCache[cacheKey];
if(cached){renderCountryPopup(cached,latlng,screenX,screenY);return}
var url=(iso.length===3&&iso!=='-99')?'https://restcountries.com/v3.1/alpha/'+iso:'https://restcountries.com/v3.1/name/'+encodeURIComponent(name)+'?fullText=true';
fetch(url).then(r=>r.json()).then(data=>{
var c=Array.isArray(data)?data[0]:data;
var callingCode='N/A';
if(c.idd&&c.idd.root){callingCode=c.idd.root+(c.idd.suffixes&&c.idd.suffixes.length===1?c.idd.suffixes[0]:'')}
var currCodes=c.currencies?Object.keys(c.currencies):[];
var info={
name:c.name&&c.name.common||name,
official:c.name&&c.name.official||'',
capital:c.capital?c.capital.join(', '):'N/A',
population:c.population?c.population.toLocaleString():'N/A',
region:c.region||'N/A',
subregion:c.subregion||'',
area:c.area?c.area.toLocaleString()+' km²':'N/A',
languages:c.languages?Object.values(c.languages).join(', '):'N/A',
currencies:c.currencies?Object.values(c.currencies).map(cu=>cu.name+' ('+cu.symbol+')').join(', '):'N/A',
currCodes:currCodes,
callingCode:callingCode,
flag:c.flags&&c.flags.svg||'',
timezone:c.timezones?c.timezones[0]:'N/A',
continent:c.continents?c.continents.join(', '):'N/A',
exchangeRate:null,
aes:false
};
var aesCountries=['Mali','Burkina Faso','Niger'];
if(aesCountries.indexOf(info.name)>=0)info.aes=true;
afrCountryDataCache[cacheKey]=info;
if(currCodes.length>0&&currCodes[0]!=='USD'){
fetch('https://api.exchangerate-api.com/v4/latest/USD').then(r2=>r2.json()).then(exData=>{
var rate=exData.rates[currCodes[0]];
if(rate){info.exchangeRate='1 USD = '+rate.toFixed(2)+' '+currCodes[0]}
renderCountryPopup(info,latlng,screenX,screenY);
}).catch(function(){renderCountryPopup(info,latlng,screenX,screenY)});
}else{renderCountryPopup(info,latlng,screenX,screenY)}
}).catch(function(){
renderCountryPopup({name:name,official:'',capital:'N/A',population:'N/A',region:'N/A',subregion:'',area:'N/A',languages:'N/A',currencies:'N/A',currCodes:[],callingCode:'N/A',flag:'',timezone:'N/A',continent:'N/A',exchangeRate:null,aes:['Mali','Burkina Faso','Niger'].indexOf(name)>=0},latlng,screenX,screenY);
});
}
function renderCountryPopup(info,latlng,screenX,screenY){
if(!afrMapInstance)return;
_lastPopupInfo=info;
var flagHtml=info.flag?'<img src="'+info.flag+'" onclick="popupSetCountry(\''+info.name.replace(/'/g,"\\'")+'\');_globeClosePopup()" style="width:36px;height:auto;border-radius:3px;border:1px solid #00ffee44;vertical-align:middle;margin-right:8px;cursor:pointer" title="Open country panel">':'';
var html='<div style="font-family:Share Tech Mono,monospace;font-size:12px;min-width:220px;max-width:320px;position:relative;overflow:hidden">'+
'<div id="popupMainView">'+
'<div style="display:flex;align-items:center;margin-bottom:8px;border-bottom:1px solid #00ffee33;padding-bottom:6px">'+flagHtml+'<strong style="color:#00ffee;font-size:14px;letter-spacing:1px">'+info.name+'</strong></div>'+
(info.official?'<div style="color:#8899aa;font-size:10px;margin-bottom:6px">'+info.official+'</div>':'')+
(info.aes?'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:6px 10px;background:rgba(0,100,0,0.3);border:1px solid #00660066;border-radius:4px"><img src="assets/images/AES-flag.jpg" style="width:28px;height:auto;border-radius:2px;border:1px solid #00660044"><span style="color:#44ff88;font-size:11px;font-weight:bold;letter-spacing:1px">AES — Alliance of Sahel States</span></div>':'')+
'<table style="font-size:11px;border-collapse:collapse;width:100%">'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Capital</td><td style="color:#d7ffff">'+info.capital+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Population</td><td style="color:#d7ffff">'+info.population+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Region</td><td style="color:#d7ffff">'+info.region+(info.subregion?' / '+info.subregion:'')+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Area</td><td style="color:#d7ffff">'+info.area+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Languages</td><td style="color:#d7ffff">'+info.languages+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Calling Code</td><td style="color:#d7ffff">'+info.callingCode+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Currency</td><td style="color:#d7ffff">'+info.currencies+'</td></tr>'+
(info.exchangeRate?'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Exchange Rate</td><td style="color:#ffcc00">'+info.exchangeRate+'</td></tr>':'')+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Black Population</td><td style="color:#ffcc00">'+(blackPopPct[info.name]!==undefined?blackPopPct[info.name]+'%':'N/A')+'</td></tr>'+
'<tr><td style="color:#00ffee;padding:2px 8px 2px 0;white-space:nowrap">Timezone</td><td style="color:#d7ffff">'+info.timezone+'</td></tr>'+
'</table>'+
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;border-top:1px solid #00ffee33;padding-top:8px"><button class="popup-action-btn set-btn" onclick="popupSetCountry(_lastPopupInfo.name);_globeClosePopup()">SET</button><button class="popup-action-btn" onclick="showPopupHeadlineSlide()" style="border-color:#d7a0ff55;color:#d7a0ff">📋 HEADLINES</button><button class="popup-action-btn" onclick="showPopupNewsSlide()" style="border-color:#44ff8855;color:#44ff88">📰 LIVE NEWS</button><button class="popup-action-btn" onclick="showPopupFxSlide()" style="border-color:#ffcc0055;color:#ffcc00">💱 FX RATES</button><button class="popup-action-btn" onclick="showPopupBugoutSlide()" style="border-color:#ff880055;color:#ff8800">🚁 TRAVEL</button><button class="popup-action-btn" onclick="popupSetCountry(_lastPopupInfo.name);_globeClosePopup()" style="border-color:#00ffee55;color:#00ffee">🏠 HOME</button></div>'+
'</div>'+
'<div id="popupFxSlide" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#0a1a24;transform:translateX(100%);transition:transform 0.3s ease;overflow-y:auto;padding:8px;box-sizing:border-box;display:none"></div>'+
'<div id="popupBugoutSlide" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#0a1a24;transform:translateX(100%);transition:transform 0.3s ease;overflow-y:auto;padding:8px;box-sizing:border-box;display:none"></div>'+
'<div id="popupNewsSlide" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#0a1a24;transform:translateX(100%);transition:transform 0.3s ease;overflow-y:auto;padding:8px;box-sizing:border-box;display:none"></div>'+
'<div id="popupHeadlineSlide" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#0a1a24;transform:translateX(100%);transition:transform 0.3s ease;overflow-y:auto;padding:8px;box-sizing:border-box;display:none"></div>'+
'</div>';
var sx=screenX||200,sy=screenY||200;_globeShowPopup('<div style="padding:10px">'+html+'</div>',sx,sy);
}
function cycleAfrRegion(){if(!afrMapInstance)return;var r=afrRegions[afrRegionIdx];afrMapInstance.pointOfView({lat:r.lat,lng:r.lng,altitude:r.alt},1000);afrRegionIdx=(afrRegionIdx+1)%afrRegions.length;var next=afrRegions[afrRegionIdx];var btn=document.getElementById('afrRegionBtn');if(btn)btn.textContent='REGION: '+next.name}
function toggleAfrTiles(){if(!afrMapInstance)return;if(afrUseGoogle){afrMapInstance.globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');afrUseGoogle=false;var tb=document.getElementById('afrTileToggleBtn');if(tb)tb.textContent='DARK MODE'}else{afrMapInstance.globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg');afrUseGoogle=true;var tb=document.getElementById('afrTileToggleBtn');if(tb)tb.textContent='SATELLITE'}}
function afrGoogleDirectionsGo(){var from=document.getElementById('afrGFrom').value;var to=document.getElementById('afrGTo').value;if(!to){alert('Please enter a destination');return}if(!from&&afrMapInstance){var c=afrMapInstance.pointOfView();from=c.lat.toFixed(6)+','+c.lng.toFixed(6)}window.open('https://www.google.com/maps/dir/'+encodeURIComponent(from)+'/'+encodeURIComponent(to),'_blank')}
function afrGoogleSearch(){var to=document.getElementById('afrGTo').value;if(!to&&afrMapInstance){var c=afrMapInstance.pointOfView();to=c.lat.toFixed(6)+','+c.lng.toFixed(6)}window.open('https://www.google.com/maps/search/'+encodeURIComponent(to),'_blank')}
var afrSvPanelOpen=false;
function afrGoogleStreetView(){if(!afrMapInstance)return;var existing=document.getElementById('afrStreetViewPanel');if(existing){existing.remove();afrSvPanelOpen=false;return}afrSvPanelOpen=true;var c=afrMapInstance.pointOfView();var lat=c.lat.toFixed(6);var lng=c.lng.toFixed(6);var svUrl='https://data.mashedworld.com/dualmaps/map.htm?lat='+lat+'&lng='+lng+'&z=18&slat='+lat+'&slng='+lng+'&sh=85.434&sp=0&sz=1&gm=0&panel=msbi&mi=1&be=0&pc=1';var container=document.getElementById('afrMapContainer');var panel=document.createElement('div');panel.id='afrStreetViewPanel';panel.style.cssText='position:absolute;top:10px;right:10px;width:55%;height:70%;z-index:1200;pointer-events:auto;background:#000;border:1px solid #00ffee44;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 0 20px #00ffee33';panel.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#081821,#0c2a35);padding:6px 10px;border-bottom:1px solid #00ffee33;cursor:move;user-select:none;flex-shrink:0" onmousedown="afrSvDrag(event)"><span style="color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66">STREET VIEW — DUAL MAPS</span><div style="display:flex;gap:4px"><button onclick="afrSvToggleFs()" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace" title="Full Screen">&#x26F6;</button><button onclick="afrSvRefresh()" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace" title="Refresh to map center">&#x21BB;</button><button onclick="afrSvClose()" style="background:transparent;border:1px solid #ff444488;color:#ff4444;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace" title="Close">&times;</button></div></div><iframe id="afrSvFrame" src="'+svUrl+'" style="flex:1;width:100%;border:none" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe><div style="padding:2px 8px;background:#081821;border-top:1px solid #00ffee22;text-align:right"><a href="https://www.mashedworld.com/DualMaps.aspx" target="_blank" style="color:#00ffee66;font-family:Share Tech Mono,monospace;font-size:9px;text-decoration:none">Dual Maps</a></div>';container.appendChild(panel)}
function afrSvClose(){var p=document.getElementById('afrStreetViewPanel');if(p){p.remove();afrSvPanelOpen=false}}
function afrSvRefresh(){if(!afrMapInstance)return;var c=afrMapInstance.pointOfView();var lat=c.lat.toFixed(6);var lng=c.lng.toFixed(6);var frame=document.getElementById('afrSvFrame');if(frame)frame.src='https://data.mashedworld.com/dualmaps/map.htm?lat='+lat+'&lng='+lng+'&z=18&slat='+lat+'&slng='+lng+'&sh=85.434&sp=0&sz=1&gm=0&panel=msbi&mi=1&be=0&pc=1'}
var afrSvFs=false;function afrSvToggleFs(){var p=document.getElementById('afrStreetViewPanel');if(!p)return;if(afrSvFs){p.style.cssText='position:absolute;top:10px;right:10px;width:55%;height:70%;z-index:1200;pointer-events:auto;background:#000;border:1px solid #00ffee44;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 0 20px #00ffee33';afrSvFs=false}else{p.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;z-index:1210;pointer-events:auto;background:#000;border:none;border-radius:0;overflow:hidden;display:flex;flex-direction:column';afrSvFs=true}}
var afrSvDragEl=null,afrSvDragOX=0,afrSvDragOY=0;function afrSvDrag(e){var tag=e.target.tagName.toLowerCase();if(tag==='button')return;e.preventDefault();afrSvDragEl=document.getElementById('afrStreetViewPanel');var rect=afrSvDragEl.getBoundingClientRect();var parent=afrSvDragEl.parentElement.getBoundingClientRect();afrSvDragOX=e.clientX-rect.left;afrSvDragOY=e.clientY-rect.top;afrSvDragEl.style.right='auto';afrSvDragEl.style.left=(rect.left-parent.left)+'px';afrSvDragEl.style.top=(rect.top-parent.top)+'px';document.addEventListener('mousemove',afrSvDoDrag);document.addEventListener('mouseup',afrSvStopDrag)}function afrSvDoDrag(e){if(!afrSvDragEl)return;e.preventDefault();var parent=afrSvDragEl.parentElement.getBoundingClientRect();var x=e.clientX-afrSvDragOX-parent.left;var y=e.clientY-afrSvDragOY-parent.top;afrSvDragEl.style.left=Math.max(0,x)+'px';afrSvDragEl.style.top=Math.max(0,y)+'px'}function afrSvStopDrag(){document.removeEventListener('mousemove',afrSvDoDrag);document.removeEventListener('mouseup',afrSvStopDrag);afrSvDragEl=null}
var afrNewsBoxCount=0;
function afrAddNewsBox(){var id=afrNewsBoxCount++;var rtIdx=splitChannels.findIndex(function(c){return c[0]==='RT'});if(rtIdx<0)rtIdx=0;var container=document.getElementById('persistentNewsBoxes');if(!container)return;var box=document.createElement('div');box.id='afrNewsBox'+id;box.dataset.chIdx=rtIdx;box.style.cssText='position:absolute;top:'+(10+id*30)+'px;left:'+(90+id*20)+'px;width:360px;height:240px;z-index:'+(1101+id)+';pointer-events:auto;background:#000;border:1px solid #00ffee44;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 0 16px #00ffee22';var ch=splitChannels[rtIdx];var chSrc=_autoMute(ch[1]);box.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#081821,#0c2a35);padding:4px 8px;border-bottom:1px solid #00ffee33;cursor:move;user-select:none;flex-shrink:0" onmousedown="afrNewsDrag(event,'+id+')"><div style="display:flex;align-items:center;gap:4px"><button onclick="afrNewsChChange('+id+',-1)" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace">&#9664;</button><span style="color:#ff4444;font-size:8px">&#9679;</span><span id="afrNewsLabel'+id+'" style="color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66">'+ch[0]+'</span><button onclick="afrNewsChChange('+id+',1)" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace">&#9654;</button></div><div style="display:flex;gap:4px"><button onclick="afrNewsFs('+id+')" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace" title="Full Screen">&#x26F6;</button><button onclick="afrAddNewsBox()" style="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace" title="Add News Box">+</button><button onclick="afrRemoveNewsBox('+id+')" style="background:transparent;border:1px solid #ff444488;color:#ff4444;font-size:10px;cursor:pointer;padding:2px 6px;border-radius:3px;font-family:Share Tech Mono,monospace" title="Close">&times;</button></div></div><iframe id="afrNewsFrame'+id+'" src="'+chSrc+'" style="flex:1;width:100%;border:none" allow="autoplay;encrypted-media" allowfullscreen></iframe>';container.appendChild(box)}
function afrNewsChChange(id,dir){var box=document.getElementById('afrNewsBox'+id);if(!box)return;var idx=parseInt(box.dataset.chIdx);idx=(idx+dir+splitChannels.length)%splitChannels.length;box.dataset.chIdx=idx;var ch=splitChannels[idx];document.getElementById('afrNewsLabel'+id).textContent=ch[0];document.getElementById('afrNewsFrame'+id).src=_autoMute(ch[1])}
function afrRemoveNewsBox(id){var box=document.getElementById('afrNewsBox'+id);if(box)box.remove()}
var afrNewsFsId=-1;function afrNewsFs(id){var box=document.getElementById('afrNewsBox'+id);if(!box)return;if(afrNewsFsId===id){box.style.cssText='position:absolute;top:'+box.dataset.origTop+'px;right:auto;left:'+box.dataset.origLeft+'px;width:360px;height:240px;z-index:1101;pointer-events:auto;background:#000;border:1px solid #00ffee44;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 0 16px #00ffee22';afrNewsFsId=-1}else{var rect=box.getBoundingClientRect();var parent=box.parentElement.getBoundingClientRect();box.dataset.origTop=rect.top-parent.top;box.dataset.origLeft=rect.left-parent.left;box.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;z-index:1110;pointer-events:auto;background:#000;border:none;border-radius:0;overflow:hidden;display:flex;flex-direction:column';afrNewsFsId=id}}
var afrNewsDragEl=null,afrNewsDragOX=0,afrNewsDragOY=0;function afrNewsDrag(e,id){var tag=e.target.tagName.toLowerCase();if(tag==='button')return;e.preventDefault();var touch=e.touches?e.touches[0]:e;afrNewsDragEl=document.getElementById('afrNewsBox'+id);var rect=afrNewsDragEl.getBoundingClientRect();afrNewsDragOX=touch.clientX-rect.left;afrNewsDragOY=touch.clientY-rect.top;var parent=afrNewsDragEl.parentElement.getBoundingClientRect();afrNewsDragEl.style.transform='none';afrNewsDragEl.style.right='auto';afrNewsDragEl.style.left=(rect.left-parent.left)+'px';afrNewsDragEl.style.top=(rect.top-parent.top)+'px';document.addEventListener('mousemove',afrNewsDoDrag);document.addEventListener('mouseup',afrNewsStopDrag);document.addEventListener('touchmove',afrNewsDoDrag,{passive:false});document.addEventListener('touchend',afrNewsStopDrag)}function afrNewsDoDrag(e){if(!afrNewsDragEl)return;e.preventDefault();var touch=e.touches?e.touches[0]:e;var parent=afrNewsDragEl.parentElement.getBoundingClientRect();var x=touch.clientX-afrNewsDragOX-parent.left;var y=touch.clientY-afrNewsDragOY-parent.top;afrNewsDragEl.style.left=Math.max(0,x)+'px';afrNewsDragEl.style.top=Math.max(0,y)+'px'}function afrNewsStopDrag(){document.removeEventListener('mousemove',afrNewsDoDrag);document.removeEventListener('mouseup',afrNewsStopDrag);document.removeEventListener('touchmove',afrNewsDoDrag);document.removeEventListener('touchend',afrNewsStopDrag);afrNewsDragEl=null}
var afrDragEl=null,afrDragOX=0,afrDragOY=0;function afrStartDrag(e){e.preventDefault();afrDragEl=document.getElementById('afrGoogleDirections');var rect=afrDragEl.getBoundingClientRect();afrDragOX=e.clientX-rect.left;afrDragOY=e.clientY-rect.top;afrDragEl.style.bottom='auto';afrDragEl.style.left=rect.left+'px';afrDragEl.style.top=rect.top+'px';document.addEventListener('mousemove',afrDoDrag);document.addEventListener('mouseup',afrStopDrag)}function afrDoDrag(e){if(!afrDragEl)return;var parent=afrDragEl.parentElement.getBoundingClientRect();var x=e.clientX-afrDragOX-parent.left;var y=e.clientY-afrDragOY-parent.top;afrDragEl.style.left=Math.max(0,x)+'px';afrDragEl.style.top=Math.max(0,y)+'px'}function afrStopDrag(){document.removeEventListener('mousemove',afrDoDrag);document.removeEventListener('mouseup',afrStopDrag);afrDragEl=null}
function toggleAfrLayer(id){const m={conflict:'afrConflictVisible',bases:'afrBasesVisible',shipping:'afrShippingVisible',oil:'afrOilVisible',disputed:'afrDisputedVisible',lang:'afrLangVisible'};const vis=m[id];if(!vis)return;window[vis]=!window[vis];_globeRefreshLayers();if(id==='bases'){const leg=document.getElementById('baseLegend');if(leg)leg.style.display=window[vis]?'block':'none'}if(id==='lang'){const leg=document.getElementById('langLegend');if(leg)leg.style.display=window[vis]?'block':'none'}}
var panelDragEl=null,panelDragOX=0,panelDragOY=0,panelDragStartX=0,panelDragStartY=0,panelDragActive=false;
function startPanelDrag(e,panelId){var touch=e.touches?e.touches[0]:e;panelDragEl=document.getElementById(panelId);panelDragStartX=touch.clientX;panelDragStartY=touch.clientY;var rect=panelDragEl.getBoundingClientRect();var section=panelDragEl.parentElement.getBoundingClientRect();panelDragOX=touch.clientX-rect.left;panelDragOY=touch.clientY-rect.top;panelDragActive=false;document.addEventListener('mousemove',doPanelDrag);document.addEventListener('mouseup',stopPanelDrag);document.addEventListener('touchmove',doPanelDrag,{passive:false});document.addEventListener('touchend',stopPanelDrag)}
function doPanelDrag(e){if(!panelDragEl)return;var touch=e.touches?e.touches[0]:e;var dx=touch.clientX-panelDragStartX,dy=touch.clientY-panelDragStartY;if(!panelDragActive&&Math.abs(dx)<5&&Math.abs(dy)<5)return;if(!panelDragActive){panelDragActive=true;var rect=panelDragEl.getBoundingClientRect();var section=panelDragEl.parentElement.getBoundingClientRect();panelDragEl.style.right='auto';panelDragEl.style.left=(rect.left-section.left)+'px';panelDragEl.style.top=(rect.top-section.top)+'px'}e.preventDefault();var section=panelDragEl.parentElement.getBoundingClientRect();var x=touch.clientX-panelDragOX-section.left;var y=touch.clientY-panelDragOY-section.top;panelDragEl.style.left=Math.max(0,x)+'px';panelDragEl.style.top=Math.max(0,y)+'px'}
function stopPanelDrag(){document.removeEventListener('mousemove',doPanelDrag);document.removeEventListener('mouseup',stopPanelDrag);document.removeEventListener('touchmove',doPanelDrag);document.removeEventListener('touchend',stopPanelDrag);panelDragEl=null;panelDragActive=false}
function showLayerPanels(){var t=document.getElementById('tacticalLayerPanel');var s=document.getElementById('survivalLayerPanel');var ai=document.getElementById('aiDecisionPanel');if(t)t.style.display='block';if(s)s.style.display='block';if(ai)ai.style.display='block'}
function hideLayerPanels(){var t=document.getElementById('tacticalLayerPanel');var s=document.getElementById('survivalLayerPanel');var ai=document.getElementById('aiDecisionPanel');if(t)t.style.display='none';if(s)s.style.display='none';if(ai)ai.style.display='none'}
var afrSafeVisible=false,afrRiskyVisible=false;
var safeZones=[
{name:'Sub-Sahara Safe Zone',lat:-10,lng:25,radius:2800000,info:'Sub-Saharan Africa (Sahel to South Africa) — High Black population density, generally safe for Black travelers'},
{name:'West Africa Safe Zone',lat:10,lng:-2,radius:1200000,info:'West Africa (Senegal to Nigeria) — High Black population density, culturally welcoming for Black travelers'},
{name:'Jamaica',lat:18.1,lng:-77.3,radius:120000,info:'~92% Black population'},
{name:'Haiti',lat:19,lng:-72.3,radius:150000,info:'~95% Black population'},
{name:'Trinidad & Tobago',lat:10.5,lng:-61.3,radius:80000,info:'~35% Black population, multicultural'},
{name:'Bahamas',lat:24.2,lng:-76,radius:100000,info:'~90% Black population'},
{name:'Barbados',lat:13.2,lng:-59.5,radius:60000,info:'~92% Black population'},
{name:'Brazil — Bahia',lat:-13,lng:-38.5,radius:300000,info:'~80% Afro-Brazilian population in Salvador region'},
{name:'Brazil — Rio',lat:-22.9,lng:-43.2,radius:200000,info:'Large Afro-Brazilian community'},
{name:'Colombia — Pacific Coast',lat:3.9,lng:-77.1,radius:200000,info:'High Afro-Colombian population'},
{name:'London — Brixton/Tottenham',lat:51.46,lng:-0.12,radius:30000,info:'Large Black British community'},
{name:'Paris — Seine-Saint-Denis',lat:48.91,lng:2.48,radius:25000,info:'Large Afro-French community'},
{name:'Amsterdam — Bijlmer',lat:52.32,lng:4.97,radius:15000,info:'Large Surinamese/Afro-Dutch community'},
{name:'Toronto — Scarborough',lat:43.77,lng:-79.26,radius:30000,info:'Large Black Caribbean/African community'},
{name:'Atlanta Metro',lat:33.75,lng:-84.39,radius:80000,info:'~52% Black population, major cultural hub'},
{name:'Washington DC',lat:38.9,lng:-77,radius:60000,info:'~45% Black population'},
{name:'Detroit',lat:42.33,lng:-83.05,radius:50000,info:'~78% Black population'},
{name:'New Orleans',lat:29.95,lng:-90.07,radius:50000,info:'~59% Black population'},
{name:'Memphis',lat:35.15,lng:-90.05,radius:40000,info:'~64% Black population'},
{name:'Baltimore',lat:39.29,lng:-76.61,radius:40000,info:'~62% Black population'},
{name:'Birmingham AL',lat:33.52,lng:-86.81,radius:35000,info:'~70% Black population'},
{name:'Jackson MS',lat:32.3,lng:-90.18,radius:30000,info:'~82% Black population'},
{name:'Houston — Third Ward',lat:29.72,lng:-95.36,radius:40000,info:'Large Black community'},
{name:'Cape Verde',lat:15,lng:-23.6,radius:100000,info:'~70% Creole/Black population'}
];
var riskyZones=[
{name:'Eastern Europe',lat:52,lng:30,radius:1200000,info:'Very low Black population — heightened risk of racial profiling & hate incidents'},
{name:'Russia',lat:56,lng:40,radius:1500000,info:'Extremely low Black population — documented racism concerns'},
{name:'China — Rural',lat:35,lng:105,radius:1500000,info:'Very low Black population — cultural unfamiliarity, reported discrimination'},
{name:'Japan — Rural',lat:36,lng:138,radius:500000,info:'Extremely low Black population — curiosity common, some discrimination'},
{name:'South Korea',lat:36,lng:128,radius:300000,info:'Very low Black population — some discrimination reported'},
{name:'India — Northern',lat:28,lng:78,radius:800000,info:'Low Black population — racial profiling of African visitors documented'},
{name:'Middle East — Gulf States',lat:24,lng:50,radius:600000,info:'Migrant worker exploitation concerns — racial hierarchy issues'},
{name:'Central Asia',lat:42,lng:65,radius:1000000,info:'Extremely low Black population — limited exposure'},
{name:'Argentina — Southern',lat:-40,lng:-65,radius:500000,info:'Very low Black population'},
{name:'Chile',lat:-35,lng:-71,radius:400000,info:'Very low Black population — limited diversity'},
{name:'Bolivia/Paraguay',lat:-19,lng:-63,radius:400000,info:'Very low Black population'},
{name:'Scandinavia — Rural',lat:63,lng:15,radius:500000,info:'Very low diversity outside major cities'}
];
function initSurvivalLayers(){
if(!afrMapInstance)return;
}
function toggleSurvivalLayer(type){
if(!afrMapInstance)return;
if(type==='safe'){afrSafeVisible=!afrSafeVisible}
else if(type==='risky'){afrRiskyVisible=!afrRiskyVisible}
_globeRefreshLayers();
var leg=document.getElementById('survivalLegend');if(leg)leg.style.display=(afrSafeVisible||afrRiskyVisible)?'block':'none';
}
function popoutDiscord(){window.open('https://e.widgetbot.io/channels/1500947025196220536','AfrOSINT_Discord','width=900,height=700,menubar=no,toolbar=no,location=no,status=no')}
function loadComms(){active('commsBtn');renderOps(`<button class='command-btn' onclick='loadComms()'>REFRESH</button><br><br><button class='command-btn' onclick='popoutDiscord()'>⧉ DISCORD</button><br><br><button class='command-btn' onclick='popoutTelegram()'>⧉ TELEGRAM</button>`,`<div style='height:100%;display:flex;gap:4px;background:#061018;padding:4px'><div style='flex:1;display:flex;flex-direction:column;border:1px solid #00ffee44;border-radius:8px;overflow:hidden'><div style='background:linear-gradient(90deg,#081821,#0c2a35);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #00ffee33'><div style='display:flex;align-items:center;gap:8px'><span style="font-size:16px">💬</span><span style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:12px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66'>DISCORD</span></div><button onclick='popoutDiscord()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-family:Share Tech Mono,monospace;font-size:10px;padding:2px 8px;cursor:pointer;border-radius:3px'>⧉</button></div><iframe src="https://e.widgetbot.io/channels/1500947025196220536" allow="clipboard-write; fullscreen" style="flex:1;width:100%;border:none"></iframe></div><div style='flex:1;display:flex;flex-direction:column;border:1px solid #00ffee44;border-radius:8px;overflow:hidden'><div style='background:linear-gradient(90deg,#081821,#0c2a35);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #00ffee33'><div style='display:flex;align-items:center;gap:8px'><span style="font-size:16px">📡</span><span style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:12px;letter-spacing:2px;text-shadow:0 0 6px #00ffee66'>TELEGRAM</span></div><button onclick='popoutTelegram()' style='background:transparent;border:1px solid #00ffee44;color:#00ffee;font-family:Share Tech Mono,monospace;font-size:10px;padding:2px 8px;cursor:pointer;border-radius:3px'>⧉</button></div><iframe src="https://t.me/s/BSGOSINT" style="flex:1;width:100%;border:none;background:#fff"></iframe></div></div>`)}
function popoutTelegram(){window.open('https://t.me/s/BSGOSINT','AfrOSINT_Telegram','width=900,height=700,menubar=no,toolbar=no,location=no,status=no')}
const splitChannels=[...globalFeeds,...africanChannels,...americanChannels,...asianChannels,...chineseChannels,...europeanChannels,...russianChannels].filter((ch,i,arr)=>arr.findIndex(c=>c[1]===ch[1])===i);
let splitLeftIdx=0,splitRightIdx=1;
function initSplitIdx(){splitLeftIdx=splitChannels.findIndex(c=>c[0]==='RT');splitRightIdx=splitChannels.findIndex(c=>c[0]==='AL JAZEERA');if(splitLeftIdx<0)splitLeftIdx=0;if(splitRightIdx<0)splitRightIdx=1}
let newsGridIdx=globalFeeds.map(f=>{let i=splitChannels.findIndex(c=>c[1]===f[1]);return i>=0?i:0});
function newsGridChangeChannel(p,dir){newsGridIdx[p]=(newsGridIdx[p]+dir+splitChannels.length)%splitChannels.length;let ch=splitChannels[newsGridIdx[p]];document.getElementById('newsLabel'+p).textContent=ch[0];document.getElementById('newsFrame'+p).src=_autoMute(ch[1]);syncTickerToChannel(ch[0])}
function syncTickerToChannel(name){const n=name.toUpperCase();const channelToTag={'RT':'RT','AL JAZEERA':'AJ','AL JAZEERA ARABIC':'AJ','BLOOMBERG':'CNBC','DW':'DW','DW AFRICA':'AFRICA','SKY':'SKY','SKY NEWS':'SKY','BBC NEWS':'BBC','ABC NEWS':'AP','ABC NEWS AUSTRALIA':'AP','CNN':'AP','CNBC':'CNBC','FRANCE 24':'EURO','FRANCE 24 FR':'EURO','EURONEWS':'EURO','TRT WORLD':'REUTERS','WION':'REUTERS','CNA':'AP','INDIA TODAY':'REUTERS','NHK WORLD':'AP'};const africaNames=['AFRICA','AFRICA LIVE','AFRICA TODAY','AFRICA NOW','AFRICANEWS','SABC','CHANNELS TV','PREMIUM TIMES','NEWS24','DAILY TRUST','NAN NIGERIA'];if(africaNames.indexOf(n)>=0){let ai=africaTickerFeeds.findIndex(f=>f.tag===n||n.includes(f.tag)||f.tag.includes(n));if(ai<0)ai=0;tickerMode='africa';cf=ai;document.querySelectorAll('.tickerModeBtn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tickerModeBtn').forEach(b=>{if(b.textContent==='AFRICA')b.classList.add('active')});buildTickerChannels();loadTicker()}else if(channelToTag[n]){let gi=tags.indexOf(channelToTag[n]);if(gi<0)gi=0;tickerMode='global';cf=gi;document.querySelectorAll('.tickerModeBtn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tickerModeBtn').forEach(b=>{if(b.textContent==='GLOBAL')b.classList.add('active')});buildTickerChannels();loadTicker()}}
let newsGridFsPanel=-1;
function newsGridFullScreen(p){newsGridFsPanel=p;let grid=document.getElementById('newsGrid');if(!grid)return;document.getElementById('opsBay').style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;border:none';let shell=document.getElementById('opsShell');if(shell)shell.classList.add('fullscreen');grid.style.gridTemplateColumns='1fr';grid.style.gridTemplateRows='1fr';var panels=grid.querySelectorAll('.feed-panel');for(let i=0;i<panels.length;i++){panels[i].style.display=(i===p)?'flex':'none'}let exitBtn=document.createElement('button');exitBtn.id='newsGridFsExit';exitBtn.textContent='EXIT';exitBtn.style.cssText='position:absolute;top:10px;right:10px;z-index:10000;padding:8px 16px;background:#081821;border:1px solid #00ffee66;color:#00ffee;cursor:pointer;font-family:Share Tech Mono';exitBtn.onclick=newsGridExitFs;grid.style.position='relative';grid.appendChild(exitBtn)}
function newsGridExitFs(){newsGridFsPanel=-1;let grid=document.getElementById('newsGrid');if(!grid)return;document.getElementById('opsBay').style.cssText='';let shell=document.getElementById('opsShell');if(shell)shell.classList.remove('fullscreen');var currentFeeds=_newsWallMode==='africa'?africanChannels:globalFeeds;var rows=Math.ceil(currentFeeds.length/3);grid.style.gridTemplateColumns='repeat(3,1fr)';grid.style.gridTemplateRows='repeat('+rows+',1fr)';grid.style.position='';var panels=grid.querySelectorAll('.feed-panel');for(let i=0;i<panels.length;i++){panels[i].style.display='flex'}let exitBtn=document.getElementById('newsGridFsExit');if(exitBtn)exitBtn.remove()}
initSplitIdx();
function splitChangeChannel(side,dir){if(side==='left'){splitLeftIdx=(splitLeftIdx+dir+splitChannels.length)%splitChannels.length;document.getElementById('splitLeftLabel').textContent=splitChannels[splitLeftIdx][0]+' LIVE';document.getElementById('splitLeftFrame').src=splitChannels[splitLeftIdx][1]}else{splitRightIdx=(splitRightIdx+dir+splitChannels.length)%splitChannels.length;document.getElementById('splitRightLabel').textContent=splitChannels[splitRightIdx][0]+' LIVE';document.getElementById('splitRightFrame').src=splitChannels[splitRightIdx][1]}}
const splitArrowStyle="background:transparent;border:1px solid #00ffee44;color:#00ffee;font-family:Share Tech Mono,monospace;font-size:14px;padding:0 6px;cursor:pointer;border-radius:3px;transition:all 0.2s;line-height:22px";
const aiCategories=[
{title:'GENERAL / MULTI-PURPOSE AI',icon:'🧠',tools:[
{name:'OpenAI (ChatGPT)',url:'https://chat.openai.com'},{name:'Anthropic (Claude)',url:'https://claude.ai'},{name:'Google (Gemini)',url:'https://gemini.google.com'},{name:'DeepSeek',url:'https://chat.deepseek.com'},{name:'xAI (Grok)',url:'https://grok.com'},{name:'Mistral AI',url:'https://chat.mistral.ai'},{name:'Meta AI',url:'https://www.meta.ai'},{name:'Cohere',url:'https://cohere.com'},{name:'Inflection AI (Pi)',url:'https://pi.ai'},{name:'Alibaba (Qwen)',url:'https://qwenlm.ai'}]},
{title:'AI SEARCH / OSINT RESEARCH',icon:'🔎',tools:[
{name:'Perplexity AI',url:'https://www.perplexity.ai'},{name:'You.com',url:'https://you.com'},{name:'Google (Gemini Search)',url:'https://gemini.google.com'},{name:'Microsoft (Copilot)',url:'https://copilot.microsoft.com'},{name:'Brave Search AI',url:'https://search.brave.com'},{name:'Andi Search',url:'https://andisearch.com'},{name:'Phind',url:'https://www.phind.com'},{name:'Kagi Assistant',url:'https://kagi.com'},{name:'Exa',url:'https://exa.ai'},{name:'Elicit',url:'https://elicit.com'}]},
{title:'IMAGE / VISUAL / GEOINT AI',icon:'🖼️',tools:[
{name:'Google Lens',url:'https://lens.google.com'},{name:'OpenAI (DALL·E)',url:'https://labs.openai.com'},{name:'Stability AI',url:'https://stability.ai'},{name:'Midjourney',url:'https://www.midjourney.com'},{name:'Hugging Face',url:'https://huggingface.co'},{name:'Runway',url:'https://runwayml.com'},{name:'Planet Labs',url:'https://www.planet.com'},{name:'Maxar Technologies',url:'https://www.maxar.com'},{name:'BlackSky',url:'https://www.blacksky.com'},{name:'Clearview AI',url:'https://www.clearview.ai'}]},
{title:'AUDIO / SPEECH / COMMS INTEL',icon:'🎧',tools:[
{name:'OpenAI (Whisper)',url:'https://openai.com/research/whisper'},{name:'AssemblyAI',url:'https://www.assemblyai.com'},{name:'Deepgram',url:'https://deepgram.com'},{name:'Rev',url:'https://www.rev.com'},{name:'Speechmatics',url:'https://www.speechmatics.com'},{name:'Sonix',url:'https://sonix.ai'},{name:'Otter.ai',url:'https://otter.ai'},{name:'Descript',url:'https://www.descript.com'},{name:'ElevenLabs',url:'https://elevenlabs.io'},{name:'Resemble AI',url:'https://www.resemble.ai'}]},
{title:'AUTOMATION / AGENTS / WORKFLOWS',icon:'⚙️',tools:[
{name:'Zapier',url:'https://zapier.com'},{name:'Make',url:'https://www.make.com'},{name:'LangChain',url:'https://www.langchain.com'},{name:'LlamaIndex',url:'https://www.llamaindex.ai'},{name:'AutoGPT',url:'https://autogpt.net'},{name:'AgentGPT',url:'https://agentgpt.reworkd.ai'},{name:'CrewAI',url:'https://www.crewai.com'},{name:'Flowise',url:'https://flowiseai.com'},{name:'Dust',url:'https://dust.tt'},{name:'Relevance AI',url:'https://relevanceai.com'}]},
{title:'CODING / DEV / OSINT BUILD TOOLS',icon:'💻',tools:[
{name:'GitHub Copilot',url:'https://github.com/features/copilot'},{name:'OpenAI (Codex)',url:'https://openai.com/api'},{name:'Anthropic (Claude Code)',url:'https://claude.ai'},{name:'Cursor',url:'https://cursor.sh'},{name:'Replit',url:'https://replit.com'},{name:'Phind',url:'https://www.phind.com'},{name:'Codeium',url:'https://codeium.com'},{name:'Tabnine',url:'https://www.tabnine.com'},{name:'Sourcegraph (Cody)',url:'https://sourcegraph.com/cody'},{name:'Amazon CodeWhisperer',url:'https://aws.amazon.com/codewhisperer'}]}
];
function aiCatId(i){return 'ai-cat-'+i}
function scrollToAiCat(i){const el=document.getElementById(aiCatId(i));if(!el)return;const vp=document.getElementById('opsViewport');if(vp){const scrollable=vp.firstElementChild;if(scrollable)scrollable.scrollTo({top:el.offsetTop-scrollable.offsetTop,behavior:'smooth'})}}
function loadAILaunchpad(){active('aiLaunchpadBtn');renderOps(`<button class='command-btn' onclick='loadAILaunchpad()'>REFRESH</button><br><br>${aiCategories.map((c,i)=>"<button class='command-btn' onclick='scrollToAiCat("+i+")'>"+c.icon+" "+esc(c.title)+"</button><br><br>").join('')}`,`<div style='height:100%;overflow-y:auto;background:#061018'><h2 style='text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;letter-spacing:4px;padding:24px 0 8px;margin:0;text-shadow:0 0 12px #00ffee88'>AI LAUNCHPAD</h2>${aiCategories.map((c,i)=>"<h3 class='ai-section-hdr' id='"+aiCatId(i)+"'>"+c.icon+" "+esc(c.title)+"</h3><div class='ai-grid'>"+c.tools.map(t=>"<a class='ai-tile' href='"+safeHref(t.url)+"' target='_blank' rel='noopener'>"+esc(t.name)+"</a>").join('')+"</div>").join('')}</div>`)}
function loadRadio(){active('radioBtn');renderOps(`<button class='command-btn' onclick='loadRadio()'>REFRESH</button>`,`<iframe src='https://radio.garden/listen/legacy-90-1-fm/ZZSjC3SX' style='width:100%;height:100%;border:none'></iframe>`)}
let headlineMode='africa';
function loadHeadlines(mode){if(mode)headlineMode=mode;active('headlinesBtn');renderOps(`
<button class='command-btn' onclick='loadHeadlines()'>REFRESH</button>
`,`<div id='headlinesFrame' style='height:100%;overflow-y:auto;padding:20px;background:#061018'></div>`);renderHeadlineContent()}
function renderHeadlineContent(){const frame=document.getElementById('headlinesFrame');const toggleHtml='<div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px"><button id="hlAfricaBtn" onclick="headlineMode=\'africa\';setTickerMode(\'africa\');renderHeadlineContent()" style="padding:8px 24px;font-family:Share Tech Mono,monospace;font-size:14px;letter-spacing:2px;border:1px solid #00ffee44;border-radius:4px;cursor:pointer;transition:all 0.2s;'+(headlineMode==='africa'?'background:#00ffee;color:#061018;text-shadow:none;box-shadow:0 0 12px #00ffee66':'background:transparent;color:#00ffee;text-shadow:0 0 6px #00ffee88')+'">AFRICA</button><button id="hlGlobalBtn" onclick="headlineMode=\'global\';setTickerMode(\'global\');renderHeadlineContent()" style="padding:8px 24px;font-family:Share Tech Mono,monospace;font-size:14px;letter-spacing:2px;border:1px solid #00ffee44;border-radius:4px;cursor:pointer;transition:all 0.2s;'+(headlineMode==='global'?'background:#00ffee;color:#061018;text-shadow:none;box-shadow:0 0 12px #00ffee66':'background:transparent;color:#00ffee;text-shadow:0 0 6px #00ffee88')+'">GLOBAL</button></div>';frame.innerHTML=toggleHtml+'<div id="headlinesGrid" style="text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;padding:40px">Loading headlines...</div>';if(headlineMode==='africa'){fetchAfricaHeadlines()}else{fetchAllHeadlines()}}
const africaRssFeeds=[{url:'https://www.africanews.com/feed/rss',tag:'AFRICANEWS'},{url:'https://www.premiumtimesng.com/feed',tag:'PREMIUM TIMES'},{url:'https://www.sabcnews.com/sabcnews/feed',tag:'SABC'},{url:'https://feeds.news24.com/articles/news24/TopStories/rss',tag:'NEWS24'},{url:'https://nation.africa/rss.xml',tag:'NATION'},{url:'https://www.channelstv.com/feed',tag:'CHANNELS TV'},{url:'https://www.dailytrust.com/feed',tag:'DAILY TRUST'},{url:'https://www.thecable.ng/feed',tag:'THE CABLE'},{url:'https://www.africaintelligence.com/rss/the-continent',tag:'AI CONTINENT'},{url:'https://www.africaintelligence.com/rss/north-africa',tag:'AI NORTH'},{url:'https://www.africaintelligence.com/rss/west-africa',tag:'AI WEST'},{url:'https://www.africaintelligence.com/rss/central-africa',tag:'AI CENTRAL'},{url:'https://www.africaintelligence.com/rss/eastern-africa-and-the-horn',tag:'AI EAST'},{url:'https://www.africaintelligence.com/rss/southern-africa-and-islands',tag:'AI SOUTH'},{url:'https://www.africaintelligence.com/rss/sectors/energy',tag:'AI ENERGY'},{url:'https://www.africaintelligence.com/rss/sectors/mining',tag:'AI MINING'},{url:'https://www.africaintelligence.com/rss/sectors/infrastructure',tag:'AI INFRA'},{url:'https://www.africaintelligence.com/rss/sectors/defence',tag:'AI DEFENCE'},{url:'https://www.gov.za/rss-feeds',tag:'SA GOV'},{url:'https://www.mapnews.ma/en/rss',tag:'MAP MOROCCO'},{url:'https://www.ena.et/en/?feed=rss2',tag:'ENA ETHIOPIA'},{url:'https://nannews.ng/feed/',tag:'NAN NIGERIA'},{url:'https://www.theeastafrican.co.ke/service/rss/312310/312310/-/10b3u8nz/-/index.xml',tag:'EAST AFRICAN'},{url:'https://www.dailymaverick.co.za/feed/',tag:'DAILY MAVERICK'},{url:'https://www.howwemadeitinafrica.com/feed/',tag:'HWMIA'},{url:'https://businessday.co.za/rss/',tag:'BUSINESS DAY'}];
async function fetchAfricaHeadlines(){
const grid=document.getElementById('headlinesGrid');
let allItems=[];
for(let i=0;i<africaRssFeeds.length;i++){try{let r=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(africaRssFeeds[i].url));let d=await r.json();if(d.status==='ok'&&d.items){d.items.slice(0,8).forEach(item=>{const img=item.thumbnail||item.enclosure&&item.enclosure.link||'';allItems.push({title:item.title,link:item.link,pubDate:item.pubDate,source:africaRssFeeds[i].tag,img:img})})}}catch(e){}}
allItems.sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate));
if(!allItems.length){grid.innerHTML='<div style="text-align:center;color:#ff4444;padding:40px">No headlines available.</div>';return}
grid.innerHTML=renderHeadlineGrid(allItems)}
async function fetchAllHeadlines(){
const grid=document.getElementById('headlinesGrid');
let allItems=[];
for(let i=0;i<rss.length;i++){try{let r=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(rss[i]));let d=await r.json();d.items.slice(0,10).forEach(item=>{const img=item.thumbnail||item.enclosure&&item.enclosure.link||'';allItems.push({title:item.title,link:item.link,pubDate:item.pubDate,source:tags[i],img:img})})}catch(e){}}
allItems.sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate));
if(!allItems.length){grid.innerHTML='<div style="text-align:center;color:#ff4444;padding:40px">No headlines available.</div>';return}
grid.innerHTML=renderHeadlineGrid(allItems)}
function renderHeadlineGrid(items){return '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">'+items.map(i=>`<a href='${safeHref(i.link)}' target='_blank' style='text-decoration:none;display:block'><div style='background:#081821;border:1px solid #00ffee33;border-radius:8px;overflow:hidden;transition:border-color 0.15s,box-shadow 0.15s,transform 0.15s;height:100%'onmouseenter="this.style.borderColor=\'#00ffee\';this.style.boxShadow=\'0 0 12px #00ffee44\';this.style.transform=\'translateY(-2px)\'"onmouseleave="this.style.borderColor=\'#00ffee33\';this.style.boxShadow=\'none\';this.style.transform=\'none\'">${i.img?`<img src='${esc(i.img).replace(/'/g,"&#39;")}' style='width:100%;height:140px;object-fit:cover;display:block;background-color:#0a1520' onerror="this.style.display=\'none\'">`:''}<div style='padding:12px'><div style='color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;margin-bottom:6px'>[${esc(i.source)}]</div><div style='color:#f1f5f9;font-family:Rajdhani,sans-serif;font-size:14px;line-height:1.3'>${esc(i.title)}</div><div style='color:#7fd6df;font-size:11px;margin-top:8px;font-family:Share Tech Mono,monospace'>${i.pubDate?new Date(i.pubDate).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):''}</div></div></div></a>`).join('')+'</div>'}
const rss=[
'https://www.aljazeera.com/xml/rss/all.xml',
'https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en',
'https://feeds.bbci.co.uk/news/world/rss.xml',
'https://www.cnbc.com/id/100003114/device/rss/rss.html',
'https://rss.dw.com/xml/rss-en-all',
'https://www.euronews.com/rss?format=xml',
'https://www.africanews.com/feed/rss',
'https://www.theguardian.com/world/rss',
'https://news.google.com/rss/search?q=site:reuters.com+world&hl=en-US&gl=US&ceid=US:en',
'https://www.rt.com/rss/news/',
'https://feeds.skynews.com/feeds/rss/world.xml'
];
const tags=['AJ','AP','BBC','CNBC','DW','EURO','AFRICA','GUARDIAN','REUTERS','RT','SKY'];let cf=0;
let tickerMode='africa';
const africaTickerFeeds=africaRssFeeds.filter(f=>f.tag!=='NATION'&&f.tag!=='THE CABLE'&&!f.tag.startsWith('AI ')&&f.tag!=='BUSINESS DAY'&&f.tag!=='DAILY MAVERICK'&&f.tag!=='ENA ETHIOPIA'&&f.tag!=='EAST AFRICAN'&&f.tag!=='MAP MOROCCO'&&f.tag!=='SA GOV');
function setTickerMode(mode){tickerMode=mode;cf=0;document.querySelectorAll('.tickerModeBtn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tickerModeBtn').forEach(b=>{if((mode==='global'&&b.textContent==='GLOBAL')||(mode==='africa'&&b.textContent==='AFRICA'))b.classList.add('active')});buildTickerChannels();loadTicker()}
var _lastPopupInfo=null;
function popupSetCountry(name){var m=atwAllCities.find(function(c){return c.name===name});if(m){setHeaderTime(m.tz,m.name,m.iso);var p=document.getElementById('africaTimePanel');if(!africaTimePanelOpen){p.classList.add('open');africaTimePanelOpen=true}atwViewCountry(m.name,m.iso)}}
function buildTickerChannels(){const wrap=document.getElementById('tickerChannels');if(tickerMode==='africa'){wrap.innerHTML=africaTickerFeeds.map((f,i)=>`<button class='channel${i===cf?" active":""}' data-idx='${i}'>${f.tag}</button>`).join('')}else{wrap.innerHTML=tags.map((t,i)=>`<button class='channel${i===cf?" active":""}' data-idx='${i}'>${t}</button>`).join('')}wrap.querySelectorAll('.channel').forEach(b=>b.onclick=()=>{wrap.querySelectorAll('.channel').forEach(x=>x.classList.remove('active'));b.classList.add('active');cf=parseInt(b.dataset.idx);loadTicker()})}
buildTickerChannels();
async function loadTicker(){try{let feedUrl;let tagLabel;if(tickerMode==='africa'){feedUrl=africaTickerFeeds[cf].url;tagLabel=africaTickerFeeds[cf].tag}else{feedUrl=rss[cf];tagLabel=tags[cf]}let r=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(feedUrl));let d=await r.json();newsTicker.innerHTML=d.items.slice(0,10).map(i=>`<a class='headline-link' href='${safeHref(i.link)}' target='_blank'>[${tagLabel}] ${esc(i.title)}</a>`).join('')}catch(e){newsTicker.innerHTML='Tactical Feed Offline...'}}


loadTicker();loadHeadlines();

(function(){
var tw=document.querySelector('.ticker-window');
var tt=document.getElementById('newsTicker');
if(!tw||!tt)return;
var dragging=false,startX=0,scrollLeft=0;
function getTranslateX(){var s=getComputedStyle(tt).transform;if(!s||s==='none')return 0;var m=s.match(/matrix\(([^)]+)\)/);return m?parseFloat(m[1].split(',')[4]):0}
tw.addEventListener('mousedown',function(e){e.preventDefault();dragging=true;startX=e.pageX;scrollLeft=getTranslateX();tt.classList.add('dragging');tw.classList.add('dragging');tt.style.animation='none';tt.style.transform='translateX('+scrollLeft+'px)'});
document.addEventListener('mousemove',function(e){if(!dragging)return;var dx=e.pageX-startX;tt.style.transform='translateX('+(scrollLeft+dx)+'px)'});
document.addEventListener('mouseup',function(){if(!dragging)return;dragging=false;tt.classList.remove('dragging');tw.classList.remove('dragging');tt.style.animation='';tt.style.transform=''});
tw.addEventListener('touchstart',function(e){dragging=true;startX=e.touches[0].pageX;scrollLeft=getTranslateX();tt.classList.add('dragging');tw.classList.add('dragging');tt.style.animation='none';tt.style.transform='translateX('+scrollLeft+'px)'},{passive:true});
document.addEventListener('touchmove',function(e){if(!dragging)return;var dx=e.touches[0].pageX-startX;tt.style.transform='translateX('+(scrollLeft+dx)+'px)'},{passive:true});
document.addEventListener('touchend',function(){if(!dragging)return;dragging=false;tt.classList.remove('dragging');tw.classList.remove('dragging');tt.style.animation='';tt.style.transform=''});
})();

var _nitterBase='https://nitter.net/';
function _fetchNitterRSS(acct){
return fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(_nitterBase+acct+'/rss'))
.then(function(r){return r.json()})
.then(function(d){if(d.status==='ok'&&d.items&&d.items.length>0)return d;return null})
.catch(function(){return null});
}
var _osintAccounts=[
{handle:'Conflict_Radar',region:'global',type:'osint'},
{handle:'sentdefender',region:'global',type:'osint'},
{handle:'Osint613',region:'global',type:'osint'},
{handle:'MenchOsint',region:'global',type:'osint'},
{handle:'AfriMEOSINT',region:'africa',type:'osint'},
{handle:'AfriOSINT1',region:'africa',type:'osint'},
{handle:'war_noir',region:'global',type:'osint'},
{handle:'PopularFront_',region:'global',type:'osint'},
{handle:'TheAfricaCorps',region:'africa',type:'osint'},
{handle:'AJEnglish',region:'global',type:'news'},
{handle:'ReutersWorld',region:'global',type:'news'},
{handle:'ReutersAfrica',region:'africa',type:'news'},
{handle:'allafrica',region:'africa',type:'news'},
{handle:'DefenseNigeria',region:'africa',type:'osint'},
{handle:'SaharaWire',region:'africa',type:'osint'},
{handle:'Africa_In_EN',region:'africa',type:'news'},
{handle:'DailyPostNGR',region:'africa',type:'news'},
{handle:'THISDAYLIVE',region:'africa',type:'news'},
{handle:'GuardianNigeria',region:'africa',type:'news'},
{handle:'Spearhead_Af',region:'aes',type:'osint'},
{handle:'NorthAfricaPost',region:'africa',type:'news'},
{handle:'EthiopiaInsight',region:'africa',type:'news'},
{handle:'ACLEDinfo',region:'global',type:'osint'},
{handle:'HornObserver',region:'africa',type:'osint'},
{handle:'SahelWatch',region:'aes',type:'osint'},
{handle:'IntelDoge',region:'global',type:'osint'},
{handle:'Liveuamap',region:'global',type:'osint'},
{handle:'GeoConfirmed',region:'global',type:'osint'},
{handle:'WarMonitor3',region:'global',type:'osint'},
{handle:'NotWoofers',region:'global',type:'osint'},
{handle:'AuroraIntel',region:'global',type:'osint'},
{handle:'CalibreObscura',region:'global',type:'osint'},
{handle:'IranIntl_En',region:'iran',type:'news'},
{handle:'Iran_GOV',region:'iran',type:'news'},
{handle:'MEMRIReports',region:'iran',type:'news'},
{handle:'JasonMBrodsky',region:'iran',type:'osint'},
{handle:'IranNukes',region:'iran',type:'osint'},
{handle:'iran_policy',region:'iran',type:'osint'},
{handle:'MidEastStream',region:'iran',type:'news'},
{handle:'TRTWorldNow',region:'global',type:'news'}
];
var _mapFeedTab='global',_mapFeedAllItems=[];
var _mapFeedVisible=true,_mapFeedCollapsed=false,_mapFeedScrollInit=false;
var _mfDragEl=null,_mfDragOX=0,_mfDragOY=0;
function _mfDragStart(e){
if(e.target.tagName==='BUTTON')return;
var t=e.touches?e.touches[0]:e;
_mfDragEl=document.getElementById('mapFeedPanel');
if(!_mfDragEl)return;
e.preventDefault();
var r=_mfDragEl.getBoundingClientRect();
var p=_mfDragEl.parentElement.getBoundingClientRect();
_mfDragOX=t.clientX-r.left;_mfDragOY=t.clientY-r.top;
_mfDragEl.style.right='auto';
_mfDragEl.style.left=(r.left-p.left)+'px';
_mfDragEl.style.top=(r.top-p.top)+'px';
document.addEventListener('mousemove',_mfDragMove);
document.addEventListener('mouseup',_mfDragEnd);
document.addEventListener('touchmove',_mfDragMove,{passive:false});
document.addEventListener('touchend',_mfDragEnd);
}
function _mfDragMove(e){
if(!_mfDragEl)return;e.preventDefault();
var t=e.touches?e.touches[0]:e;
var p=_mfDragEl.parentElement.getBoundingClientRect();
_mfDragEl.style.left=Math.max(0,t.clientX-_mfDragOX-p.left)+'px';
_mfDragEl.style.top=Math.max(0,t.clientY-_mfDragOY-p.top)+'px';
}
function _mfDragEnd(){
document.removeEventListener('mousemove',_mfDragMove);
document.removeEventListener('mouseup',_mfDragEnd);
document.removeEventListener('touchmove',_mfDragMove);
document.removeEventListener('touchend',_mfDragEnd);
_mfDragEl=null;
}
function toggleMapFeedPanel(){
var panel=document.getElementById('mapFeedPanel');
if(!panel)return;
_mapFeedVisible=!_mapFeedVisible;
var btn=document.getElementById('mapFeedToggleBtn');
if(_mapFeedVisible){
panel.style.display='flex';
_mapFeedCollapsed=false;panel.style.height='65%';
var content=document.getElementById('mapFeedContent');if(content)content.style.display='block';
var cbtn=document.getElementById('mapFeedCollapseBtn');if(cbtn)cbtn.innerHTML='&#9660;';
if(btn){btn.style.borderColor='#ff4444';btn.style.color='#ff4444';btn.textContent='CLOSE FEED'}
_initMapFeedScroll();
_loadMapFeed();
}else{
panel.style.display='none';
if(btn){btn.style.borderColor='#ff444444';btn.style.color='#ff4444';btn.textContent='LIVE FEED'}
}}
function _initMapFeedScroll(){
var panel=document.getElementById('mapFeedPanel');
var content=document.getElementById('mapFeedContent');
var handle=document.getElementById('mapFeedDragHandle');
var colBtn=document.getElementById('mapFeedCollapseBtn');
var clsBtn=document.getElementById('mapFeedCloseBtn');
if(!panel||!content)return;
if(!_mapFeedScrollInit){
_mapFeedScrollInit=true;
panel.addEventListener('wheel',function(e){e.stopPropagation()},{passive:false});
panel.addEventListener('touchmove',function(e){e.stopPropagation()},{passive:false});
content.addEventListener('wheel',function(e){e.stopPropagation()},{passive:false});
content.addEventListener('touchmove',function(e){e.stopPropagation()},{passive:false});
if(handle){handle.addEventListener('mousedown',_mfDragStart);handle.addEventListener('touchstart',_mfDragStart,{passive:false})}
if(colBtn){colBtn.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();
var p=document.getElementById('mapFeedPanel');
var c=document.getElementById('mapFeedContent');
var b=document.getElementById('mapFeedCollapseBtn');
if(!p||!c)return;
_mapFeedCollapsed=!_mapFeedCollapsed;
if(_mapFeedCollapsed){c.style.display='none';p.style.height='auto';if(b)b.innerHTML='&#9650;'}
else{c.style.display='block';p.style.height='65%';if(b)b.innerHTML='&#9660;'}
})}
if(clsBtn){clsBtn.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();toggleMapFeedPanel()})}
var tabAfrica=document.getElementById('mapFeedTabAfrica');
var tabGlobal=document.getElementById('mapFeedTabGlobal');
if(tabAfrica){tabAfrica.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();_switchMapFeedTab('africa')})}
if(tabGlobal){tabGlobal.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();_switchMapFeedTab('global')})}
var tabAes=document.getElementById('mapFeedTabAes');
var tabIran=document.getElementById('mapFeedTabIran');
if(tabAes){tabAes.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();_switchMapFeedTab('aes')})}
if(tabIran){tabIran.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();_switchMapFeedTab('iran')})}
panel.addEventListener('mousedown',function(e){e.stopPropagation()});panel.addEventListener('wheel',function(e){e.stopPropagation()})
}}
function _showMapFeedOnLoad(){
var panel=document.getElementById('mapFeedPanel');
if(!panel)return;
_mapFeedVisible=true;_mapFeedCollapsed=false;_mapFeedScrollInit=false;
panel.style.display='flex';
panel.style.height='65%';
panel.style.top='50px';panel.style.right='10px';panel.style.left='';
var content=document.getElementById('mapFeedContent');
if(content)content.style.display='block';
var btn=document.getElementById('mapFeedToggleBtn');
if(btn){btn.style.borderColor='#ff4444';btn.style.color='#ff4444';btn.textContent='CLOSE FEED'}
var cbtn=document.getElementById('mapFeedCollapseBtn');
if(cbtn)cbtn.innerHTML='&#9660;';
_initMapFeedScroll();
_loadMapFeed();
}
function _switchMapFeedTab(tab){
_mapFeedTab=tab;
var tabs=['Global','Africa','Aes','Iran'];
tabs.forEach(function(t){
var btn=document.getElementById('mapFeedTab'+t);
if(!btn)return;
if(t.toLowerCase()===tab){btn.style.background='#00ffee';btn.style.color='#061018'}
else{btn.style.background='transparent';btn.style.color='#00ffee'}
});
_renderMapFeedItems();
}
function _renderMapFeedItems(){
var content=document.getElementById('mapFeedContent');
if(!content)return;
var items=_mapFeedAllItems;
if(_mapFeedTab==='global')items=items.filter(function(t){return true});
else if(_mapFeedTab==='africa')items=items.filter(function(t){return t._region==='africa'||t._region==='aes'});
else if(_mapFeedTab==='aes')items=items.filter(function(t){return t._region==='aes'||/\b(sahel|mali|burkina faso|niger|niamey|bamako|ouagadougou|wagner|africa corps|jnim|al qaeda|tuareg|azawad|fama|ecowas|coup|junta|traore|goita|tiani|mnla|aqim)\b/i.test(t.text)});
else if(_mapFeedTab==='iran')items=items.filter(function(t){return t._region==='iran'||/\b(iran|iranian|tehran|irgc|persian gulf|khamenei|rouhani|pezeshkian|strait of hormuz|bandar abbas|isfahan|quds force|hezbollah|houthi|proxy|missile)\b/i.test(t.text)});
if(!items.length){content.innerHTML='<div style="text-align:center;color:#ffaa00;padding:30px;font-family:Share Tech Mono,monospace;font-size:11px">No recent items matching this filter</div>';return}
content.innerHTML=items.map(function(t){
var dateStr='';try{var dd=new Date(t.created_at);if(!isNaN(dd)){var now=new Date();var diff=now-dd;var mins=Math.floor(diff/60000);var hrs=Math.floor(diff/3600000);if(mins<60)dateStr=mins+'m ago';else if(hrs<24)dateStr=hrs+'h ago';else dateStr=dd.toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}}catch(e){}
var avatarHtml=t.user&&t.user.profile_image_url?'<img src="'+esc(t.user.profile_image_url)+'" style="width:32px;height:32px;border-radius:50%;border:1px solid #00ffee44;flex-shrink:0" onerror="this.style.display=\'none\'">':'';
var imgHtml=t.media&&t.media[0]?'<img src="'+esc(t.media[0])+'" style="width:100%;max-height:180px;object-fit:cover;border-radius:6px;border:1px solid #00ffee22;margin-top:8px" onerror="this.style.display=\'none\'">':'';
var tweetUrl=t.link||('https://x.com/'+t.user.screen_name);
return '<a href="'+esc(tweetUrl)+'" target="_blank" style="text-decoration:none;display:block;margin-bottom:8px"><div style="background:#081821;border:1px solid #00ffee22;border-radius:8px;padding:12px;transition:border-color 0.15s,box-shadow 0.15s" onmouseenter="this.style.borderColor=\'#00ffee\';this.style.boxShadow=\'0 0 10px #00ffee33\'" onmouseleave="this.style.borderColor=\'#00ffee22\';this.style.boxShadow=\'none\'">'
+'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
+avatarHtml
+'<div style="flex:1;min-width:0"><div style="color:#f1f5f9;font-weight:bold;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(t.user.name)+'</div><div style="color:#7fd6df;font-size:10px;font-family:Share Tech Mono,monospace">@'+esc(t.user.screen_name)+'</div></div>'
+'<div style="color:#7fd6df;font-size:10px;font-family:Share Tech Mono,monospace;white-space:nowrap;flex-shrink:0">'+esc(dateStr)+'</div></div>'
+'<div style="color:#d7ffff;font-size:13px;line-height:1.6;word-break:break-word">'+esc(t.text)+'</div>'
+imgHtml
+'</div></a>'
}).join('');
}
async function _loadMapFeed(){
var content=document.getElementById('mapFeedContent');
if(!content)return;
content.innerHTML='<div style="text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;padding:30px;letter-spacing:2px;font-size:11px">LOADING FEED...</div>';
var regionMap={};_osintAccounts.forEach(function(a){regionMap[a.handle.toLowerCase()]=a.region});
var accounts=_osintAccounts.filter(function(a){return a.type==='osint'}).map(function(a){return a.handle});
_mapFeedAllItems=[];
var fetches=accounts.map(function(acct){
return _fetchNitterRSS(acct)
.then(function(d){
if(d&&d.status==='ok'&&d.items){
var feedName=(d.feed&&d.feed.title)||acct;
var feedImg=(d.feed&&d.feed.image)||'';
d.items.forEach(function(item){
var mediaUrl='';
if(item.enclosure&&item.enclosure.link)mediaUrl=item.enclosure.link;
else if(item.thumbnail)mediaUrl=item.thumbnail;
else{var imgMatch=item.description&&item.description.match(/<img[^>]+src="([^"]+)"/);if(imgMatch)mediaUrl=imgMatch[1]}
if(mediaUrl)mediaUrl=mediaUrl.replace(/nitter\.[^/]+\/pic\//,'https://pbs.twimg.com/').replace(/nitter\.[^/]+\/pic\/enc\/([^"]+)/,function(m,p){try{return decodeURIComponent(p)}catch(e){return m}});
var cleanText=(item.title||'').replace(/<[^>]+>/g,'');
var desc=(item.description||'').replace(/<[^>]+>/g,'').trim();
if(desc.length>cleanText.length)cleanText=desc;
var author=item.author||('@'+acct);
var screenName=author.replace(/^@/,'');
var tweetLink=(item.link||'').replace(/nitter\.[^/]+/,'x.com');
_mapFeedAllItems.push({
text:cleanText,
created_at:item.pubDate||'',
user:{name:feedName.replace(/ \/ @.*/,''),screen_name:screenName,profile_image_url:feedImg},
media:mediaUrl?[mediaUrl]:[],
link:tweetLink,
_region:regionMap[screenName.toLowerCase()]||regionMap[acct.toLowerCase()]||'global'
})})}
}).catch(function(e){console.warn('Map feed RSS failed for '+acct+':',e)})
});
await Promise.all(fetches);
_mapFeedAllItems.sort(function(a,b){try{return new Date(b.created_at).getTime()-new Date(a.created_at).getTime()}catch(e){return 0}});
if(!_mapFeedAllItems.length){content.innerHTML='<div style="text-align:center;color:#ff4444;padding:30px;font-family:Share Tech Mono,monospace;font-size:11px">Feed unavailable</div>';return}
_renderMapFeedItems();
}

var _webcamVisible=false,_webcamCollapsed=false,_webcamScrollInit=false,_webcamTab='all';
var _webcamFeeds=[
{name:'CHANNELS TV NIGERIA',src:'https://www.youtube.com/embed/FUGy0aNtadU?autoplay=1&mute=1',region:'africa'},
{name:'AFRICANEWS LIVE',src:'https://www.youtube.com/embed/NkdGPgKBJoA?autoplay=1&mute=1',region:'africa'},
{name:'SABC NEWS SA',src:'https://www.youtube.com/embed/rn8jMPZfKBY?autoplay=1&mute=1',region:'africa'},
{name:'CGTN AFRICA',src:'https://www.youtube.com/embed/eekJq_TDTtc?autoplay=1&mute=1',region:'africa'},
{name:'CAIRO PYRAMIDS',src:'https://www.youtube.com/embed/live_stream?channel=UCnpuMv3KHk-m0EBEnBjqVvA&autoplay=1&mute=1',region:'africa'},
{name:'CAPE TOWN',src:'https://www.youtube.com/embed/NapztoCaKFY?autoplay=1&mute=1',region:'africa'},
{name:'JERUSALEM',src:'https://www.youtube.com/embed/CrRThOApudI?autoplay=1&mute=1',region:'mideast'},
{name:'TEL AVIV',src:'https://www.youtube.com/embed/la_x53vhyd8?autoplay=1&mute=1',region:'mideast'},
{name:'MECCA LIVE',src:'https://www.youtube.com/embed/KPOsMGIju8k?autoplay=1&mute=1',region:'mideast'},
{name:'DUBAI',src:'https://www.youtube.com/embed/live_stream?channel=UCxMRaKBfKnFBETON5LIgKjA&autoplay=1&mute=1',region:'mideast'},
{name:'AL JAZEERA LIVE',src:'https://www.youtube.com/embed/gCNeDWCI0vo?autoplay=1&mute=1',region:'mideast'},
{name:'TRT WORLD',src:'https://www.youtube.com/embed/CV5Fooi8YJE?autoplay=1&mute=1',region:'mideast'},
{name:'ROME',src:'https://www.youtube.com/embed/2ZIxDAg1RvQ?autoplay=1&mute=1',region:'europe'},
{name:'PARIS EIFFEL',src:'https://www.youtube.com/embed/OzYp4NRZlwQ?autoplay=1&mute=1',region:'europe'},
{name:'LONDON',src:'https://www.youtube.com/embed/live_stream?channel=UCzIZ8HrzrTHVxoIhMBPBVhA&autoplay=1&mute=1',region:'europe'},
{name:'SKY NEWS LIVE',src:'https://www.youtube.com/embed/9Auq9mYxFEE?autoplay=1&mute=1',region:'europe'},
{name:'FRANCE 24',src:'https://www.youtube.com/embed/h3MuIUNCCzI?autoplay=1&mute=1',region:'europe'},
{name:'DW NEWS',src:'https://www.youtube.com/embed/GE_SfNVNyqk?autoplay=1&mute=1',region:'europe'},
{name:'NEW YORK',src:'https://www.youtube.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1',region:'americas'},
{name:'MIAMI BEACH',src:'https://www.youtube.com/embed/live_stream?channel=UC2LMjaxQdKGATmEPCsMPG4g&autoplay=1&mute=1',region:'americas'},
{name:'TOKYO SHIBUYA',src:'https://www.youtube.com/embed/3Q5wZeTuttw?autoplay=1&mute=1',region:'asia'},
{name:'ISS EARTH VIEW',src:'https://www.youtube.com/embed/P9C25Un7xaM?autoplay=1&mute=1',region:'global'}
];
var _wcDragEl=null,_wcDragOX=0,_wcDragOY=0;
function _wcDragStart(e){if(e.target.tagName==='BUTTON')return;var t=e.touches?e.touches[0]:e;_wcDragEl=document.getElementById('webcamPanel');if(!_wcDragEl)return;e.preventDefault();var r=_wcDragEl.getBoundingClientRect();var p=_wcDragEl.parentElement.getBoundingClientRect();_wcDragOX=t.clientX-r.left;_wcDragOY=t.clientY-r.top;_wcDragEl.style.right='auto';_wcDragEl.style.left=(r.left-p.left)+'px';_wcDragEl.style.top=(r.top-p.top)+'px';document.addEventListener('mousemove',_wcDragMove);document.addEventListener('mouseup',_wcDragEnd);document.addEventListener('touchmove',_wcDragMove,{passive:false});document.addEventListener('touchend',_wcDragEnd)}
function _wcDragMove(e){if(!_wcDragEl)return;e.preventDefault();var t=e.touches?e.touches[0]:e;var p=_wcDragEl.parentElement.getBoundingClientRect();_wcDragEl.style.left=Math.max(0,t.clientX-_wcDragOX-p.left)+'px';_wcDragEl.style.top=Math.max(0,t.clientY-_wcDragOY-p.top)+'px'}
function _wcDragEnd(){document.removeEventListener('mousemove',_wcDragMove);document.removeEventListener('mouseup',_wcDragEnd);document.removeEventListener('touchmove',_wcDragMove);document.removeEventListener('touchend',_wcDragEnd);_wcDragEl=null}
function toggleWebcamPanel(){
var panel=document.getElementById('webcamPanel');if(!panel)return;
_webcamVisible=!_webcamVisible;
var btn=document.getElementById('webcamToggleBtn');
if(_webcamVisible){panel.style.display='flex';_webcamCollapsed=false;_webcamTab='all';panel.style.height='75%';var c=document.getElementById('webcamContent');if(c)c.style.display='block';if(btn){btn.style.borderColor='#cc44ff';btn.style.color='#cc44ff';btn.textContent='CLOSE CAMS'}_initWebcamScroll();_setWebcamTab('all')}
else{panel.style.display='none';if(btn){btn.style.borderColor='#cc44ff44';btn.style.color='#cc44ff';btn.textContent='📹 LIVE CAMS'}var c=document.getElementById('webcamContent');if(c)c.innerHTML=''}}
function _initWebcamScroll(){
var panel=document.getElementById('webcamPanel');var content=document.getElementById('webcamContent');var handle=document.getElementById('webcamDragHandle');var colBtn=document.getElementById('webcamCollapseBtn');var clsBtn=document.getElementById('webcamCloseBtn');
if(!panel||!content)return;
if(!_webcamScrollInit){_webcamScrollInit=true;
panel.addEventListener('mousedown',function(e){e.stopPropagation()});panel.addEventListener('wheel',function(e){e.stopPropagation()})
panel.addEventListener('wheel',function(e){e.stopPropagation()},{passive:false});
panel.addEventListener('touchmove',function(e){e.stopPropagation()},{passive:false});
content.addEventListener('wheel',function(e){e.stopPropagation()},{passive:false});
content.addEventListener('touchmove',function(e){e.stopPropagation()},{passive:false});
if(handle){handle.addEventListener('mousedown',_wcDragStart);handle.addEventListener('touchstart',_wcDragStart,{passive:false})}
if(colBtn){colBtn.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();
var p=document.getElementById('webcamPanel');var c=document.getElementById('webcamContent');var b=document.getElementById('webcamCollapseBtn');
if(!_webcamCollapsed){_webcamCollapsed=true;if(c)c.style.display='none';if(p)p.style.height='auto';if(b)b.innerHTML='&#9650;'}
else{_webcamCollapsed=false;if(c)c.style.display='block';if(p)p.style.height='75%';if(b)b.innerHTML='&#9660;'}})}
if(clsBtn){clsBtn.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();_webcamVisible=false;var p=document.getElementById('webcamPanel');if(p)p.style.display='none';var c=document.getElementById('webcamContent');if(c)c.innerHTML='';var btn=document.getElementById('webcamToggleBtn');if(btn){btn.style.borderColor='#cc44ff44';btn.style.color='#cc44ff';btn.textContent='📹 LIVE CAMS'}})}}}
function _setWebcamTab(tab){
_webcamTab=tab;
var tabs=['all','africa','mideast','europe','americas','asia','global'];
tabs.forEach(function(t){var el=document.getElementById('wcTab_'+t);if(el){el.style.background=t===tab?'#ff4444':'transparent';el.style.color=t===tab?'#fff':'#aaa'}});
_renderWebcams();
}
function _renderWebcams(){
var content=document.getElementById('webcamContent');if(!content)return;
var filtered=_webcamTab==='all'?_webcamFeeds:_webcamFeeds.filter(function(c){return c.region===_webcamTab});
var countEl=document.getElementById('wcCount');if(countEl)countEl.textContent=filtered.length;
content.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+filtered.map(function(cam){
return '<div style="position:relative;border-radius:4px;overflow:hidden;border:1px solid #33333388;background:#111"><div style="position:relative;width:100%;padding-bottom:56.25%"><iframe src="'+cam.src+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allow="autoplay;encrypted-media" allowfullscreen loading="lazy"></iframe></div><div style="position:absolute;top:6px;left:6px;display:flex;align-items:center;gap:4px;background:rgba(0,0,0,0.7);padding:2px 8px;border-radius:3px"><span style="color:#ff4444;font-size:7px">&#9679;</span><span style="color:#fff;font-family:Share Tech Mono,monospace;font-size:10px;letter-spacing:1px;font-weight:bold">'+cam.name+'</span></div></div>'
}).join('')+'</div>'
}
function _loadWebcams(){_renderWebcams()}

var _liveFeedMode='osint',_liveFeedRegion='global';
function loadLiveFeed(){
active('liveFeedBtn');
var nb=document.getElementById('persistentNewsBoxes');if(nb)nb.innerHTML='';
afrNewsBoxCount=0;
renderOps(`
<button class='command-btn' onclick='loadLiveFeed()'>REFRESH</button>
`,`<div style='display:flex;flex-direction:column;height:100%'><div id='liveFeedBar'></div><div id='liveFeedViewport' style='flex:1;min-height:0;overflow-y:auto;padding:20px;background:#061018'><div style='text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;padding:40px;letter-spacing:2px'>LOADING LIVE FEED...</div></div></div>`);
document.getElementById('liveFeedBar').innerHTML=_renderLiveFeedBar();
_loadLiveFeedContent();
}
function _renderLiveFeedBar(){
var oActive=_liveFeedMode==='osint';var nActive=_liveFeedMode==='news';
var oStyle=oActive?'background:#00ffee;color:#061018;text-shadow:none;box-shadow:0 0 12px #00ffee66':'background:transparent;color:#00ffee;text-shadow:0 0 6px #00ffee88';
var nStyle=nActive?'background:#00ffee;color:#061018;text-shadow:none;box-shadow:0 0 12px #00ffee66':'background:transparent;color:#00ffee;text-shadow:0 0 6px #00ffee88';
var regionBar='';
if(oActive){
var regions=['global','africa','aes','iran'];
regionBar='<div style="display:flex;gap:0;border-bottom:1px solid #00ffee22;background:#0a1a28;flex-shrink:0">';
regions.forEach(function(r){
var active=_liveFeedRegion===r;
var rStyle=active?'background:#00ffee33;color:#00ffee;border-bottom:2px solid #00ffee':'background:transparent;color:#00ffee88;border-bottom:2px solid transparent';
regionBar+='<button onclick="_liveFeedRegion=\''+r+'\';document.getElementById(\'liveFeedBar\').innerHTML=_renderLiveFeedBar();_loadLiveFeedContent()" style="padding:6px 18px;font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:1px;border:none;cursor:pointer;transition:all 0.2s;'+rStyle+'">'+r.toUpperCase()+'</button>';
});
regionBar+='</div>';
}
return '<div style="display:flex;gap:0;border-bottom:1px solid #00ffee44;background:#061018;flex-shrink:0"><button onclick="_liveFeedMode=\'osint\';document.getElementById(\'liveFeedBar\').innerHTML=_renderLiveFeedBar();_loadLiveFeedContent()" style="padding:8px 24px;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:2px;border:none;border-right:1px solid #00ffee22;cursor:pointer;transition:all 0.2s;'+oStyle+'">OSINT TWEETS</button><button onclick="_liveFeedMode=\'news\';document.getElementById(\'liveFeedBar\').innerHTML=_renderLiveFeedBar();_loadLiveFeedContent()" style="padding:8px 24px;font-family:Share Tech Mono,monospace;font-size:13px;letter-spacing:2px;border:none;border-right:1px solid #00ffee22;cursor:pointer;transition:all 0.2s;'+nStyle+'">NEWS ARTICLES</button></div>'+regionBar
}
function _loadLiveFeedContent(){
var vp=document.getElementById('liveFeedViewport');
vp.innerHTML='<div style="text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;padding:40px;letter-spacing:2px">LOADING...</div>';
if(_liveFeedMode==='osint'){_fetchOsintTweets(vp)}else{_fetchLiveNews(vp)}
}

async function _fetchOsintTweets(vp){
var regionMap={};_osintAccounts.forEach(function(a){regionMap[a.handle.toLowerCase()]=a.region});
var accounts=_osintAccounts.map(function(a){return a.handle});
var allTweets=[];
var fetches=accounts.map(function(acct){
return _fetchNitterRSS(acct)
.then(function(d){
if(d&&d.status==='ok'&&d.items){
var feedName=(d.feed&&d.feed.title)||acct;
var feedImg=(d.feed&&d.feed.image)||'';
d.items.forEach(function(item){
var mediaUrl='';
if(item.enclosure&&item.enclosure.link)mediaUrl=item.enclosure.link;
else if(item.thumbnail)mediaUrl=item.thumbnail;
else{var imgMatch=item.description&&item.description.match(/<img[^>]+src="([^"]+)"/);if(imgMatch)mediaUrl=imgMatch[1]}
if(mediaUrl)mediaUrl=mediaUrl.replace(/nitter\.[^/]+\/pic\//,'https://pbs.twimg.com/').replace(/nitter\.[^/]+\/pic\/enc\/([^"]+)/,function(m,p){try{return decodeURIComponent(p)}catch(e){return m}});
var cleanText=(item.title||'').replace(/<[^>]+>/g,'');
var desc=(item.description||'').replace(/<[^>]+>/g,'').trim();
if(desc.length>cleanText.length)cleanText=desc;
var author=item.author||('@'+acct);
var screenName=author.replace(/^@/,'');
var tweetLink=(item.link||'').replace(/nitter\.[^/]+/,'x.com');
allTweets.push({
text:cleanText,
created_at:item.pubDate||'',
user:{name:feedName.replace(/ \/ @.*/,''),screen_name:screenName,profile_image_url:feedImg},
media:mediaUrl?[mediaUrl]:[],
retweet_count:0,
favorite_count:0,
reply_count:0,
link:tweetLink,
_region:regionMap[screenName.toLowerCase()]||regionMap[acct.toLowerCase()]||'global'
})})}
}).catch(function(e){console.warn('Nitter RSS failed for '+acct+':',e)})
});
await Promise.all(fetches);
allTweets.sort(function(a,b){
try{return new Date(b.created_at).getTime()-new Date(a.created_at).getTime()}catch(e){return 0}});
if(!allTweets.length){vp.innerHTML='<div style="text-align:center;color:#ff4444;padding:40px;font-family:Share Tech Mono,monospace">Unable to load tweets. The feed may be temporarily unavailable.</div>';return}
var filtered=allTweets;
if(_liveFeedRegion==='africa')filtered=allTweets.filter(function(t){return t._region==='africa'||t._region==='aes'});
else if(_liveFeedRegion==='global')filtered=allTweets;
else if(_liveFeedRegion==='aes')filtered=allTweets.filter(function(t){return t._region==='aes'||/\b(sahel|mali|burkina faso|niger|niamey|bamako|ouagadougou|wagner|africa corps|jnim|al qaeda|tuareg|azawad|fama|ecowas|coup|junta|traore|goita|tiani|mnla|aqim)\b/i.test(t.text)});
else if(_liveFeedRegion==='iran')filtered=allTweets.filter(function(t){return t._region==='iran'||/\b(iran|iranian|tehran|irgc|persian gulf|khamenei|rouhani|pezeshkian|strait of hormuz|bandar abbas|isfahan|quds force|hezbollah|houthi|proxy|missile)\b/i.test(t.text)});
if(!filtered.length){vp.innerHTML='<div style="text-align:center;color:#ffaa00;padding:40px;font-family:Share Tech Mono,monospace">No recent items matching this filter</div>';return}
vp.innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px">'+filtered.map(function(t){
var imgHtml=t.media&&t.media[0]?'<img src="'+esc(t.media[0])+'" style="width:100%;max-height:240px;object-fit:cover;border-radius:6px;border:1px solid #00ffee22;margin-bottom:8px" onerror="this.style.display=\'none\'">':'';
var avatarHtml=t.user&&t.user.profile_image_url?'<img src="'+esc(t.user.profile_image_url)+'" style="width:36px;height:36px;border-radius:50%;border:1px solid #00ffee44;flex-shrink:0" onerror="this.style.display=\'none\'">':'';
var dateStr='';try{var rawDate=t.created_at.replace(' · ',' ');var dd=new Date(rawDate);if(!isNaN(dd))dateStr=dd.toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}catch(e){}
var tweetUrl=t.link||('https://x.com/'+t.user.screen_name);
return '<a href="'+esc(tweetUrl)+'" target="_blank" style="text-decoration:none;display:block"><div style="background:#081821;border:1px solid #00ffee33;border-radius:8px;padding:14px;transition:border-color 0.15s,box-shadow 0.15s" onmouseenter="this.style.borderColor=\'#00ffee\';this.style.boxShadow=\'0 0 12px #00ffee44\'" onmouseleave="this.style.borderColor=\'#00ffee33\';this.style.boxShadow=\'none\'">'
+'<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
+avatarHtml
+'<div style="flex:1;min-width:0"><div style="color:#f1f5f9;font-weight:bold;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(t.user.name)+'</div><div style="color:#7fd6df;font-size:11px;font-family:Share Tech Mono,monospace">@'+esc(t.user.screen_name)+'</div></div>'
+'<div style="color:#7fd6df;font-size:10px;font-family:Share Tech Mono,monospace;white-space:nowrap;flex-shrink:0">'+esc(dateStr)+'</div></div>'
+'<div style="color:#d7ffff;font-size:13px;line-height:1.5;margin-bottom:8px;word-break:break-word">'+esc(t.text)+'</div>'
+imgHtml
+'<div style="display:flex;gap:16px;color:#7fd6df;font-size:11px;font-family:Share Tech Mono,monospace;padding-top:6px;border-top:1px solid #00ffee11">'
+'<span title="Replies">\u{1F4AC} '+(t.reply_count||0)+'</span>'
+'<span title="Retweets">\u{1F504} '+(t.retweet_count||0)+'</span>'
+'<span title="Likes">\u{2764}\u{FE0F} '+(t.favorite_count||0)+'</span>'
+'</div></div></a>'
}).join('')+'</div>';
}

var _liveFeedRssFeeds=[
{url:'https://www.aljazeera.com/xml/rss/all.xml',tag:'AL JAZEERA'},
{url:'https://feeds.bbci.co.uk/news/world/rss.xml',tag:'BBC WORLD'},
{url:'https://rss.dw.com/xml/rss-en-all',tag:'DW'},
{url:'https://www.africanews.com/feed/rss',tag:'AFRICANEWS'},
{url:'https://www.premiumtimesng.com/feed',tag:'PREMIUM TIMES'},
{url:'https://www.sabcnews.com/sabcnews/feed',tag:'SABC'},
{url:'https://feeds.news24.com/articles/news24/TopStories/rss',tag:'NEWS24'},
{url:'https://nation.africa/rss.xml',tag:'NATION'},
{url:'https://www.channelstv.com/feed',tag:'CHANNELS TV'},
{url:'https://www.theguardian.com/world/rss',tag:'GUARDIAN'}
];
async function _fetchLiveNews(vp){
var allItems=[];
for(var i=0;i<_liveFeedRssFeeds.length;i++){
try{
var r=await fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(_liveFeedRssFeeds[i].url));
var d=await r.json();
if(d.status==='ok'&&d.items){d.items.slice(0,6).forEach(function(item){
var img=item.thumbnail||(item.enclosure&&item.enclosure.link)||'';
allItems.push({title:item.title,link:item.link,pubDate:item.pubDate,source:_liveFeedRssFeeds[i].tag,img:img,description:item.description||''})
})}
}catch(e){}}
allItems.sort(function(a,b){return new Date(b.pubDate)-new Date(a.pubDate)});
if(!allItems.length){vp.innerHTML='<div style="text-align:center;color:#ff4444;padding:40px;font-family:Share Tech Mono,monospace">No news articles available.</div>';return}
var desc;
vp.innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">'+allItems.map(function(item){
desc=(item.description||'').replace(/<[^>]*>/g,'').substring(0,120);
return '<a href="'+safeHref(item.link)+'" target="_blank" style="text-decoration:none;display:block"><div style="background:#081821;border:1px solid #00ffee33;border-radius:8px;overflow:hidden;transition:border-color 0.15s,box-shadow 0.15s,transform 0.15s;height:100%" onmouseenter="this.style.borderColor=\'#00ffee\';this.style.boxShadow=\'0 0 12px #00ffee44\';this.style.transform=\'translateY(-2px)\'" onmouseleave="this.style.borderColor=\'#00ffee33\';this.style.boxShadow=\'none\';this.style.transform=\'none\'">'+(item.img?'<img src="'+esc(item.img).replace(/'/g,"&#39;")+'" style="width:100%;height:140px;object-fit:cover;display:block;background-color:#0a1520" onerror="this.style.display=\'none\'">':'')+'<div style="padding:12px"><div style="color:#00ffee;font-family:Share Tech Mono,monospace;font-size:11px;margin-bottom:6px;letter-spacing:1px">['+esc(item.source)+']</div><div style="color:#f1f5f9;font-family:Rajdhani,sans-serif;font-size:14px;line-height:1.3">'+esc(item.title)+'</div>'+(desc?'<div style="color:#7fd6df;font-size:12px;margin-top:6px;line-height:1.4;opacity:0.8">'+esc(desc)+(desc.length>=120?'...':'')+'</div>':'')+'<div style="color:#7fd6df;font-size:11px;margin-top:8px;font-family:Share Tech Mono,monospace">'+(item.pubDate?new Date(item.pubDate).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'')+'</div></div></div></a>'
}).join('')+'</div>';
}
function setPrice24hr(elId,fmt,change){var el=document.getElementById(elId);if(!el)return;var arrow='';if(change>0)arrow=' <span style="color:#00ff66">▲</span>';else if(change<0)arrow=' <span style="color:#ff4444">▼</span>';el.innerHTML=fmt+arrow}
async function fetchPrices(){
let gotGold=false,gotSilver=false,gotBrent=false;
try{const r=await fetch('https://scanner.tradingview.com/global/scan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({symbols:{tickers:['TVC:GOLD','TVC:SILVER','NYMEX:BB1!']},columns:['close','change']})});const d=await r.json();d.data.forEach(item=>{if(item.s==='TVC:GOLD'){setPrice24hr('priceGold',Math.round(item.d[0]).toLocaleString(),item.d[1]);gotGold=true}if(item.s==='TVC:SILVER'){setPrice24hr('priceSilver',item.d[0].toFixed(2),item.d[1]);gotSilver=true}if(item.s.includes('BB1')){setPrice24hr('priceBrent',item.d[0].toFixed(1),item.d[1]);gotBrent=true}})}catch(e){}
if(!gotGold){try{const r=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd&include_24hr_change=true');const d=await r.json();setPrice24hr('priceGold',Math.round(d['pax-gold'].usd).toLocaleString(),d['pax-gold'].usd_24h_change||0)}catch(e){}}
if(!gotSilver){try{const r=await fetch('https://api.allorigins.win/get?url='+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/SI=F?interval=1d&range=1d'));const w=await r.json();const d=JSON.parse(w.contents);var m=d.chart.result[0].meta;var sv=m.regularMarketPrice;var pc=m.chartPreviousClose||m.previousClose||sv;setPrice24hr('priceSilver',sv.toFixed(2),sv-pc)}catch(e){}}
if(!gotBrent){try{const r=await fetch('https://api.allorigins.win/get?url='+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=1d'));const w=await r.json();const d=JSON.parse(w.contents);var m2=d.chart.result[0].meta;var bv=m2.regularMarketPrice;var pc2=m2.chartPreviousClose||m2.previousClose||bv;setPrice24hr('priceBrent',bv.toFixed(1),bv-pc2)}catch(e){}}
try{const r=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');const d=await r.json();setPrice24hr('priceBtc',Math.round(d.bitcoin.usd).toLocaleString(),d.bitcoin.usd_24h_change||0)}catch(e){}
}
fetchPrices();setInterval(fetchPrices,60000);

const donateWallets={btc:{addr:'bc1quy9rhgtc4jg2auyjpj0tns0fk3s7h7ktzr62p6',qr:'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bc1quy9rhgtc4jg2auyjpj0tns0fk3s7h7ktzr62p6'},usdt:{addr:'TJXpvDnuTtx2Zth2YBNgHZnkbymJTnrgzx',qr:'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TJXpvDnuTtx2Zth2YBNgHZnkbymJTnrgzx'}};
let donateCategory='crypto';
function switchDonateCategory(cat){donateCategory=cat;document.getElementById('donateCategoryBtnCrypto').classList.toggle('active',cat==='crypto');document.getElementById('donateCategoryBtnFiat').classList.toggle('active',cat==='fiat');document.getElementById('donateCryptoCategory').style.display=cat==='crypto'?'block':'none';document.getElementById('donateFiatCategory').style.display=cat==='fiat'?'block':'none'}
let donateNetwork='btc';
function toggleDonatePanel(){document.getElementById('donatePanel').classList.toggle('open')}
function switchDonateNetwork(net){donateNetwork=net;const w=donateWallets[net];document.getElementById('donateBtcBtn').classList.toggle('active',net==='btc');document.getElementById('donateUsdtBtn').classList.toggle('active',net==='usdt');document.getElementById('donateAddr').textContent=w.addr;document.getElementById('donateQrImg').src=w.qr;document.getElementById('donateCopyBtn').textContent='COPY'}
function copyDonateAddr(){if(!donateWallets[donateNetwork])return;const addr=donateWallets[donateNetwork].addr;navigator.clipboard.writeText(addr).then(()=>{const btn=document.getElementById('donateCopyBtn');btn.textContent='COPIED';setTimeout(()=>{btn.textContent='COPY'},2000)}).catch(()=>{const t=document.createElement('textarea');t.value=addr;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);const btn=document.getElementById('donateCopyBtn');btn.textContent='COPIED';setTimeout(()=>{btn.textContent='COPY'},2000)})}
document.addEventListener('click',function(e){const panel=document.getElementById('donatePanel');const btn=document.querySelector('.donate-btn');if(panel.classList.contains('open')&&!panel.contains(e.target)&&!btn.contains(e.target)){panel.classList.remove('open')}});
loadAfrMap();

// Mobile nav: close menu when a nav button is clicked
document.querySelectorAll('#navBtns .command-btn').forEach(function(btn){
btn.addEventListener('click',function(){
var hc=document.querySelector('.header-center');
var mb=document.getElementById('mobileMenuBtn');
if(hc&&hc.classList.contains('mobile-open')){hc.classList.remove('mobile-open');if(mb)mb.textContent='☰'}
})});

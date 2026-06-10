/**
 * AfroSINT OSINT Report Submission System
 */

let reportAttachedFiles = [];
let reportLocationMap = null;
let reportMarker = null;
let reportSourcesCount = 0;

const REPORT_CATEGORIES = [
    "Conflict / Security",
    "Political Development",
    "Protest / Civil Unrest",
    "Crime",
    "Terrorism / Extremism",
    "Infrastructure",
    "Economic Activity",
    "Public Health",
    "Environmental Incident",
    "Migration / Displacement",
    "Cyber Incident",
    "Other"
];

function loadReport() {
    active('reportBtn');

    const menu = `
        <button class='command-btn' onclick='loadReport()'>MY REPORTS</button><br><br>
        <button class='command-btn' onclick='renderReportForm()'>+ NEW REPORT</button><br><br>
        <div id="adminModerationBtnWrap"></div>
    `;

    const content = `
        <div id="reportViewport" class="report-container">
            <h2 style='text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;letter-spacing:4px;padding:20px 0;margin:0;text-shadow:0 0 12px #00ffee88'>OSINT REPORTS</h2>
            <div id="reportDashboard" class="reports-dashboard">
                <div class="reports-tabs">
                    <button class="reports-tab active" onclick="switchDashboardTab('my-reports', this)">MY REPORTS</button>
                    <button class="reports-tab" onclick="switchDashboardTab('drafts', this)">DRAFTS</button>
                </div>
                <div id="dashboardContent">
                    <div style="text-align:center;color:#7fd6df;padding:40px;font-family:Share Tech Mono,monospace">Loading reports...</div>
                </div>
            </div>
        </div>
    `;

    renderOps(menu, content);

    // Check for admin rank to show moderation button
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
        const db = firebase.firestore();
        db.collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
            const userData = doc.data() || {};
            const userRole = userData.role || "Member";
            const rankIndex = AFR_RANKS.indexOf(userRole);
            if (rankIndex >= 5) {
                const wrap = document.getElementById('adminModerationBtnWrap');
                if (wrap) {
                    wrap.innerHTML = `<button class='command-btn' style='border-color:#ff444466;color:#ff4444' onclick='loadModeration()'>MODERATION</button>`;
                }
            }
        });
    }

    fetchUserReports();
}

function renderReportForm(draftId = null) {
    const viewport = document.getElementById('reportViewport');
    if (!viewport) return;

    reportAttachedFiles = [];
    reportSourcesCount = 0;

    viewport.innerHTML = `
        <h2 style='text-align:center;color:#00ffee;font-family:Share Tech Mono,monospace;letter-spacing:4px;padding:20px 0;margin:0;text-shadow:0 0 12px #00ffee88'>${draftId ? 'EDIT DRAFT' : 'SUBMIT INTELLIGENCE REPORT'}</h2>
        <div class="report-form" id="osintReportForm">
            <!-- Title -->
            <div class="report-form-section">
                <label class="report-form-label">REPORT TITLE *</label>
                <input type="text" id="reportTitle" class="report-input" placeholder="Short descriptive headline" required>
            </div>

            <!-- Category & Country -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div class="report-form-section">
                    <label class="report-form-label">CATEGORY *</label>
                    <select id="reportCategory" class="report-select" required>
                        <option value="">Select Category</option>
                        ${REPORT_CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                </div>
                <div class="report-form-section searchable-dropdown">
                    <label class="report-form-label">COUNTRY *</label>
                    <input type="text" id="reportCountrySearch" class="report-input" placeholder="Search African country..." autocomplete="off" required>
                    <input type="hidden" id="reportCountry">
                    <div id="countryDropdownList" class="dropdown-list"></div>
                </div>
            </div>

            <!-- State & City -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div class="report-form-section">
                    <label class="report-form-label">STATE / PROVINCE</label>
                    <input type="text" id="reportState" class="report-input" placeholder="e.g. Kano State">
                </div>
                <div class="report-form-section">
                    <label class="report-form-label">CITY / AREA</label>
                    <input type="text" id="reportCity" class="report-input" placeholder="e.g. Maiduguri">
                </div>
            </div>

            <!-- Date & Time -->
            <div class="report-form-section">
                <label class="report-form-label">INCIDENT DATE AND TIME *</label>
                <div style="display:flex;gap:15px;align-items:center">
                    <input type="datetime-local" id="reportDateTime" class="report-input" required style="flex:1">
                    <label style="display:flex;align-items:center;gap:8px;color:#7fd6df;font-size:13px;white-space:nowrap;cursor:pointer">
                        <input type="checkbox" id="reportTimeUnknown"> Exact time unknown
                    </label>
                </div>
            </div>

            <!-- Summary -->
            <div class="report-form-section">
                <label class="report-form-label">REPORT SUMMARY * (Min 100 chars)</label>
                <textarea id="reportSummary" class="report-textarea" placeholder="Describe what happened. Who was involved? Why is it significant?" minlength="100" maxlength="5000" required></textarea>
                <div id="summaryCharCount" style="text-align:right;font-size:11px;color:#7fd6df">0 / 5000</div>
            </div>

            <!-- Sources -->
            <div class="report-form-section">
                <label class="report-form-label">SOURCES *</label>
                <div id="sourcesContainer" style="display:flex;flex-direction:column;gap:10px;margin-bottom:10px"></div>
                <button type="button" class="add-btn" onclick="addSourceEntry()">+ Add Another Source</button>
            </div>

            <!-- Confidence -->
            <div class="report-form-section">
                <label class="report-form-label">CONFIDENCE ASSESSMENT *</label>
                <div class="confidence-selector">
                    <label class="confidence-option" title="Unverified information">
                        <input type="radio" name="reportConfidence" value="Low" required> Low
                    </label>
                    <label class="confidence-option" title="Partially corroborated">
                        <input type="radio" name="reportConfidence" value="Medium"> Medium
                    </label>
                    <label class="confidence-option" title="Confirmed by multiple reliable sources">
                        <input type="radio" name="reportConfidence" value="High"> High
                    </label>
                </div>
                <div style="font-size:11px;color:#7fd6df;line-height:1.4">
                    Low = unverified information. Medium = partially corroborated. High = confirmed by multiple reliable sources.
                </div>
            </div>

            <!-- Evidence -->
            <div class="report-form-section">
                <label class="report-form-label">UPLOAD EVIDENCE (Max 5 files, 10MB each)</label>
                <div class="file-upload-area" onclick="document.getElementById('evidenceInput').click()">
                    <span style="color:var(--cyan)">CLICK OR DRAG FILES TO ATTACH</span>
                    <div style="font-size:11px;color:#7fd6df;margin-top:5px">Images, PDFs, Screenshots</div>
                    <input type="file" id="evidenceInput" multiple hidden onchange="handleFileSelect(event)">
                </div>
                <div id="fileList" class="file-list"></div>
            </div>

            <!-- Location -->
            <div class="report-form-section">
                <label class="report-form-label">GEOGRAPHIC LOCATION</label>
                <div class="location-mode-btns">
                    <button type="button" class="location-mode-btn active" id="locManualBtn" onclick="setLocMode('manual')">MANUAL COORDINATES</button>
                    <button type="button" class="location-mode-btn" id="locMapBtn" onclick="setLocMode('map')">SELECT ON MAP</button>
                </div>
                <div id="manualCoords" style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
                    <input type="number" id="reportLat" class="report-input" placeholder="Latitude" step="any">
                    <input type="number" id="reportLng" class="report-input" placeholder="Longitude" step="any">
                </div>
                <div id="mapContainerWrap" style="display:none">
                    <div id="reportLocationMap"></div>
                    <p style="font-size:11px;color:#7fd6df;margin-top:5px">Click on map to drop a pin.</p>
                </div>
            </div>

            <!-- Analyst Notes -->
            <div class="report-form-section">
                <label class="report-form-label">ANALYST NOTES (Optional)</label>
                <textarea id="reportAnalystNotes" class="report-textarea" placeholder="Additional context for administrators..."></textarea>
            </div>

            <!-- Attribution -->
            <div class="report-form-section">
                <label class="report-form-label">ATTRIBUTION PREFERENCE</label>
                <div style="display:flex;flex-direction:column;gap:10px;padding:5px 0">
                    <label style="display:flex;align-items:center;gap:10px;color:#d7ffff;font-size:14px;cursor:pointer">
                        <input type="checkbox" id="attrDisplayUsername" checked onclick="syncAttr(this, 'user')"> Display my AfroSINT username on this report
                    </label>
                    <label style="display:flex;align-items:center;gap:10px;color:#d7ffff;font-size:14px;cursor:pointer">
                        <input type="checkbox" id="attrAnonymous" onclick="syncAttr(this, 'anon')"> Submit anonymously to other users
                    </label>
                </div>
                <div style="font-size:11px;color:#ffaa00">Administrators will always see the original author.</div>
            </div>

            <!-- Actions -->
            <div class="report-actions">
                <button type="button" class="btn-cancel" onclick="loadReport()">CANCEL</button>
                <button type="button" class="btn-draft" onclick="saveReportDraft('${draftId || ''}')">SAVE DRAFT</button>
                <button type="button" class="btn-submit" onclick="submitReport('${draftId || ''}')">SUBMIT REPORT</button>
            </div>
        </div>
    `;

    initReportFormEvents();
    addSourceEntry();

    if (draftId) {
        loadDraftData(draftId);
    }
}

function initReportFormEvents() {
    // Country Search
    const search = document.getElementById('reportCountrySearch');
    const list = document.getElementById('countryDropdownList');
    if (search && list) {
        search.addEventListener('focus', () => {
            renderCountryDropdown(search.value);
            list.style.display = 'block';
        });
        search.addEventListener('input', () => renderCountryDropdown(search.value));
        document.addEventListener('click', (e) => {
            if (!search.contains(e.target) && !list.contains(e.target)) {
                list.style.display = 'none';
            }
        });
    }

    // Summary character count
    const summary = document.getElementById('reportSummary');
    const count = document.getElementById('summaryCharCount');
    if (summary && count) {
        summary.addEventListener('input', () => {
            count.textContent = `${summary.value.length} / 5000`;
            count.style.color = summary.value.length < 100 ? '#ff4444' : '#7fd6df';
        });
    }
}

function addSourceEntry(data = null) {
    const container = document.getElementById('sourcesContainer');
    if (!container) return;

    const id = reportSourcesCount++;
    const entry = document.createElement('div');
    entry.className = 'source-entry';
    entry.id = `source-${id}`;

    entry.innerHTML = `
        <button type="button" class="remove-btn" onclick="document.getElementById('source-${id}').remove()">×</button>
        <div class="report-form-section">
            <select class="report-select source-type" required>
                <option value="News Article">News Article</option>
                <option value="Social Media">Social Media</option>
                <option value="First-Hand Observation">First-Hand Observation</option>
                <option value="Government Statement">Government Statement</option>
                <option value="NGO Report">NGO Report</option>
                <option value="Video">Video</option>
                <option value="Image">Image</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="report-form-section">
            <input type="url" class="report-input source-url" placeholder="URL (optional)">
        </div>
        <div class="report-form-section full-width">
            <input type="text" class="report-input source-desc" placeholder="Source Description" required>
        </div>
    `;

    container.appendChild(entry);

    if (data) {
        entry.querySelector('.source-type').value = data.type || '';
        entry.querySelector('.source-url').value = data.url || '';
        entry.querySelector('.source-desc').value = data.desc || '';
    }
}

function renderCountryDropdown(query) {
    const list = document.getElementById('countryDropdownList');
    if (!list) return;

    const q = query.toLowerCase();
    // Filter countries from atwAllCities (from app.js)
    const filtered = atwAllCities.filter(c => c.name.toLowerCase().includes(q));

    list.innerHTML = filtered.map(c => `
        <div class="dropdown-item" onclick="selectReportCountry('${c.name}', '${c.iso}')">
            <span class="atw-flag">${atwFlagImg(c.iso)}</span> ${c.name}
        </div>
    `).join('');
}

function selectReportCountry(name, iso) {
    document.getElementById('reportCountrySearch').value = name;
    document.getElementById('reportCountry').value = name;
    document.getElementById('countryDropdownList').style.display = 'none';
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    const list = document.getElementById('fileList');

    files.forEach(file => {
        if (reportAttachedFiles.length >= 5) {
            alert("Maximum 5 files allowed.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert(`${file.name} is too large. Max 10MB.`);
            return;
        }

        reportAttachedFiles.push(file);
        renderFileList();
    });
}

function renderFileList() {
    const list = document.getElementById('fileList');
    if (!list) return;

    list.innerHTML = reportAttachedFiles.map((file, i) => `
        <div class="file-item">
            <span>${file.name}</span>
            <span style="color:#ff4444;cursor:pointer" onclick="removeReportFile(${i})">×</span>
        </div>
    `).join('');
}

function removeReportFile(i) {
    reportAttachedFiles.splice(i, 1);
    renderFileList();
}

function setLocMode(mode) {
    const manBtn = document.getElementById('locManualBtn');
    const mapBtn = document.getElementById('locMapBtn');
    const manualWrap = document.getElementById('manualCoords');
    const mapWrap = document.getElementById('mapContainerWrap');

    if (mode === 'manual') {
        manBtn.classList.add('active');
        mapBtn.classList.remove('active');
        manualWrap.style.display = 'grid';
        mapWrap.style.display = 'none';
    } else {
        mapBtn.classList.add('active');
        manBtn.classList.remove('active');
        manualWrap.style.display = 'none';
        mapWrap.style.display = 'block';
        initReportMap();
    }
}

function initReportMap() {
    if (reportLocationMap) return;

    reportLocationMap = L.map('reportLocationMap', {attributionControl:false}).setView([5, 20], 3);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(reportLocationMap);

    reportLocationMap.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (reportMarker) {
            reportMarker.setLatLng(e.latlng);
        } else {
            reportMarker = L.marker(e.latlng).addTo(reportLocationMap);
        }
        document.getElementById('reportLat').value = lat.toFixed(6);
        document.getElementById('reportLng').value = lng.toFixed(6);
    });
}

function syncAttr(el, type) {
    if (type === 'user' && el.checked) {
        document.getElementById('attrAnonymous').checked = false;
    } else if (type === 'anon' && el.checked) {
        document.getElementById('attrDisplayUsername').checked = false;
    }
}

function generateReportId() {
    const year = new Date().getFullYear();
    const rand = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `AFR-${year}-${rand}`;
}

function getFormData() {
    const sources = [];
    document.querySelectorAll('.source-entry').forEach(entry => {
        sources.push({
            type: entry.querySelector('.source-type').value,
            url: entry.querySelector('.source-url').value,
            desc: entry.querySelector('.source-desc').value
        });
    });

    return {
        title: document.getElementById('reportTitle').value,
        category: document.getElementById('reportCategory').value,
        country: document.getElementById('reportCountry').value,
        state: document.getElementById('reportState').value,
        city: document.getElementById('reportCity').value,
        incidentDate: document.getElementById('reportDateTime').value,
        timeUnknown: document.getElementById('reportTimeUnknown').checked,
        summary: document.getElementById('reportSummary').value,
        confidence: document.querySelector('input[name="reportConfidence"]:checked')?.value || '',
        sources: sources,
        coordinates: {
            lat: parseFloat(document.getElementById('reportLat').value) || null,
            lng: parseFloat(document.getElementById('reportLng').value) || null
        },
        analystNotes: document.getElementById('reportAnalystNotes').value,
        anonymous: document.getElementById('attrAnonymous').checked,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
}

async function saveReportDraft(draftId = '') {
    const data = getFormData();
    if (!data.title) {
        alert("Please provide at least a title to save a draft.");
        return;
    }

    try {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        if (!user) throw new Error("Not authenticated");

        data.authorUid = user.uid;
        data.authorUsername = user.displayName || "Anonymous";

        if (draftId) {
            await db.collection('reportDrafts').doc(draftId).update(data);
        } else {
            data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('reportDrafts').add(data);
        }

        alert("Draft saved successfully.");
        loadReport();
    } catch (error) {
        console.error("Save draft error:", error);
        alert("Failed to save draft: " + error.message);
    }
}

async function submitReport(draftId = '') {
    const data = getFormData();

    // Validation
    if (!data.title || !data.category || !data.country || !data.incidentDate || !data.summary || !data.confidence || data.sources.length === 0) {
        alert("Please fill all required fields (*) and add at least one source.");
        return;
    }
    if (data.summary.length < 100) {
        alert("Summary must be at least 100 characters.");
        return;
    }

    const btn = document.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = "SUBMITTING...";

    try {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        if (!user) throw new Error("Not authenticated");

        // Handle file uploads first
        const evidenceUrls = await uploadEvidenceFiles();
        data.evidenceFiles = evidenceUrls;

        data.reportId = generateReportId();
        data.authorUid = user.uid;
        data.authorUsername = user.displayName || "Anonymous";
        data.status = "Pending Review";
        data.createdAt = firebase.firestore.FieldValue.serverTimestamp();

        await db.collection('reports').add(data);

        // If it was a draft, delete it
        if (draftId) {
            await db.collection('reportDrafts').doc(draftId).delete();
        }

        // Notification for submission
        await sendReportNotification(user.uid, `Report ${data.reportId} successfully submitted.`, data.reportId);

        alert(`Report successfully submitted.\nReference: ${data.reportId}`);
        loadReport();
    } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit report: " + error.message);
        btn.disabled = false;
        btn.textContent = "SUBMIT REPORT";
    }
}

function switchDashboardTab(tab, btn) {
    document.querySelectorAll('.reports-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const content = document.getElementById('dashboardContent');
    content.innerHTML = '<div style="text-align:center;color:#00ffee;padding:40px;font-family:Share Tech Mono,monospace">Loading...</div>';

    if (tab === 'my-reports') {
        fetchUserReports();
    } else {
        fetchUserDrafts();
    }
}

async function fetchUserReports() {
    const content = document.getElementById('dashboardContent');
    if (!content) return;

    try {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        if (!user) return;

        const snapshot = await db.collection('reports')
            .where('authorUid', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        if (snapshot.empty) {
            content.innerHTML = '<div style="text-align:center;color:#7fd6df;padding:40px">You have not submitted any reports yet.</div>';
            return;
        }

        let html = `
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        snapshot.forEach(doc => {
            const r = doc.data();
            const date = r.createdAt ? r.createdAt.toDate().toLocaleDateString() : 'N/A';
            const statusClass = `status-${r.status.toLowerCase().replace(' ', '-')}`;

            html += `
                <tr>
                    <td data-label="Report ID">${esc(r.reportId)}</td>
                    <td data-label="Title">${esc(r.title)}</td>
                    <td data-label="Status"><span class="status-badge ${statusClass}">${esc(r.status)}</span></td>
                    <td data-label="Submitted">${date}</td>
                    <td data-label="Actions">
                        <button class="atw-set-btn" onclick="viewReportDetails('${doc.id}', 'reports')">VIEW</button>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        content.innerHTML = html;
    } catch (error) {
        console.error("Fetch reports error:", error);
        content.innerHTML = `<div style="color:#ff4444;text-align:center;padding:20px">Error loading reports.</div>`;
    }
}

async function fetchUserDrafts() {
    const content = document.getElementById('dashboardContent');
    try {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        const snapshot = await db.collection('reportDrafts')
            .where('authorUid', '==', user.uid)
            .orderBy('updatedAt', 'desc')
            .get();

        if (snapshot.empty) {
            content.innerHTML = '<div style="text-align:center;color:#7fd6df;padding:40px">No drafts found.</div>';
            return;
        }

        let html = `
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        snapshot.forEach(doc => {
            const d = doc.data();
            const date = d.updatedAt ? d.updatedAt.toDate().toLocaleDateString() : 'N/A';
            html += `
                <tr>
                    <td data-label="Title">${esc(d.title)}</td>
                    <td data-label="Last Updated">${date}</td>
                    <td data-label="Actions">
                        <button class="atw-set-btn" onclick="renderReportForm('${doc.id}')">EDIT</button>
                        <button class="atw-set-btn" style="border-color:#ff444444;color:#ff4444" onclick="deleteDraft('${doc.id}')">DELETE</button>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        content.innerHTML = html;
    } catch (error) {
        console.error("Fetch drafts error:", error);
        content.innerHTML = `<div style="color:#ff4444;text-align:center;padding:20px">Error loading drafts.</div>`;
    }
}

async function deleteDraft(id) {
    if (!confirm("Are you sure you want to delete this draft?")) return;
    try {
        await firebase.firestore().collection('reportDrafts').doc(id).delete();
        fetchUserDrafts();
    } catch (e) { alert("Delete failed"); }
}

async function loadDraftData(id) {
    try {
        const doc = await firebase.firestore().collection('reportDrafts').doc(id).get();
        const d = doc.data();
        if (!d) return;

        document.getElementById('reportTitle').value = d.title || '';
        document.getElementById('reportCategory').value = d.category || '';
        document.getElementById('reportCountry').value = d.country || '';
        document.getElementById('reportCountrySearch').value = d.country || '';
        document.getElementById('reportState').value = d.state || '';
        document.getElementById('reportCity').value = d.city || '';
        document.getElementById('reportDateTime').value = d.incidentDate || '';
        document.getElementById('reportTimeUnknown').checked = d.timeUnknown || false;
        document.getElementById('reportSummary').value = d.summary || '';
        document.getElementById('reportAnalystNotes').value = d.analystNotes || '';
        document.getElementById('attrAnonymous').checked = d.anonymous || false;
        document.getElementById('attrDisplayUsername').checked = !d.anonymous;

        if (d.confidence) {
            const radio = document.querySelector(`input[name="reportConfidence"][value="${d.confidence}"]`);
            if (radio) radio.checked = true;
        }

        if (d.coordinates && d.coordinates.lat) {
            document.getElementById('reportLat').value = d.coordinates.lat;
            document.getElementById('reportLng').value = d.coordinates.lng;
        }

        const sourcesContainer = document.getElementById('sourcesContainer');
        sourcesContainer.innerHTML = '';
        if (d.sources && d.sources.length) {
            d.sources.forEach(s => addSourceEntry(s));
        } else {
            addSourceEntry();
        }

        if (d.evidenceFiles && d.evidenceFiles.length) {
            reportAttachedFiles = d.evidenceFiles;
            renderFileList();
        }

        // Trigger char count update
        document.getElementById('reportSummary').dispatchEvent(new Event('input'));
    } catch (e) { console.error("Load draft error", e); }
}

function loadModeration() {
    active('reportBtn');
    const menu = `
        <button class='command-btn' onclick='loadReport()'>⬅ BACK TO MY REPORTS</button><br><br>
        <button class='command-btn active'>ADMIN MODERATION</button>
    `;

    const content = `
        <div id="reportViewport" class="report-container">
            <h2 style='text-align:center;color:#ff4444;font-family:Share Tech Mono,monospace;letter-spacing:4px;padding:20px 0;margin:0;text-shadow:0 0 12px #ff444488'>REPORT MODERATION</h2>
            <div class="reports-dashboard">
                <div id="moderationContent">
                    <div style="text-align:center;color:#00ffee;padding:40px;font-family:Share Tech Mono,monospace">Loading reports for review...</div>
                </div>
            </div>
        </div>
    `;

    renderOps(menu, content);
    fetchAllReports();
}

async function fetchAllReports() {
    const content = document.getElementById('moderationContent');
    try {
        const snapshot = await firebase.firestore().collection('reports').orderBy('createdAt', 'desc').get();
        if (snapshot.empty) {
            content.innerHTML = '<div style="text-align:center;color:#7fd6df;padding:40px">No reports found in the system.</div>';
            return;
        }

        let html = `
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        snapshot.forEach(doc => {
            const r = doc.data();
            const statusClass = `status-${r.status.toLowerCase().replace(' ', '-')}`;
            html += `
                <tr>
                    <td>${esc(r.reportId)}</td>
                    <td>${esc(r.title)}</td>
                    <td>${esc(r.authorUsername)}</td>
                    <td><span class="status-badge ${statusClass}">${esc(r.status)}</span></td>
                    <td>
                        <button class="atw-set-btn" onclick="viewReportDetails('${doc.id}', 'admin')">REVIEW</button>
                    </td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        content.innerHTML = html;
    } catch (e) { content.innerHTML = "Error loading reports"; }
}

async function viewReportDetails(docId, context) {
    const viewport = document.getElementById('reportViewport');
    try {
        const doc = await firebase.firestore().collection('reports').doc(docId).get();
        const r = doc.data();

        const date = r.createdAt ? r.createdAt.toDate().toLocaleString() : 'N/A';
        const incidentDate = new Date(r.incidentDate).toLocaleString();

        let evidenceHtml = r.evidenceFiles?.length ?
            r.evidenceFiles.map(url => `<a href="${url}" target="_blank" style="display:block;color:var(--cyan);margin-top:5px;text-decoration:underline">${url.split('/').pop().split('?')[0]}</a>`).join('')
            : 'None';

        let adminActions = '';
        if (context === 'admin') {
            adminActions = `
                <div style="border-top:1px solid #ff444444;margin-top:20px;padding-top:20px">
                    <h3 style="color:#ff4444;font-family:Share Tech Mono;margin-bottom:10px">ADMIN ACTIONS</h3>
                    <div style="display:flex;gap:10px;flex-wrap:wrap">
                        <select id="updateStatus" class="report-select" style="width:200px">
                            <option value="Pending Review" ${r.status==='Pending Review'?'selected':''}>Pending Review</option>
                            <option value="Verified" ${r.status==='Verified'?'selected':''}>Verified</option>
                            <option value="Published" ${r.status==='Published'?'selected':''}>Published</option>
                            <option value="Archived" ${r.status==='Archived'?'selected':''}>Archived</option>
                            <option value="Rejected" ${r.status==='Rejected'?'selected':''}>Rejected</option>
                        </select>
                        <button class="btn-submit" style="background:#ff4444;color:#fff;padding:8px 20px" onclick="updateReportStatus('${docId}')">UPDATE STATUS</button>
                        <button class="btn-cancel" style="border-color:#ff4444;color:#ff4444" onclick="deleteReport('${docId}')">DELETE REPORT</button>
                    </div>
                </div>
            `;
        }

        viewport.innerHTML = `
            <button class="atw-small-button" onclick="${context === 'admin' ? 'loadModeration()' : 'loadReport()'}" style="margin-bottom:20px">⬅ BACK</button>
            <div class="report-form">
                <div style="display:flex;justify-content:space-between;border-bottom:1px solid #00ffee22;padding-bottom:10px;margin-bottom:15px">
                    <h2 style="color:var(--cyan);font-family:Share Tech Mono;margin:0">${esc(r.reportId)}</h2>
                    <span class="status-badge status-${r.status.toLowerCase().replace(' ', '-')}">${esc(r.status)}</span>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;font-size:14px">
                    <div><span style="color:#7fd6df">Title:</span> <span style="color:#fff">${esc(r.title)}</span></div>
                    <div><span style="color:#7fd6df">Category:</span> <span style="color:#fff">${esc(r.category)}</span></div>
                    <div><span style="color:#7fd6df">Country:</span> <span style="color:#fff">${esc(r.country)}</span></div>
                    <div><span style="color:#7fd6df">Incident Date:</span> <span style="color:#fff">${incidentDate} ${r.timeUnknown?'(Approx)':''}</span></div>
                    <div><span style="color:#7fd6df">Confidence:</span> <span style="color:#ffaa00">${esc(r.confidence)}</span></div>
                    <div><span style="color:#7fd6df">Author:</span> <span style="color:#fff">${r.anonymous && context !== 'admin' ? 'Anonymous' : esc(r.authorUsername)}</span></div>
                </div>

                <div style="margin-top:15px">
                    <div style="color:#7fd6df;margin-bottom:5px">Summary:</div>
                    <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:6px;line-height:1.6;color:#d7ffff;white-space:pre-wrap">${esc(r.summary)}</div>
                </div>

                <div style="margin-top:15px">
                    <div style="color:#7fd6df;margin-bottom:5px">Sources:</div>
                    <div style="display:flex;flex-direction:column;gap:8px">
                        ${r.sources.map(s => `
                            <div style="background:rgba(0,255,238,0.05);padding:10px;border-radius:4px;border-left:2px solid var(--cyan)">
                                <div style="font-size:12px;color:var(--cyan)">${esc(s.type)}</div>
                                <div style="font-size:14px">${esc(s.desc)}</div>
                                ${s.url ? `<a href="${safeHref(s.url)}" target="_blank" style="font-size:12px;color:#7fd6df;text-decoration:underline">${esc(s.url)}</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top:15px">
                    <div style="color:#7fd6df;margin-bottom:5px">Evidence:</div>
                    <div>${evidenceHtml}</div>
                </div>

                ${r.coordinates.lat ? `
                <div style="margin-top:15px">
                    <div style="color:#7fd6df;margin-bottom:5px">Location:</div>
                    <div style="font-size:14px">${r.coordinates.lat}, ${r.coordinates.lng}</div>
                    <a href="https://www.google.com/maps/search/?q=${r.coordinates.lat},${r.coordinates.lng}" target="_blank" style="color:var(--cyan);font-size:12px">View on Google Maps</a>
                </div>
                ` : ''}

                ${r.analystNotes ? `
                <div style="margin-top:15px">
                    <div style="color:#7fd6df;margin-bottom:5px">Analyst Notes:</div>
                    <div style="font-style:italic;font-size:14px;color:#8899aa">${esc(r.analystNotes)}</div>
                </div>
                ` : ''}

                ${adminActions}
            </div>
        `;
    } catch (e) { alert("Error loading details"); }
}

async function updateReportStatus(docId) {
    const newStatus = document.getElementById('updateStatus').value;
    try {
        const db = firebase.firestore();
        const doc = await db.collection('reports').doc(docId).get();
        const r = doc.data();

        await db.collection('reports').doc(docId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Notify user of status change
        if (r && r.authorUid) {
            await sendReportNotification(r.authorUid, `Your report ${r.reportId} status updated to: ${newStatus}`, r.reportId);
        }

        alert("Status updated");
        loadModeration();
    } catch (e) { alert("Update failed"); }
}

async function deleteReport(docId) {
    if (!confirm("DANGER: Are you sure you want to permanently delete this report?")) return;
    try {
        await firebase.firestore().collection('reports').doc(docId).delete();
        alert("Report deleted");
        loadModeration();
    } catch (e) { alert("Delete failed"); }
}
async function uploadEvidenceFiles() {
    if (reportAttachedFiles.length === 0) return [];

    const storage = firebase.storage();
    const urls = [];

    const uploadPromises = reportAttachedFiles.map(async (file) => {
        // Handle both new File objects and existing URL strings (from drafts)
        if (typeof file === 'string') {
            urls.push(file);
            return;
        }

        const timestamp = Date.now();
        const sanitizedName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const storageRef = storage.ref(`evidence/${timestamp}_${sanitizedName}`);

        const snapshot = await storageRef.put(file);
        const url = await snapshot.ref.getDownloadURL();
        urls.push(url);
    });

    await Promise.all(uploadPromises);
    return urls;
}

/**
 * Notifications Helper
 */
async function sendReportNotification(uid, message, reportId) {
    try {
        await firebase.firestore().collection('notifications').add({
            uid: uid,
            message: message,
            reportId: reportId,
            read: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) { console.warn("Failed to send notification", e); }
}

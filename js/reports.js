/**
 * AfroSINT Intelligence Report Logic
 * Handles submission, drafts, and file uploads to Firebase
 */

const reportsDB = firebase.firestore().collection('reports');
const storageRef = firebase.storage().ref();

let selectedFiles = [];
let currentUser = null;

// Initialize submission page
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            checkSubmissionAccess(user);
        } else {
            window.location.href = 'login/login.html';
        }
    });

    setupFormListeners();
});

async function checkSubmissionAccess(user) {
    try {
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';
        const docId = currentNetworkId === 'afrosint-main' ? user.uid : `${user.uid}_${currentNetworkId}`;
        const userDoc = await firebase.firestore().collection('users').doc(docId).get();
        const userData = userDoc.data();

        if (!userData || (!canSubmitReports(userData.rank) && !canSubmitReports(userData.role))) {
            console.warn("[Auth] Access denied for user:", user.uid, "Rank:", userData?.rank, "Role:", userData?.role);
            alert("ACCESS DENIED: Insufficient clearance for report submission.");
            window.location.href = 'index.html';
        } else {
            console.log("[Auth] Access granted for report submission.");
        }
    } catch (error) {
        console.error("Auth check error:", error);
    }
}

function setupFormListeners() {
    const form = document.getElementById('reportForm');
    const fileInput = document.getElementById('reportAttachments');
    const draftBtn = document.getElementById('draftBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            selectedFiles = [...selectedFiles, ...Array.from(e.target.files)];
            updateFileList();
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleSubmit('Pending');
        });
    }

    if (draftBtn) {
        draftBtn.addEventListener('click', async () => {
            await handleSubmit('Draft');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm("Discard unsaved changes?")) {
                window.location.href = 'index.html';
            }
        });
    }
}

function updateFileList() {
    const list = document.getElementById('fileList');
    if (!list) return;

    list.innerHTML = selectedFiles.map((file, index) => `
        <div class="file-item">
            <span>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button type="button" onclick="removeFile(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;">×</button>
        </div>
    `).join('');
}

window.removeFile = (index) => {
    selectedFiles.splice(index, 1);
    updateFileList();
};

async function handleSubmit(status) {
    console.log(`[ReportSubmit] Starting handleSubmit with status: ${status}`);
    const submitBtn = document.getElementById('submitBtn');
    const draftBtn = document.getElementById('draftBtn');

    // Simple validation
    const title = document.getElementById('reportTitle').value;
    const category = document.getElementById('reportCategory').value;
    const country = document.getElementById('reportCountry').value;
    const description = document.getElementById('reportDescription').value;

    console.log("[ReportSubmit] Form data:", { title, category, country, descriptionLength: description.length });

    if (status === 'Pending' && (!title || !category || !country || !description)) {
        console.warn("[ReportSubmit] Validation failed: missing required fields");
        alert("Please fill in all required fields.");
        return;
    }

    try {
        console.log("[ReportSubmit] Setting loading state to true");
        setLoading(true);

        const referenceNumber = generateRefNumber();
        console.log(`[ReportSubmit] Generated reference number: ${referenceNumber}`);

        console.log("[ReportSubmit] Starting file uploads...");
        const attachments = await uploadFiles(referenceNumber);
        console.log(`[ReportSubmit] File uploads complete. Count: ${attachments.length}`);

        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';
        const reportData = {
            networkId: currentNetworkId,
            referenceNumber: referenceNumber,
            title: title,
            category: category,
            country: country,
            state: document.getElementById('reportState').value,
            city: document.getElementById('reportCity').value,
            coordinates: document.getElementById('reportCoordinates').value,
            incidentDate: document.getElementById('reportDate').value,
            incidentTime: document.getElementById('reportTime').value,
            description: description,
            threatLevel: document.getElementById('reportThreatLevel').value,
            sourceReliability: document.getElementById('reportSourceReliability').value,
            informationCredibility: document.getElementById('reportInformationCredibility').value,
            anonymous: document.getElementById('reportAnonymous').checked,
            urgent: document.getElementById('reportUrgent').checked,
            attachments: attachments,
            createdBy: currentUser.uid,
            createdByName: document.getElementById('reportAnonymous').checked ? 'Anonymous' : (currentUser.displayName || currentUser.email),
            createdAt: (firebase.firestore.FieldValue && firebase.firestore.FieldValue.serverTimestamp()) || new Date(),
            status: status,
            analystAssigned: "",
            analystNotes: "",
            verified: false
        };

        console.log("[ReportSubmit] Adding report to Firestore:", reportData);
        const docRef = await reportsDB.add(reportData);
        console.log(`[ReportSubmit] Report added successfully. Document ID: ${docRef.id}`);

        if (status === 'Pending') {
            console.log("[ReportSubmit] Showing success message");
            showSuccess(referenceNumber);
        } else {
            console.log("[ReportSubmit] Draft saved, redirecting to index");
            alert("Draft saved successfully.");
            window.location.href = 'index.html';
        }

    } catch (error) {
        console.error("[ReportSubmit] CRITICAL ERROR during submission:", error);
        alert("Submission failed: " + error.message);
    } finally {
        console.log("[ReportSubmit] Finalizing submission. Setting loading state to false.");
        setLoading(false);
    }
}

async function uploadFiles(ref) {
    console.log(`[FileUpload] Starting upload for ref: ${ref}. Files to upload: ${selectedFiles.length}`);
    const urls = [];
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressArea = document.getElementById('uploadProgress');
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    if (selectedFiles.length === 0) {
        console.log("[FileUpload] No files selected for upload.");
        return urls;
    }

    // Pre-validate file sizes
    for (const file of selectedFiles) {
        if (file.size > MAX_FILE_SIZE) {
            console.error(`[FileUpload] File too large: ${file.name} (${file.size} bytes)`);
            throw new Error(`File "${file.name}" exceeds the 10MB limit.`);
        }
    }

    if (progressArea) {
        console.log("[FileUpload] Displaying progress area");
        progressArea.style.display = 'block';
    }

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const path = `reports/${ref}/${Date.now()}_${file.name}`;
        console.log(`[FileUpload] Uploading file ${i+1}/${selectedFiles.length}: ${file.name} to path: ${path}`);

        const uploadTask = storageRef.child(path).put(file);

        await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    const overallProgress = ((i / selectedFiles.length) * 100) + (progress / selectedFiles.length);
                    if (progressBar) progressBar.style.width = overallProgress + '%';
                    if (progressText) progressText.textContent = `UPLOADING EVIDENCE: ${Math.round(overallProgress)}%`;
                    console.log(`[FileUpload] Progress for ${file.name}: ${Math.round(progress)}%`);
                },
                (error) => {
                    console.error(`[FileUpload] Error uploading ${file.name}:`, error);
                    reject(error);
                },
                async () => {
                    console.log(`[FileUpload] Upload complete for ${file.name}. Fetching download URL...`);
                    try {
                        const url = await uploadTask.snapshot.ref.getDownloadURL();
                        console.log(`[FileUpload] Got URL for ${file.name}: ${url}`);
                        urls.push({
                            name: file.name,
                            url: url,
                            type: file.type,
                            size: file.size
                        });
                        resolve();
                    } catch (urlError) {
                        console.error(`[FileUpload] Error getting download URL for ${file.name}:`, urlError);
                        reject(urlError);
                    }
                }
            );
        });
    }

    console.log(`[FileUpload] All files uploaded successfully. Total: ${urls.length}`);
    return urls;
}

function generateRefNumber() {
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `AFR-${rand}`;
}

function setLoading(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    const draftBtn = document.getElementById('draftBtn');
    if (!submitBtn || !draftBtn) return;

    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.textContent = "PROCESSING...";
        draftBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = "SUBMIT REPORT";
        draftBtn.disabled = false;
    }
}

function showSuccess(ref) {
    document.getElementById('reportForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('refNumberDisplay').textContent = ref;
}

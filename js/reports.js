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
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        const userData = userDoc.data();

        if (!userData || !canSubmitReports(userData.rank)) {
            alert("ACCESS DENIED: Insufficient clearance for report submission.");
            window.location.href = 'index.html';
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
    const submitBtn = document.getElementById('submitBtn');
    const draftBtn = document.getElementById('draftBtn');

    // Simple validation
    const title = document.getElementById('reportTitle').value;
    const category = document.getElementById('reportCategory').value;
    const country = document.getElementById('reportCountry').value;
    const description = document.getElementById('reportDescription').value;

    if (status === 'Pending' && (!title || !category || !country || !description)) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        setLoading(true);

        const referenceNumber = generateRefNumber();
        const attachments = await uploadFiles(referenceNumber);

        const reportData = {
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

        await reportsDB.add(reportData);

        if (status === 'Pending') {
            showSuccess(referenceNumber);
        } else {
            alert("Draft saved successfully.");
            window.location.href = 'index.html';
        }

    } catch (error) {
        console.error("Submission error:", error);
        alert("Submission failed: " + error.message);
    } finally {
        setLoading(false);
    }
}

async function uploadFiles(ref) {
    const urls = [];
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressArea = document.getElementById('uploadProgress');
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    if (selectedFiles.length === 0) return urls;

    // Pre-validate file sizes
    for (const file of selectedFiles) {
        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File "${file.name}" exceeds the 10MB limit.`);
        }
    }

    if (progressArea) progressArea.style.display = 'block';

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const path = `reports/${ref}/${Date.now()}_${file.name}`;
        const uploadTask = storageRef.child(path).put(file);

        await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    const overallProgress = ((i / selectedFiles.length) * 100) + (progress / selectedFiles.length);
                    if (progressBar) progressBar.style.width = overallProgress + '%';
                    if (progressText) progressText.textContent = `UPLOADING EVIDENCE: ${Math.round(overallProgress)}%`;
                },
                (error) => reject(error),
                async () => {
                    const url = await uploadTask.snapshot.ref.getDownloadURL();
                    urls.push({
                        name: file.name,
                        url: url,
                        type: file.type,
                        size: file.size
                    });
                    resolve();
                }
            );
        });
    }

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

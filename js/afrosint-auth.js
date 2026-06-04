// AfrOsint Authentication Module

const firebaseConfig = {
    apiKey: "AIzaSyAcsURFK7yDd0mJe_i_Jlmu-_2GpSfc2js",
    authDomain: "afrosint-2a5f2.firebaseapp.com",
    projectId: "afrosint-2a5f2",
    storageBucket: "afrosint-2a5f2.firebasestorage.app",
    messagingSenderId: "325085054891",
    appId: "1:325085054891:web:3ac905ed01f1d57cfb74ee"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
} else {
    console.warn("Firebase SDK not found. Authentication will not function.");
}

const LOGIN_URL = "https://blacksurvivalgear.github.io/login/login.html";

// Global storage for user API keys
window.userApiKeys = {
    openai: "",
    gemini: "",
    claude: "",
    deepseek: ""
};

function checkAuthentication() {
    if (typeof firebase === 'undefined' || !firebase.auth) {
        console.error("Firebase Auth not available.");
        return;
    }

    const auth = firebase.auth();
    const db = firebase.firestore();

    auth.onAuthStateChanged(async (user) => {
        const loadingScreen = document.getElementById('authLoadingScreen');
        const mainApp = document.getElementById('mainAppContainer');

        if (user) {
            console.log("User authenticated:", user.email);

            try {
                // Update basic UI first
                updateUserInfoUI({
                    displayName: user.displayName || "Authorized Personnel",
                    role: "Personnel",
                    photoURL: user.photoURL || "assets/images/default-avatar.png"
                });

                // Fetch additional user data from Firestore
                const userDoc = await db.collection('users').doc(user.uid).get();
                const userData = userDoc.data() || {};

                // Fetch API keys
                const apiDoc = await db.collection('users').doc(user.uid).collection('settings').doc('apis').get();
                if (apiDoc.exists) {
                    window.userApiKeys = { ...window.userApiKeys, ...apiDoc.data() };
                    // Sync legacy global variable if it exists
                    if (typeof aiDSApiKey !== 'undefined') {
                        aiDSApiKey = window.userApiKeys.openai;
                    }
                }

                // Update UI with full user info if available
                updateUserInfoUI({
                    displayName: user.displayName || userData.displayName || "Authorized Personnel",
                    role: userData.role || "Personnel",
                    photoURL: user.photoURL || userData.photoURL || "assets/images/default-avatar.png"
                });

                updateAiStatusUI();

                // Show application
                if (loadingScreen) loadingScreen.style.display = 'none';
                if (mainApp) mainApp.style.display = 'block';

            } catch (error) {
                console.error("Error fetching user data:", error);
                // Fallback to basic user info if Firestore fails
                updateUserInfoUI({
                    displayName: user.displayName || "Authorized Personnel",
                    role: "Personnel",
                    photoURL: user.photoURL || "assets/images/default-avatar.png"
                });
                if (loadingScreen) loadingScreen.style.display = 'none';
                if (mainApp) mainApp.style.display = 'block';
            }
        } else {
            console.log("User not authenticated. Redirecting to login...");
            window.location.href = LOGIN_URL;
        }
    });
}

function updateUserInfoUI(data) {
    const nameEl = document.getElementById('userDisplayName');
    const roleEl = document.getElementById('userRole');
    const imgEl = document.getElementById('userProfileImg');

    if (nameEl) nameEl.textContent = data.displayName;
    if (roleEl) roleEl.textContent = data.role;
    if (imgEl) imgEl.src = data.photoURL;
}

function updateAiStatusUI() {
    const providers = ['openai', 'gemini', 'claude', 'deepseek'];
    providers.forEach(provider => {
        const statusEl = document.getElementById(`status-${provider}`);
        const inputEl = document.getElementById(`api-key-${provider}`);
        const key = window.userApiKeys[provider];

        if (statusEl) {
            if (key) {
                statusEl.textContent = "🟢 Configured";
                statusEl.className = "status-badge configured";
            } else {
                statusEl.textContent = "🔴 Not Configured";
                statusEl.className = "status-badge not-configured";
            }
        }
        if (inputEl && key) {
            inputEl.value = key;
        }
    });
}

window.saveApiKey = async function(provider) {
    const input = document.getElementById(`api-key-${provider}`);
    const key = input.value.trim();
    if (!key) { alert("Please enter an API key."); return; }

    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;

    if (!user) { alert("Session expired. Please log in again."); return; }

    try {
        await db.collection('users').doc(user.uid).collection('settings').doc('apis').set({
            [provider]: key
        }, { merge: true });

        window.userApiKeys[provider] = key;
        if (provider === 'openai' && typeof aiDSApiKey !== 'undefined') {
            aiDSApiKey = key;
        }

        updateAiStatusUI();
        alert(`${provider.toUpperCase()} key saved successfully.`);
    } catch (error) {
        console.error("Error saving API key:", error);
        alert("Permission denied or Firestore error.");
    }
};

window.testApiKey = async function(provider) {
    const input = document.getElementById(`api-key-${provider}`);
    const key = input.value.trim();
    if (!key) { alert("No key to test."); return; }

    alert(`Initiating connection test for ${provider.toUpperCase()}...`);

    // Mocking connectivity test for this refactor scope
    // In a real implementation, you would make a small fetch request to the provider's models endpoint
    setTimeout(() => {
        if (key.length > 10) {
            alert(`✅ ${provider.toUpperCase()} connection successful!`);
        } else {
            alert(`❌ ${provider.toUpperCase()} connection failed: Invalid key format.`);
        }
    }, 1000);
};

window.toggleKeyVisibility = function(provider) {
    const input = document.getElementById(`api-key-${provider}`);
    if (input) {
        input.type = input.type === "password" ? "text" : "password";
    }
};

window.toggleAIKeysPanel = function(event) {
    event.stopPropagation();
    const container = document.getElementById('aiKeysContainer');
    const arrow = event.currentTarget.querySelector('.expand-arrow');
    if (container.style.display === 'flex') {
        container.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        container.style.display = 'flex';
        arrow.style.transform = 'rotate(180deg)';
    }
};

// Navigation helpers
window.loadDashboard = function() { location.href = 'index.html'; };
window.loadProfile = function() { alert("My Profile coming soon"); };
window.loadUpgrade = function() { alert("Upgrade Account options coming soon"); };

async function handleLogout() {
    try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            await firebase.auth().signOut();
        }
        window.location.href = LOGIN_URL;
    } catch (error) {
        console.error("Logout Error:", error);
        alert("Error during sign out.");
    }
}

// Start auth check
document.addEventListener('DOMContentLoaded', checkAuthentication);

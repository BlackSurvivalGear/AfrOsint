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

                // Update UI with full user info if available
                updateUserInfoUI({
                    displayName: user.displayName || userData.displayName || "Authorized Personnel",
                    role: userData.role || "Personnel",
                    photoURL: user.photoURL || userData.photoURL || "assets/images/default-avatar.png"
                });

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

// AfrOsint Authentication Module

const firebaseConfig = {
    apiKey: "AIzaSyAcsURFK7yDd0mJe_i_Jlmu-_2GpSfc2js",
    authDomain: "afrosint-2a5f2.firebaseapp.com",
    projectId: "afrosint-2a5f2",
    storageBucket: "afrosint-2a5f2.firebasestorage.app",
    messagingSenderId: "325085054891",
    appId: "1:325085054891:web:3ac905ed01f1d57cfb74ee"
};

const AFR_RANKS = ["User", "Moderator", "Administrator", "Super Admin"];

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
} else {
    console.warn("Firebase SDK not found. Authentication will not function.");
}

const LOGIN_URL = "login/login.html";

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
                    role: "User",
                    photoURL: user.photoURL || "assets/images/default-avatar.png"
                });

                // Fetch additional user data from Firestore
                const userDoc = await db.collection('users').doc(user.uid).get();
                const userData = userDoc.data() || {};

                // Check for suspension
                if (userData.suspended) {
                    alert("Your account has been suspended. Contact an administrator.");
                    await auth.signOut();
                    window.location.href = LOGIN_URL;
                    return;
                }

                // Update UI with full user info if available
                const userRole = userData.role || "User";
                updateUserInfoUI({
                    displayName: user.displayName || userData.displayName || "Authorized Personnel",
                    role: userRole,
                    photoURL: user.photoURL || userData.photoURL || "assets/images/default-avatar.png"
                });

                // Promotion/Personnel Access Control
                const rankIndex = AFR_RANKS.indexOf(userRole);
                const personnelBtn = document.getElementById('personnelBtn');
                const adminBtn = document.getElementById('adminBtn');

                // Administrator (index 2) and above can promote/demote/suspend
                const isAdminPlus = rankIndex >= 2;

                if (personnelBtn) {
                    personnelBtn.style.display = isAdminPlus ? 'block' : 'none';
                }
                if (adminBtn) {
                    adminBtn.style.display = isAdminPlus ? 'block' : 'none';
                }

                // Show application
                if (loadingScreen) loadingScreen.style.display = 'none';
                if (mainApp) mainApp.style.display = 'block';

            } catch (error) {
                console.error("Error fetching user data:", error);
                // Fallback to basic user info if Firestore fails
                updateUserInfoUI({
                    displayName: user.displayName || "Authorized Personnel",
                    role: "User",
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

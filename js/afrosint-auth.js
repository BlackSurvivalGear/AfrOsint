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
                // Check cache first
                let userData = null;
                const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}`);
                if (cachedData) {
                    userData = JSON.parse(cachedData);
                } else {
                    // Fetch additional user data from Firestore
                    const userDoc = await db.collection('users').doc(user.uid).get();

                    if (!userDoc.exists) {
                        // Self-healing: create missing user document (e.g. for first-time Google login via map)
                        userData = {
                            uid: user.uid,
                            displayName: user.displayName || "Personnel",
                            email: user.email,
                            photoURL: user.photoURL || "assets/images/default-avatar.png",
                            role: "user",
                            rank: "member",
                            clearance: 1,
                            plan: "free",
                            isOnline: true,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                        };
                        await db.collection('users').doc(user.uid).set(userData);
                    } else {
                        userData = userDoc.data();
                    }

                    if (userData) {
                        sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(userData));
                    }
                }

                if (!userData) userData = {};

                // Check for suspension
                if (userData.suspended || userData.disabled) {
                    alert("Your account has been suspended. Contact an administrator.");
                    await auth.signOut();
                    window.location.href = LOGIN_URL;
                    return;
                }

                // Update UI with full user info
                updateUserInfoUI({
                    displayName: userData.displayName || user.displayName || "Authorized Personnel",
                    role: userData.role || "User",
                    rank: userData.rank || "member",
                    photoURL: userData.photoURL || user.photoURL || "assets/images/default-avatar.png"
                });

                // Show application
                if (loadingScreen) loadingScreen.style.display = 'none';
                if (mainApp) mainApp.style.display = 'block';

            } catch (error) {
                console.error("Error fetching user data:", error);
                // Fallback to basic user info if Firestore fails
                updateUserInfoUI({
                    displayName: user.displayName || "Authorized Personnel",
                    role: "User",
                    rank: "member",
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
    const profileContainer = document.getElementById('userProfile');

    if (nameEl) nameEl.textContent = data.displayName;
    if (roleEl) {
        // Use getRankName if available (from permissions or common utilities)
        roleEl.textContent = (typeof getRankName === 'function') ? getRankName(data.rank) : data.role;
    }
    if (imgEl) imgEl.src = data.photoURL;

}

async function handleLogout() {
    try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            const user = firebase.auth().currentUser;
            if (user) {
                await firebase.firestore().collection('users').doc(user.uid).update({
                    isOnline: false,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(err => console.warn("Firestore logout update failed:", err));
            }
        }
    } catch (error) {
        console.error("Logout Firestore Error:", error);
    } finally {
        sessionStorage.removeItem('afrosint_session_started');
        try {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                await firebase.auth().signOut();
            }
        } catch (authErr) {
            console.error("Firebase SignOut Error:", authErr);
        }
        window.location.href = LOGIN_URL;
    }
}

// Start auth check
document.addEventListener('DOMContentLoaded', checkAuthentication);

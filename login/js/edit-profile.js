/**
 * Edit Profile Logic
 */

checkAuthState(true); // Protected page

const DEFAULT_AVATAR = "../assets/images/default-avatar.png";

// Helper to convert ISO code to emoji flag
function getEmojiFlag(iso) {
    if (!iso) return "";
    return iso.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

function populateNations() {
    const nationSelect = document.getElementById('editNation');
    if (!nationSelect || typeof atwAllCities === 'undefined') return;

    atwAllCities.forEach(nation => {
        const option = document.createElement('option');
        option.value = nation.name;
        option.dataset.iso = nation.iso;
        option.textContent = `${getEmojiFlag(nation.iso)} ${nation.name}`;
        nationSelect.appendChild(option);
    });
}

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        populateNations();

        // Check cache first for immediate UI rendering
        const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}`);
        let userData = cachedData ? JSON.parse(cachedData) : null;

        if (!userData) {
            const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
            userData = userDoc.data();
            if (userData) {
                sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(userData));
            }
        }

        if (userData) {
            document.getElementById('editDisplayName').value = userData.displayName || "";
            document.getElementById('editPhotoURL').value = userData.photoURL === DEFAULT_AVATAR ? "" : (userData.photoURL || "");

            if (userData.appearance && userData.appearance.nation) {
                document.getElementById('editNation').value = userData.appearance.nation;
            }
        }
    }
});

async function saveProfileChanges(event) {
    event.preventDefault();

    const user = firebase.auth().currentUser;
    if (!user) return;

    const displayName = document.getElementById('editDisplayName').value.trim();
    const photoURL = document.getElementById('editPhotoURL').value.trim() || DEFAULT_AVATAR;
    const nationSelect = document.getElementById('editNation');
    const nationName = nationSelect.value;
    const nationIso = nationSelect.options[nationSelect.selectedIndex].dataset.iso;
    const flag = getEmojiFlag(nationIso);

    const saveBtn = document.getElementById('saveProfileBtn');
    const statusEl = document.getElementById('saveStatus');

    saveBtn.disabled = true;
    saveBtn.classList.add('opacity-50');
    statusEl.classList.remove('hidden');

    try {
        const updates = {
            displayName: displayName,
            photoURL: photoURL,
            appearance: {
                nation: nationName,
                iso: nationIso,
                flag: flag
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Update Firestore
        await firebase.firestore().collection('users').doc(user.uid).update(updates);

        // Update Local User Profile (Firebase Auth)
        await user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        });

        // Fetch updated data to refresh sessionStorage
        const updatedDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        const updatedData = updatedDoc.data();
        sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(updatedData));

        statusEl.textContent = "SUCCESS: Profile records updated.";
        statusEl.classList.replace('text-[#00E5FF]', 'text-green-500');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);

    } catch (error) {
        console.error("Save Error:", error);
        saveBtn.disabled = false;
        saveBtn.classList.remove('opacity-50');
        statusEl.textContent = "ERROR: Connection failed. " + error.message;
        statusEl.classList.replace('text-[#00E5FF]', 'text-red-500');
    }
}

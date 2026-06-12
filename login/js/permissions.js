/**
 * AfroSINT Central Permission Service
 */

const ROLES = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};

const RANKS = {
    MEMBER: 'member',
    ANALYST: 'analyst',
    SENIOR_ANALYST: 'senior_analyst',
    RESEARCH_SPECIALIST: 'research_specialist',
    FIELD_OBSERVER: 'field_observer',
    INTELLIGENCE_OFFICER: 'intelligence_officer',
    SENIOR_INTELLIGENCE_OFFICER: 'senior_intelligence_officer',
    AFROSINT_FELLOW: 'afrosint_fellow'
};

const PLANS = {
    FREE: 'free',
    PRO: 'pro',
    ELITE: 'elite'
};

/**
 * Check if a role is included in allowed roles
 * @param {string} role
 * @param {string[]} allowedRoles
 * @returns {boolean}
 */
function hasRole(role, allowedRoles) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return allowedRoles.includes(normalizedRole);
}

/**
 * Check if user has administrative privileges
 * @param {string} role
 * @returns {boolean}
 */
function isAdmin(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return [ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(normalizedRole);
}

/**
 * Check if user has moderation privileges
 * @param {string} role
 * @returns {boolean}
 */
function isModerator(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return [ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(normalizedRole);
}

/**
 * Check if user is a super admin
 * @param {string} role
 * @returns {boolean}
 */
function isSuperAdmin(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return normalizedRole === ROLES.SUPER_ADMIN;
}

// Global exposure
window.AfroSINT = window.AfroSINT || {};
window.AfroSINT.Permissions = {
    ROLES,
    RANKS,
    PLANS,
    hasRole,
    isAdmin,
    isModerator,
    isSuperAdmin
};

// Also expose functions directly for easier access if preferred
window.hasRole = hasRole;
window.isAdmin = isAdmin;
window.isModerator = isModerator;
window.isSuperAdmin = isSuperAdmin;

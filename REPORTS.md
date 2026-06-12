# AfroSINT Intelligence Report System

## Overview
The AfroSINT Intelligence Report System is a secure, end-to-end workflow for submitting and verifying operational intelligence. It integrates Firebase Firestore for data storage and Firebase Storage for digital evidence (images, PDF, video).

## Rank Hierarchy & Access Control
Access to the reporting system is governed by the user's `rank` stored in the Firestore `users` collection.

| Rank Level | Name | Permissions |
|------------|------|-------------|
| 1 | Member | View dashboard, maps |
| 2 | Analyst | **Submit Reports**, Review Dashboard |
| 3 | Research Analyst | Submit Reports, Review Dashboard |
| 4 | Senior Analyst | Submit Reports, Review Dashboard, Verify Reports |
| 5 | Lead Analyst | Submit Reports, Review Dashboard, Verify Reports |
| 6-9 | Special Officers | Full Access |

**Logic**: `user.rankLevel >= 2` (Analyst or above) is required to see the "SUBMIT REPORT" button and access the analyst dashboard.

## File Structure
- `report.html`: Submission form interface.
- `js/reports.js`: Firebase integration for submission and file uploads.
- `analyst.html`: Review dashboard for verifying submissions.
- `js/analyst.js`: Dashboard logic and workflow management.
- `login/js/permissions.js`: Centralized rank hierarchy definitions.
- `firestore.rules`: Backend security enforcement.

## Data Structure (Firestore `reports` collection)
```javascript
{
  referenceNumber: "AFR-XXXXXX",
  title: "Incident Title",
  category: "Security Incident",
  country: "Nigeria",
  state: "Lagos",
  city: "Ikeja",
  coordinates: "9.08, 7.49",
  incidentDate: "2023-10-27",
  incidentTime: "14:30",
  description: "Detailed report content...",
  threatLevel: "High",
  sourceReliability: "B – Usually Reliable",
  informationCredibility: "2 – Probably True",
  anonymous: false,
  urgent: false,
  attachments: [
    { name: "file.jpg", url: "...", type: "image/jpeg", size: 12345 }
  ],
  createdBy: "user_uid",
  createdByName: "John Doe",
  createdAt: serverTimestamp(),
  status: "Pending", // Draft, Pending, Under Review, Escalated, Verified, Closed
  analystAssigned: "",
  analystNotes: "",
  verified: false
}
```

## Security Implementation
Security is enforced at two levels:
1. **Frontend**: Buttons and routes are hidden/restricted using `canSubmitReports()` check in `permissions.js`.
2. **Backend**: `firestore.rules` validates that only users with the correct rank can create documents in the `reports` collection and that they cannot modify protected fields (like `verified` or `status`) unless they are authorized analysts.

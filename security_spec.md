# Firebase Security Specification - Day Service Shoken

## Data Invariants
1. **Users**: Users can only read/write their own profile. Admins can read all profiles. Only admins can assign roles (though bootstrapping will happen).
2. **Notices**: Publicly readable. Only admins can create/update/delete.
3. **Daily Logs**: Publicly readable (title, time). Images and detailed descriptions might be restricted to guardians if private. Only admins can write.
4. **Meals**: Publicly readable. Only admins can write.
5. **Gallery**: Publicly readable metadata, but actual content/images restricted to logged-in guardians/admins. Only admins can write.
6. **Comments**: Logged-in guardians can create comments on their family's activities or public notices. Can only edit/delete their own comments.
7. **Inquiries**: Anyone can create. Only admins can read/update (status).

## The Dirty Dozen Payloads (Targeting Rejection)
1.  **Identity Spoofing**: Attempt to create a user profile with `uid` that doesn't match `request.auth.uid`.
2.  **Role Escalation**: Attempt to set `role: "admin"` during user registration.
3.  **Cross-Comment Edit**: Attempt to edit a comment created by another user.
4.  **Admin Notice Hijack**: Non-admin attempting to update a notice.
5.  **PII Leak**: Non-admin attempting to list all inquiry documents.
6.  **Status Cheat**: Non-admin attempting to set inquiry status to "completed".
7.  **Resource Poisoning**: Inquiry with a 1MB message string.
8.  **Empty Notice**: Creating a notice missing required fields.
9.  **Future Dated Log**: (If applicable) Log with a date too far in the future.
10. **Ghost Field**: Adding `isVerified: true` to a GalleryItem.
11. **Unsigned Inquiry**: (If we allowed only registered, but here anyone can inquire, so maybe: Inquiry with malicious HTML in message).
12. **Gallery Scraper**: Attempting to `list` gallery items without being signed in (if we decide it's private).

## Test Runner (Verification)
I will implement `firestore.rules.test.ts` (conceptually, though I'll focus on the rules first if I can't run the tests in this environment easily, but I'll follow the flow).

Wait, the instructions say to output `security_spec.md` first.

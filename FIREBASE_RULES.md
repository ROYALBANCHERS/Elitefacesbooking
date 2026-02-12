# Firebase Realtime Database Rules (Recommended)

Use these rules for predictable production behavior with:
- public **read** access for website visitors
- restricted **write** access for admin users only

## 1) Production-safe rules (public read + admin write)

```json
{
  "rules": {
    ".read": true,
    ".write": false,

    "admins": {
      "$uid": {
        ".read": false,
        ".write": false
      }
    },

    "celebrities": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).val() === true"
    },
    "blogs": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).val() === true"
    },
    "customPages": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).val() === true"
    },
    "pageContents": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).val() === true"
    },
    "lastUpdated": {
      ".read": true,
      ".write": "auth != null && root.child('admins').child(auth.uid).val() === true"
    }
  }
}
```

## 2) Required admin setup

1. Enable **Firebase Authentication** (Email/Password).
2. Sign in as your admin user once and get its UID.
3. In Realtime Database, create:
   - path: `/admins/<ADMIN_UID>`
   - value: `true`

Without step 3, writes will be denied and UI may keep showing sync errors.

## 3) Temporary testing rules (not recommended for production)

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Use only for quick debugging, then switch back to production-safe rules.

## 4) Why this fixes "syncing but not updating"

Most stuck sync issues come from silent `permission_denied` errors when rules do not allow writes.
These rules make read/write intent explicit and stable for the exact paths used by this app:
`/celebrities`, `/blogs`, `/customPages`, `/pageContents`, `/lastUpdated`.

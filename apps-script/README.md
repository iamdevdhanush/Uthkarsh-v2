# UTKARSH 26 — Google Apps Script Backend

This directory contains the Google Apps Script backend for processing UTKARSH 26 registrations.

## Deployment Instructions

1. Open [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the contents of `Code.gs` into the editor
4. Set Script Properties:
   - `SPREADSHEET_ID` — ID of the Google Sheet for registration records
   - `DRIVE_FOLDER_ID` — ID of the Google Drive folder for payment screenshots
5. Create required sheets in the spreadsheet:
   - `Registrations` — main registration records (auto-created with headers on first write)
   - `Capacity` — optional derived cache
6. Deploy → New deployment → Web App
   - Execute as: Me
   - Access: Anyone
7. Copy the Web App URL
8. Set `VITE_REGISTRATION_API_URL` in your deployment environment
9. Set `VITE_REGISTRATION_MODE=production`

## Architecture

- `doPost` — handles registration submissions
- `doGet?action=capacity` — returns current capacity data
- `LockService` — concurrency-safe capacity enforcement
- Duplicate protection for UTR, leader email, leader phone
- Server-generated registration IDs (`UTK-26-XXXXXX`)
- Payment screenshots stored in Google Drive

## API Responses

### Success
```json
{
  "success": true,
  "registrationId": "UTK-26-XXXXXX",
  "status": "PENDING_VERIFICATION",
  "message": "Your registration has been submitted and is pending payment verification."
}
```

### Error
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errorCode": "ERROR_CODE"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| VALIDATION_ERROR | Missing or invalid fields |
| DUPLICATE_UTR | UTR already used |
| DUPLICATE_LEADER_EMAIL | Email already has active registration |
| DUPLICATE_LEADER_PHONE | Phone already has active registration |
| CAPACITY_FULL | All 50 slots filled |
| INVALID_FILE_TYPE | Unsupported file type |
| FILE_TOO_LARGE | File exceeds 5 MB |
| STORAGE_ERROR | Drive storage failure |
| SERVICE_UNAVAILABLE | Service temporarily unavailable |
| INTERNAL_ERROR | Unexpected server error |

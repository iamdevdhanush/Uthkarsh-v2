/**
 * UTKARSH 26 — Registration Backend
 * Google Apps Script Web App
 *
 * Deployment: Deploy as Web App → Execute as "Me" → Access "Anyone"
 *
 * Script Properties required:
 *   SPREADSHEET_ID — Google Sheet ID for registration records
 *   DRIVE_FOLDER_ID — Google Drive folder ID for payment screenshots
 *
 * Sheets expected in the spreadsheet:
 *   Registrations — main registration records
 *   Capacity — derived cache of current capacity
 */

// ─── Configuration ───────────────────────────────────────────────────────────

const SHEET_NAME = 'Registrations';
const CAPACITY_SHEET_NAME = 'Capacity';
const MAX_TEAMS = 50;
const REGISTRATION_PREFIX = 'UTK-26-';

const HEADERS = [
  'registrationId', 'timestamp',
  'teamName', 'collegeName', 'district', 'city',
  'leaderName', 'leaderEmail', 'leaderPhone', 'leaderCourse', 'leaderSemester',
  'members', 'memberCount',
  'utr',
  'consent', 'consentInfoAccuracy', 'consentRules', 'consentNoGuarantee', 'consentDataProcessing',
  'status',
  'screenshotDriveId', 'screenshotFileName',
];

const PENDING = 'PENDING_VERIFICATION';
const VERIFIED = 'VERIFIED';
const REJECTED = 'REJECTED';
const CANCELLED = 'CANCELLED';

const ACTIVE_STATUSES = [PENDING, VERIFIED];
const ALL_STATUSES = [PENDING, VERIFIED, REJECTED, CANCELLED];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getScriptProp_(key: string): string {
  const val = PropertiesService.getScriptProperties().getProperty(key);
  if (!val) throw new Error(`Missing script property: ${key}`);
  return val;
}

function getSheet_(): GoogleAppsScript.Spreadsheet.Sheet {
  const ss = SpreadsheetApp.openById(getScriptProp_('SPREADSHEET_ID'));
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function generateRegistrationId_(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = REGISTRATION_PREFIX;
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function normalizeEmail_(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone_(phone: string): string {
  let cleaned = phone.replace(/[\s-]/g, '');
  cleaned = cleaned.replace(/^(\+91|91)/, '');
  return cleaned;
}

function normalizeUtr_(utr: string): string {
  return utr.trim().toUpperCase();
}

// ─── Duplicate Protection ────────────────────────────────────────────────────

function checkDuplicates_(
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  data: { leaderEmail: string; leaderPhone: string; utr: string }
): string | null {
  const rows = sheet.getDataRange().getValues();
  const headerRow = rows[0];
  const emailIdx = headerRow.indexOf('leaderEmail');
  const phoneIdx = headerRow.indexOf('leaderPhone');
  const utrIdx = headerRow.indexOf('utr');
  const statusIdx = headerRow.indexOf('status');

  if (emailIdx === -1 || phoneIdx === -1 || utrIdx === -1 || statusIdx === -1) {
    return null;
  }

  const normalizedEmail = normalizeEmail_(data.leaderEmail);
  const normalizedPhone = normalizePhone_(data.leaderPhone);
  const normalizedUtr = normalizeUtr_(data.utr);

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const status = row[statusIdx];

    if (normalizedUtr && normalizeUtr_(String(row[utrIdx] || '')) === normalizedUtr) {
      return 'DUPLICATE_UTR';
    }

    if (ACTIVE_STATUSES.includes(status)) {
      if (normalizedEmail && normalizeEmail_(String(row[emailIdx] || '')) === normalizedEmail) {
        return 'DUPLICATE_LEADER_EMAIL';
      }
      if (normalizedPhone && normalizePhone_(String(row[phoneIdx] || '')) === normalizedPhone) {
        return 'DUPLICATE_LEADER_PHONE';
      }
    }
  }

  return null;
}

// ─── Capacity ────────────────────────────────────────────────────────────────

function getActiveCount_(sheet: GoogleAppsScript.Spreadsheet.Sheet): number {
  const rows = sheet.getDataRange().getValues();
  const headerRow = rows[0];
  const statusIdx = headerRow.indexOf('status');
  if (statusIdx === -1) return 0;

  let count = 0;
  for (let i = 1; i < rows.length; i++) {
    if (ACTIVE_STATUSES.includes(rows[i][statusIdx])) {
      count++;
    }
  }
  return count;
}

function updateCapacityCache_(): void {
  const ss = SpreadsheetApp.openById(getScriptProp_('SPREADSHEET_ID'));
  let capSheet = ss.getSheetByName(CAPACITY_SHEET_NAME);
  if (!capSheet) {
    capSheet = ss.insertSheet(CAPACITY_SHEET_NAME);
    capSheet.appendRow(['timestamp', 'total', 'claimed', 'remaining']);
  }

  const sheet = getSheet_();
  const claimed = getActiveCount_(sheet);
  capSheet.appendRow([new Date().toISOString(), MAX_TEAMS, claimed, MAX_TEAMS - claimed]);
}

// ─── File Handling ───────────────────────────────────────────────────────────

function saveScreenshot_(blob: GoogleAppsScript.Base.Blob): { driveId: string; fileName: string } {
  const folderId = getScriptProp_('DRIVE_FOLDER_ID');
  const folder = DriveApp.getFolderById(folderId);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(blob.getContentType())) {
    throw new Error('INVALID_FILE_TYPE');
  }

  if (blob.getBytes().length > 5 * 1024 * 1024) {
    throw new Error('FILE_TOO_LARGE');
  }

  const file = folder.createFile(blob);
  return { driveId: file.getId(), fileName: file.getName() };
}

// ─── doGet / doPost ──────────────────────────────────────────────────────────

function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput {
  const action = e?.parameter?.action;

  if (action === 'capacity') {
    const sheet = getSheet_();
    const claimed = getActiveCount_(sheet);
    const result = JSON.stringify({
      total: MAX_TEAMS,
      claimed,
      remaining: MAX_TEAMS - claimed,
    });
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ error: 'Unknown action', errorCode: 'INVALID_ACTION' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const lock = LockService.getScriptLock();
  const MAX_WAIT_MS = 15000;

  try {
    lock.waitLock(MAX_WAIT_MS);
  } catch {
    return respond_({ success: false, message: 'Service is busy. Please try again.', errorCode: 'SERVICE_UNAVAILABLE' }, 503);
  }

  try {
    return handlePost_(e);
  } catch (err: any) {
    console.error('Registration error:', err.message);
    return respond_({ success: false, message: 'An unexpected error occurred.', errorCode: 'INTERNAL_ERROR' }, 500);
  } finally {
    lock.releaseLock();
  }
}

function handlePost_(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const sheet = getSheet_();

  // ── Capacity check ──
  const activeCount = getActiveCount_(sheet);
  if (activeCount >= MAX_TEAMS) {
    return respond_({ success: false, message: 'All 50 team slots have been filled. Registration is closed.', errorCode: 'CAPACITY_FULL' }, 409);
  }

  // ── Parse parameters ──
  const teamName = e.parameter.teamName?.trim();
  const collegeName = e.parameter.collegeName?.trim();
  const district = e.parameter.district?.trim();
  const city = e.parameter.city?.trim();
  const leaderName = e.parameter.leaderName?.trim();
  const leaderEmail = e.parameter.leaderEmail?.trim();
  const leaderPhone = e.parameter.leaderPhone?.trim();
  const leaderCourse = e.parameter.leaderCourse?.trim();
  const leaderSemester = e.parameter.leaderSemester?.trim();
  const membersRaw = e.parameter.members;
  const utr = e.parameter.utr?.trim();

  // ── Validation ──
  if (!teamName || !collegeName || !district || !city ||
      !leaderName || !leaderEmail || !leaderCourse || !leaderSemester || !utr) {
    return respond_({ success: false, message: 'All required fields must be filled.', errorCode: 'VALIDATION_ERROR' }, 400);
  }

  let members: any[] = [];
  try {
    members = membersRaw ? JSON.parse(membersRaw) : [];
    if (!Array.isArray(members)) throw new Error();
  } catch {
    return respond_({ success: false, message: 'Invalid members data.', errorCode: 'VALIDATION_ERROR' }, 400);
  }

  const memberCount = 1 + members.length;
  if (memberCount < 2 || memberCount > 4) {
    return respond_({ success: false, message: 'Team size must be between 2 and 4 participants.', errorCode: 'VALIDATION_ERROR' }, 400);
  }

  // ── Duplicate check ──
  const duplicateError = checkDuplicates_(sheet, { leaderEmail, leaderPhone, utr });
  if (duplicateError) {
    const messages: Record<string, string> = {
      DUPLICATE_UTR: 'This UTR / transaction reference has already been used.',
      DUPLICATE_LEADER_EMAIL: 'A registration with this email already exists.',
      DUPLICATE_LEADER_PHONE: 'A registration with this phone number already exists.',
    };
    return respond_({ success: false, message: messages[duplicateError] || 'Duplicate registration detected.', errorCode: duplicateError }, 409);
  }

  // ── File handling ──
  let screenshotDriveId = '';
  let screenshotFileName = '';
  const screenshotBlob = e.parameter.screenshot as GoogleAppsScript.Base.Blob | undefined;
  if (screenshotBlob) {
    try {
      const result = saveScreenshot_(screenshotBlob);
      screenshotDriveId = result.driveId;
      screenshotFileName = result.fileName;
    } catch (fileErr: any) {
      const errorCode = fileErr.message;
      if (errorCode === 'INVALID_FILE_TYPE') {
        return respond_({ success: false, message: 'Only JPG, PNG, WebP, and PDF files are allowed.', errorCode }, 400);
      }
      if (errorCode === 'FILE_TOO_LARGE') {
        return respond_({ success: false, message: 'File size must be less than 5 MB.', errorCode }, 400);
      }
      return respond_({ success: false, message: 'Failed to upload screenshot.', errorCode: 'STORAGE_ERROR' }, 500);
    }
  }

  // ── Consent ──
  let consents: Record<string, boolean> = {};
  try {
    consents = e.parameter.consent ? JSON.parse(e.parameter.consent) : {};
  } catch {
    consents = {};
  }

  const requiredConsents = ['consent', 'consentInfoAccuracy', 'consentRules', 'consentNoGuarantee', 'consentDataProcessing'];
  for (const key of requiredConsents) {
    if (!consents[key]) {
      return respond_({ success: false, message: 'All consent fields are required.', errorCode: 'VALIDATION_ERROR' }, 400);
    }
  }

  // ── Persist ──
  const registrationId = generateRegistrationId_();
  const timestamp = new Date().toISOString();

  sheet.appendRow([
    registrationId, timestamp,
    teamName, collegeName, district, city,
    leaderName, leaderEmail, leaderPhone, leaderCourse, leaderSemester,
    JSON.stringify(members), memberCount,
    utr,
    consents.consent, consents.consentInfoAccuracy, consents.consentRules,
    consents.consentNoGuarantee, consents.consentDataProcessing,
    PENDING,
    screenshotDriveId, screenshotFileName,
  ]);

  // ── Update cache ──
  try { updateCapacityCache_(); } catch (e) { /* non-critical */ }

  console.log(`Registration created: ${registrationId}`);

  return respond_({
    success: true,
    registrationId,
    status: PENDING,
    message: 'Your registration has been submitted and is pending payment verification.',
  }, 200);
}

// ─── Response Helper ─────────────────────────────────────────────────────────

function respond_(data: any, statusCode: number): GoogleAppsScript.Content.TextOutput {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

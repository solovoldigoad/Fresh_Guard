# 🌐 Language Switching Guide - Smart Herbal Sprinkler App

## How to Change Language in the App

The Smart Herbal Sprinkler app supports **English** and **Hindi** languages. Here are multiple ways to change the app language:

---

## 🎯 Method 1: From Login Screen (Before Login)

### Steps:
1. **Open the app** - You'll see the login screen
2. **Look for the language button** in the top-right corner showing "EN" or "HI"
3. **Tap the language button** (🌐 EN or 🌐 HI)
4. **Select your preferred language**:
   - **English** for English interface
   - **हिंदी** for Hindi interface
5. **Close the language selector** - The app will immediately switch languages
6. **Continue with login** using your preferred language

### Visual Location:
```
┌─────────────────────────────┐
│                    [🌐 EN]  │ ← Language Selector (Top-Right)
│         🌿                  │
│  Smart Herbal Sprinkler     │
│ Climate-Controlled Onion... │
│                             │
│ Role Selection...           │
└─────────────────────────────┘
```

---

## 🎯 Method 2: From Dashboard (After Login)

### Steps:
1. **Login to the app** with your credentials
2. **Go to Dashboard** (Home screen)
3. **Look for the language button** in the header area showing "EN" or "HI"
4. **Tap the compact language button** (🌐 EN or 🌐 HI) 
5. **Select your preferred language** from the modal
6. **The app will switch languages immediately**

### Visual Location:
```
┌─────────────────────────────┐
│ Welcome back, John  [🌐EN]  │ ← Language Selector (Header)
│                    [🔔] [↪] │
├─────────────────────────────┤
│ System Status: All Clear    │
│                             │
│ Live Monitoring Cards...    │
└─────────────────────────────┘
```

---

## 🎯 Method 3: From Settings Screen (Recommended)

### Steps:
1. **Login to the app**
2. **Go to Dashboard**
3. **Tap "Settings"** in the Quick Actions section
4. **Find "Language & Region" section**
5. **Tap on "App Language"** setting
6. **Choose between**:
   - **English** - Full English interface
   - **हिंदी (Hindi)** - Full Hindi interface
7. **Selection is saved automatically**

### Navigation Path:
```
Dashboard → Quick Actions → Settings → Language & Region → App Language
```

### Visual in Settings:
```
┌─────────────────────────────┐
│ Language & Region           │
├─────────────────────────────┤
│ 🌐  App Language           │
│     English           [⚙️] │ ← Tap to Change
└─────────────────────────────┘
```

---

## 🔄 Language Options Available

| Language Code | Display Name | Native Name | Coverage |
|---------------|--------------|-------------|----------|
| `en` | English | English | 100% Complete |
| `hi` | Hindi | हिंदी | 100% Complete |

---

## 📱 What Changes When You Switch Language

### ✅ **Translated Elements:**
- ✓ All screen titles and labels
- ✓ Button text and actions  
- ✓ Form labels and placeholders
- ✓ Alert and notification messages
- ✓ Status indicators
- ✓ Menu items and navigation
- ✓ Error messages
- ✓ Settings and preferences
- ✓ User roles (Admin/Warehouse Staff)

### 📊 **Example Translation Coverage:**

| English | Hindi (हिंदी) |
|---------|---------------|
| Welcome back | वापस स्वागत है |
| Dashboard | डैशबोर्ड |
| Temperature | तापमान |
| Humidity | आर्द्रता |
| Alerts | चेतावनी |
| Control | नियंत्रण |
| Settings | सेटिंग्स |
| Warehouse Staff | गोदाम कर्मचारी |
| Admin | प्रशासक |

---

## 💾 Language Persistence

### **Automatic Saving:**
- Your language preference is **automatically saved**
- **Persists across app restarts**
- **No need to re-select** after closing the app
- **Applies to all user sessions**

### **Storage Location:**
- Saved in device local storage (`AsyncStorage`)
- Key: `selectedLanguage`
- Values: `'en'` or `'hi'`

---

## 🛠️ For Developers: Adding New Languages

### **To add a new language:**

1. **Add language to translations:**
```javascript
// src/constants/translations.js
export const translations = {
  en: { /* English translations */ },
  hi: { /* Hindi translations */ },
  fr: { /* French translations */ }, // New language
};
```

2. **Update available languages:**
```javascript
// src/context/LanguageContext.jsx
availableLanguages: [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'fr', name: 'French', nativeName: 'Français' }, // New
]
```

3. **Test the new language** in the language selector

---

## 🔧 Troubleshooting

### **Language not switching?**
1. **Force close and reopen** the app
2. **Check internet connection** (for initial load)
3. **Try switching from Settings screen** instead
4. **Restart the app** if needed

### **Missing translations?**
- Some text showing as key names (like `loginText`) indicates missing translation
- **Report to development team** for updates
- **Fallback to English** is automatic

### **Language selector not visible?**
1. **Update to latest app version**
2. **Check if you're on the login or dashboard screen**
3. **Look in the header area** (top-right corner)

---

## 📞 Support

If you need help with language switching:
- **Contact**: App Support Team
- **Email**: support@smartherbalsprinkler.com
- **In-App**: Settings → Help & Support

---

## 🎯 Quick Summary

| Method | Location | Best For |
|--------|----------|----------|
| **Login Screen** | Top-right corner | Before logging in |
| **Dashboard** | Header area | Quick access |
| **Settings** | Settings → Language | Permanent change |

**Default Language**: English (`en`)  
**Supported Languages**: English, Hindi  
**Auto-Save**: ✅ Yes  
**Restart Required**: ❌ No  

---

*The language change takes effect immediately and applies to the entire app interface.*
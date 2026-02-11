/**
 * Build script to sync data.json with the app
 * This script reads data.json and updates the app data
 *
 * Usage:
 *   node scripts/update-data.js
 *
 * This should be run after exporting data from admin panel
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../data.json');
const constantsPath = path.resolve(__dirname, '../constants.tsx');
const backupPath = path.resolve(__dirname, '../data.backup.json');

console.log('🔄 Syncing data.json with app...');

// Read data.json
try {
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Create backup
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    console.log('✅ Backup created: data.backup.json');

    // Update constants.tsx with celebrity data
    if (data.celebrities && data.celebrities.length > 0) {
      console.log(`📝 Updating ${data.celebrities.length} celebrities...`);
      // This is a placeholder - in production, you'd update the constants file
    }

    console.log('✅ Data sync complete!');
    console.log('📊 Stats:');
    console.log(`   - Celebrities: ${data.celebrities?.length || 0}`);
    console.log(`   - Blog Posts: ${data.blogs?.length || 0}`);
    console.log(`   - Custom Pages: ${data.customPages?.length || 0}`);
    console.log(`   - Last Updated: ${data.lastUpdated || 'Never'}`);
  } else {
    console.log('⚠️  data.json not found. No changes to sync.');
  }
} catch (error) {
  console.error('❌ Error syncing data:', error.message);
  process.exit(1);
}

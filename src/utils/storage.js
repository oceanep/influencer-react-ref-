1import Dexie from 'dexie';

const db = new Dexie("InfluencerDB");

db.version(1).stores({
    users: "++id,first_name,last_name,business_email, user_type",
    favorites: "++id, display_name, profile_imaeg_url"    
});

export default db;

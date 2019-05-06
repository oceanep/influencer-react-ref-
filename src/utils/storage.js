import Dexie from 'dexie';

const db = new Dexie("InfluencerStorage20");

db.version(1).stores({
    users: "++id,first_name,last_name,business_email, user_type"
});

db.version(2).stores({
    favorites: "username, profileUrl"
});

export default db;

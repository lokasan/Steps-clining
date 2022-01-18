export const CREATE_USER_LOCAL_TABLE = "CREATE TABLE IF NOT EXISTS user_local (id INTEGER PRIMARY KEY NOT NULL, \
    surname TEXT NOT NULL, name TEXT NOT NULL, lastname TEXT NOT NULL, position TEXT NOT NULL, \
    email TEXT NOT NULL, privileg INTEGER NOT NULL, key_auth TEXT NOT NULL, status INTEGER, img TEXT, create_user_date TEXT, start_shift TEXT);"

export const CREATE_STEP_TIME_TABLE = "CREATE TABLE IF NOT EXISTS step_time (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, \
    count_step INTEGER NOT NULL, date_time TEXT NOT NULL, current_time TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES user_local(id) ON DELETE CASCADE);"

export const CREATE_CORPUS_TABLE = "CREATE TABLE IF NOT EXISTS corpus (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL UNIQUE, description TEXT, address TEXT, coords TEXT, img TEXT NOT NULL);"
export const CREATE_BUILDING_TABLE = "CREATE TABLE IF NOT EXISTS building (id INTEGER PRIMARY KEY NOT NULL, corpus_id INTEGER, name TEXT NOT NULL UNIQUE, \
    address TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL);"

export const CREATE_POST_TABLE = "CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY NOT NULL, building_id INTEGER NOT NULL, \
    name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL, qrcode TEXT NOT NULL UNIQUE, qrcode_img TEXT NOT NULL UNIQUE, FOREIGN KEY (building_id) REFERENCES building(id) ON DELETE CASCADE);"

export const CREATE_COMPONENT_TABLE = "CREATE TABLE IF NOT EXISTS component (id INTEGER PRIMARY KEY NOT NULL, \
    name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL);"

export const CREATE_COMPONENT_WITH_POST_TABLE = "CREATE TABLE IF NOT EXISTS component_with_pos (id INTEGER PRIMARY KEY NOT NULL, \
    post_id INTEGER NOT NULL, component_id INTEGER NOT NULL, FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE, FOREIGN KEY (component_id) REFERENCES component(id) ON DELETE CASCADE);"

export const CREATE_COMPONENT_RANK_TABLE = "CREATE TABLE IF NOT EXISTS component_rank (id INTEGER PRIMARY KEY NOT NULL, \
    component_id INTEGER NOT NULL, name TEXT NOT NULL, rank REAL NOT NULL, img TEXT NOT NULL, FOREIGN KEY (component_id) REFERENCES component(id) ON DELETE CASCADE);"

export const CREATE_BYPASS_TABLE = "CREATE TABLE IF NOT EXISTS bypass (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER, post_id INTEGER, \
    start_time TEXT, end_time TEXT, avg_rank REAL, weather TEXT NOT NULL, temperature INTEGER, cleaner INTEGER, finished INTEGER, FOREIGN KEY (user_id) REFERENCES user_local(id) ON DELETE CASCADE, \
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE);"

export const CREATE_BYPASS_RANK_TABLE = "CREATE TABLE IF NOT EXISTS bypass_rank (id INTEGER PRIMARY KEY NOT NULL, bypass_id INTEGER NOT NULL, component_id INTEGER NOT NULL, \
    component_rank_id INTEGER, start_time TEXT, end_time TEXT, FOREIGN KEY (bypass_id) REFERENCES bypass(id) ON DELETE CASCADE, \
    FOREIGN KEY (component_id) REFERENCES component(id) ON DELETE CASCADE, \
    FOREIGN KEY (component_rank_id) REFERENCES component_rank(id) ON DELETE CASCADE);"
export const CREATE_PHOTO_RANK_GALLERY = "CREATE TABLE IF NOT EXISTS photo_rank_gallery (id INTEGER PRIMARY KEY NOT NULL, bypass_rank_id INTEGER NOT NULL, img TEXT NOT NULL, \
    FOREIGN KEY (bypass_rank_id) REFERENCES bypass_rank(id) ON DELETE CASCADE);"

export const CREATE_NEW_CORPUS = "INSERT INTO corpus (id, name, description, address, coords, img) VALUES (?, ?, ?, ?, ?, ?);"
export const DELETE_CORPUS = "DELETE FROM corpus WHERE id = ?;"
export const CREATE_NEW_USER = "INSERT INTO user_local (id, surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date, start_shift) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
export const DELETE_USER = "DELETE FROM user_local WHERE id = ?;"
export const UPDATE_USER = ""
export const CREATE_NEW_BUILDING = "INSERT INTO building (id, corpus_id, name, address, description, img) VALUES (?, ?, ?, ?, ?, ?);"
export const DELETE_BUILDING = "DELETE FROM building WHERE id = ?"
export const UPDATE_BUILDING = ""
export const CREATE_NEW_POST = "INSERT INTO post (id, building_id, name, description, img, qrcode, qrcode_img) VALUES (?, ?, ?, ?, ?, ?, ?)"
export const DELETE_POST = "DELETE FROM post WHERE id = ?"
export const UPDATE_POST = ""
export const CREATE_NEW_COMPONENT = "INSERT INTO component (id, name, description, img) VALUES (?, ?, ?, ?)"
export const DELETE_COMPONENT = "DELETE FROM component WHERE id =?"
export const UPDATE_COMPONENT = ""
export const CREATE_NEW_COMPONENT_RANK = "INSERT INTO component_rank (id, component_id, name, rank, img) VALUES (?, ?, ?, ?, ?)"
export const DELETE_COMPONENT_RANK ="DELETE FROM component_rank WHERE id = ?"
export const UPDATE_COMPONENT_RANK = "UPDATE component_rank SET rank = ? WHERE id = ?"
export const EDIT_USER = "UPDATE user_local SET surname = ?, name = ?, lastname = ?, position = ?, email = ?, privileg = ?, img = ?, start_shift = ? WHERE id = ?"
export const EDIT_COMPONENT_RANK = "UPDATE component_rank SET name = ?, img = ?, rank = ? WHERE id = ?"
export const CREATE_COMPONENT_TO_POST_LINK =  "INSERT INTO component_with_pos (id, post_id, component_id) VALUES (?, ?, ?)"
export const DELETE_COMPONENT_TO_POST_LINK = "DELETE FROM component_with_pos WHERE post_id = ? AND component_id = ?"
export const GET_COMPONENT_TO_POST_LINKS = "SELECT component.id, component.name, component.description, component.img FROM component \
    LEFT JOIN component_with_pos WHERE component.id = component_with_pos.component_id AND component_with_pos.post_id = ?"
export const CREATE_NEW_BYPASS = "INSERT INTO bypass (id, user_id, post_id, start_time, weather, temperature, finished) VALUES (?, ?, ?, ?, ?, ?, ?)"
export const BYPASS_IS_CLEANER = "UPDATE bypass SET cleaner = ? WHERE id = ?"
export const UPDATE_BYPASS = "UPDATE bypass SET avg_rank = ? WHERE id = ?"
export const FINISHED_BYPASS = "UPDATE bypass SET end_time = ?, avg_rank = ?, finished = 1 WHERE id = ?"
export const DELETE_BYPASS = "DELETE FROM bypass WHERE id = ?"
export const CREATE_NEW_BYPASS_RANK = "INSERT INTO bypass_rank (id, bypass_id, component_id, start_time) VALUES (?, ?, ?, ?)"
export const UPDATE_BYPASS_RANK = "UPDATE bypass_rank SET component_rank_id = ?, end_time = ? WHERE id = ?"
export const CREATE_NEW_PHOTO_RANK_GALLERY = "INSERT INTO photo_rank_gallery (id, bypass_rank_id, img) VALUES (?, ?, ?)"
export const DELETE_PHOTO_RANK_GALLERY = "DELETE FROM photo_rank_gallery WHERE id = ?"
export const LOAD_BYPASS = "SELECT * FROM bypass WHERE user_id = ? AND post_id = ? AND finished = 0;"
export const LOAD_FINISHED_COMPONENTS_FOR_BYPASS = "SELECT component_id as id FROM bypass_rank WHERE bypass_id = ? AND end_time IS NOT NULL;"
export const LOAD_STARTED_BYPASS_RANK = "SELECT br.id, br.component_id FROM bypass_rank br  WHERE br.bypass_id = ? AND br.end_time IS NULL;"

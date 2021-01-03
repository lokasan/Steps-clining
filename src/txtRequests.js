export const CREATE_USER_LOCAL_TABLE = "CREATE TABLE IF NOT EXISTS user_local (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    surname TEXT NOT NULL, name TEXT NOT NULL, lastname TEXT NOT NULL, position TEXT NOT NULL, \
    email TEXT NOT NULL, privileg INTEGER NOT NULL, key_auth TEXT NOT NULL, status INTEGER, img TEXT, create_user_date TEXT);"

export const CREATE_STEP_TIME_TABLE = "CREATE TABLE IF NOT EXISTS step_time (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, \
    count_step INTEGER NOT NULL, date_time TEXT NOT NULL, current_time TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES user_local(id));"

export const CREATE_BUILDING_TABLE = "CREATE TABLE IF NOT EXISTS building (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, \
    address TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL);"

export const CREATE_POST_TABLE = "CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, building_id INTEGER NOT NULL, \
    name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL, qrcode TEXT NOT NULL, FOREIGN KEY (building_id) REFERENCES building(id));"

export const CREATE_COMPONENT_TABLE = "CREATE TABLE IF NOT EXISTS component (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL);"

export const CREATE_COMPONENT_WITH_POST_TABLE = "CREATE TABLE IF NOT EXISTS component_with_pos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    post_id INTEGER NOT NULL, component_id INTEGER NOT NULL, FOREIGN KEY (post_id) REFERENCES post(id), FOREIGN KEY (component_id) REFERENCES component(id));"

export const CREATE_COMPONENT_RANK_TABLE = "CREATE TABLE IF NOT EXISTS component_rank (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    component_id INTEGER NOT NULL, name TEXT NOT NULL, rank REAL NOT NULL, img TEXT NOT NULL, FOREIGN KEY (component_id) REFERENCES component(id));"

export const CREATE_BYPASS_TABLE = "CREATE TABLE IF NOT EXISTS bypass (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, \
    start_time TEXT NOT NULL, end_time TEXT NOT NULL, avg_rank REAL NOT NULL, finished NUMERIC NOT NULL, FOREIGN KEY (user_id) REFERENCES user_local(id));"

export const CREATE_BYPASS_RANK_TABLE = "CREATE TABLE IF NOT EXISTS bypass_rank (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, bypass_id INTEGER NOT NULL, \
    component_rank_id INTEGER NOT NULL, start_time TEXT NOT NULL, end_time TEXT NOT NULL, img TEXT NOT NULL, FOREIGN KEY (bypass_id) REFERENCES bypass(id), \
    FOREIGN KEY (component_rank_id) REFERENCES component_rank(id));"

export const CREATE_NEW_USER = "INSERT INTO user_local (surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
export const DELETE_USER = "DELETE FROM user_local WHERE id = ?"
export const UPDATE_USER = ""
export const CREATE_NEW_BUILDING = "INSERT INTO building (name, address, description, img) VALUES (?, ?, ?, ?);"
export const DELETE_BUILDING = "DELETE FROM building WHERE id = ?"
export const UPDATE_BUILDING = ""
export const CREATE_NEW_POST = "INSERT INTO post (building_id, name, description, img, qrcode) VALUES (?, ?, ?, ?, ?)"
export const DELETE_POST = "DELETE FROM post WHERE id = ?"
export const UPDATE_POST = ""
export const CREATE_NEW_COMPONENT = "INSERT INTO component (name, description, img) VALUES (?, ?, ?)"
export const DELETE_COMPONENT = "DELETE FROM component WHERE id =?"
export const UPDATE_COMPONENT = ""
export const CREATE_NEW_COMPONENT_RANK = "INSERT INTO component_rank (component_id, name, rank, img) VALUES (?, ?, ?, ?)"
export const DELETE_COMPONENT_RANK ="DELETE FROM component_rank WHERE id = ?"
export const UPDATE_COMPONENT_RANK = "UPDATE component_rank SET rank = ? WHERE id = ?"
export const EDIT_COMPONENT_RANK = "UPDATE component_rank SET name = ?, img = ? WHERE id = ?"
export const CREATE_COMPONENT_TO_POST_LINK =  "INSERT INTO component_with_pos (post_id, component_id) VALUES (?, ?)"
export const DELETE_COMPONENT_TO_POST_LINK = "DELETE FROM component_with_pos WHERE post_id = ? AND component_id = ?"
export const GET_COMPONENT_TO_POST_LINKS = "SELECT component.id, component.name, component.description, component.img FROM component \
    LEFT JOIN component_with_pos WHERE component.id = component_with_pos.component_id AND component_with_pos.post_id = ?"
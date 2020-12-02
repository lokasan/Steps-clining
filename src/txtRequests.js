export const CREATE_USER_LOCAL_TABLE = "CREATE TABLE IF NOT EXISTS user_local (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    surname TEXT NOT NULL, name TEXT NOT NULL, lastname TEXT NOT NULL, position TEXT NOT NULL, \
    email TEXT NOT NULL, privileg INTEGER NOT NULL, key_auth TEXT NOT NULL, status TEXT, img TEXT, create_user_date TEXT);"

export const CREATE_STEP_TIME_TABLE = "CREATE TABLE IF NOT EXISTS step_time (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, \
    count_step INTEGER NOT NULL, date_time TEXT NOT NULL, current_time TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES user_local(id));"

export const CREATE_BUILDING_TABLE = "CREATE TABLE IF NOT EXISTS building (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, \
    address TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL);"

export const CREATE_POST_TABLE = "CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, building_id INTEGER NOT NULL, \
    name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL, qrcode TEXT NOT NULL, FOREIGN KEY (building_id) REFERENCES building(id));"

export const CREATE_COMPONENT_TABLE = "CREATE TABLE IF NOT EXISTS component (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, post_id INTEGER NOT NULL, \
    name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL, FOREIGN KEY (post_id) REFERENCES post(id));"

export const CREATE_COMPONENT_RANK_TABLE = "CREATE TABLE IF NOT EXISTS component_rank (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    component_id INTEGER NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, img TEXT NOT NULL, FOREUGN KEY (component_id) REFERENCES component(id));"

export const CREATE_BYPASS_TABLE = "CREATE TABLE IF NOT EXISTS bypass (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, \
    start_time TEXT NOT NULL, end_time TEXT NOT NULL, avg_rank REAL NOT NULL, finished NUMERIC NOT NULL, FOREIGN KEY (user_id) REFERENCES user_local(id));"

export const CREATE_BYPASS_RANK_TABLE = "CREATE TABLE IF NOT EXISTS bypass_rank (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, bypass_id INTEGER NOT NULL, \
    component_rank_id INTEGER NOT NULL, start_time TEXT NOT NULL, end_time TEXT NOT NULL, img TEXT NOT NULL, FOREIGN KEY (bypass_id) REFERENCES bypass(id), \
    FOREIGN KEY (component_rank_id) REFERENCES component_rank(id));"

export const CREATE_NEW_USER = ""
export const DELETE_USER = ""
export const UPDATE_USER = ""
export const CREATE_NEW_BUILDING = ""
export const DELETE_BUILDING = ""
export const UPDATE_BUILDING = ""
export const CREATE_NEW_POST = ""
export const DELETE_POST = ""
export const UPDATE_POST = ""
export const CREATE_NEW_COMPONENT = ""
export const DELETE_COMPONENT = ""
export const UPDATE_COMPONENT = ""


import * as SQLite from 'expo-sqlite'
import { DELETE_POST, CREATE_BUILDING_TABLE, CREATE_BYPASS_RANK_TABLE, CREATE_BYPASS_TABLE, CREATE_COMPONENT_RANK_TABLE, 
    CREATE_COMPONENT_TABLE, CREATE_COMPONENT_WITH_POST_TABLE, CREATE_NEW_BUILDING, CREATE_NEW_COMPONENT, CREATE_NEW_USER, 
    CREATE_POST_TABLE, CREATE_STEP_TIME_TABLE, CREATE_USER_LOCAL_TABLE, DELETE_BUILDING, DELETE_COMPONENT, DELETE_USER, 
    CREATE_NEW_POST, CREATE_NEW_COMPONENT_RANK, DELETE_COMPONENT_RANK, UPDATE_COMPONENT_RANK, EDIT_COMPONENT_RANK, 
    CREATE_COMPONENT_TO_POST_LINK, DELETE_COMPONENT_TO_POST_LINK, GET_COMPONENT_TO_POST_LINKS, CREATE_PHOTO_RANK_GALLERY, CREATE_NEW_BYPASS, BYPASS_IS_CLEANER, UPDATE_BYPASS, FINISHED_BYPASS, DELETE_BYPASS, CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK, CREATE_NEW_PHOTO_RANK_GALLERY, DELETE_PHOTO_RANK_GALLERY, LOAD_BYPASS, LOAD_FINISHED_COMPONENTS_FOR_BYPASS, LOAD_STARTED_BYPASS_RANK } from './txtRequests'

const db = SQLite.openDatabase('dbas.db')
export class DB {
    static init() {
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        )

        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(CREATE_USER_LOCAL_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_STEP_TIME_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_BYPASS_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_BUILDING_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_POST_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_COMPONENT_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_COMPONENT_WITH_POST_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_COMPONENT_RANK_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_BYPASS_RANK_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_PHOTO_RANK_GALLERY, [], resolve, (_, error) => reject(error))
            })
        })
        
    }
    static getUser(email) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM user_local WHERE email = ?",
                    [email],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getUserAuthorize() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM user_local WHERE status=1",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getUsers() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM user_local",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createUser({id, surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date}) {
        console.log(surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date)
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_NEW_USER,
                    [id, surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static updateUserPrivileg(emploee) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE user_local SET privileg = ? WHERE id = ?",
                    [emploee.privileg, emploee.id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static updateUserAuthorize(status, email) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE user_local SET status = ? WHERE email = ?",
                    [status, email],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static removeUser(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    DELETE_USER,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createObject({id, name, address, description, img}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_NEW_BUILDING, 
                    [id ? id : Date.now(), name, address, description, img],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getObjects() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM building;",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getObjectById(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM building WHERE id = ?;",
                    [id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static removeObject(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(DELETE_BUILDING,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createPost({id, building_id, name, description, img, qrcode, qrcode_img}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_NEW_POST,
                    [id ? id : Date.now(), building_id, name, description, img, qrcode, qrcode_img],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getPosts(building_id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT building_id, id, name, description, img, qrcode, qrcode_img FROM post WHERE building_id = ?;",
                    [building_id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getPostById(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM post WHERE id = ?;",
                    [id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getPostAll() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM post;",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static removePost(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(DELETE_POST,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createComponent({id, name, description, img}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_NEW_COMPONENT,
                    [id ? id : Date.now(), name, description, img],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getComponents() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM component;",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getCompoentById(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM component WHERE id = ?",
                    [id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static removeComponent(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(DELETE_COMPONENT,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getComponentRank() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM component_rank;",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createComponentRank({id, component_id, name, rank, img}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_NEW_COMPONENT_RANK,
                    [id, component_id, name, rank, img],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static removeComponentRank(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    DELETE_COMPONENT_RANK,
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getComponentRankId(component_id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM component_rank WHERE component_id=?;",
                    [component_id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getComponentRankPureId(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM component_rank WHERE id = ?;",
                    [id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static updateComponentRank(componentRank, componentLength, count) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                const emptyComponentRank = (5 / (componentLength)).toFixed(2)
                
                console.log(componentRank, 'приятно познакомиться');
                for (let el of componentRank) {
                    if (el.rank !== 5){
                        tx.executeSql(
                            UPDATE_COMPONENT_RANK,
                            [emptyComponentRank * count > 5 ? 5 : emptyComponentRank * count, el.id],
                            resolve,
                            (_, error) => reject(error)
                            )
                            count+=1
                    }
                }
            })
        })
    }
    static editComponentRank(componentRank) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    EDIT_COMPONENT_RANK,
                    [componentRank.name, componentRank.img, componentRank.rank, componentRank.id],
                    resolve,
                    (_, error) => reject(error)
                    )
            })
        })
    }
    static createComponentToPostLink(post_id, component_id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_COMPONENT_TO_POST_LINK,
                    [Date.now(), post_id, component_id],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static deleteComponentToPostLink(postId, componentId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    DELETE_COMPONENT_TO_POST_LINK,
                    [postId, componentId],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getComponentToPostLinks(postId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    GET_COMPONENT_TO_POST_LINKS,
                    [postId],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createBypass(id, userId, postId, weather, temperature) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    CREATE_NEW_BYPASS,
                    [id, userId, postId, String(Date.now()), weather, temperature, 0],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static isCleanerOnBypass(cleaner, id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    BYPASS_IS_CLEANER,
                    [cleaner, id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static updateBypass(avgRank, id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    UPDATE_BYPASS,
                    [avgRank, id],
                    resolve,
                    (_, error) => reject(error) 
                )
            })
        })
    }
    static finishedBypass(avgRank, id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                   FINISHED_BYPASS,
                   [String(Date.now()), avgRank, id],
                   resolve,
                   (_, error) => reject(error)
                )
            })
        })
    }
    static loadBypass(userId, postId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    LOAD_BYPASS,
                    [userId, postId],
                    (_, result) => {
                        console.log(result)
                        resolve(result.rows._array)},
                    (_, error) => reject(error)
                )
            })
        })
    }
    static deleteBypass(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                   DELETE_BYPASS,
                   [id],
                   resolve,
                   (_, error) => reject(error)
                )
            })
        })
    }
    static createBypassRank(bypass_id, component_id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                CREATE_NEW_BYPASS_RANK,
                [Date.now(), bypass_id, component_id, String(Date.now())],
                (_, result) => resolve(result.insertId),
                (_, error) => reject(error)
                )
            })
        })
    }
    static loadFinishedComponentsForBypass(bypassId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    LOAD_FINISHED_COMPONENTS_FOR_BYPASS,
                    [bypassId],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static loadStartedBypassRank(bypassId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    LOAD_STARTED_BYPASS_RANK,
                    [bypassId],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static updateBypassRank(componentRankId, id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                UPDATE_BYPASS_RANK,
                [componentRankId, String(Date.now()), id],
                resolve,
                (_, error) => reject(error)
                )
            })
        })
    }
    static createPhotoRankGallery({bypassRankId, photo}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                CREATE_NEW_PHOTO_RANK_GALLERY,
                [Date.now(), bypassRankId, photo],
                (_, result) => resolve(result.insertId),
                (_, error) => reject(error)
                )
            })
        })
    }
    static deletePhotoRankGallery(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                DELETE_PHOTO_RANK_GALLERY,
                [id],
                resolve,
                (_, error) => reject(error)
                )
            })
        })
    }
    static getStatusBypass(post_id, finished) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                "SELECT finished FROM bypass WHERE post_id = ? AND finished = ?",
                [post_id, finished],
                (_, result) => resolve(result.rows._array),
                (_, error) => reject(error)
                )
            })
        })
    }
    static getComponentRankForId(componentRankId) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT component_id as id, rank FROM component_rank WHERE id = ?",
                    [componentRankId],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getComponentInfoById(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT img FROM component WHERE id=?;",
                    [id],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
}

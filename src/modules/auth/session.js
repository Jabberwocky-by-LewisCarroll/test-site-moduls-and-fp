// Управление сессией

import { CONFIG } from "../core/config.js";

export const session = {

    // Получение sessionID
    getSessionID: () => {
        return CONFIG.LOCAL_STORAGE.SESSION_ID;
    },

    // Установка sessionID
    setSessionID: (sessionID) => {
        localStorage.setItem('sessionID', sessionID);
    },

    // Очистка sessionID
    clearSessionID: () => {
        localStorage.removeItem('sessionID');
    },

    // Получение роли
    getRole: () => {
        return CONFIG.LOCAL_STORAGE.ROLE;
    },

    // Установка роли
    setRole: (role) => {
        localStorage.setItem('role', role);
    },

    // Очистка роли
    clearRole: () => {
        localStorage.removeItem('role');
    },

    // Получение данных сессии
    get: () => {
        const session = {
            sessionID: session.getSessionID(),
            role: session.getRole(),
        };
        return session;
    },

    // Установка данных сессии
    set: (sessionID, role) => {
        session.setSessionID(sessionID);
        session.setRole(role);
    },

    // Очистка данных сессии
    clear: () => {
        session.clearSessionID();
        session.clearRole();
    },
};
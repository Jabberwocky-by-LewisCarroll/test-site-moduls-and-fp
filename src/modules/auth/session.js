// Управление сессией

import { LOCAL_STORAGE_ITEMS } from "../core/config.js";

export const session = {

    // Получение данных сессии
    get: () => {
        const session = {
            SESSION_ID: LOCAL_STORAGE_ITEMS.SESSION_ID,
            ROLE: LOCAL_STORAGE_ITEMS.ROLE,
        };
        return session;
    },

    // Установка данных сессии
    set: (sessionID, role) => {
        localStorage.setItem('sessionID', sessionID);
        localStorage.setItem('role', role);

        return 'Session was set!';
    },

    // Очистка данных сессии
    clear: () => {
        localStorage.removeItem('sessionID');
        localStorage.removeItem('role');

        return 'Session was cleared!';
    },

    // Получение sessionID
    getSessionID: () => {
        return localStorage.getItem('sessionID');
    },

    // Установка sessionID
    setSessionID: (sessionID) => {
        localStorage.setItem('sessionID', sessionID);

        return 'SessionID was set!';
    },

    // Очистка sessionID
    clearSessionID: () => {
        localStorage.removeItem('sessionID');

        return 'SessionID was cleared!'
    },

    // Получение роли
    getRole: () => {
        return localStorage.getItem('role');
    },

    // Установка роли
    setRole: (role) => {
        localStorage.setItem('role', role);

        return 'Role was set!';
    },

    // Очистка роли
    clearRole: () => {
        localStorage.removeItem('role');

        return 'Role was cleared!';
    },
};
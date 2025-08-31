import { CONFIG } from './config.js';
import { session } from './session.js';

/**
 * Универсальная функция для API запросов
 * @param {string} endpoint - ключ из API_ENDPOINTS
 * @param {Object} options - опции запроса (method, body и т.д.)
 * @returns {Promise<Object>} - ответ API
*/

export async function apiRequest(endpoint, options ={}) {

    // Проверка существования API endpoint
    if (!CONFIG.API_ENDPOINTS[endpoint]) {
        throw new Error('Unknown API endpoint: ' + endpoint)
    };

    // Формируем URL и включаем туда sessionID
    const url = endpoint + session.getSessionID();

    // Базовая конфигурация параметров fetch()
    const defaultConfig = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    };

    /*
    * Конструктор конфигурации параметров fetch() в случае,
    * если мы добавляем в функцию параметр options
    */
    const config = {
        ...defaultConfig,
        ...options,
        headers: {
            ...defaultConfig.headers,
            ...options.headers,
        },
    };

    try {
        // Конфигурация fetch() запроса
        const response = await fetch(url, config);

        // Проверяем успешность запроса. В случае провала выкидываем ошибку.
        if (!response.ok) {
            throw new Error('HTTP error: status: ' + response.status);
        };

        // Возвращаем данные в формате JSON
        return await response.json();

    } catch (error) {
        console.error(`API request for ${endpoint} failed: ${error.message}`);
        throw error;
    };
};

export const api = {

    // Авторизация
    login: async (credentials) => {
        const result = await apiRequest(CONFIG.API_ENDPOINTS.AUTH, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        // if (result.result.token) {
        //     localStorage.setItem('sessionID', result.result.token);
        //     localStorage.setItem('role', result.result.role);
        //     location.href = 'public/getObjectsV2.html';
        // };
        // TODO надо логику сохранения id сессии и роли переместить в другое место
        // TODO надо логику перехода на страницу авторизации переместить в другое место

        return result;
    },

    // Регистрация
    reg: async (userData) => {
        return apiRequest(CONFIG.API_ENDPOINTS.REG, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    // Добавление тестового объекта
    addTestObj: async (objData) => {
        return apiRequest(CONFIG.API_ENDPOINTS.ADD_TEST_OBJ, {
            method: 'POST',
            body: JSON.stringify(objData),
        });
    },

    // Изменение тестового объекта
    editTestObj: async (objData) => {
        return apiRequest(CONFIG.API_ENDPOINTS.EDIT_DEL_TEST_OBJ, {
            method: 'POST',
            body: JSON.stringify(objData),
        });
    },

    // Получение актуальных напоминаний
    getActiveReminders: async () => {
        return apiRequest(CONFIG.API_ENDPOINTS.ACTIVE_REMS);
    },

    // Получение завершённых напоминаний
    getCompleteReminders: async () => {
        return apiRequest(CONFIG.API_ENDPOINTS.COMPLETE_REMS);
    },

    // Создание черновика напоминания
    createDraftReminder: async (reminderData) => {
        return apiRequest(CONFIG.API_ENDPOINTS.GRAFT_REM, {
            method: 'POST',
            body: JSON.stringify(reminderData)
        });
    },

    // Подтверждение создания напоминания
    confirmReminder: async (reminderData) => {
        return apiRequest(CONFIG.API_ENDPOINTS.CONFIRM_REM, {
            method: 'POST',
            body: JSON.stringify(reminderData)
        });
    },
};
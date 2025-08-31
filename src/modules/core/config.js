// Конфигурация приложения - динамические настройки
// Всё, что может меняться в зависимости от окружения
// URLs, endpoints и т.д.

export const CONFIG = {

    API_ENDPOINTS: {
        AUTH: 'https://api.directual.com/good/api/v5/auth?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b',
        REG: 'https://api.directual.com/good/api/v5/data/registration/newUser?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        ADD_TEST_OBJ: 'https://api.directual.com/good/api/v5/data/testApi/newTestUser?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        EDIT_DEL_TEST_OBJ: 'https://api.directual.com/good/api/v5/data/inputtestapi/editTestObjects?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        ACTIVE_REMS: 'https://api.directual.com/good/api/v5/data/reminds/activeReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        COMPLETE_REMS: 'https://api.directual.com/good/api/v5/data/reminds/completedReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        GRAFT_REM: 'https://api.directual.com/good/api/v5/data/inputremind/newDraftRemind?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        CONFIRM_REM: 'https://api.directual.com/good/api/v5/data/inputremind/confirmRemind?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    },
};
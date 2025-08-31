// Конфигурация приложения - динамические настройки
// Всё, что может меняться в зависимости от окружения
// URLs, endpoints и т.д.

const http = 'https://api.directual.com/good/api/v5/';

export const CONFIG = {

    API_ENDPOINTS: {
        AUTH: http + 'auth?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b',
        REG: http + 'data/registration/newUser?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        ADD_TEST_OBJ: http + 'data/testApi/newTestUser?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        EDIT_DEL_TEST_OBJ: http + 'data/inputtestapi/editTestObjects?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        ACTIVE_REMS: http + 'data/reminds/activeReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        COMPLETE_REMS: http + 'data/reminds/completedReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        GRAFT_REM: http + 'data/inputremind/newDraftRemind?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
        CONFIRM_REM: http + 'data/inputremind/confirmRemind?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    },
};
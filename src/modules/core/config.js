// Конфигурация приложения - динамические настройки
// Всё, что может меняться в зависимости от окружения
// URLs, endpoints и т.д.

export const apiEndpoints = {
    auth: 'https://api.directual.com/good/api/v5/auth?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b',
    reg: 'https://api.directual.com/good/api/v5/data/registration/newUser?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    addTestUser: 'https://api.directual.com/good/api/v5/data/testApi/newTestUser?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    editDelTestUser: 'https://api.directual.com/good/api/v5/data/inputtestapi/editTestObjects?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    activeRems: 'https://api.directual.com/good/api/v5/data/reminds/activeReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    completeRems: 'https://api.directual.com/good/api/v5/data/reminds/completedReminders?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    graftRem: 'https://api.directual.com/good/api/v5/data/inputremind/newDraftRemind?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
    confirmRem: 'https://api.directual.com/good/api/v5/data/inputremind/confirmRemind?appID=640a9d7b-5015-4ea0-8206-a4eddcef054b&sessionID=',
};
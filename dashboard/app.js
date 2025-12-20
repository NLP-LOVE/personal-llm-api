const app = {
  "type": "app",
  "brandName": "LLM Manage",
  "logo": "/static/images/logo.png",
  "header": {
    "type": "page",
    "body": [
        {
            "type": "flex",
            "justify": "flex-end",
            "items": [
                {
                    "label": "退出登录",
                    "type": "button",
                    "icon": "fa fa-sign-out",
                    "actionType": "dialog",
                    "level": "danger",
                    "dialog": {
                      "title": "弹框",
                      "body": "确定退出登录吗？",
                      "onEvent": {
                          "confirm": {
                            "actions": [
                              {
                                "actionType": "ajax",
                                "api": "get:/backend/logout"
                              },
                              {
                                "actionType": "refresh"
                              }
                            ]
                          }
                      }
                    }
                }
            ]
        }
    ]
  },
  "footer": "<div class=\"p-2 text-center bg-light\" style=\"font-size: 14px !important;\">Version: 1.0 / Created by <a href=\"https://github.com/NLP-LOVE/personal-llm-api\" target=\"_blank\" style=\"font-color: #000000;\">🐱personal-llm-api</a></div>",
  "asideBefore": "<div class=\"p-2 text-center\"></div>",
  "api": {
    "method": "get",
    "url": "/dashboard/aside.json",
    "headers": {
      "Cache-Control": "no-cache"
    }
  }
}
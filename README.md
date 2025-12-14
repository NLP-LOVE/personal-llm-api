# 🎆Personal LLM API

Personal LLM API 是一款轻量级的 LLM 模型接口服务，与 [one-api](https://github.com/songquanpeng/one-api) 相比，本项目更加简洁易用，专为个人用户打造统一的 LLM 接口管理方案。基于 Python 开发，采用 FastAPI 框架实现高性能接口服务，后台管理界面使用 amis 低代码开发，无需复杂的前端技术即可快速构建管理控制台。

项目特点：
- 🧿极简架构：核心代码精简，易于理解和部署
- 🐍Python 原生：全栈 Python 实现，降低技术栈复杂度
- 📜低代码后台管理：基于 [amis](https://aisuda.bce.baidu.com/amis/zh-CN/docs/index) 构建的管理界面，可视化配置更高效
- 🛞高度可扩展：后台管理支持轻松添加新的模型提供商和接口；轻松扩展定制化代码与功能。
- 👩‍💻个人友好：资源占用低，适合个人服务器部署，运行 Python 入口文件即可。
- 📱可搭配各种 LLM 对话客户端：可与 [cherry studio](https://www.cherry-ai.com/) 、[Lobe-Chat](https://lobechat.com/chat)、[ChatBox](https://chatboxai.app/zh/)等应用无缝集成，扩展应用场景

支持多种主流模型提供商（火山云、阿里云、硅基流动、OpenRouter 等），兼容 OpenAI API 规范，提供流式/非流式响应、Web 搜索(火山云response接口)集成等核心功能，是个人开发者快速部署统一 LLM 接口的理想选择。

create table if not exists llm_provider
(
    id                    BIGINT   not null primary key,
    provider_name         VARCHAR(100) null comment 'LLM提供商名称',
    provider_english_name VARCHAR(50)  null comment 'LLM提供商英文名',
    api_key               VARCHAR(100) null,
    base_url              VARCHAR(100) null,
    create_time           DATETIME null,
    update_time           DATETIME null
) comment 'LLM提供商表';


create table if not exists llm_model
(
    id                    BIGINT   not null primary key,
    provider_english_name VARCHAR(50)  null comment 'LLM提供商英文名',
    model_name            VARCHAR(50)  null comment 'LLM模型名称',
    model_id    VARCHAR(50)  null comment 'LLM模型ID',
    input_unit_price      FLOAT null comment 'LLM模型输入单价',
    output_unit_price     FLOAT null comment 'LLM模型输出单价',
    status                TINYINT      null comment 'LLM模型状态, 0: 禁用, 1: 启用',
    create_time           DATETIME null,
    update_time           DATETIME null
) comment 'LLM模型表';

create index llm_model_provider_english_name_index
    on llm_model (provider_english_name);

create index llm_model_status_index
    on llm_model (status);



create table if not exists llm_user
(
    id          BIGINT   not null primary key,
    username    VARCHAR(50)  null,
    password    VARCHAR(50)  null,
    api_key     VARCHAR(100) null comment 'LLM用户API Key',
    create_time DATETIME null
) comment 'LLM用户表';

create index llm_user_username_index
    on llm_user (username);

create index llm_user_password_index
    on llm_user (password);


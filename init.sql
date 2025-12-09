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



create table if not exists llm_chat_history
(
    id                BIGINT                             not null primary key,
    context           TEXT                            null comment '上下文json',
    prompt            TEXT                            null,
    answer            TEXT                            null,
    provider_name     VARCHAR(100)                           null comment 'LLM服务商名称',
    model_name        VARCHAR(50)                            null,
    model_id          VARCHAR(50)                            null,
    api_key_id        INT                             null comment 'API密钥ID',
    prompt_tokens     INT      default 0                 null,
    completion_tokens INT      default 0                 null,
    input_price       FLOAT default 0                 null comment '输入价格',
    output_price      FLOAT default 0                 null comment '输出价格',
    create_time       DATETIME default CURRENT_TIMESTAMP null,
    create_day        VARCHAR(10)                           null,
    create_month      VARCHAR(7)                            null,
    create_year       VARCHAR(4)                            null,
    update_time       DATETIME                           null
);

create index llm_chat_history_create_time_index
    on llm_chat_history (create_time);

create index llm_chat_history_create_day_index
    on llm_chat_history (create_day);
create index llm_chat_history_create_month_index
    on llm_chat_history (create_month);
create index llm_chat_history_create_year_index
    on llm_chat_history (create_year);


create index llm_chat_history_model_id_index
    on llm_chat_history (model_id);

create index llm_chat_history_model_name_index
    on llm_chat_history (model_name);

create index llm_chat_history_provider_name_index
    on llm_chat_history (provider_name);

create index llm_chat_history_id_index
    on llm_chat_history (id desc);

create index llm_chat_history_api_key_id_index
    on llm_chat_history (api_key_id);



create table llm_api_keys
(
    api_key_id  int auto_increment primary key,
    api_key     varchar(100)           null,
    remark      varchar(150)           null,
    is_use      tinyint  default 1     null comment '是否可用',
    is_delete   tinyint  default 0     null comment '是否删除',
    create_time datetime default now() null,
    update_time datetime default now() null
)
    comment '接口密钥表';

create index llm_api_keys_api_key_index
    on llm_api_keys (api_key);

create index llm_api_keys_is_use_index
    on llm_api_keys (is_use);

create index llm_api_keys_is_delete_index
    on llm_api_keys (is_delete);



create table if not exists llm_user
(
    id          BIGINT   not null primary key,
    username    VARCHAR(50)  null,
    password    VARCHAR(50)  null,
    is_first_login TINYINT   null comment '是否第一次登录, 0: 否, 1: 是',
    create_time DATETIME default now() null
) comment 'LLM用户表';

create index llm_user_username_index
    on llm_user (username);

create index llm_user_password_index
    on llm_user (password);

INSERT INTO personal_llm.llm_user (id, username, password, is_first_login) VALUES (1, 'stark', '12345678', 1);


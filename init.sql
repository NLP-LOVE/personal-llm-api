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
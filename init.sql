create table api_provider
(
    id                    BIGINT(19)   not null
        primary key,
    provider_name         VARCHAR(100) null,
    provider_english_name VARCHAR(50)  null,
    service_key           VARCHAR(100) null,
    service_url           VARCHAR(100) null,
    create_time           DATETIME(19) null,
    update_time           DATETIME(19) null
);
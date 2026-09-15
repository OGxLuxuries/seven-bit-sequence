create table roles
(
    id        integer generated always as identity
        primary key,
    role_name varchar(50) not null
        unique
);

alter table roles
    owner to innocenziorizzuto;

create table users
(
    id         integer generated always as identity
        primary key,
    role_id    integer
        references roles,
    full_name  varchar(100) not null,
    email      varchar(255) not null
        unique,
    created_at timestamp with time zone default CURRENT_TIMESTAMP
);

alter table users
    owner to innocenziorizzuto;

create table gateway
(
    id           integer generated always as identity
        primary key,
    gateway_code varchar(50) not null
        unique,
    ip_address   varchar(45),
    status       varchar(20) default 'active'::character varying,
    last_ping    timestamp with time zone
);

alter table gateway
    owner to innocenziorizzuto;

create table node
(
    id            integer generated always as identity
        primary key,
    gateway_id    integer
        references gateway,
    node_code     varchar(50) not null
        unique,
    battery_level numeric(5, 2),
    status        varchar(20)              default 'active'::character varying,
    installed_at  timestamp with time zone default CURRENT_TIMESTAMP
);

alter table node
    owner to innocenziorizzuto;

create table buckets
(
    id              integer generated always as identity
        primary key,
    node_id         integer
        references node,
    capacity_liters numeric(6, 2),
    tree_species    varchar(50),
    installed_at    timestamp with time zone default CURRENT_TIMESTAMP
);

alter table buckets
    owner to innocenziorizzuto;

create table alerts
(
    id          integer generated always as identity
        primary key,
    node_id     integer
        references node,
    alert_type  varchar(50) not null,
    severity    varchar(20)              default 'warning'::character varying,
    message     text,
    is_resolved boolean                  default false,
    created_at  timestamp with time zone default CURRENT_TIMESTAMP
);

alter table alerts
    owner to innocenziorizzuto;

create table collection_logs
(
    id                      integer generated always as identity
        primary key,
    user_id                 integer
        references users,
    node_id                 integer
        references node,
    bucket_id               integer
        references buckets,
    volume_collected_liters numeric(6, 2) not null,
    collected_at            timestamp with time zone default CURRENT_TIMESTAMP
);

alter table collection_logs
    owner to innocenziorizzuto;

create table metrics
(
    id                  integer generated always as identity
        primary key,
    recorded_by_user_id integer
        references users,
    node_id             integer
        references node,
    bucket_id           integer
        references buckets,
    fill_level_percent  numeric(5, 2),
    sap_flow_rate_lph   numeric(6, 2),
    recorded_at         timestamp with time zone default CURRENT_TIMESTAMP
);

alter table metrics
    owner to innocenziorizzuto;

create table societies
(
    society_id serial
        primary key,
    name       varchar(255)                        not null,
    created_at timestamp default CURRENT_TIMESTAMP not null
);

alter table societies
    owner to innocenziorizzuto;



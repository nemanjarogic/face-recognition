-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    submitted_photos bigint NOT NULL DEFAULT 0,
    registred_time timestamp without time zone,
    recognized_faces bigint NOT NULL DEFAULT 0,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)

)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;
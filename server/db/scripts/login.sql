-- Table: public.login

-- DROP TABLE public.login;

CREATE TABLE public.login
(
    id integer NOT NULL DEFAULT nextval('login_id_seq'::regclass),
    hash character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT login_pkey PRIMARY KEY (id),
    CONSTRAINT login_email_key UNIQUE (email)

)

TABLESPACE pg_default;

ALTER TABLE public.login
    OWNER to postgres;
-- Table: public.recognitions

-- DROP TABLE public.recognitions;

CREATE TABLE public.recognitions
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    description character varying(1024) COLLATE pg_catalog."default",
    original_photo_url character varying(2048) COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    short_code character varying(64) COLLATE pg_catalog."default" NOT NULL,
    short_photo_url character varying(128) COLLATE pg_catalog."default" NOT NULL,
    created_time timestamp(6) with time zone NOT NULL,
    CONSTRAINT recognitions_pkey PRIMARY KEY (id),
    CONSTRAINT short_code UNIQUE (short_code)
,
    CONSTRAINT short_photo_url UNIQUE (short_photo_url)
,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.recognitions
    OWNER to postgres;
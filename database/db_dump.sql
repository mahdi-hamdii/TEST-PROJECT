--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- ALTER TABLE ONLY public.task DROP CONSTRAINT "FK_91440d017e7b30d2ac16a27d762";
-- ALTER TABLE ONLY public.sprint DROP CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8";
-- ALTER TABLE ONLY public.developers DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710";
-- ALTER TABLE ONLY public.task DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e";
-- ALTER TABLE ONLY public.sprint DROP CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7";
-- ALTER TABLE ONLY public.developers DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
-- DROP TABLE public.developers;
-- DROP TABLE public.typeorm_metadata;
-- DROP TABLE public.sprint;
-- DROP TABLE public.task;
-- DROP EXTENSION "uuid-ossp";
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: task; Type: TABLE; Schema: public; Owner: Hamdi.Mahdi
--

CREATE TABLE public.task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "sprintId" uuid
);


ALTER TABLE public.task OWNER TO "Hamdi.Mahdi";

--
-- Name: sprint; Type: TABLE; Schema: public; Owner: Hamdi.Mahdi
--

CREATE TABLE public.sprint (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description text,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedOn" timestamp without time zone DEFAULT now() NOT NULL,
    "ownerId" uuid
);


ALTER TABLE public.sprint OWNER TO "Hamdi.Mahdi";

--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: Hamdi.Mahdi
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO "Hamdi.Mahdi";

--
-- Name: developers; Type: TABLE; Schema: public; Owner: Hamdi.Mahdi
--

CREATE TABLE public.developers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    developername character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    "createdOn" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedOn" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.developers OWNER TO "Hamdi.Mahdi";

--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: Hamdi.Mahdi
--

INSERT INTO public.task VALUES ('0166fa6b-22f1-4bac-b715-6e878cdece90', 'Add edit button', '2022-05-28 10:39:21.709886', '9104c0ef-d6af-47ef-9bbd-7b71ab0e4e26');
INSERT INTO public.task VALUES ('5ec85af9-ecf2-4a39-b772-5c8df018967c', 'Add delete button', '2022-05-28 10:39:21.709886', '9104c0ef-d6af-47ef-9bbd-7b71ab0e4e26');
INSERT INTO public.task VALUES ('098fd1ea-ecb0-4693-9128-8e2a5b96eeb4', 'restyle table', '2022-05-28 10:39:21.746085', 'f794689b-a9e2-4404-8aa4-34192f6b8003');
INSERT INTO public.task VALUES ('afc3f140-c4e0-4770-a014-095de6a9fb4f', 'restyle login page', '2022-05-28 10:39:21.746085', 'f794689b-a9e2-4404-8aa4-34192f6b8003');


--
-- Data for Name: sprint; Type: TABLE DATA; Schema: public; Owner: Hamdi.Mahdi
--

INSERT INTO public.sprint VALUES ('9104c0ef-d6af-47ef-9bbd-7b71ab0e4e26', 'initialisation Sprint ', NULL, '2022-05-28 10:39:21.709886', '2022-05-28 10:39:21.709886', '57603cd2-533c-4791-8adc-cf3ac1448b7d');
INSERT INTO public.sprint VALUES ('f794689b-a9e2-4404-8aa4-34192f6b8003', 'First Sprint', NULL, '2022-05-28 10:39:21.746085', '2022-05-28 10:39:21.746085', NULL);
INSERT INTO public.sprint VALUES ('d9e6d085-6602-43e0-a4f6-2a0c1363d4bc', 'Sprint Retro', NULL, '2022-05-28 10:39:21.963358', '2022-05-28 10:39:21.963358', NULL);
INSERT INTO public.sprint VALUES ('fd097652-1cfa-4c98-bff8-d85efc43b007', 'Third sprint', NULL, '2022-05-28 10:39:21.964897', '2022-05-28 10:39:21.964897', '57603cd2-533c-4791-8adc-cf3ac1448b7d');
INSERT INTO public.sprint VALUES ('45123a60-ae65-4911-8ee3-d5a2e7b4a87d', 'Third Retro spring', NULL, '2022-05-28 10:39:21.974114', '2022-05-28 10:39:21.974114', '57603cd2-533c-4791-8adc-cf3ac1448b7d');
INSERT INTO public.sprint VALUES ('8d1a2250-b4bf-4c91-8ad7-7c973b65962f', 'Final sprint', 'final sprint list', '2022-05-28 10:39:21.998489', '2022-05-28 10:39:21.998489', NULL);


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: Hamdi.Mahdi
--



--
-- Data for Name: developers; Type: TABLE DATA; Schema: public; Owner: Hamdi.Mahdi
--

INSERT INTO public.developers VALUES ('57603cd2-533c-4791-8adc-cf3ac1448b7d', 'Hamdi.Mahdi', '$2b$10$wEtaRojLcNAtzfb4BmWp4ulaUBIQYrAqD8CaL9Hof/GI8KMJqN9I.', 'mahdihamdi@live.fr', '2022-05-28 10:39:21.558171', '2022-05-28 10:39:21.558171');


--
-- Name: developers PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: Hamdi.Mahdi
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: sprint PK_d429b7114371f6a35c5cb4776a7; Type: CONSTRAINT; Schema: public; Owner: Hamdi.Mahdi
--

ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY (id);


--
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: Hamdi.Mahdi
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- Name: developers UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: Hamdi.Mahdi
--

ALTER TABLE ONLY public.developers
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (developername);


--
-- Name: sprint FK_05552e862619dc4ad7ec8fc9cb8; Type: FK CONSTRAINT; Schema: public; Owner: Hamdi.Mahdi
--

ALTER TABLE ONLY public.sprint
    ADD CONSTRAINT "FK_05552e862619dc4ad7ec8fc9cb8" FOREIGN KEY ("ownerId") REFERENCES public.developers(id);


--
-- Name: task FK_91440d017e7b30d2ac16a27d762; Type: FK CONSTRAINT; Schema: public; Owner: Hamdi.Mahdi
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_91440d017e7b30d2ac16a27d762" FOREIGN KEY ("sprintId") REFERENCES public.sprint(id);


--
-- PostgreSQL database dump complete
--


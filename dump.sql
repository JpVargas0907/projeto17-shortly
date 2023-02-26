--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: public.urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.urls" (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" character varying(50) NOT NULL,
    "createdAt" date DEFAULT '2023-02-26'::date NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: public.urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.urls_id_seq" OWNED BY public."public.urls".id;


--
-- Name: public.users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.users" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT '2023-02-26'::date NOT NULL
);


--
-- Name: public.users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.users_id_seq" OWNED BY public."public.users".id;


--
-- Name: public.urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.urls" ALTER COLUMN id SET DEFAULT nextval('public."public.urls_id_seq"'::regclass);


--
-- Name: public.users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users" ALTER COLUMN id SET DEFAULT nextval('public."public.users_id_seq"'::regclass);


--
-- Data for Name: public.urls; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: public.users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: public.urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.urls_id_seq"', 1, false);


--
-- Name: public.users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.users_id_seq"', 1, false);


--
-- Name: public.users public.users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT "public.users_email_key" UNIQUE (email);


--
-- Name: public.urls urls_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.urls"
    ADD CONSTRAINT urls_pk PRIMARY KEY (id);


--
-- Name: public.users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.users"
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


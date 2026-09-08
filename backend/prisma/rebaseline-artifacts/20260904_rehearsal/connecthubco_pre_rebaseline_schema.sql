--
-- PostgreSQL database dump
--

\restrict 5q07xUsFevb3cEVEoRMAB1lfyFx9fGKfl2NyEbowaneBdVLoe135HS6Hw9bNMZO

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: GovernanceAction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GovernanceAction" AS ENUM (
    'CREATE',
    'EDIT',
    'FOUNDER_APPROVE',
    'ERP_LOCK',
    'PUBLISH',
    'SUPERSEDE',
    'ROLLBACK',
    'ARCHIVE'
);


--
-- Name: GovernanceStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GovernanceStatus" AS ENUM (
    'DRAFT',
    'FOUNDER_APPROVED',
    'ERP_LOCKED',
    'PUBLISHED',
    'SUPERSEDED',
    'ARCHIVED'
);


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserRole" AS ENUM (
    'FOUNDER',
    'ADMIN',
    'CUSTOMER',
    'RELIGIOUS_PARTNER'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Customer" (
    id text NOT NULL,
    email text,
    country text,
    city text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "assignedTo" text,
    "fullName" text NOT NULL,
    mobile text NOT NULL,
    purpose text NOT NULL,
    remarks text,
    "serviceType" text,
    state text,
    status text DEFAULT 'New'::text NOT NULL,
    whatsapp text
);


--
-- Name: GovernanceAuditLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GovernanceAuditLog" (
    id text NOT NULL,
    "contentType" text NOT NULL,
    "contentId" text NOT NULL,
    "contentKey" text,
    version integer NOT NULL,
    action public."GovernanceAction" NOT NULL,
    "actorUserId" text,
    "actorRole" public."UserRole" NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: KnowledgeArticle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KnowledgeArticle" (
    id text NOT NULL,
    category text NOT NULL,
    "categoryTitle" text NOT NULL,
    title text NOT NULL,
    keywords text[],
    synonyms text[],
    summary text NOT NULL,
    content text NOT NULL,
    link text NOT NULL,
    status text DEFAULT 'DRAFT'::text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "contentKey" text,
    "createdBy" text,
    "erpLockedAt" timestamp(3) without time zone,
    "erpLockedBy" text,
    "founderApprovedAt" timestamp(3) without time zone,
    "founderApprovedBy" text,
    "governanceStatus" public."GovernanceStatus" DEFAULT 'DRAFT'::public."GovernanceStatus" NOT NULL,
    "lastEditedBy" text,
    "publishedVersionId" text
);


--
-- Name: KnowledgeArticleHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KnowledgeArticleHistory" (
    id text NOT NULL,
    "articleId" text NOT NULL,
    version integer NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    content text NOT NULL,
    link text NOT NULL,
    status text NOT NULL,
    "changedBy" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    action public."GovernanceAction",
    "changedByRole" public."UserRole",
    metadata jsonb
);


--
-- Name: KnowledgeFAQ; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KnowledgeFAQ" (
    id text NOT NULL,
    category text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    keywords text[],
    link text NOT NULL,
    status text DEFAULT 'DRAFT'::text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "contentKey" text,
    "createdBy" text,
    "erpLockedAt" timestamp(3) without time zone,
    "erpLockedBy" text,
    "founderApprovedAt" timestamp(3) without time zone,
    "founderApprovedBy" text,
    "governanceStatus" public."GovernanceStatus" DEFAULT 'DRAFT'::public."GovernanceStatus" NOT NULL,
    "lastEditedBy" text,
    "publishedVersionId" text
);


--
-- Name: KnowledgeFAQHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KnowledgeFAQHistory" (
    id text NOT NULL,
    "faqId" text NOT NULL,
    version integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    link text NOT NULL,
    status text NOT NULL,
    "changedBy" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    action public."GovernanceAction",
    "changedByRole" public."UserRole",
    metadata jsonb
);


--
-- Name: PitruMokshaRequest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PitruMokshaRequest" (
    id text NOT NULL,
    "specialRequirements" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "assignedPartner" text,
    city text,
    country text,
    "customerName" text NOT NULL,
    "documentationRequired" boolean DEFAULT false NOT NULL,
    email text,
    "founderRemarks" text,
    language text,
    mobile text NOT NULL,
    "preferredDate" timestamp(3) without time zone,
    "preferredTime" text,
    "quotationStatus" text DEFAULT 'Pending'::text NOT NULL,
    "ritualType" text NOT NULL,
    "samagriRequired" boolean DEFAULT false NOT NULL,
    "serviceMode" text NOT NULL,
    state text,
    status text DEFAULT 'New'::text NOT NULL,
    "travelAssistance" boolean DEFAULT false NOT NULL,
    whatsapp text
);


--
-- Name: ReligiousPartner; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ReligiousPartner" (
    id text NOT NULL,
    email text,
    city text,
    country text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "addressVerified" boolean DEFAULT false NOT NULL,
    category text NOT NULL,
    "fullName" text NOT NULL,
    "identityVerified" boolean DEFAULT false NOT NULL,
    mobile text NOT NULL,
    "offlineAvailable" boolean DEFAULT true NOT NULL,
    "onlineAvailable" boolean DEFAULT true NOT NULL,
    "preferredServiceArea" text,
    "qualificationVerified" boolean DEFAULT false NOT NULL,
    "relocationAvailable" boolean DEFAULT false NOT NULL,
    remarks text,
    state text,
    status text DEFAULT 'Pending'::text NOT NULL,
    "verificationDate" timestamp(3) without time zone,
    whatsapp text,
    "userId" text
);


--
-- Name: UniversalRequest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UniversalRequest" (
    id text NOT NULL,
    "referenceId" text NOT NULL,
    "requestType" text NOT NULL,
    "serviceDomain" text,
    "customerId" text,
    "guestName" text NOT NULL,
    "guestPhone" text NOT NULL,
    "guestEmail" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "currentStatus" text DEFAULT 'SUBMITTED'::text NOT NULL,
    "currentStage" text DEFAULT 'Submitted'::text NOT NULL,
    "assignedTeam" text,
    "assignedPartnerUserId" text,
    priority text DEFAULT 'MEDIUM'::text NOT NULL,
    "sourceChannel" text DEFAULT 'WEBSITE_FORM'::text NOT NULL,
    "publicNote" text,
    "internalNote" text,
    metadata jsonb,
    "completedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UniversalRequestStatusHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UniversalRequestStatusHistory" (
    id text NOT NULL,
    "requestId" text NOT NULL,
    "previousStatus" text,
    "newStatus" text NOT NULL,
    "previousStage" text,
    "newStage" text NOT NULL,
    "changedByUserId" text,
    "changedByRole" text NOT NULL,
    "publicNote" text,
    "internalNote" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."UserRole" DEFAULT 'CUSTOMER'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "fullName" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: GovernanceAuditLog GovernanceAuditLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GovernanceAuditLog"
    ADD CONSTRAINT "GovernanceAuditLog_pkey" PRIMARY KEY (id);


--
-- Name: KnowledgeArticleHistory KnowledgeArticleHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KnowledgeArticleHistory"
    ADD CONSTRAINT "KnowledgeArticleHistory_pkey" PRIMARY KEY (id);


--
-- Name: KnowledgeArticle KnowledgeArticle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KnowledgeArticle"
    ADD CONSTRAINT "KnowledgeArticle_pkey" PRIMARY KEY (id);


--
-- Name: KnowledgeFAQHistory KnowledgeFAQHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KnowledgeFAQHistory"
    ADD CONSTRAINT "KnowledgeFAQHistory_pkey" PRIMARY KEY (id);


--
-- Name: KnowledgeFAQ KnowledgeFAQ_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KnowledgeFAQ"
    ADD CONSTRAINT "KnowledgeFAQ_pkey" PRIMARY KEY (id);


--
-- Name: PitruMokshaRequest PitruMokshaRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PitruMokshaRequest"
    ADD CONSTRAINT "PitruMokshaRequest_pkey" PRIMARY KEY (id);


--
-- Name: ReligiousPartner ReligiousPartner_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReligiousPartner"
    ADD CONSTRAINT "ReligiousPartner_pkey" PRIMARY KEY (id);


--
-- Name: UniversalRequestStatusHistory UniversalRequestStatusHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UniversalRequestStatusHistory"
    ADD CONSTRAINT "UniversalRequestStatusHistory_pkey" PRIMARY KEY (id);


--
-- Name: UniversalRequest UniversalRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UniversalRequest"
    ADD CONSTRAINT "UniversalRequest_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: GovernanceAuditLog_action_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "GovernanceAuditLog_action_createdAt_idx" ON public."GovernanceAuditLog" USING btree (action, "createdAt");


--
-- Name: GovernanceAuditLog_actorUserId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "GovernanceAuditLog_actorUserId_createdAt_idx" ON public."GovernanceAuditLog" USING btree ("actorUserId", "createdAt");


--
-- Name: GovernanceAuditLog_contentType_contentId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "GovernanceAuditLog_contentType_contentId_createdAt_idx" ON public."GovernanceAuditLog" USING btree ("contentType", "contentId", "createdAt");


--
-- Name: KnowledgeArticleHistory_articleId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeArticleHistory_articleId_createdAt_idx" ON public."KnowledgeArticleHistory" USING btree ("articleId", "createdAt");


--
-- Name: KnowledgeArticleHistory_articleId_version_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeArticleHistory_articleId_version_idx" ON public."KnowledgeArticleHistory" USING btree ("articleId", version);


--
-- Name: KnowledgeArticle_category_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeArticle_category_status_idx" ON public."KnowledgeArticle" USING btree (category, status);


--
-- Name: KnowledgeArticle_contentKey_governanceStatus_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KnowledgeArticle_contentKey_governanceStatus_key" ON public."KnowledgeArticle" USING btree ("contentKey", "governanceStatus");


--
-- Name: KnowledgeArticle_contentKey_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeArticle_contentKey_idx" ON public."KnowledgeArticle" USING btree ("contentKey");


--
-- Name: KnowledgeArticle_governanceStatus_contentKey_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeArticle_governanceStatus_contentKey_idx" ON public."KnowledgeArticle" USING btree ("governanceStatus", "contentKey");


--
-- Name: KnowledgeFAQHistory_faqId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeFAQHistory_faqId_createdAt_idx" ON public."KnowledgeFAQHistory" USING btree ("faqId", "createdAt");


--
-- Name: KnowledgeFAQHistory_faqId_version_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeFAQHistory_faqId_version_idx" ON public."KnowledgeFAQHistory" USING btree ("faqId", version);


--
-- Name: KnowledgeFAQ_category_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeFAQ_category_status_idx" ON public."KnowledgeFAQ" USING btree (category, status);


--
-- Name: KnowledgeFAQ_contentKey_governanceStatus_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KnowledgeFAQ_contentKey_governanceStatus_key" ON public."KnowledgeFAQ" USING btree ("contentKey", "governanceStatus");


--
-- Name: KnowledgeFAQ_contentKey_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeFAQ_contentKey_idx" ON public."KnowledgeFAQ" USING btree ("contentKey");


--
-- Name: KnowledgeFAQ_governanceStatus_contentKey_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KnowledgeFAQ_governanceStatus_contentKey_idx" ON public."KnowledgeFAQ" USING btree ("governanceStatus", "contentKey");


--
-- Name: ReligiousPartner_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ReligiousPartner_userId_key" ON public."ReligiousPartner" USING btree ("userId");


--
-- Name: UniversalRequestStatusHistory_requestId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UniversalRequestStatusHistory_requestId_createdAt_idx" ON public."UniversalRequestStatusHistory" USING btree ("requestId", "createdAt");


--
-- Name: UniversalRequest_assignedPartnerUserId_currentStatus_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UniversalRequest_assignedPartnerUserId_currentStatus_idx" ON public."UniversalRequest" USING btree ("assignedPartnerUserId", "currentStatus");


--
-- Name: UniversalRequest_customerId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UniversalRequest_customerId_createdAt_idx" ON public."UniversalRequest" USING btree ("customerId", "createdAt");


--
-- Name: UniversalRequest_referenceId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UniversalRequest_referenceId_key" ON public."UniversalRequest" USING btree ("referenceId");


--
-- Name: UniversalRequest_requestType_currentStatus_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UniversalRequest_requestType_currentStatus_idx" ON public."UniversalRequest" USING btree ("requestType", "currentStatus");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: KnowledgeArticleHistory KnowledgeArticleHistory_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KnowledgeArticleHistory"
    ADD CONSTRAINT "KnowledgeArticleHistory_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public."KnowledgeArticle"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KnowledgeFAQHistory KnowledgeFAQHistory_faqId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KnowledgeFAQHistory"
    ADD CONSTRAINT "KnowledgeFAQHistory_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES public."KnowledgeFAQ"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReligiousPartner ReligiousPartner_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReligiousPartner"
    ADD CONSTRAINT "ReligiousPartner_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UniversalRequestStatusHistory UniversalRequestStatusHistory_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UniversalRequestStatusHistory"
    ADD CONSTRAINT "UniversalRequestStatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."UniversalRequest"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UniversalRequest UniversalRequest_assignedPartnerUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UniversalRequest"
    ADD CONSTRAINT "UniversalRequest_assignedPartnerUserId_fkey" FOREIGN KEY ("assignedPartnerUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UniversalRequest UniversalRequest_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UniversalRequest"
    ADD CONSTRAINT "UniversalRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict 5q07xUsFevb3cEVEoRMAB1lfyFx9fGKfl2NyEbowaneBdVLoe135HS6Hw9bNMZO


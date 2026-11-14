CREATE TABLE "public"."disease_use" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "drug_id"     uuid                     NOT NULL,
  "description" text                     NOT NULL,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "disease_use_drug_id_description_key" UNIQUE (drug_id, description),
  CONSTRAINT "disease_use_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."disease_use"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."drug" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "generic_name"        text                     NOT NULL,
  "mechanism_of_action" text                     NOT NULL,
  "created_at"          timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "drug_generic_name_key" UNIQUE (generic_name),
  CONSTRAINT "drug_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."drug"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."trade_name" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "drug_id"    uuid                     NOT NULL,
  "name"       text                     NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "trade_name_drug_id_name_key" UNIQUE (drug_id, name),
  CONSTRAINT "trade_name_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."trade_name"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."disease_use"
  ADD CONSTRAINT "disease_use_drug_id_fkey" FOREIGN KEY (drug_id) REFERENCES public.drug(id) ON DELETE CASCADE;

ALTER TABLE "public"."trade_name"
  ADD CONSTRAINT "trade_name_drug_id_fkey" FOREIGN KEY (drug_id) REFERENCES public.drug(id) ON DELETE CASCADE;

CREATE INDEX idx_disease_use_drug_id ON public.disease_use USING btree (drug_id);

CREATE INDEX idx_trade_name_drug_id ON public.trade_name USING btree (drug_id);

CREATE POLICY "Anonymous read disease uses" ON "public"."disease_use"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Anonymous read drugs" ON "public"."drug"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Anonymous read trade names" ON "public"."trade_name"
  FOR SELECT
  TO "anon"
  USING (true);

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."disease_use" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."disease_use" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."disease_use" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."disease_use" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."drug" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."drug" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."drug" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."drug" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."trade_name" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."trade_name" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."trade_name" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."trade_name" TO "service_role";


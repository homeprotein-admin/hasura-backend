CREATE TABLE "public"."free_trial_requests" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "mobile" text NOT NULL, "whatsapp" text NOT NULL, "address_line_1" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "pincode" text NOT NULL, "delivery_date_requested" date NOT NULL, "payment_id" uuid, PRIMARY KEY ("id") , FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_free_trial_requests_updated_at"
BEFORE UPDATE ON "public"."free_trial_requests"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_free_trial_requests_updated_at" ON "public"."free_trial_requests"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

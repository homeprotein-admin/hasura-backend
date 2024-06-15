CREATE TABLE "public"."subscriptions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "assigned_chef_id" uuid NOT NULL, "plan_id" integer NOT NULL, "payment_id" uuid NOT NULL, "amount_paid" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("assigned_chef_id") REFERENCES "public"."chefs"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_subscriptions_updated_at"
BEFORE UPDATE ON "public"."subscriptions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_subscriptions_updated_at" ON "public"."subscriptions"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

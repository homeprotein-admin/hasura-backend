CREATE TABLE "public"."orders" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "delivery_date" Date NOT NULL, "delivered_at" timestamptz NOT NULL, "meal_id" integer NOT NULL, "slot_id" integer NOT NULL, "status" text NOT NULL DEFAULT 'scheduled', "subscription_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("status") REFERENCES "public"."order_delivery_status"("value") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_orders_updated_at"
BEFORE UPDATE ON "public"."orders"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_orders_updated_at" ON "public"."orders"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

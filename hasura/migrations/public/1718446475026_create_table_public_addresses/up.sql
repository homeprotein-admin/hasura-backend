CREATE TABLE "public"."addresses" ("address_line_1" text NOT NULL, "address_line_2" text, "city" text NOT NULL, "state" text NOT NULL, "flat_no" text NOT NULL, "building_name" text, "floor" text, "landmark" text, "delivery_agent_notes" text, "address_type" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "recipient_name" text NOT NULL, "address_nickname" Text, "user_id" uuid NOT NULL, "chef_id" uuid, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("id") REFERENCES "public"."chefs"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("chef_id"));
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
CREATE TRIGGER "set_public_addresses_updated_at"
BEFORE UPDATE ON "public"."addresses"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_addresses_updated_at" ON "public"."addresses"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

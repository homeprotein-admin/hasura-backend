CREATE TABLE "public"."meals" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "meal_type" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("meal_type") REFERENCES "public"."diet_type"("value") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_meals_updated_at"
BEFORE UPDATE ON "public"."meals"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_meals_updated_at" ON "public"."meals"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

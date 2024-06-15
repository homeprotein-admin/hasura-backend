CREATE TABLE "public"."subscription_plans" ("plan_type" text NOT NULL, "id" serial NOT NULL, "current_price" integer NOT NULL, "name" text NOT NULL, "frequency" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("plan_type") REFERENCES "public"."subscription_plan_type"("value") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("frequency") REFERENCES "public"."subscription_plan_frequency"("value") ON UPDATE restrict ON DELETE restrict);
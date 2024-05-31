alter table "public"."subscription_plans"
  add constraint "subscription_plans_timing_fkey"
  foreign key ("timing")
  references "public"."subscription_plan_timing"
  ("value") on update restrict on delete restrict;

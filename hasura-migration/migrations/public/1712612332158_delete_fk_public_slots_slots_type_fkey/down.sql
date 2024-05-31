alter table "public"."slots"
  add constraint "slots_type_fkey"
  foreign key ("type")
  references "public"."subscription_plan_frequency"
  ("value") on update restrict on delete restrict;

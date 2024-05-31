alter table "public"."meals"
  add constraint "meals_type_fkey"
  foreign key ("type")
  references "public"."meal_type"
  ("value") on update restrict on delete restrict;

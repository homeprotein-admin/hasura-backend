alter table "public"."orders"
  add constraint "orders_meal_id_fkey"
  foreign key ("meal_id")
  references "public"."meals"
  ("id") on update restrict on delete restrict;

alter table "public"."orders"
  add constraint "orders_slot_id_fkey"
  foreign key ("slot_id")
  references "public"."slot"
  ("id") on update restrict on delete restrict;

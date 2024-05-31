alter table "public"."orders"
  add constraint "orders_status_fkey"
  foreign key ("status")
  references "public"."order_delivery_status"
  ("value") on update restrict on delete restrict;

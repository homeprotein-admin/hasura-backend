alter table "public"."subscriptions"
  add constraint "subscriptions_payment_id_fkey"
  foreign key ("payment_id")
  references "public"."payments"
  ("id") on update restrict on delete restrict;

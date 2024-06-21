alter table "public"."trial_requests" drop constraint "trial_requests_pkey";
alter table "public"."trial_requests"
    add constraint "free_trial_requests_pkey"
    primary key ("mobile", "id");

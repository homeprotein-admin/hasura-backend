BEGIN TRANSACTION;
ALTER TABLE "public"."trial_requests" DROP CONSTRAINT "free_trial_requests_pkey";

ALTER TABLE "public"."trial_requests"
    ADD CONSTRAINT "free_trial_requests_pkey" PRIMARY KEY ("id", "mobile");
COMMIT TRANSACTION;

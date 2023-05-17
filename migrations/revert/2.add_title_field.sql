-- Revert dogtolib:2.add_title_field from pg

BEGIN;

ALTER TABLE "reminder" 
DROP COLUMN "title";

COMMIT;

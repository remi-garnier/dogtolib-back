-- Deploy dogtolib:2.add_title_field to pg

BEGIN;

ALTER TABLE "reminder"
ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Rappel';

COMMIT;

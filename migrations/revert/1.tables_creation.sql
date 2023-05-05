-- Revert dogtolib:1.tables_creation from pg

BEGIN;

DROP TABLE "reminder", "account_has_favorite", "animal", "veterinary", "account";

COMMIT;

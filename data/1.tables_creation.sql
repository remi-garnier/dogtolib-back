-- Deploy dogtolib:1.tables_creation to pg

BEGIN;

CREATE TABLE "account" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "phone_number" TEXT,
  "password" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "zip_code" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  CHECK ("role" in ('V', 'O', 'A'))
);

CREATE TABLE "veterinary" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "payment_modes" TEXT,
  "opening_hour" TIME WITH TIME ZONE,
  "closing_hour" TIME WITH TIME ZONE,
  "account_id" INT NOT NULL REFERENCES "account"("id") ON DELETE CASCADE
);

CREATE TABLE "animal" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "birthdate" TIMESTAMPTZ NOT NULL,
  "specie" TEXT NOT NULL,
  "breed" TEXT,
  "memo" TEXT,
  "account_id" INT NOT NULL REFERENCES "account"("id") ON DELETE CASCADE
);

CREATE TABLE "account_has_favorite" (
  "account_id" INT REFERENCES "account"("id") ON DELETE CASCADE,
  "veterinary_id" INT REFERENCES "veterinary"("id") ON DELETE CASCADE,
  PRIMARY KEY("account_id", "veterinary_id")
);

CREATE TABLE "reminder" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL,
  "datetime" TIMESTAMPTZ NOT NULL,
  "animal_id" INT REFERENCES "animal"("id") ON DELETE CASCADE,
  "veterinary_id" INT REFERENCES "veterinary"("id") ON DELETE CASCADE
);

COMMIT;

BEGIN;
TRUNCATE TABLE "account_has_favorite", "account", "veterinary", "animal", "reminder" RESTART IDENTITY;

INSERT INTO "account" ("email", "firstname", "lastname", "phone_number", "password", "address", "zip_code", "city", "role")
VALUES
  ('test@machin.fr', 'nicolas', 'Rochet', '0123456789', 'test', '1 Boulevard de Belleville', '75000', 'Paris', 'O'),
  ('jean-louis@free.fr', 'jean-louis', 'Dupont', '0723456789', 'test', '1 avenue de neuilly', '75000', 'Paris', 'V'),
  ('pierre.durant@orange.fr', 'pierre', 'Durant', '0623456789', 'test', '1 boulevard lavillette', '75000', 'Paris', 'V'),
  ('paul.dupont@gmail.com', 'paul', 'Dupont', '0823456789', 'test', '1 avenue des champs Elysées', '75000', 'Paris', 'V'),
  ('jean.bon@gmail.com', 'jean', 'Bon', '0923456789', 'test', '1 rue de Vaugirard', '75000', 'Paris', 'V');

INSERT INTO "veterinary" ("payment_modes", "opening_hour", "closing_hour", "account_id")
VALUES
  ('CB', '09:00', '18:00', 2),
  ('CB', '10:00', '17:00', 3),
  ('CB', '11:00', '19:00', 4),
  ('CASH', '09:30', '18:30', 5);

INSERT INTO "animal" ("name", "birthdate", "specie", "breed", "memo", "account_id")
VALUES
  ('kiki', '01/01/1998', 'chien', 'labrador', 'chien très gentil', 1),
  ('rex', '02/03/2012', 'chien', 'caniche', '', 1);

INSERT INTO "account_has_favorite" ("account_id", "veterinary_id")
VALUES
  ('1', '2'),
  ('1', '4');

INSERT INTO "reminder" ("label", "datetime", "animal_id")
VALUES
  ('vaccin', '01/01/2024', 1),
  ('vaccin', '01/01/2025', 2);

INSERT INTO "reminder" ("label", "datetime", "veterinary_id")
VALUES
  ('rendez-vous', '01/01/2024', 2),
  ('rendez-vous', '01/01/2025', 3);
  
COMMIT;

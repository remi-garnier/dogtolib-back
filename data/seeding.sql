BEGIN;
TRUNCATE TABLE "account_has_favorite", "account", "veterinary", "animal", "reminder" RESTART IDENTITY;

INSERT INTO "account" ("email", "firstname", "lastname", "phone_number", "password", "address", "zip_code", "city", "role")
VALUES
  ('test@machin.fr', 'Nicolas', 'Rochet', '0123456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 Boulevard de Belleville', '75000', 'Paris', 'O'),
  ('test@test.fr', 'Rémi', 'Garnier', '0123456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 Boulevard de Belleville', '75000', 'Paris', 'O'),
  ('jean-louis@free.fr', 'jean-louis', 'Dupont', '0723456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 avenue de neuilly', '75000', 'Paris', 'V'),
  ('pierre.durant@orange.fr', 'pierre', 'Durant', '0623456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 boulevard lavillette', '75000', 'Paris', 'V'),
  ('paul.dupont@gmail.com', 'paul', 'Dupont', '0823456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 avenue des champs Elysées', '75000', 'Paris', 'V'),
  ('jean.bon@gmail.com', 'jean', 'Bon', '0923456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 rue de Vaugirard', '75000', 'Paris', 'V');

INSERT INTO "veterinary" ("payment_modes", "opening_hour", "closing_hour", "account_id")
VALUES
  ('CB', '09:00', '18:00', 3),
  ('CB', '10:00', '17:00', 4),
  ('CB', '11:00', '19:00', 5),
  ('CASH', '09:30', '18:30', 6);

INSERT INTO "animal" ("name", "birthdate", "specie", "breed", "memo", "account_id")
VALUES
  ('Kiki', '01/01/1998', 'chien', 'labrador', 'chien très gentil', 1),
  ('Rex', '02/03/2012', 'chien', 'caniche', '', 1),
  ('Croquette', '01/01/1998', 'chat', 'siamois', '', 1),
  ('Denver', '02/03/2012', 'autre', 'gecko', '', 1);

INSERT INTO "account_has_favorite" ("account_id", "veterinary_id")
VALUES
  ('1', '2'),
  ('1', '4');

INSERT INTO "reminder" ("label", "datetime", "animal_id")
VALUES
  ('vaccin', '01/01/2024', 1),
  ('vaccin', '01/01/2025', 2),
  ('antipuce', '01/01/2022', 2),
  ('vaccin encore', '16/05/2023 00:00:00.000Z', 1);
  
INSERT INTO "reminder" ("label", "datetime", "veterinary_id")
VALUES
  ('faire des trucs de veto', '01/01/2024', 1),
  ('aller chercher le pain', '01/01/2025', 1),
  ('stock croquette', '01/01/2022', 1),
  ('traitement anti-puce', '16/05/2023 00:00:00', 1);
COMMIT;

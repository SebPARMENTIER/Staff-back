BEGIN;

INSERT INTO "restaurant" ("name", "adress", "zip_code", "city", "phone", "email") VALUES
('MUNDO LATINO', '4 cours Jourdan', '87000', 'LIMOGES', '0555101055', 'mundolatino@gmail.com');

INSERT INTO "job" ("title") VALUES
('Barman'),
('Serveur'),
('Commis'),
('Chef'),
('Plongeur'),
('Gérant');

INSERT INTO "user" ("email", "password", "name", "firstname", "restaurant_id", "job_id") VALUES
('staff@staff.fr', 'motdepasse', 'STAFF', 'Sébastien', 1, 1);

INSERT INTO "card" ("title", "description", "restaurant_id") VALUES
('Printemps 2021', 'Carte printemps 2021 avec nouvelles salades', 1),
('Hiver 2022', 'Carte hiver 2022 avec nouvelles viandes', 1);

INSERT INTO "menu" ("title", "description", "price", "restaurant_id") VALUES
('Groupe 2021', 'Menu de groupe à partir de 6 personnes', '26€', 1),
('Enfant 2022', 'Menu enfant', '8€', 1);

INSERT INTO "drink_type" ("title") VALUES
('Apéritifs'),
('Cocktails'),
('Bières'),
('Sodas'),
('Eaux'),
('Vins'),
('Boissons chaudes'),
('Digestifs');

INSERT INTO "drink_kind" ("title") VALUES
('Sans alcool'),
('Avec alcool'),
('Plate'),
('Gazeuse'),
('Rouge'),
('Blanc'),
('Rosé');

INSERT INTO "drink" ("title", "description", "price", "drink_type_id", "drink_kind_id") VALUES
('PUNCH TROPICAL', 'Rhum, jus de fruits exotiques', '5€', 2, 2),
('MOJITO', 'Rhum cubain, citron vert, menthe fraîche, eau gazeuse, glace pilée', '5€', 2, 2),
('JANEIRO', 'Jus de fruits exotiques, sirop de fraises', '3€', 2, 1),
('RICARD', 'Apéritif anisé 2cl', '3€50', 1, 2),
('DESPERADOS', 'Bière aromatisée Téquila, quartier de citron vert', '4€', 3, 2),
('ORANGINA', 'Boisson gazeuse avec pulpe d''orange', '2€80', 4, 1),
('VITTEL', 'Eau de source 50cl', '2€80', 5, 3),
('GATO NEGRO', 'Vin chilien 75cl', '14€', 6, 5),
('COTE DE PROVENCE', 'Vin rosé 75cl', '15€', 6, 7),
('MONTBAZILLAC', 'Vin moelleux 75cl', '21€', 6, 6),
('CAFE', 'Expresso origine Brésil', '1€50', 7, 1),
('THE MENTHE', 'Thé vert avec feuilles de menthe fraîche', '2€', 7, 1),
('IRISH COFFEE', 'Sucre de canne, whisky, café, chantilly', '7€', 7, 2),
('GET 27', 'Alcool de menthe 6cl', '5€', 8, 2);

INSERT INTO "food_type" ("title") VALUES
('Entrées'),
('Plats'),
('Desserts');

INSERT INTO "food_kind" ("title") VALUES
('Classique'),
('Vegan'),
('Sans gluten'),
('Glaces'),
('Gateaux');

INSERT INTO "food" ("title", "description", "price", "food_type_id", "food_kind_id") VALUES
('Loca', 'Salade verte, tomate noire de Crimée, olives vertes, avocat', '5€', 1, 2),
('Banderilla de Boeuf', 'Pour les inconditionnels de la viande rouge, brochette de boeuf (origine France) aux épices, accompagnée d''une sauce rio et frites maison', '15€', 2, 1),
('Banderilla de Peixe', 'Brochette de vivanneau, gambas et filet de loup, accompagnée d''une sauce crustacés et riz aux épices du sud', '14€', 2, 1),
('Bambino', 'Jambons à l''os gratiné au parmesan accompagné de frites maison', '8€', 2, 1),
('COPA COCO', 'Glace coco, glace noisettes, chantilly, amandes grillées', '4€', 3, 4),
('FRAISIER', 'Fraisier sur coulis de fruits rouges', '4€', 3, 5);

INSERT INTO "card_has_drink" ("card_id", "drink_id") VALUES
(1, 2),
(1, 4),
(1, 6),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(2, 1),
(2, 3),
(2, 5),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14);

INSERT INTO "card_has_food" ("card_id", "food_id") VALUES
(1, 1),
(1, 3),
(1, 4),
(1, 5),
(2, 2),
(2, 4),
(2, 6);

INSERT INTO "menu_has_drink" ("menu_id", "drink_id") VALUES
(1, 1),
(1, 3),
(1, 8),
(1, 9),
(1, 11),
(2, 3),
(2, 6);

INSERT INTO "menu_has_food" ("menu_id", "food_id") VALUES
(1, 1),
(1, 2),
(1, 6),
(2, 4),
(2, 5);

COMMIT;
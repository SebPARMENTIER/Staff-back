BEGIN;

DROP TABLE IF EXISTS "restaurant",
"job",
"user",
"card",
"menu",
"drink_type",
"drink_kind",
"drink",
"food_type",
"food_kind",
"food",
"card_has_drink",
"card_has_food",
"menu_has_drink",
"menu_has_food";

-- -----------------------------------------------------
-- Table "restaurant"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "restaurant" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "zip_code" INT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" INT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "job"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "job" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "restaurant_id" INT REFERENCES "restaurant" ("id"),
    "job_id" INT REFERENCES "job" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "card"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "restaurant_id" INT REFERENCES "restaurant" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "menu"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "menu" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "restaurant_id" INT REFERENCES "restaurant" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "drink_type"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "drink_type" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "drink_kind"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "drink_kind" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "drink"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "drink" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "price" TEXT NOT NULL,
    "drink_type_id" INT REFERENCES "drink_type" ("id"),
    "drink_kind_id" INT REFERENCES "drink_kind" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "food_type"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_type" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "food_kind"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_kind" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "food"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NULL,
    "price" TEXT NOT NULL,
    "food_type_id" INT REFERENCES "food_type" ("id"),
    "food_kind_id" INT REFERENCES "food_kind" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "card_has_drink"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card_has_drink" (
    "card_id" INT REFERENCES "card" ("id"),
    "drink_id" INT REFERENCES "drink" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "card_has_food"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card_has_food" (
    "card_id" INT REFERENCES "card" ("id"),
    "food_id" INT REFERENCES "food" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "menu_has_drink"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "menu_has_drink" (
    "menu_id" INT REFERENCES "menu" ("id"),
    "drink_id" INT REFERENCES "drink" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table "menu_has_food"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "menu_has_food" (
    "menu_id" INT REFERENCES "menu" ("id"),
    "food_id" INT REFERENCES "food" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;

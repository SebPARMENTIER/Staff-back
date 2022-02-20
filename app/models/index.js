const Card = require('./card');
const Drink_kind = require('./drink_kind');
const Drink_type = require('./drink_type');
const Drink = require('./drink');
const Food_kind = require('./food_kind');
const Food_type = require('./food_type');
const Food = require('./food');
const Job = require('./job');
const Menu = require('./menu');
const Restaurant = require('./restaurant');
const User = require('./user');

User.belongsTo(Restaurant, {
    as: "restaurant",
    foreignKey: "restaurant_id"
});

Restaurant.hasMany(User, {
    as: "users",
    foreignKey: "restaurant_id"
});

User.belongsTo(Job, {
    as: "job",
    foreignKey: "job_id"
});

Job.hasMany(User, {
    as: "users",
    foreignKey: "job_id"
});

Card.belongsTo(Restaurant, {
    as: "restaurant",
    foreignKey: "restaurant_id"
});

Restaurant.hasMany(Card, {
    as: "cards",
    foreignKey: "restaurant_id"
});

Menu.belongsTo(Restaurant, {
    as: "restaurant",
    foreignKey: "restaurant_id"
});

Restaurant.hasMany(Menu, {
    as: "menus",
    foreignKey: "restaurant_id"
});

Drink.belongsTo(Drink_kind, {
    as: "drink_kind",
    foreignKey: "drink_kind_id"
});

Drink_kind.hasMany(Drink, {
    as: "drinks_kind",
    foreignKey: "drink_kind_id"
});

Drink.belongsTo(Drink_type, {
    as: "drink_type",
    foreignKey: "drink_type_id"
});

Drink_type.hasMany(Drink, {
    as: "drinks_type",
    foreignKey: "drink_type_id"
});

Food.belongsTo(Food_kind, {
    as: "food_kind",
    foreignKey: "food_kind_id"
});

Food_kind.hasMany(Food, {
    as: "foods_kind",
    foreignKey: "food_kind_id"
});

Food.belongsTo(Food_type, {
    as: "food_type",
    foreignKey: "food_type_id"
});

Food_type.hasMany(Food, {
    as: "foods_type",
    foreignKey: "food_type_id"
});

Card.belongsToMany(Drink, {
    as: "drinks_card",
    through: "card_has_drink",
    foreignKey: "card_id",
    otherKey: "drink_id"
});

Drink.belongsToMany(Card, {
    as: "cards_drink",
    through: "card_has_drink",
    foreignKey: "drink_id",
    otherKey: "card_id"
});

Card.belongsToMany(Food, {
    as: "foods_card",
    through: "card_has_food",
    foreignKey: "card_id",
    otherKey: "food_id"
});

Food.belongsToMany(Card, {
    as: "cards_food",
    through: "card_has_food",
    foreignKey: "food_id",
    otherKey: "card_id"
});

Menu.belongsToMany(Drink, {
    as: "drinks_menu",
    through: "menu_has_drink",
    foreignKey: "menu_id",
    otherKey: "drink_id"
});

Drink.belongsToMany(Menu, {
    as: "menus_drink",
    through: "menu_has_drink",
    foreignKey: "drink_id",
    otherKey: "menu_id"
});

Menu.belongsToMany(Food, {
    as: "foods_menu",
    through: "menu_has_food",
    foreignKey: "menu_id",
    otherKey: "food_id"
});

Food.belongsToMany(Menu, {
    as: "menus_food",
    through: "menu_has_food",
    foreignKey: "food_id",
    otherKey: "menu_id"
});

module.exports = {
    Card,
    Drink_kind,
    Drink_type,
    Drink,
    Food_kind,
    Food_type,
    Food,
    Job,
    Menu,
    Restaurant,
    User,
};
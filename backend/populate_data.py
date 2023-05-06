import datetime
import os
import uuid

import django
from faker import Faker
#from faker.providers import DynamicProvider

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hopefully.settings')

django.setup()

from faker import Faker
from faker_food import FoodProvider
from datetime import date
import random

fake = Faker()

NO_RECORDS = 1000000
NO_RECORDS_INTERMEDIARY = 10000000

filename = {
    "chef": "chef_insert_data.sql",
    "ingredient": "incredient_insert_data.sql",
    "food": "food_insert_data.sql",
    "recipeIndication": "recipeIndication_insert_data.sql",
    "drop_constraints_indexes": "drop_constraints_indexes.sql",
    "add_constraints_indexes": "add_constraints_indexes.sql"
}


# def drop_constraints_indexes():
#     file = open(filename["drop_constraints_indexes"], "w")
#
#     file.write("ALTER TABLE api_location DROP CONSTRAINT IF EXISTS PK_Location;\n")
#
#     file.write("ALTER TABLE api_employee DROP CONSTRAINT IF EXISTS PK_Employee;\n")
#
#     file.write("ALTER TABLE rest_api_event DROP CONSTRAINT IF EXISTS PK_Event;\n")
#     file.write("ALTER TABLE rest_api_event DROP CONSTRAINT IF EXISTS FK_Event_Location;\n")
#     file.write("DROP INDEX IF EXISTS IDX_Event_LocationID;\n")
#
#     file.write("ALTER TABLE rest_api_eventassignment DROP CONSTRAINT IF EXISTS PK_EventAssignment;\n")
#     file.write("ALTER TABLE rest_api_eventassignment DROP CONSTRAINT IF EXISTS FK_EventAssignment_Event;\n")
#     file.write("ALTER TABLE rest_api_eventassignment DROP CONSTRAINT IF EXISTS PK_EventAssignment_Employee;\n")
#     file.write("DROP INDEX IF EXISTS IDX_EventAssignment_EventID;\n")
#     file.write("DROP INDEX IF EXISTS IDX_EventAssignment_EmployeeID;\n")
#
#     file.write("ALTER TABLE rest_api_employeeprivateinfo DROP CONSTRAINT IF EXISTS FK_EmployeePrivateInfo_Employee;\n")
#
#     file.close()
#
#
# def add_constraints_indexes():
#     file = open(filename["add_constraints_indexes"], "w")
#
#     file.write("ALTER TABLE rest_api_location ADD CONSTRAINT PK_Location PRIMARY KEY(id);\n")
#
#     file.write("ALTER TABLE rest_api_employee ADD CONSTRAINT PK_Employee PRIMARY KEY(id);\n")
#
#     file.write("ALTER TABLE rest_api_event ADD CONSTRAINT PK_Event PRIMARY KEY(id);\n")
#     file.write(
#         "ALTER TABLE rest_api_event ADD CONSTRAINT FK_Event_Location FOREIGN KEY(location_id) REFERENCES rest_api_location(id) ON DELETE CASCADE;\n")
#
#     file.write("ALTER TABLE rest_api_eventassignment ADD CONSTRAINT PK_EventAssignment PRIMARY KEY(id);\n")
#     file.write(
#         "ALTER TABLE rest_api_eventassignment ADD CONSTRAINT FK_EventAssignment_Event FOREIGN KEY(event_id) REFERENCES rest_api_event(id) ON DELETE CASCADE;\n")
#     file.write(
#         "ALTER TABLE rest_api_eventassignment ADD CONSTRAINT FK_EventAssignment_Employee FOREIGN KEY(employee_id) REFERENCES rest_api_employee(id) ON DELETE CASCADE;\n")
#
#     file.write(
#         "ALTER TABLE rest_api_employeeprivateinfo ADD CONSTRAINT FK_EmployeePrivateInfo_Employee FOREIGN KEY(employee_id) REFERENCES rest_api_employee(id) ON DELETE CASCADE;\n")
#
#     file.write("CREATE INDEX IDX_Event_LocationID ON rest_api_event(location_id);\n")
#     file.write("CREATE INDEX IDX_EventAssignment_EventID ON rest_api_eventassignment(event_id);\n")
#     file.write("CREATE INDEX IDX_EventAssignment_EmployeeID ON rest_api_eventassignment(employee_id);\n")
#
#     file.close()


def chef_insert_data():
    file = open(filename["chef"], "w")
    file.write("DELETE FROM api_chef;\n")
    file.write("DBCC CHECKIDENT('[api_chef]', RESEED, 0); GO")


    batch_values = ""

    print("Generating SQL queries for inserting data in the Chef table...")

    for i in range(NO_RECORDS):
        firstName = fake.firstName()
        lastName = fake.lastName()
        prizes = random.randint(0, 10)
        dob = fake.date()
        for i in range (12):
            n = random.randint(0, 8)
            cnp = cnp + str(n)
        batch_values += f"('{firstName}', '{lastName}', {prizes}, '{dob}', '{cnp}'),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_chef (firstName, lastName, prizes, dob, cnp) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def ingredient_insert_data():
    file = open(filename["ingredient"], "w")
    file.write("DELETE FROM api_ingredient;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Ingredient table...")

    for i in range(NO_RECORDS):
        ingredientName = fake.ingredient()
        location = fake.city()
        runningLow = random.randint(0, 0)
        expirationDate = str(fake.date.soon(100, date.today()))
        quantity = random.randint(0, 10000)

        batch_values += f"('{ingredientName}', '{location}', {runningLow}, '{expirationDate}', {quantity}),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_ingredient (ingredientName, location, runningLow, expirationDate, quantity) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()

def food_insert_data():
    file = open(filename["food"], "w")
    file.write("DELETE FROM api_food;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Food table...")

    for i in range(NO_RECORDS):
        foodName = fake.dish()
        proteinGrams = random.randint(0, 98)
        sugarGrams = random.randint(0, 70)
        expirationDate = str(fake.date.soon(100, date.today()))
        quantity = random.randint(100, 1000)
        chefCreator = random.randint(0, NO_RECORDS - 1)
        
        batch_values += f"('{foodName}', {proteinGrams}, {sugarGrams}, '{expirationDate}', {quantity}, {chefCreator}),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_author (foodName, proteinGrams, sugarGrams, expirationDate, quantity, chefCreator) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()

# ReceipeIndications(models.Model):
#     foodId = models.ForeignKey(Food, related_name = 'ingredient', on_delete=models.CASCADE)
#     ingredientId = models.ForeignKey(Ingredient, related_name = 'food', on_delete=models.CASCADE)
#     quantityOfIngredient = models.IntegerField()
#     specifications = models.CharField(max_length=1000)
def recipeIndications_insert_data():
    file = open(filename["recipeIndications"], "w")
    file.write("DELETE FROM api_recipeIndications;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the RecipeIndications table...")

    for i in range(NO_RECORDS_INTERMEDIARY):
        quantityOfIngredient = random.randint(0, 5000)
        specifications = fake.dish_description()

        foodId = random.randint(0, NO_RECORDS - 1)
        ingredientId = random.randint(0, NO_RECORDS - 1)

        batch_values += f"({foodId}, {ingredientId}, {quantityOfIngredient}, '{specifications}'),"

        if (i + 1) % 10000 == 0:
            print(i)
            file.write(
                f"INSERT INTO api_galleryauthor (foodId, ingredientId, quantityOfIngredient, specifications) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()

if __name__ == '__main__':
    
    # drop_constraints_indexes()
    # add_constraints_indexes()
    ingredient_insert_data()
    # location_insert_data()
    # gallery_insert_data()
    #author_insert_data()
    #recipeIndications_insert_data()
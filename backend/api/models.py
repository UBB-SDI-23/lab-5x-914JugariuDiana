from django.core.exceptions import ValidationError
# Create your models here.
from django.db import models
import datetime

class Chef(models.Model):
    def validateNames(value):
        if value[0] not in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
            raise ValidationError("The name should begin with big letter")
        else:
            return value

    firstName = models.CharField(max_length=100, validators=[validateNames])
    lastName = models.CharField(max_length=100, validators=[validateNames])
    prizes = models.IntegerField()
    dob = models.DateField(auto_now_add=True)
    cnp = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.firstName + self.lastName

class Food(models.Model):
    def validateDates(value):
        if datetime.date.today() < (value):
            return value
        else:
            raise ValidationError("This field does not accept dates that have past")
        

    foodName = models.CharField(max_length=100)
    proteinGrams = models.IntegerField()
    sugarGrams = models.IntegerField()
    expirationDate = models.CharField(max_length=20)
    quantity = models.IntegerField()
    chefCreator = models.ForeignKey(Chef, related_name='foods', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.foodName

class Ingredient(models.Model):
    def validateQuantity(value):
        if value < 0:
            raise ValidationError("This field does not accept values smaller than 0")
        else:
            return value
            

    ingredientName = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    runningLow = models.BooleanField()
    expirationDate = models.CharField(max_length=20)
    quantity = models.IntegerField(validators=[validateQuantity])
    # foods = models.ManyToManyField(Food, through="ReceipeIndications")

    def __str__(self):
        return self.ingredientName

    
class ReceipeIndications(models.Model):
    foodId = models.ForeignKey(Food, related_name = 'ingredient', on_delete=models.CASCADE)
    ingredientId = models.ForeignKey(Ingredient, related_name = 'food', on_delete=models.CASCADE)
    quantityOfIngredient = models.IntegerField()
    specifications = models.CharField(max_length=1000)

    



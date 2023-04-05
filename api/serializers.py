from rest_framework import serializers
from .models import Food, Chef, Ingredient, ReceipeIndications
from django.shortcuts import get_object_or_404

class FoodNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['foodName']

class FoodDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'foodName', 'proteinGrams', 'sugarGrams', 'expirationDate', 'quantity', 'chefCreator']

class ChefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chef
        fields = ['id', 'firstName', 'lastName', 'prizes', 'dob', 'cnp', 'foods']

class ChefDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chef
        fields = ['id', 'firstName', 'lastName', 'prizes', 'dob', 'cnp']

# class FoodSerializerDetail(serializers.ModelSerializer):
#     chef = ChefDataSerializer(source='chefCreator', read_only = True)

#     class Meta:
#         model = Food
#         fields = ['id', 'foodName', 'proteinGrams', 'sugarGrams', 'expirationDate', 'quantity', 'chefCreator', 'chef']

class ChefSerializerDetail(serializers.ModelSerializer):
    foods = FoodDataSerializer(many=True, read_only=True)

    class Meta:
        model = Chef
        fields = ['id', 'firstName', 'lastName', 'prizes', 'dob', 'cnp', 'foods']

class IngredientNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['ingredientName']

class ChefFoodSerializer(serializers.ModelSerializer):
    avgQuantity = serializers.FloatField()

    class Meta:
        model = Chef
        fields = ['id', 'firstName', 'lastName', 'prizes', 'dob', 'cnp', 'avgQuantity']

class FoodIngredientSerializer(serializers.ModelSerializer):
    avgQuantityOfIngredients = serializers.FloatField()

    class Meta:
        model = Food
        fields = ['id', 'foodName', 'proteinGrams', 'sugarGrams', 'expirationDate', 'quantity', 'chefCreator', 'avgQuantityOfIngredients']

# class IngredientAverageQuantitySerializer (serializers.ModelSerializer):
#     foodId = FoodNameSerializer(read_only=True)
#     ingredientId = IngredientNameSerializer(read_only=True)
#     class Meta:
#         model = ReceipeIndications
#         fields = ['foodId', 'ingredientId', 'quantityOfIngredient']

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'foodName', 'proteinGrams', 'sugarGrams', 'expirationDate', 'quantity', 'chefCreator']

# class ReceipeIndicationsForOneIngredientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ReceipeIndications
#         fields = ['quantityOfIngredient', 'specifications']


class ReceipeIndicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceipeIndications
        fields =['id', 'foodId', 'ingredientId', 'quantityOfIngredient', 'specifications']

class IngredientSerializer(serializers.ModelSerializer):
    food = ReceipeIndicationsSerializer(many = True, read_only=True)
    class Meta:
        model = Ingredient
        fields = ['id', 'ingredientName', 'location', 'runningLow', 'expirationDate', 'quantity', 'food']

class FoodDetailSerializer(serializers.ModelSerializer):
    ingredient = ReceipeIndicationsSerializer(many = True, read_only=True)
    chef = ChefDataSerializer(source='chefCreator', read_only = True)
    class Meta:
        model = Food
        fields = ['id', 'foodName', 'proteinGrams', 'sugarGrams', 'expirationDate', 'quantity', 'chefCreator', 'chef', 'ingredient']

class FoodForChefsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    def create(self, validated_data):
        foodId = validated_data['id']
        food = get_object_or_404(Food, pk=foodId)
        food.chefCreator = validated_data['chefCreator']
        db = validated_data.get('using', None)
        food.save(using=db)
        return food

    class Meta:
        model = Food
        fields = ['id']

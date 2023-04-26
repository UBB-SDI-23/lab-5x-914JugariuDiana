from rest_framework import generics, status, views
from .models import Food, Chef, Ingredient, ReceipeIndications
from .serializers import FoodSerializer, ChefSerializer, IngredientSerializer, ChefSerializerDetail, \
     ReceipeIndicationsSerializer, ChefFoodSerializer,\
    FoodIngredientSerializer, FoodDetailSerializer, FoodForChefsSerializer, IngredientSerializerVAR1#, IngredientFoodSerializer/*FoodSerializerDetail,

from django.db.models import Avg
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view

class FoodList(generics.ListCreateAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
    
class FoodDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FoodDetailSerializer
    queryset = Food.objects.all()

class ChefList(generics.ListCreateAPIView):
    serializer_class = ChefSerializer
    queryset = Chef.objects.all()        
    
class ChefDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChefSerializerDetail
    queryset = Chef.objects.all()
    
class IngredientList(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()        
    
class IngredientQuantity(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()
        var = self.request.GET.get('quantity', 0)
        if var is not None:
            queryset = queryset.filter(quantity__gt=var)
        return queryset
     
class ReceipeIndicationsList(generics.ListCreateAPIView):
    serializer_class = ReceipeIndicationsSerializer
    queryset = ReceipeIndications.objects.all()

class ReceipeIndicationsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReceipeIndicationsSerializer
    queryset = ReceipeIndications.objects.all()
   
class OrderChefs(generics.ListCreateAPIView):
    serializer_class = ChefFoodSerializer
    def get_queryset(self):
        queryset = Chef.objects.annotate(avgQuantity=Avg('foods__quantity')).order_by('avgQuantity')
        return queryset
    
class OrderFood(generics.ListCreateAPIView):
    serializer_class = FoodIngredientSerializer
    def get_queryset(self):
        queryset = Food.objects\
            .annotate(avgQuantityOfIngredients=Avg('food__ingredientId__quantity'))\
            .order_by('avgQuantityOfIngredients')
        return queryset
    
class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IngredientSerializerVAR1
    queryset = Ingredient.objects.all()

class FoodForChef(views.APIView):
    def post(self, request, pk):
        serializer = FoodForChefsSerializer(data=request.data, many=True)
        chefCreator = get_object_or_404(Chef, id=pk)
        serializer.context['chefCreator'] = chefCreator
        if serializer.is_valid():
            serializer.save(chefCreator=chefCreator, using='')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

            
    


from rest_framework import viewsets
from . import models
from . import serializers

class WishViewSet(viewsets.ModelViewSet):
    queryset = models.Wish.objects.all()
    serializer_class = serializers.WishSerializer

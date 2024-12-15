from rest_framework import serializers
from . import models

class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Wish
        fields = '__all__'
from rest_framework import serializers
from . import models

class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exchange
        fields = '__all__'
from rest_framework import serializers
from . import models

class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exchange
        fields = '__all__'
        extra_kwargs = { # TODO test if necessary for created_at and modified_at
            'members': {'read_only': True},
        }

class ExchangeMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ExchangeMember
        fields = '__all__'
        
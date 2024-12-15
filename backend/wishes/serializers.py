from rest_framework import serializers
from . import models

class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Wish
        fields = '__all__'
        # extra_kwargs = { # TODO test if necessary
        #     'posted_at': {'read_only': True},
        #     'created_at': {'read_only': True}
        # }
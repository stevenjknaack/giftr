from rest_framework import viewsets
from . import serializers, models
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class GiftViewSet(viewsets.ModelViewSet):
    queryset = models.Gift.objects.all()
    serializer_class = serializers.GiftSerializer

    def get_queryset(self):
        to_id = self.request.query_params.get('to', None)
        if to_id:
            user = get_object_or_404(User, pk=to_id)
            return user.gifts_gotten
        
        from_id = self.request.query_params.get('from', None)
        if from_id:
            user = get_object_or_404(User, pk=from_id)
            return user.gifts_given
        
        return self.queryset
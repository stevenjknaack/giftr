from rest_framework import viewsets
from . import serializers, models
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class ExchangeViewSet(viewsets.ModelViewSet):
    queryset = models.Exchange.objects.all()
    serializer_class = serializers.ExchangeSerializer

    def get_queryset(self):
        member_id = self.request.query_params.get('member', None)
        if member_id:
            member = get_object_or_404(User, pk=member_id)
            return member.exchanges
        
        owner_id = self.request.query_params.get('owner', None)
        if owner_id:
            owner = get_object_or_404(User, pk=owner_id)
            return owner.owned_exchanges
        
        return self.queryset

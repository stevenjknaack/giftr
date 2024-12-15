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
    
class ExchangeMemberViewSet(viewsets.ModelViewSet):
    queryset = models.ExchangeMember.objects.all()
    serializer_class = serializers.ExchangeMemberSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        user_id = self.request.query_params.get('user', None)
        if user_id:
            queryset = queryset.filter(user_id=user_id)

        exchange_id = self.request.query_params.get('exchange', None)
        if exchange_id:
            queryset = queryset.filter(exchange_id=exchange_id)
        
        return queryset

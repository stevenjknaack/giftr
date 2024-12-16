from rest_framework import viewsets
from . import serializers, models

class GiftViewSet(viewsets.ModelViewSet):
    queryset = models.Gift.objects.all()
    serializer_class = serializers.GiftSerializer

    def get_queryset(self):
        queryset = self.queryset

        exchange_id = self.request.query_params.get('exchange', None)
        if exchange_id:
            queryset = queryset.filter(exchange_id=exchange_id)
            
        to_id = self.request.query_params.get('to', None)
        if to_id:
            queryset = queryset.filter(to_user_id=to_id)
        
        from_id = self.request.query_params.get('from', None)
        if from_id:
            queryset = queryset.filter(from_user_id=from_id)
        
        return queryset
from rest_framework import viewsets
from . import models
from . import serializers
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


class WishViewSet(viewsets.ModelViewSet):
    queryset = models.Wish.objects.all()
    serializer_class = serializers.WishSerializer

    # def get_permissions(self):
    #     if self.action == 'create':
    #         return [AllowAny()]
    #     return [IsAuthenticated()]

    def get_queryset(self):
        user_id = self.request.query_params.get('user', None)
        if user_id:
            user = get_object_or_404(User, pk=user_id)
            return user.wishes
        
        return self.queryset

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from . import serializers


class RegisterView(APIView):
    """ View to register a new user """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response(serializer.data, status=status.HTTP_201_CREATED)
        return response

class WhoAmIView(APIView):
    def get(self, request) -> Response:
        """ Gets details about a the User that is logged in """
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data)
        
class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    http_method_names = ['get', 'patch']


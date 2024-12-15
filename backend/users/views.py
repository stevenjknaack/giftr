from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError


class RegisterView(APIView):
    """
    View to register a new user.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        if not username or not password or not email or not first_name or not last_name:
            raise ValidationError(
                "Username, password, email, first_name, and last_name are required."
            )
        
        try:
            user = User.objects.create_user(
                username=username, 
                password=password, 
                email=email, 
                first_name=first_name, 
                last_name=last_name
            )
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class LoginView(APIView):
#     """
#     View to log in a user and return JWT tokens.
#     """
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         if not username or not password:
#             raise ValidationError("Username and password are required.")
        
#         try:
#             user = User.objects.get(username=username)
#             if not user.check_password(password):
#                 return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

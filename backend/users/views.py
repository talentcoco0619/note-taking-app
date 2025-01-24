from rest_framework import status, views
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
class RegisterUserView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(views.APIView):
    def post(self, request):
        email = request.data.get('email')  # Get email from request data
        password = request.data.get('password')  # Get password from request data
        User = get_user_model()  # Fetch the custom user model

        try:
            # Get the user by email
            user = User.objects.get(email=email)

            # Check the password for the user
            if user.check_password(password):
                # If password is correct, generate tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'username':str(user.username)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Password is wrong!'}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)
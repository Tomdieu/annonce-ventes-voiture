from .serializers import AuthenticationSerializer,UserSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)

from rest_framework.viewsets import GenericViewSet

from rest_framework.generics import CreateAPIView

from django.contrib.auth import authenticate, login

from django.contrib.auth import get_user_model

from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.viewsets import ViewSet

User = get_user_model()

class CheckUsernameViewSet(ListModelMixin,GenericViewSet):
    permission_classes = [AllowAny]
    def list(self,request):
        username = request.query_params.get('username',None)

        if username:
            try:
                user = User.objects.get(username=username)
                return Response({"message":'Found'})
            except User.DoesNotExist:
                return Response({"message":'Not Found'},status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"message":"No username provided"},status=status.HTTP_400_BAD_REQUEST)


class AuthenticationViewSet(GenericViewSet, CreateAPIView):
    def get_permissions(self):
        permission_classes = []
        if self.action in ["create"]:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    serializer_class = AuthenticationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response(
                {
                    "data": UserSerializer(user).data,
                    "token": user.auth_token.key,
                    "success": True,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "success": False,
                "message": "Invalid credentials username or password incorrect",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

class UserRegistrationViewSet(GenericViewSet, CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        user: User = serializer.save()

        return Response(
            {
                "data": serializer.data,
                "message": "Account Created Successfully",
                "token": user.auth_token.key,
                "success":True
            },
            status=status.HTTP_201_CREATED,
        )



class UserViewSet(ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
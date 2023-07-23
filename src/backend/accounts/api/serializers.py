from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class AuthenticationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email','first_name','last_name', 'phone_1','phone_2','address', 'password','is_staff','is_superuser']
        extra_kwargs = {"password": {"write_only": True},"confirm_password":{"write_only":True,"required":True}}

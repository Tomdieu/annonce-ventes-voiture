from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):


    phone_1 = models.CharField(max_length=20,blank=True,null=True)
    phone_2 = models.CharField(max_length=20,null=True, blank=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    class Meta(AbstractUser.Meta):
        pass
    
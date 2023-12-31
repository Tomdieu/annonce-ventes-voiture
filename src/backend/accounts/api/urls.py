from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("check-user",views.CheckUsernameViewSet,basename="check-user")
router.register("login",views.AuthenticationViewSet,basename="login")
router.register("register",views.UserRegistrationViewSet,basename="register")
router.register("user",views.UserViewSet,basename="user")
urlpatterns = []


urlpatterns += router.urls
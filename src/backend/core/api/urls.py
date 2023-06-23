from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("marque",views.MarqueViewSet,basename="marque")
router.register("modele",views.ModeleViewSet,basename="modele")
router.register("voiture",views.VoitureViewSet,basename="voiture")
router.register("annonce",views.AnnonceViewSet,basename="annonce")
router.register("image-voiture",views.PhotoVoitureViewSet,basename="image-voiture")


urlpatterns = []

urlpatterns += router.urls
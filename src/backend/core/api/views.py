from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser
from rest_framework.viewsets import GenericViewSet

from rest_framework.generics import CreateAPIView

from rest_framework.permissions import IsAuthenticated

from core.models import Marque,Modele,Voiture,Annonce,PhotoVoiture

from .serializers import (ModeleListSerializer,ModeleSerializer,MarqueSerializer,VoitureSerializer,AnnonceSerializer,PhotoVoitureSerializer,UpdatePhotoVoitureSerializer,VoitureListSerializer,AnnonceListSerializer)

class MarqueViewSet(CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,GenericViewSet):

    serializer_class = MarqueSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        return Marque.objects.all()

class ModeleViewSet(CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,GenericViewSet):

    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ModeleListSerializer
        return ModeleSerializer
    

    def get_queryset(self):
        return Modele.objects.all()

class VoitureViewSet(CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,GenericViewSet):

    parser_class = [MultiPartParser, FormParser]


    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):

        if self.request.method in ['GET']:
            return VoitureListSerializer
        return VoitureSerializer
    

    def get_queryset(self):
        return Voiture.objects.filter(proprietaire=self.request.user)

class AnnonceViewSet(CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,GenericViewSet):

    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):

        if self.request.method in ['GET']:
            return AnnonceListSerializer
        return AnnonceSerializer
    def get_queryset(self):
        
        queryset= Annonce.objects.filter(status = 'validé')
        
        annee = request.query_params.get('annee',None)
        prix =  request.query_params.get('prix',None)
        marque = request.query_params.get('marque',None)
        model = request.query_params.get('model',None)
        titre = request.query_params.get('titre',None)
        km = request.query_params.get('km_parcouru',None)

        if titre:
            queryset = queryset.filter(titre=titre)
        if annee:
            queryset = queryset.filter(voiture__annee=annee)
        if prix:
            queryset = queryset.filter(prix=prix)
        if marque:
            queryset = queryset.filter(voiture__model__marque__nom__icontains=marque)
        if model:
            queryset = queryset.filter(voiture__model__nom__icontains=model)
        if km:
            queryset = queryset.filter(voiture__km_parcouru=int(km))

        return queryset


class PhotoVoitureViewSet(CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,GenericViewSet):

    permission_classes = [IsAuthenticated]



    def get_serializer_class(self):

        if self.request.method in ['GET','POST']:
            return PhotoVoitureSerializer
        return UpdatePhotoVoitureSerializer

    def get_queryset(self):
        return PhotoVoiture.objects.all()
    
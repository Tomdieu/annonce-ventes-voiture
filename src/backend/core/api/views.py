from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    FileUploadParser,
    JSONParser,
)
from rest_framework.viewsets import GenericViewSet

from rest_framework.generics import CreateAPIView

from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.decorators import action

from core.models import Marque, Modele, Voiture, Annonce, PhotoVoiture

from .serializers import (
    ModeleListSerializer,
    ModeleSerializer,
    MarqueSerializer,
    VoitureSerializer,
    AnnonceSerializer,
    PhotoVoitureSerializer,
    UpdatePhotoVoitureSerializer,
    VoitureListSerializer,
    AnnonceListSerializer,
    AddBulkPhotoVoitureSerializer,
)


class MarqueViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    serializer_class = MarqueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Marque.objects.all()


class ModeleViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return ModeleListSerializer
        return ModeleSerializer

    def get_queryset(self):
        return Modele.objects.all()


class VoitureViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    parser_class = [MultiPartParser, FormParser, JSONParser]

    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return VoitureListSerializer
        if self.action in ["add_images"]:
            return AddBulkPhotoVoitureSerializer
        return VoitureSerializer

    def get_queryset(self):
        
        queryset = Voiture.objects.filter(proprietaire=self.request.user)

        limit = self.request.query_params.get("limit", None)
        if limit:
            return queryset[:int(limit)]

        return queryset

    @action(methods=["POST"], detail=True)
    def add_images(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        voiture = self.get_object()
        return Response(
            VoitureListSerializer(voiture,context={'request':request}).data,
            status=status.HTTP_201_CREATED,
        )


class AnnonceViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return AnnonceListSerializer
        return AnnonceSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(AnnonceListSerializer(instance,context={'request':request}).data, status=status.HTTP_201_CREATED)

    def get_queryset_1(self):
        request = self.request
        
        queryset= Annonce.objects.filter(status = 'validé')

        annee = request.query_params.get("annee", None)
        prix = request.query_params.get("prix", None)
        marque = request.query_params.get("marque", None)
        model = request.query_params.get("model", None)
        titre = request.query_params.get("titre", None)
        km = request.query_params.get("km_parcouru", None)

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

        limit = self.request.query_params.get("limit", None)
        if limit:
            return queryset[:int(limit)]

        return queryset
    
    def get_queryset(self):
        request = self.request
        queryset = Annonce.objects.filter(voiture__proprietaire=self.request.user)

        # queryset= Annonce.objects.filter(status = 'validé')

        annee = request.query_params.get("annee", None)
        prix = request.query_params.get("prix", None)
        marque = request.query_params.get("marque", None)
        model = request.query_params.get("model", None)
        titre = request.query_params.get("titre", None)
        km = request.query_params.get("km_parcouru", None)

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

        limit = self.request.query_params.get("limit", None)
        if limit:
            return queryset[:int(limit)]

        return queryset

    @action(methods=["GET"], detail=False)
    def public(self,request,*args,**kwargs):
        queryset = self.get_queryset_1()
        serializer_class = self.get_serializer_class()(queryset, many=True).data
        return Response(serializer_class)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(AnnonceListSerializer(instance,context={'request':request}).data)


    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class PhotoVoitureViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["GET", "POST"]:
            return PhotoVoitureSerializer
        return UpdatePhotoVoitureSerializer

    def get_queryset(self):
        return PhotoVoiture.objects.all()

from rest_framework import serializers
# from rest_framework
from typing import List
from django.core.files.images import ImageFile
from core.models import Marque,Modele,Voiture,Annonce,PhotoVoiture

from accounts.api.serializers import UserSerializer

class MultipleIMageField(serializers.ListField):
    def to_internal_value(self,data):
        if not instance(data,list):
            raise serializers.ValidationError("Invalid data type, expected a list of images.")

        ret =[]
        for item in data:
            image_serializer = serializers.ImageField()
            validated_image = image_serializer.to_internal_value(item)
            ret.append(validated_image)

    def to_representation(self,value):
        image_serializer = serializers.ImageField()
        return [image_serializer.to_representation(item) for item in value]

class _MarqueSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Marque
        fields = '__all__'
    

class ModeleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Modele
        fields = '__all__'

class ModeleListSerializer(serializers.ModelSerializer):
    marque = _MarqueSerializer()
    class Meta:
        model = Modele
        fields = '__all__'


class _ModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Modele
        exclude = ('marque',)


class MarqueSerializer(serializers.ModelSerializer):
    modeles:List[_ModelSerializer] = serializers.SerializerMethodField()
        
    class Meta:
        model = Marque
        fields = '__all__'

    def get_modeles(self,obj:Marque)->List[_ModelSerializer]:
        modeles = Modele.objects.filter(marque=obj)
        if modeles.exists():
            return _ModelSerializer(modeles,many=True).data 
        return []
class PhotVoitureSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotoVoiture
        exclude= ('voiture',)

class VoitureSerializer(serializers.ModelSerializer):
    photos =  PhotVoitureSerializer(many=True, read_only=True)
    upload_photos = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    class Meta:
        model = Voiture
        exclude = ('proprietaire',)

    def create(self, validated_data):
        photos = validated_data.pop('upload_photos')
        voiture = Voiture.objects.create(**validated_data,proprietaire=self.context['request'].user)
        if photos:
            for image in photos:
                PhotoVoiture.objects.create(voiture = voiture, photo = image)
        return voiture

    
class VoitureListSerializer(serializers.ModelSerializer):
    images =  PhotVoitureSerializer(many=True, read_only=True)
    proprietaire = UserSerializer()
    model = ModeleListSerializer()
    class Meta:
        model = Voiture
        fields = '__all__'

    def create(self, validated_data):
        photos = validated_data.pop('photos')
        voiture = Voiture.objects.create(**validated_data,proprietaire=self.context['request'].user)
        if photos:
            for image in photos:
                PhotoVoiture.objects.create(voiture = voiture, photo = image)
        return voiture
    
class AnnonceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Annonce
        exclude = ('status',)
        
class AnnonceListSerializer(serializers.ModelSerializer):
    voiture = VoitureListSerializer()
    
    class Meta:
        model = Annonce
        fields = '__all__'


class PhotoVoitureSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotoVoiture
        fields = '__all__'

class UpdatePhotoVoitureSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotoVoiture
        fields = ('photo',)
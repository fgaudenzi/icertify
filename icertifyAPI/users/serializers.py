from django.forms import widgets
from rest_framework import serializers
from users.models import IcUser,LinkedinEnd,Stackoverflow,SAP,Formula,Formula2,Op


"""class IcUserSerializer(serializers.ModelSerializer):
  class Meta:
	model=IcUser

  fields=('id','name','lastname','email','image')"""


class IcUserSerializer(serializers.Serializer):
  id = serializers.IntegerField(read_only=True)
  name = serializers.CharField(required=True,
                                  max_length=200)
  lastname = serializers.CharField(required=True,
                                  max_length=200)
  email = serializers.CharField(required=True,max_length=200)
  image = serializers.CharField(required=False,max_length=200)

  def create(self, validated_attrs):
    """
    Create and return a new `User` instance.
    """
    return IcUser.objects.create(**validated_attrs)

  def update(self, instance, validated_attrs):
    """
    Update and return an existing `Snippet` instance, given the validated data.
    """
    instance.name = validated_attrs.get('name', instance.name)
    instance.lastname = validated_attrs.get('lastname', instance.lastname)
    instance.email = validated_attrs.get('linenos', instance.email)
    instance.image = validated_attrs.get('language', instance.image)
    instance.save()
    return instance



class LinkedinSerializer(serializers.ModelSerializer):
  class Meta:
    model=LinkedinEnd
  id = serializers.IntegerField(read_only=True)
  keyL = serializers.CharField(required=True,
                                  max_length=200)
  value= serializers.IntegerField(default=0)

  def create(self, validated_attrs):
    """
    Create and return a new `User` instance.
    """
    return LinkedinEnd.objects.create(**validated_attrs)

  def update(self, instance, validated_attrs):
    """
    Update and return an existing `Snippet` instance, given the validated data.
    """
    instance.keyL = validated_attrs.get('keyL', instance.keyL)
    instance.value = validated_attrs.get('value', instance.value)
    instance.save()
    return instance

class StackoverflowSerializer(serializers.ModelSerializer):
  class Meta:
    model=Stackoverflow
  id = serializers.IntegerField(read_only=True)
  keyS = serializers.CharField(required=True,
                                  max_length=200)
  value= serializers.IntegerField(default=0)

  def create(self, validated_attrs):
    """
    Create and return a new `User` instance.
    """
    return LinkedinEnd.objects.create(**validated_attrs)

  def update(self, instance, validated_attrs):
    """
    Update and return an existing `Snippet` instance, given the validated data.
    """
    instance.keyS = validated_attrs.get('keyS', instance.keyS)
    instance.value = validated_attrs.get('value', instance.value)
    instance.save()
    return instance





class SAPSerializer(serializers.ModelSerializer):
  class Meta:
	 model=SAP
  id = serializers.IntegerField(read_only=True)
  cert = serializers.CharField(required=True,
                                  max_length=200)

  def create(self, validated_attrs):
    """
    Create and return a new `User` instance.
    """
    return LinkedinEnd.objects.create(**validated_attrs)

  def update(self, instance, validated_attrs):
    """
    Update and return an existing `Snippet` instance, given the validated data.
    """
    instance.cert = validated_attrs.get('cert', instance.lastname)
    instance.save()
    return instance


class FormulaListSerializer(serializers.Serializer):
  name=serializers.CharField(max_length=200)
  formula=serializers.CharField(source='formula',max_length=500)
  def transform_description_html(self, obj, value):
    return "ciao cari"
  def restore_object(self, attrs, instance=None):
    if instance is not None:
      instance.email=attrs.get('name',instance.name)
      #instance.formula="ciao belli"
      return instance
    return None


class Formula2Serializer(serializers.Serializer):
  formula = serializers.RelatedField(many=True,read_only=True)

  class Meta:
    model=Formula2
    fields=('name','formula')


class OperatorSerializer(serializers.Serializer):
  value= serializers.IntegerField()
  op=serializers.CharField(max_length=200)
  key= serializers.CharField(max_length=200)

class ProvaSerializer(serializers.Serializer):
  value=serializers.IntegerField()
  key=serializers.CharField(max_length=200)
  op=serializers.CharField(max_length=200)

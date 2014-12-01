from django.db import models
import pdb

def file(self,filename):
    url = "media/profile/%s/%s" % (self.lastname,filename)
    return url

class IcUser(models.Model):
    name = models.CharField(max_length=200)
    lastname= models.CharField(max_length=200)
    email= models.CharField(max_length=200)
    image= models.CharField(max_length=200)
    #image path default to pic default user  
class LinkedinEnd(models.Model):
    keyL = models.CharField(max_length=200)
    value= models.IntegerField(default=0)
    user = models.ForeignKey(IcUser)

class Stackoverflow(models.Model):
    keyS = models.CharField(max_length=200)
    value= models.IntegerField(default=0)
    user = models.ForeignKey(IcUser)

class SAP(models.Model):
    cert= models.CharField(max_length=200)
    user= models.ForeignKey(IcUser)

class Formula(models.Model):
    formula= models.CharField(max_length=500)
    name=models.CharField(unique=True,max_length=100)

class Formula2(models.Model):
    name=models.CharField(max_length=100)

class Op(models.Model):
    formula= models.ForeignKey(Formula2)
    value=models.IntegerField()
    key=models.CharField(max_length=200)
    op=models.CharField(max_length=200)
from users.models import Op,Formula2,IcUser,LinkedinEnd,Stackoverflow,SAP,Formula
from users.serializers import OperatorSerializer,Formula2Serializer,ProvaSerializer,IcUserSerializer,LinkedinSerializer,StackoverflowSerializer,SAPSerializer,FormulaListSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from django.core.files.base import ContentFile
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.db.models import Q


class ShowPicture(APIView):
   def get(self,request,pk,pk2,format=None):
     try:
         user=IcUser.objects.get(pk=pk)
     except IcUser.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    # print pk
    # print pk2
     image_data = open("/opt/images/profile/"+str(user.id)+".jpg").read()
     return HttpResponse(image_data, content_type="image/jpg")


class UserList(APIView):
   parser_classes =(MultiPartParser,)
   def get(self,request,format=None):
     users = IcUser.objects.all()
     serializer = IcUserSerializer(users,many=True)
     return Response(serializer.data)
   def post(self,request,format=None):
     #print request.FILES
     print request.FILES["image"]
     print request.DATA
    
     user=IcUser(name=request.DATA["name"],lastname=request.DATA["lastname"],email=request.DATA["email"],image="")
     user.save()
     user.image="users/"+str(user.id)+"/profile/"+str(user.id)
     user.save()  
     #print "CIAO"
     f= open("/opt/images/profile/"+str(user.id)+".jpg","wb")
     f.write(request.FILES.get("image").read())
     #serializer = IcUserSerializer(data=request.DATA,image=request.FILES["image"])
    # serializer = IcUserSerializer(user)
   #  print serializer.data
     image_data = open("/root/icertifyAPI/users/static/pages/redirectuser.html", "rb").read()
     #print "CIAO"
     return HttpResponse(image_data, content_type="text/html")
     #return Response(image_data, status=status.HTTP_201_CREATED)
    # return Response("error", status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
   def get_object(self,pk):
     try:
         user=IcUser.objects.get(pk=pk) 
         return user
     except IcUser.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
   def get(self,request,pk,format=None):
     user=self.get_object(pk)
     serializer=IcUserSerializer(user)
     return Response(serializer.data)
   def put(self,request,pk,foram=None):
     user=self.get_object(pk)
     serializer = IcUserSerializer(user, data=request.data)
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   def delete(self,request,pk,format=None):
     user=self.get_object(pk)
     user.delete()
     return Response(status=status.HTTP_204_NO_CONTENT)

class LinkedinDetail(APIView):
   def get_object(self,pk,pk1):
     try:
         linkedin=LinkedinEnd.objects.get(pk=pk1) 
         return linkedin
     except IcUser.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
   def get(self,request,pk,pk1,format=None):
     elem=self.get_object(pk1)
     serializer=LinkedinSerializer(elem)
     return Response(serializer.data)
   def put(self,request,pk,pk1,format=None):
     user=self.get_object(pk1)
     serializer = LinkedinSerializer(user, data=request.data)
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   def delete(self,request,pk,pk1,format=None):
     user=self.get_object(pk1)
     user.delete()
     return Response(status=status.HTTP_204_NO_CONTENT)


class LinkedinList(APIView):
   def get(self,request,pk,format=None):
     print "gettin user" 
     user=IcUser.objects.get(pk=pk)
     print  "gettin values linkedin"
     print user
     ls = LinkedinEnd.objects.filter(user=user)
     print ls
     serializer = LinkedinSerializer(ls,many=True)
     print serializer.data
     return Response(serializer.data)
   def post(self,request,pk,format=None): 
     try:
         print request.DATA;
         user=IcUser.objects.get(pk=pk)
     except IcUser.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
     print "user found"
     request.DATA["user"]=user
     l=LinkedinEnd(keyL=request.DATA["keyL"],value=request.DATA["value"],user=request.DATA["user"])
     l.save()
     return Response(str(l.id), status=status.HTTP_201_CREATED)
     return Response("error", status=status.HTTP_400_BAD_REQUEST)


class StackoverflowList(APIView):
   def get(self,request,pk,format=None):
     user=IcUser.objects.get(pk=pk)
     ls = Stackoverflow.objects.filter(user=user)
     serializer = StackoverflowSerializer(ls,many=True)
     return Response(serializer.data)
   def post(self,request,pk,format=None): 
     try:
         user=IcUser.objects.get(pk=pk)
     except IcUser.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
     print "user found"
     request.DATA["user"]=user
     l=Stackoverflow(keyS=request.DATA["keyS"],value=request.DATA["value"],user=request.DATA["user"])
     l.save()
     return Response(str(l.id), status=status.HTTP_201_CREATED)
     return Response("error", status=status.HTTP_400_BAD_REQUEST)


class SAPList(APIView):
   def get(self,request,pk,format=None):
     user=IcUser.objects.get(pk=pk)
     ls = SAP.objects.filter(user=user)
     serializer = SAPSerializer(ls,many=True)
     return Response(serializer.data)
   def post(self,request,pk,format=None): 
     try:
         user=IcUser.objects.get(pk=pk)
     except IcUser.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
     print "user found"
     request.DATA["user"]=user
     l=SAP(cert=request.DATA["cert"],user=request.DATA["user"])
     l.save()
     return Response(str(l.id), status=status.HTTP_201_CREATED)
     return Response("error", status=status.HTTP_400_BAD_REQUEST)


class FormulaList(APIView):
   def get(self,request,format=None):
     elem = Formula.objects.all()
     serializer = FormulaListSerializer(elem, many=True)
     return Response(serializer.data)
   def post(self,request,format=None): 
     print request.DATA["name"]
     print request.DATA["formula"][0]
     l=Formula(name=request.DATA["name"],formula=request.DATA["formula"])
     l.save()
     return Response(str(l.id), status=status.HTTP_201_CREATED)
     return Response("error", status=status.HTTP_400_BAD_REQUEST)

class AllFormula(APIView):
    """
    A view that returns the count of active users, in JSON.
    """
    def get(self, request, format=None):
        formulas = Formula2.objects.all()
        all=[]
        for f in formulas:
            operator=Op.objects.all().filter(formula=f)
            ops=OperatorSerializer(operator,many=True)
            form=f
            print dir(f)
            prova={'id':f.id,'name':f.name,'formula':ops.data}
            all.append(prova)
        #print elem[0]["formula"]

        return Response(all)
    def post(self,request,format=None): 
        print request.DATA["name"]
        f=Formula2(name=request.DATA["name"])
        f.save()
        for operation in request.DATA["formula"]:
            #print operation["op"]
            op=Op(value=operation["value"],key=operation["key"],op=operation["op"],formula=f)
            op.save()
        return Response(str(f.id), status=status.HTTP_201_CREATED)

class Search(APIView):


    def post(self,request,format=None): 
        #print "DATA SENT:"+request.DATA
        result=[]
        formula=Formula2.objects.get(id=request.DATA["id"])
        ops=Op.objects.all().filter(formula=formula)
        users=IcUser.objects.all()
        ls_all=LinkedinEnd.objects.all()
        st_all=Stackoverflow.objects.all()
        sap_all=SAP.objects.all()
        for u in users:
            ls_user=ls_all.filter(user=u)
            sap_user=sap_all.filter(user=u)
            st_user=st_all.filter(user=u)
            linkedin_flag=True
            opL=ops.filter(op="linkedin")
            
            """print "name"+u.name
            for l in ls_user:
                print l.keyL"""
            for op in opL:
                res=ls_user.filter(Q(keyL=op.key)& Q(value__gt=op.value))
                if len(res)==0:
                    linkedin_flag=False
                    break
            if linkedin_flag:
                print u.name+" ok"
                result.append   (u)
                
            else:
                print u.name+" move next"
            serializer = IcUserSerializer(result,many=True)
            print serializer.data
        return Response(serializer.data)

            


def index(request):

     image_data = open("/root/icertifyAPI/users/static/pages/home.html").read()
     return HttpResponse(image_data, content_type="text/html")
    


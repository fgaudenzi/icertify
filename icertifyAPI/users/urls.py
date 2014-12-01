from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from users import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
	url(r"^$",views.index),
	url(r"^prova/$", views.FormulaList.as_view()),
    #url(r"^formula/(?P<pk>[0-9]+)/$", views.FormulaDetail.as_view()),
    url(r"^formula/$", views.AllFormula.as_view()),
    url(r"^search/$", views.Search.as_view()),
    url(r"^users/$", views.UserList.as_view()),
    url(r"^users/(?P<pk>[0-9]+)/$", views.UserDetail.as_view()),
    url(r"^users/(?P<pk>[0-9]+)/linkedin/$",views.LinkedinList.as_view()),
    url(r"^users/(?P<pk>[0-9]+)/stackoverflow/$",views.StackoverflowList.as_view()),
    url(r"^users/(?P<pk>[0-9]+)/sap/$",views.SAPList.as_view()),
    #url(r"^users/(?P<pk>[0-9]+)/linkedin/$",views.LinkedinDetail.as_view()),
    url(r"^users/(?P<pk>[0-9]+)/profile/(?P<pk2>[0-9]+)",views.ShowPicture().as_view()),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)

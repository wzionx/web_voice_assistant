from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('experiment1',views.experiment1, name="experiment1"),
    path('experiment2',views.experiment2, name="experiment2"),
    path('experiment3',views.experiment3, name="experiment3"),
    path('experiment4',views.experiment4, name="experiment4"),
    path('experiment5',views.experiment5, name="experiment5"),
    path('send-email/', views.send_email, name='send_email'),
    path('usersetting/', views.usersetting, name="usersetting"),
    path('emailsetting/', views.emailsetting, name="emailsetting"),
] +  static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

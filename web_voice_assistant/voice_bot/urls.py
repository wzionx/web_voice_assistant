from django.urls import path

from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('experiment1',views.experiment1, name="experiment1"),
    path('experiment2',views.experiment2, name="experiment2"),
    path('experiment3',views.experiment3, name="experiment3"),
    path('experiment4',views.experiment4, name="experiment4"),
    path('experiment5',views.experiment5, name="experiment5"),
]

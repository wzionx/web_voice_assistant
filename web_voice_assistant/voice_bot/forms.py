from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UsernameField, PasswordChangeForm
from django.contrib.auth.models import User
from .models import UserAvatar, User_Email

class CustomerRegistrationForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={"autofocus":"true","class":"form-control"}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={"class":"form-control"}))
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput(attrs={"class":"form-control"}))
    password2 = forms.CharField(label="Confirm Password", widget=forms.PasswordInput(attrs={"class":"form-control"}))
    class Meta:
        model = User
        fields = ["username" , "email" , "password1" , "password2"]

class LoginForm(AuthenticationForm):
    username = UsernameField(widget=forms.TextInput(attrs={'autofocus':'True', 'class':'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"autocomplete":"current-password", "class":"form-control"}))


class ImageForm(forms.ModelForm):
    """Form for the image model"""
    user_avatar = forms.ImageField()
    class Meta:
        model = UserAvatar
        fields = ('user_avatar',)
        labels = {
            "user_avatar":"",
    }
        
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User_Email
        fields = ["sender_email","sender_name","password","recipient_email","subject"]
        widgets = {
            "sender_email":forms.TextInput(attrs={"class":"form-control"}),
            "sender_name":forms.TextInput(attrs={"class":"form-control"}),
            "password":forms.TextInput(attrs={"class":"form-control"}),
            "recipient_email":forms.TextInput(attrs={"class":"form-control"}),
            "subject":forms.TextInput(attrs={"class":"form-control"}),
        }
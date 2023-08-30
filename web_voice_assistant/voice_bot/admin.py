from django.contrib import admin

# Register your models here.
from voice_bot.models import FreeChatSubject, FreeChatWakeUp,  FreeChatResponse, UserAvatar, User_Email

@admin.register(FreeChatSubject)
class FreeChatAdmin(admin.ModelAdmin):
    list_display=["id","subject"]

@admin.register(FreeChatWakeUp)
class FreeChatAdmin(admin.ModelAdmin):
    list_display=["id","wakeup"]

@admin.register(FreeChatResponse)
class FreeChatAdmin(admin.ModelAdmin):
    list_display=["id","response"]

@admin.register(UserAvatar)
class UserAvatarModelAdmin(admin.ModelAdmin):
     list_display=['user','user_avatar']

@admin.register(User_Email)
class User_EmailModelAdmin(admin.ModelAdmin):
     list_display=['sender_email','sender_name','sender_name','password','recipient_email','subject']

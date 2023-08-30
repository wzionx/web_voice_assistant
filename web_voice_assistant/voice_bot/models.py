from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class FreeChatSubject(models.Model):
    subject = models.CharField(max_length=100)

class FreeChatWakeUp(models.Model):

    subject =  models.ForeignKey(FreeChatSubject,on_delete=models.CASCADE)
    wakeup = models.CharField(max_length=100)

class FreeChatResponse(models.Model):
    subject = models.ForeignKey(FreeChatSubject,on_delete=models.CASCADE)
    response = models.CharField(max_length=100)


class UserAvatar(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    user_avatar = models.ImageField(null=True,blank=True,upload_to="avatar/")
    
class User_Email(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    sender_email = models.CharField(max_length=50)# 发送者邮箱地址
    sender_name = models.CharField(max_length=50)# 发送者邮箱姓名
    password = models.CharField(max_length=50) # 发送者邮箱密码
    recipient_email = models.CharField(max_length=50)  # 收件人邮箱地址
    subject = models.CharField(max_length=50) # 发送者话题
    


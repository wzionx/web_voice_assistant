import os
import json
import speech_recognition as sr
from django.http import JsonResponse
from django.shortcuts import render
from .forms import ImageForm, UserProfileForm
from .models import UserAvatar, User_Email, FreeChatSubject, FreeChatWakeUp, FreeChatResponse
from django.utils.safestring import mark_safe
# send emial
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
from django.contrib import messages






def home(request):

    return render(request, 'index.html')

def experiment1(request):
    user = request.user
    useravatar_url = UserAvatar.objects.get(user=user).user_avatar
    

    # wakeup and response
    subjects = FreeChatSubject.objects.all()
    freechat=[]
    for subject in subjects:
        wakeups = FreeChatWakeUp.objects.filter(subject=subject)
        responses = FreeChatResponse.objects.filter(subject=subject)
        wakeup_group=[]
        response_group=[]

        for r in wakeups:
            wakeup_group.append(r.wakeup)
        for g in responses:
            response_group.append(g.response)
        freechat.append((wakeup_group,response_group))
    data = freechat
    json_data = json.dumps(data)
    safe_data = mark_safe(json_data)
    return render(request, 'experiment1.html', locals())

def send_email_sever(message, subject, sender_email, sender_name, password, recipient_email):
    msg = MIMEText(message, 'plain', 'utf-8')
    msg['From'] = formataddr((sender_name, sender_email))
    msg['To'] = recipient_email
    msg['Subject'] = subject
    try:
        # 连接到网易邮箱的SMTP服务器
        server = smtplib.SMTP("smtp.163.com", 25)
        # 登录网易邮箱账号
        server.login(sender_email, password)
        # 发送邮件
        server.sendmail(sender_email, [recipient_email], msg.as_string())
        print("[log]email sent！")
    except Exception as e:
        print(f"[log]email failure: {e}")
    finally:
        # 关闭连接
        server.quit()

def send_email(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'send_email':
            # 执行发送邮件的操作
            user = request.user
            useremail = User_Email.objects.get(user=user)
            sender_email = useremail.sender_email
            sender_name = useremail.sender_name
            password = useremail.password
            recipient_email = useremail.recipient_email
            subject = useremail.subject
            content = content = request.POST.get("message")
            try:            
                message = content  # 邮件内容
                # 发送邮件
                # send_email_sever(message, subject)
                send_email_sever(message, subject, sender_email, sender_name, password, recipient_email)
            except Exception as e:
                print(e)
            return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request'})

def experiment2(request):
    return render(request, 'experiment2.html')

def experiment3(request):
    return render(request, 'experiment3.html')

def experiment4(request):
    return render(request, 'experiment4.html')

def experiment5(request):
    return render(request, 'experiment5.html')

# def usersetting(request):

#     return render(request, 'usersetting.html')

def usersetting(request):
    # userimg = UserAvatar.objects.get(user=request.user).user_avatar
    if request.method == "GET": 
        form = ImageForm()
        user = request.user
        useravatar_url = UserAvatar.objects.get(user=user).user_avatar
        return render(request, 'usersetting.html', locals()) 
    elif request.method == "POST":     
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.cleaned_data['user_avatar']
            user = request.user
            try:
                useravatar = UserAvatar.objects.get(user=user)
                # 如果存在，删除该记录
                useravatar.delete()
            except UserAvatar.DoesNotExist:
                pass
            useravatar = UserAvatar(user=user, user_avatar=image)
            useravatar.save()
            messages.success(request, "Congratulation! Image upload successful!")
        else:
            messages.warning(request, "Upload Failed")
        useravatar_url = UserAvatar.objects.get(user=user).user_avatar
        return render(request, 'usersetting.html', locals())
    

def emailsetting(request):
    if request.method == "GET": 
        form = UserProfileForm()
        return render(request, 'emailsetting.html', locals())
    elif request.method == "POST":  
        form = UserProfileForm(request.POST)
        if form.is_valid():
            user = request.user
            try:
                profile = User_Email.objects.filter(user=user)
                # 如果存在，删除该记录
                profile.delete()
            except User_Email.DoesNotExist:
                pass
            sender_email = form.cleaned_data["sender_email"]
            sender_name = form.cleaned_data["sender_name"]
            password = form.cleaned_data["password"]
            recipient_email = form.cleaned_data["recipient_email"]
            subject = form.cleaned_data["subject"]
            
            reg = User_Email(
                user=user, 
                sender_email=sender_email, 
                sender_name=sender_name, 
                password=password, 
                recipient_email=recipient_email, 
                subject=subject
            )
            reg.save()
            messages.success(request,"Congrats! Profile save successfully!")
        else:
            messages.warning(request,"Invalid input data")

        return render(request, 'emailsetting.html', locals())


# class ProfileView(View):
#     def get(self, request):
#         form = CustomerProfileForm()
#         return render(request, 'app/profile.html',locals())
#     # 服务器 -> 网页

#     def post(self, request):
#         form = CustomerProfileForm(request.POST)
#         if form.is_valid():
#             user = request.user
#             name = form.cleaned_data["name"]
#             locality = form.cleaned_data["city"]
#             city = form.cleaned_data["city"]
#             mobile = form.cleaned_data["mobile"]
#             state = form.cleaned_data["state"]
#             zipcode = form.cleaned_data["zipcode"]
#             reg = Customer(user=user, name=name, locality=locality, mobile=mobile, city=city, state=state, zipcode=zipcode)
#             reg.save()
#             messages.success(request,"Congrats! Profile save successfully!")
#         else:
#             messages.warning(request,"Invalid input data")

#         return render(request, 'app/profile.html', locals())



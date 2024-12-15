from django.db import models
from django.contrib.auth.models import User

class Wish(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

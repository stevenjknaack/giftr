from django.db import models
from django.contrib.auth.models import User
from exchanges.models import Exchange

class Wish(models.Model):
    name = models.CharField(max_length=255, default='New Wish')
    url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='wishes', on_delete=models.CASCADE)
    exchange = models.ForeignKey(Exchange, related_name='wishes', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'Wish {self.user}: {self.name}: {self.created_at}"'

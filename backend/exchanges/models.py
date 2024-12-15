from django.db import models
from django.contrib.auth.models import User

class Exchange(models.Model):
    name = models.CharField(max_length=255, default='New Exchange')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, related_name='owned_exchanges', on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='exchanges')
    # picture = models.ImageField(upload_to='exchange_pictures/', default='default.jpg', null=True)

    def __str__(self):
        return f'Group {self.name}: {self.owner}'
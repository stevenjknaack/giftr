from django.db import models
from django.contrib.auth.models import User
from wishes.models import Wish

class Gift(models.Model):
    name = models.CharField(max_length=255, default='New Gift')
    url = models.URLField(blank=True, null=True)
    price = models.FloatField(default=0.0)
    is_purchased = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    from_user = models.ForeignKey(User, related_name='gifts_given', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='gifts_gotten', on_delete=models.CASCADE)
    wish = models.ForeignKey(Wish, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'Gift {self.name}: {self.from_user} -> {self.to_user}'
    
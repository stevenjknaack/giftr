from django.conf import settings

if settings.DEBUG:
    from django.contrib import admin
    from . import models

    admin.site.register(models.Gift)
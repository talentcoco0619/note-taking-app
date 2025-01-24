from django.db import models
from django.conf import settings

class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    audio = models.FileField(upload_to='notes_audio/')
    date = models.DateField()

    def __str__(self):
        return self.title

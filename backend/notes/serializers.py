from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    audio = serializers.FileField(required=False, allow_null=True)
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'audio', 'date']

from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Custom behavior before saving
        print(f"Creating a new note for user {self.request.user.username}")

        # Example: Automatically set default title if not provided
        if not serializer.validated_data.get('audio'):
            serializer.validated_data['audio'] = None

        # Save the note with the associated user
        serializer.save(user=self.request.user)

        # Custom behavior after saving
        print(f"Note successfully created with ID: {serializer.instance.id}")


class NoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # Fetch the instance to be updated
        instance = self.get_object()
        data = request.data.copy()
        # Log or add custom behavior here
        print(f"Updating note {instance.id} for user {request.user.username}")
        file = request.FILES.get('audio', None)
        
        if not file:  # If no new file is provided, keep the existing file
            data['audio'] = instance.audio
        print(data)
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Custom post-update actions (if any)
        print(f"Note {instance.id} successfully updated!")

        return Response(serializer.data)

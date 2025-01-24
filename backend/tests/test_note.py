import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from notes.models import Note
from django.core.files.uploadedfile import SimpleUploadedFile
@pytest.fixture
def user():
    """Create and return a test user."""
    return get_user_model().objects.create_user(
        username='master',
        email='mastersuperdev@gmail.com',
        password='1234'
    )

@pytest.fixture
def authenticated_client(user):
    """Create and return an authenticated APIClient."""
    client = APIClient()
    client.force_authenticate(user=user)
    return client
@pytest.fixture
def note(user):
    """Create and return a test note."""
    return Note.objects.create(
        user=user,
        title="Test Note",
        description="This is a test note",
        audio=None,
        date="2025-01-01"
    )

@pytest.mark.django_db
def test_note_list_create_authenticated(authenticated_client):
    """Test that authenticated users can access the note list and create notes."""
    url = reverse('note-list-create')

    # Test GET request
    response = authenticated_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    audio_file = SimpleUploadedFile(
        'test_audio.mp3', 
        b'fake audio data', 
        content_type='audio/mpeg'
    )
    # Test POST request to create a new note
    data = {
        'title': 'New Test Note',
        'description': 'Description for the new test note',
        'audio': audio_file,
        'date': '2025-02-01'
    }
    response = authenticated_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['title'] == 'New Test Note'

@pytest.mark.django_db
def test_note_list_create_unauthenticated(client):
    """Test that unauthenticated users cannot access the note list or create notes."""
    url = reverse('note-list-create')

    # Test GET request
    response = client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # Test POST request to create a new note
    audio_file = SimpleUploadedFile(
        'test_audio.mp3', 
        b'fake audio data', 
        content_type='audio/mpeg'
    )
    data = {
        'title': 'New Test Note',
        'description': 'Description for the new test note',
        'audio': audio_file,
        'date': '2025-02-01'
    }
    response = client.post(url, data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
def test_note_retrieve_update_destroy_authenticated(authenticated_client, note):
    """Test that authenticated users can retrieve, update, and delete notes."""
    url = reverse('note-retrieve-update-destroy', kwargs={'pk': note.pk})

    # Test GET request to retrieve a note
    response = authenticated_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['title'] == note.title

    # Test PATCH request to update a note with a new file
    audio_file = SimpleUploadedFile(
        'updated_audio.mp3', 
        b'new fake audio data', 
        content_type='audio/mpeg'
    )
    updated_data = {
        'title': 'Updated Test Note',
        'description': 'Updated description for the note',
        'audio': audio_file,
        'date': '2025-02-01'
    }
    response = authenticated_client.put(url, updated_data, format='multipart')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['title'] == 'Updated Test Note'

    # Test DELETE request to delete the note
    response = authenticated_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT

@pytest.mark.django_db
def test_note_retrieve_update_destroy_unauthenticated(client, note):
    """Test that unauthenticated users cannot retrieve, update, or delete notes."""
    url = reverse('note-retrieve-update-destroy', kwargs={'pk': note.pk})

    # Test GET request
    response = client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # Test PATCH request to update a note with a new file
    audio_file = SimpleUploadedFile(
        'updated_audio.mp3', 
        b'new fake audio data', 
        content_type='audio/mpeg'
    )
    updated_data = {
        'title': 'Updated Test Note',
        'description': 'Updated description for the note',
        'audio': audio_file,
        'date': '2025-02-01'
    }
    response = client.put(url, updated_data, format='multipart')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # Test DELETE request to delete the note
    response = client.delete(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
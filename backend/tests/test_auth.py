import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
@pytest.fixture
def user():
    User = get_user_model() 
    user = User.objects.create_user(email="mastersuperdev@gmail.com", password="1234",username="mastersuperdev")
    return user

@pytest.mark.django_db
def test_register(client, user):

    url = reverse('register')  
    data = {
        'email': 'mastersuperdev1@gmail.com',
        'password': '1234',
        'username': "master",
    }
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
def test_login(client, user):
    url = reverse('login') 
    data = {
        'email': 'mastersuperdev@gmail.com',
        'password': '1234',
    }
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK

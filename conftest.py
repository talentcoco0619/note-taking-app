# your_app/tests/conftest.py
import pytest
from django.contrib.auth import get_user_model
import os
import pytest

@pytest.fixture(autouse=True)
def setup_django_settings():
    os.environ['DJANGO_SETTINGS_MODULE'] = 'daily_notes.settings'


@pytest.fixture
def user():
    User = get_user_model()  # This will get your custom user model
    user = User.objects.create_user(email="mastersuperdev@gmail.com", password="1234")
    return user

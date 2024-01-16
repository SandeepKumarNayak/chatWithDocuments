from rest_framework import serializers
from .models import UploadedFile


class FileUploadSerializer(serializers.Serializer):
    class Meta:
        model = UploadedFile
        file = serializers.FileField()
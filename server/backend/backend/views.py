from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import FileUploadSerializer
from rest_framework.parsers import MultiPartParser
from django.conf import settings
import os
from .helpers import askQna, load_document, chunk_data, create_embeddings, ask_and_get_answer
import json
from .models import UploadedFile

class QuestionAns(APIView):
    def post(self, request):
        try:
            question = request.data
            q = question['ques']
            vector_store = settings.vector_store
            ans = ask_and_get_answer(vector_store, q)
            # print("*"*100)
            # print(ans["source_documents"])
            # print("*"*100)
            # reference = ans["source_documents"][0].metadata["source"]
            # refr = reference.split('\\')
            
            response = {
                'result': ans["result"],
                'source': ans["source_documents"][0].metadata["source"]
            }
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response(str(ex), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UploadFile(APIView):
    parser_classes = (MultiPartParser, )
    def post(self, request):
        try:
            requestFiles = request.FILES.getlist('file')
            files = []
            for file in requestFiles:
                file_instance = UploadedFile(file=file)
                file_instance.save()
                serializer = FileUploadSerializer(data={'file': file})
                if serializer.is_valid():
                    
                    bytes_data = "" 
                    bytes_data = file.read()
                    print(type(bytes_data))
            
            files = UploadedFile.objects.all()
            print("Here", UploadedFile.objects.count())

            file_names = [os.path.join(settings.MEDIA_ROOT, f.file.name) for f in files]
            print(file_names)
            data = load_document(file_names)
            chunks = chunk_data(data)
            settings.vector_store = create_embeddings(chunks)
            print(type(settings.vector_store))

            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
        except Exception as ex:
            print("Exception", ex)
            return Response(str(ex), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
  

    def get(self, request):
        try:
            # all_instances = UploadedFile.objects.all()
            # all_instances.delete()
            # return Response(UploadedFile.objects.count(), status=status.HTTP_200_OK)

            files = UploadedFile.objects.all()
            print("Here", UploadedFile.objects.count())
            data = []
            for file in files:
                file_data = {
                    'id': file.id,
                    'file_name': file.file.name,
                    'file_size': file.file.size
                }
                data.append(file_data)
            
            with open('uploaded_files.json', 'w') as f:
                json.dump(data, f)
            
            return Response(data, status=status.HTTP_200_OK)
             
        except Exception as ex:
            return Response(str(ex), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class YourGPT(APIView):
    def post(self, request):
        try:
            question = request.data
            q = question['ques']
            ans = askQna(q)
            return Response(ans, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response(str(ex), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import FileUploadSerializer
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.decorators import parser_classes
from django.conf import settings
from django.db import transaction
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
            files = set()
            for x in ans["source_documents"]:
                 files.add(x.metadata["source"])
            response = {
                'result': ans["result"],
                'source': files
            }
            # response = {
            #     'result': ans["result"],
            #     'source': ans["source_documents"][0].metadata["source"]
            # }
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as ex:
            print("EXCFRDGSSFGSRGSRS", ex)
            return Response(str(ex), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@parser_classes([JSONParser, FormParser, MultiPartParser])
class UploadFile(APIView):
    # parser_classes = (MultiPartParser, )
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
            print("*"*100)
            print(file_names)
            print("*"*100)
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
    
    

    # parser_classes = (JSONParser, )
    def delete(self, request):
        ids = request.data.get('ids', [])
        messages = []
        print("*"*100)
        print(ids)
        print("*"*100)
        
        with transaction.atomic():
            if ids:
                for id in ids:
                    try:
                        file = UploadedFile.objects.get(id=id)
                        file_path = os.path.join(settings.MEDIA_ROOT, file.file.name)
                        if os.path.exists(file_path):
                            os.remove(file_path)
                        file.delete() 
                    except UploadedFile.DoesNotExist:
                        messages.append(f'File with ID {id} not found')

        files = []
        files = UploadedFile.objects.all()
        print("Here", UploadedFile.objects.count())

        file_names = [os.path.join(settings.MEDIA_ROOT, f.file.name) for f in files]
        print("*"*1000)
        print(file_names)
        print("*"*1000)
        data = load_document(file_names)
        chunks = chunk_data(data)
        settings.vector_store = create_embeddings(chunks)        
        if messages.__len__() > 0:
            return Response({'messages': messages}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'messages': messages}, status=status.HTTP_200_OK)
    
    def patch(self, request):
        id = request.query_params.get('id')
        requestFiles = request.FILES.getlist('file')
            
        try:
            for file in requestFiles:
                existing_file = UploadedFile.objects.get(id=id)
                existing_file_path = os.path.join(settings.MEDIA_ROOT, existing_file.file.name)
                    
                if os.path.exists(existing_file_path):
                    os.remove(existing_file_path)
                
                existing_file.file = file
                existing_file.save()
                    
            
            files = []
            files = UploadedFile.objects.all()
            print("Here", UploadedFile.objects.count())

            file_names = [os.path.join(settings.MEDIA_ROOT, f.file.name) for f in files]
            print("*"*1000)
            print(file_names)
            print("*"*1000)
            data = load_document(file_names)
            chunks = chunk_data(data)
            settings.vector_store = create_embeddings(chunks)
                
            return Response({'message': 'File updated successfully'}, status=status.HTTP_200_OK)
        
        except UploadedFile.DoesNotExist:
            return Response({'message': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
            
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

        
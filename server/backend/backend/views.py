from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import FileUploadSerializer
from django.conf import settings
import os
from .helpers import askQna, load_document, chunk_data, create_embeddings, ask_and_get_answer

class QuestionAns(APIView):
    def post(self, request):
        try:
            question = request.data
            q = question['ques']
            vector_store = settings.vector_store
            ans = ask_and_get_answer(vector_store, q)
            response = {
                'result': ans["result"],
                'source': ans["source_documents"][0].metadata["source"]
            }
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response(str(ex), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UploadFile(APIView):
    def post(self, request):
        try:
            print(request.data)
            requestFiles = request.FILES.getlist('file')
            files = []
            for file in requestFiles:
                print(file.name)
                serializer = FileUploadSerializer(data={'file': file})
                
                if serializer.is_valid():
                    uploaded_file = serializer.validated_data['file']
                    
                    # print("Uploaded", uploaded_file)
                    bytes_data = "" 
                    bytes_data = uploaded_file.read()
                    print(type(bytes_data))
                    file_name = os.path.join('../backend/files/', uploaded_file.name)
                    files.append(file_name)
                    with open(file_name, 'wb') as f:
                        f.write(bytes_data)
                else:
                    return Response("File Format Not correct", status=status.HTTP_400_BAD_REQUEST)
            
            print(files)
            data = load_document(files)
            chunks = chunk_data(data)
            settings.vector_store = create_embeddings(chunks)
            print(type(settings.vector_store))

            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



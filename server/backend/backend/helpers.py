# from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain.vectorstores import Chroma
# import os
from langchain.llms import OpenAI
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(), override=True)

def load_document(files):
  import os
  loaders = []
  for file in files:
    name, extension = os.path.splitext(file)

    if extension == '.pdf':
      from langchain.document_loaders import PyPDFLoader
      # print(f'Loading {file}')
      loaders.append(PyPDFLoader(file))
    elif extension == '.docx':
      from langchain.document_loaders import Docx2txtLoader
      # print(f'Loading {file}')
      loaders.append(Docx2txtLoader(file))
    elif extension == '.txt':
      from langchain.document_loaders import TextLoader
      # print(f'Loading {file}')
      loaders.append(TextLoader(file))
    else:
      print('Document format not supported!')
      return None
    
  documents = []
  for loader in loaders:
    documents.extend(loader.load())
  return documents
  



def chunk_data(data, chunk_size=256, chunk_overlap=20):
  from langchain.text_splitter import RecursiveCharacterTextSplitter
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
  chunks = text_splitter.split_documents(data)
  return chunks


def create_embeddings(chunks):
  from langchain.embeddings import OpenAIEmbeddings
  from langchain.vectorstores import Chroma, Pinecone
  import pinecone
  
  embeddings = OpenAIEmbeddings()
  db = Chroma.from_documents(chunks, embeddings)
  return db


def ask_and_get_answer(db, q, k=3):
  from langchain.chains import RetrievalQA
  from langchain.chat_models import ChatOpenAI

  llm = ChatOpenAI(model='gpt-3.5-turbo', temperature=0.2)
  retriever = db.as_retriever(search_type='similarity', search_kwargs={'k':k})

  chain = RetrievalQA.from_chain_type(llm=llm, chain_type='stuff', retriever=retriever, return_source_documents=True)

  answer = chain(q)
  return answer


# # if _name_ == "_main_":
# #   import os
# #   from dotenv import load_dotenv, find_dotenv

# #   load_dotenv(find_dotenv(), override=True)
# #   st.subheader("LLM Question-Answering App")
# #   with st.sidebar:
# #     api_key = st.text_input('OpenAI API Key: ', type='password')
# #     if api_key:
# #       os.environ['OPENAI_API_KEY'] = api_key
    
# #     upload_file = st.file_uploader('Upload a file: ', type=['pdf', 'docx', 'txt'], accept_multiple_files=True)
    
# #     add_data = st.button('Add Data')

# #     files = []

# #     if upload_file and add_data:
# #       with st.spinner('Reading, chunking and embedding file....'):
# #         for file in upload_file:
# #           bytes_data = "" 
# #           bytes_data = file.read()
# #           print(type(bytes_data))
# #           file_name = os.path.join('./', file.name)
# #           files.append(file_name)
# #           with open(file_name, 'wb') as f:
# #             f.write(bytes_data)

# #         data = load_document(files)
# #         chunks = chunk_data(data)
# #         vector_store = create_embeddings(chunks)
# #         print(vector_store)
# #         st.session_state.vs = vector_store
# #         st.success('Successfully loaded the file')

# #   q =  st.text_input('Ask a question about the content of your file: ')
# #   if q:
# #     if 'vs' in st.session_state:
# #       vector_store = st.session_state.vs
# #       answer = ask_and_get_answer(vector_store, q)
# #       st.write('LLM Answer: ')
# #       with st.container(border=True):
# #         st.write(answer["result"])
# #         st.write(f'Source Document : {answer["source_documents"][0].metadata["source"]}')
  
# #       st.divider()
# #       if 'history' not in st.session_state:
# #         st.session_state.history = ''
# #       value = f'Q: {q} \nA: {answer}'
# #       st.session_state.history = f'{value} \n {"-" * 100} \n {st.session_state.history}'
# #       h = st.session_state.history
# #       st.text_area(label='Chat History', value=h, key='history', height=400)

def askQna(q):
  llm = OpenAI()

  return llm(q)


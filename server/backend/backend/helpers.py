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
      print(f'Loading {file}')
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
  



def chunk_data(data, chunk_size=512, chunk_overlap=20):
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


def ask_and_get_answer(db, q, k=5):
  from langchain.chains import RetrievalQA
  from langchain.chat_models import ChatOpenAI

  llm = ChatOpenAI(model='gpt-3.5-turbo', temperature=0.2)
  retriever = db.as_retriever(search_type='similarity', search_kwargs={'k':k})

  chain = RetrievalQA.from_chain_type(llm=llm, chain_type='stuff', retriever=retriever, return_source_documents=True)

  answer = chain(q)
  return answer


def askQna(q):
  from langchain.chat_models import ChatOpenAI

  llm = ChatOpenAI(model='gpt-3.5-turbo', temperature=0.5)

  return llm(q)


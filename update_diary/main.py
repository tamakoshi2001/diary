import functions_framework
from firebase_admin import firestore


@functions_framework.http
def main(request):
    request = request.get_json(silent=True)
    date = request['date']
    text = request['text']
    db = firestore.Client()
    collection_ref = db.collection('diary')
    doc_ref = collection_ref.document(date)
    doc_ref.set({
        'text': text
    })
    print('text updated')
    return '200'

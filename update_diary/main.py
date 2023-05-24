import functions_framework
from firebase_admin import firestore


@functions_framework.http
def main(request):
    headers = {
        'Access-Control-Allow-Origin': '*',  # 許可するオリジンを指定することができます
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  # 許可するHTTPメソッドを指定します
        'Access-Control-Allow-Headers': 'Content-Type'  # 許可するヘッダーを指定します
    }

    try:
        request = request.get_json(silent=True)
        date = request['date']
        text = request['text']
        db = firestore.Client()
        collection_ref = db.collection('diary')
        doc_ref = collection_ref.document(date)
        doc_ref.set({
            'text': text
        })
        return ('更新が完了しました', 200, headers)
    except Exception as e:
        return (str(e), 500, headers)

import firebase_admin
from firebase_admin import firestore


def main(request):
    headers = {
        'Access-Control-Allow-Origin': '*',  # 許可するオリジンを指定することができます
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  # 許可するHTTPメソッドを指定します
        'Access-Control-Allow-Headers': 'Content-Type'  # 許可するヘッダーを指定します
    }

    if (not len(firebase_admin._apps)):
        firebase_admin.initialize_app()
    try:
        request = request.get_json(silent=True)
        date = request['date']

        db = firestore.client()
        users_ref = db.collection(u'diary').document(date)
        # ドキュメントのデータを取得
        doc = users_ref.get()
        print(doc)
        if doc.exists:
            # フィールドの取得
            fields = doc.to_dict()
            return (fields['text'], 200, headers)
        else:
            return ("日記がありません。", 200, headers)
    except Exception as e:
        return (str(e), 500, headers)

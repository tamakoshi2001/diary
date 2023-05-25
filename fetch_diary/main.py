import firebase_admin
from firebase_admin import firestore
import json


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
            text = fields['text']
            is_text = 1
        else:
            text = "日記がありません。"
            is_text = 0
        status_code = 200
    except Exception as e:
        text = str(e)
        is_text = 0
        status_code = 500

    response = json.dumps({
        "text": text,
        "is_text": is_text
    })
    return (response, status_code, headers)

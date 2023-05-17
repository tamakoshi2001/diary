from modules import *
import functions_framework


@functions_framework.http
def main(request):
    reply = request.get_json(silent=True)
    text = reply['events'][0]['message']['text']
    reply_token = reply['events'][0]['replyToken']

    response = add_diary(text)

    status_code = line_api(reply_token)

    if status_code == 200:
        print("Message replied successfully.")
    else:
        print(f"Message reply failed with status code: {status_code}")
    return 'finished'

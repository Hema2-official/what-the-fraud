import requests

api_key = '4ddc94e2-4745-4806-b79e-9bede11816e3'
# call rest api at https://api.seon.io/SeonRestService/email-api/v2.2/<email>

def checkEmail(email):
    url = "https://api.seon.io/SeonRestService/email-api/v2.2/" + email
    headers = {'Content-Type': 'application/json', 'X-API-KEY': api_key}
    queryparams = {'include': 'flags,history,id'}
    response = requests.get(url, headers=headers, params=queryparams)
    return response.json()
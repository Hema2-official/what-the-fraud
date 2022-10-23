import requests

# =====================================================================
api_key = '4ddc94e2-4745-4806-b79e-9bede11816e3' #      A P I   K e y
# =====================================================================

def callGetAPI(url, args, headers = {'Content-Type': 'application/json', 'X-API-KEY': api_key}, params = {'include': 'flags,history,id'}):
    response = requests.get(url + args, headers=headers, params=params)
    return response.json()

def checkEmail(email):
    return callGetAPI("https://api.seon.io/SeonRestService/email-api/v2.2/", email)

def checkIP(ip):
    return callGetAPI("https://api.seon.io/SeonRestService/ip-api/v1.1/", ip)

def checkPhone(phone): # Format: 36301234567
    queryparams = {'include': 'flags,history,id'}
    return callGetAPI("https://api.seon.io/SeonRestService/phone-api/v1.3/", phone, params=queryparams)
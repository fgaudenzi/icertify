import requests
files={'docfile': ('report.csv', 'some,data,to,send\nanother,row,to,send\n')}
url="http://localhost:9000/users/"
r=requests.post(url,data={'name':'filippo','lastname':'gaudenzi','email':'filippo.gaudenzi@gmail.com'},files=files)

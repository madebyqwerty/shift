
 
import requests, time

"""
names = ['Auský Jan', 'Drbohlavová Lenka', 'Frolík Josef', 'Haunerová Magdaléna', 'Hausnerová Daniela', 'Horčička Vojtěch', 'Hořejší Tomáš', 'Jedličková Ellen', 'Kebrle Tomáš', 'Kernerová Eva', 'Krylová Linda', 'Kusá Adéla', 'Laubeová Kateřina', 'Matějková Emma Alžběta', 'Mytskanyuk Evelína', 'Parma Václav', 'Petrusová Magdaléna', 'Ransdorf Daniel', 'Sobotková Simona', 'Soukup Tadeáš', 'Srbek David', 'Srbek Matěj', 'Šedivá Mája', 'Thiebaut Marc', 'Trubačová Lucie', 'Vitmayerová Alexandra', 'Volek Petr', 'Witošová Eliška', 'Zeman Jan', 'Zouharová Magdaléna']

for name in names:
    print(name)
    requests.post("http://localhost:5000/api/users", json={"name": name})
    time.sleep(0.1)

response = requests.get("http://localhost:5000/api/users").json()
print(response)
"""


url = "http://127.0.0.1:5003/scan"

payload = {'week_number': '4'}
files = {"img": open("imgs/img1.jpg", "rb")}

response = requests.request("POST", url, data=payload, files=files)

print(response.text)
""""""
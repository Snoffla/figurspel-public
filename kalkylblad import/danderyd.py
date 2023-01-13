
import csv
import datetime
from dateutil.relativedelta import relativedelta
import urllib.request, json

#Amatörerna 40
#Danderyd 76
#Sundbyberg 39

BASE_DATE = datetime.datetime(datetime.datetime.now().year, 7, 1)

FILE_NAME = 'danderyd.csv'

CODE = 'Riksfiguren'
EVENT = 4
GAME_TYPE = 1

def main():
    players = getPlayerResults(getResultRows(FILE_NAME))
    print(f'File: {FILE_NAME}')
    print(f'Players: {len(players)}')

    clubId = int(input('\nClub to be reported? '))
    print(getClubName(clubId), '\n')

    inputStart = int(input('Start uploading scores from score coloum: ')) - 1

    for player in players:
        player['playerData']['clubId'] = clubId
        recordScores = player['scores'][inputStart:]
        recordScores = list(map(lambda score : int(score), filter(lambda score : score != '', recordScores)))
        print(player['playerData']['name'] + ':        ' + str(recordScores))
        upload = input('Upload data?(y/n): ')
        if upload == 'y':
            success = uploadScores(player['playerData'], recordScores)
            
        
        
         

def uploadScores(playerData, scores):
    playerId = getUser(playerData)
    for score in scores:
        url = f'https://apifigur.snoffla.com/events/{EVENT}/scores'

        user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
        headers={
            'User-Agent':user_agent,
            'Content-Type': 'application/json'
        } 

        data = {
            'code': CODE,
            'playerId': playerId,
            'score': score,
            'gameTypeId': GAME_TYPE,
            'class': playerData['class']
        }
        data = str(json.dumps(data))
        data = data.encode('utf-8')

        request=urllib.request.Request(
            url=url,
            headers=headers,
            data=data,
            method='POST'
            )


        response = urllib.request.urlopen(request, data)
        data = json.loads(response.read())


def getUser(playerData):
    userId = getUserByEmail(playerData['email'])
    if userId:
        return userId
    else:
        return createPlayer(playerData)

def getUserByEmail(email):
    url = f'https://apifigur.snoffla.com/players?email={email}'

    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    headers={'User-Agent':user_agent,} 

    request=urllib.request.Request(url,None,headers)
    response = urllib.request.urlopen(request)
    data = json.loads(response.read())
    if data:
        return data['id']
    else:
        return None

def createPlayer(playerData):
    url = f'https://apifigur.snoffla.com/players'

    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    headers={
        'User-Agent':user_agent,
        'Content-Type': 'application/json'
    } 

    data = {
        'code': CODE,
        'player': playerData
    }
    data = str(json.dumps(data))
    data = data.encode('utf-8')

    request=urllib.request.Request(
        url=url,
        headers=headers,
        data=data,
        method='POST'
        )


    response = urllib.request.urlopen(request, data)
    data = json.loads(response.read())
    if data:
        return data['id']
    else:
        return None

def printPlayer(row):
    name = row[0]
    email = row[2]
    age = row[4]
    
    playerClass = 'm'
    if row[2] != '':
        playerClass = 'w'

    print(name, email, age, playerClass)

def getResultRows(filepath):
    file = open(filepath)
    csvreader = csv.reader(file)
    header = next(csvreader)

    rows = []
    start = False

    for row in csvreader:
        if(row[0] == 'Fyll i namn'):
            start = True
            continue
        
        if not start:
            continue

        if (row[0] == '' ):
            file.close()
            return rows

        rows.append(row)

def getPlayerResults(rows):
    players = []

    for row in rows:
        playerClass = 'm'
        if row[2] != '':
            playerClass = 'w'


        playerObject = {
            'playerData':{
                'name': row[0],
                'email': row[1],
                'class': playerClass,
                'birthDate': (BASE_DATE- relativedelta(years=int(row[4]))).strftime('%Y-%m-%d'),
            },
            'scores': row[6:]
        }
        players.append(playerObject)
    return players

def getClubName(id):
    url = 'https://apifigur.snoffla.com/clubs'

    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    headers={'User-Agent':user_agent,} 

    request=urllib.request.Request(url,None,headers)
    response = urllib.request.urlopen(request)
    data = json.loads(response.read())

    for club in data:
        if int(club['id']) == int(id):
            return club['name']

main()

import requests
from bs4 import BeautifulSoup


def scrape_finviz():
    url = 'https://finviz.com/'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    response = requests.get(url, headers=headers)
    html = BeautifulSoup(response.content, 'html.parser')

    data_list = []

    for row in html.select('tr.styled-row'):
        try:
            ticker = row.select_one('a.tab-link').text
            last = row.select_one('td:nth-of-type(2)').text
            change = row.select_one('td:nth-of-type(3) span').text
            signal = row.select_one('td:nth-of-type(6) a.tab-link-nw').text
            volume = row.select_one('td:nth-of-type(4)').text
            
            data_list.append({
                'ticker': ticker,
                'last': last,
                'change': change,
                'signal': signal,
                'volume': volume
            })
        except AttributeError as e:
            print(f"Error parsing row: {e}")
            continue

    return data_list

data = scrape_finviz()

for item in data:
    print(item)
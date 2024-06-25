import requests
from bs4 import BeautifulSoup

def scrape_futures():
    url = 'https://finviz.com/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    html = BeautifulSoup(response.content, 'html.parser')

    future_news_list = []

    futures_news_table = html.select_one('table.styled-table-new.is-rounded.is-condensed.is-tabular-nums')
    if futures_news_table:
        print("Futures news table found")
        for row in futures_news_table.select('tr.styled-row'):
            try:
                futures = row.select_one('a.tab-link')
                label = row.select_one('td:nth-of-type(2)')
                change = row.select_one('td:nth-of-type(3) span')
                change_by_percent = row.select_one('td:nth-of-type(4)')

                if futures and label and change and change_by_percent:
                    future_news_list.append({
                        'futures': futures.text,
                        'label': label.text,
                        'change': change.text,
                        'change_by_percent': change_by_percent.text
                    })
                else:
                    print("One of the elements was not found in the row")
                    print(f"futures: {futures}, label: {label}, change: {change}, change_by_percent: {change_by_percent}")

            except AttributeError as e:
                print(f"Error parsing major news row: {e}")
                continue
    else:
        print("Futures news table not found")

    return future_news_list

if __name__ == '__main__':
    future_news = scrape_futures()
    for news in future_news:
        print(news)

from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def scrape_finviz():
    url = 'https://finviz.com/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)
    html = BeautifulSoup(response.content, 'html.parser')

    data_list = []
    future_news_list = []
    forex_news_list = []
    stats = []

    # stock-info 섹션 스크래핑
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

    # 테이블 리스트를 가져와 헤더 텍스트로 구분
    tables = html.select('table.styled-table-new.is-rounded.is-condensed.is-tabular-nums')

    for table in tables:
        header = table.select_one('thead th').text.strip()
        if header == 'Futures':
            for row in table.select('tr.styled-row'):
                try:
                    futures = row.select_one('a.tab-link').text
                    label = row.select_one('td:nth-of-type(2)').text
                    change = row.select_one('td:nth-of-type(3) span').text
                    change_by_percent = row.select_one('td:nth-of-type(4)').text

                    future_news_list.append({
                        'futures': futures,
                        'label': label,
                        'change': change,
                        'change_by_percent': change_by_percent
                    })
                except AttributeError as e:
                    print(f"Error parsing futures row: {e}")
                    continue

        elif header == 'Forex & Bonds':
            for row in table.select('tr.styled-row'):
                try:
                    item = row.select_one('a.tab-link')
                    if item:
                        forex_text = item.text
                        forex_label = row.select_one('td:nth-of-type(2)').text
                        forex_change = row.select_one('td:nth-of-type(3) span').text
                        forex_change_by_percent = row.select_one('td:nth-of-type(4)').text

                        forex_news_list.append({
                            'forex': forex_text,
                            'forex_label': forex_label,
                            'forex_change': forex_change,
                            'forex_change_by_percent': forex_change_by_percent
                        })
                    else:
                        treasury_text = row.select_one('td:nth-of-type(1)').text
                        treasury_label = row.select_one('td:nth-of-type(2)').text
                        treasury_change = row.select_one('td:nth-of-type(3) span').text
                        treasury_change_by_percent = row.select_one('td:nth-of-type(4)').text

                        forex_news_list.append({
                            'forex': treasury_text,
                            'forex_label': treasury_label,
                            'forex_change': treasury_change,
                            'forex_change_by_percent': treasury_change_by_percent
                        })
                except AttributeError as e:
                    print(f"Error parsing forex/treasury row: {e}")
                    continue

    for stat in html.select('div.market-stats'):
        try:
            label_left = stat.select_one('.market-stats_labels_left p').text
            value_left = stat.select_one('.market-stats_labels_left p:nth-of-type(2)').text
            label_right = stat.select_one('.market-stats_labels_right p').text
            value_right = stat.select_one('.market-stats_labels_right p:nth-of-type(2)').text

            stats.append({
                'label_left': label_left,
                'value_left': value_left,
                'label_right': label_right,
                'value_right': value_right,
            })
        except AttributeError as e:
            print(f"Error parsing stat: {e}")
            continue

    return data_list, forex_news_list, future_news_list, stats

@app.route('/stock-info', methods=['GET'])
def get_stock_information():
    stock_info, forex_news_info, future_news_info, stats = scrape_finviz()
    return jsonify({'stock_info': stock_info, 'forex_news_info': forex_news_info, 'future_news_info': future_news_info, 'stats': stats})

if __name__ == '__main__':
    app.run(debug=True)

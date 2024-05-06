from flask import Flask, jsonify
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from datetime import datetime
import sys
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

def scrape_stock_news(tickers):
    finviz_url = 'https://finviz.com/quote.ashx?t='
    news_tables = {}
    current_date = datetime.now().strftime("%Y-%m-%d")  # 현재 날짜를 YYYY-MM-DD 형식으로 저장

    for ticker in tickers:
        try:
            url = finviz_url + ticker
            print("Processing {url}")  # 디버깅 메시지 추가
            req = Request(url=url, headers={'user-agent': 'my-app'})
            response = urlopen(req)
            html = BeautifulSoup(response, 'html.parser')
            news_table = html.find(id='news-table')
        
            if news_table is not None:
                news_tables[ticker] = news_table
        except Exception as e:
            print(f"Error processing {ticker}: {e}", file=sys.stderr)  # 오류 메시지 출력
            continue

    parsed_data = []

    for ticker, news_table in news_tables.items():
        last_date = None  # 마지막으로 사용된 날짜를 저장하는 변수
        for row in news_table.findAll('tr'):
            try:
                if row.a is None:
                    continue
                title = row.a.text
                links = row.a['href']
                datetime_info = row.td.text.strip()
                source = row.find('span').text.strip() if row.find('span') else 'No source'  # 출처 추가
                date, time = (None, None)

                if "Today" in datetime_info:
                    date = current_date
                    time = datetime_info.replace("Today", "").strip()
                else:
                    date_time = datetime_info.split()
                    if len(date_time) == 2:
                        date, time = date_time
                    elif len(date_time) == 1:
                        time = date_time[0]
                    date = date if date else last_date  # 새로운 날짜가 없으면 마지막 날짜 사용

                last_date = date  # 현재 날짜를 마지막 날짜로 갱신
                parsed_data.append({   #각 변수 정의해 놓은거
                    'ticker': ticker,
                    'date': date,
                    'time': time,
                    'title': title,
                    'source': source,  
                    'links' : links
                })
            except Exception as e:
                print(f"Error parsing data for {ticker}: {e}", file=sys.stderr)  # 오류 메시지 출력
                continue

        today_news = [news for news in parsed_data if news['date'] == current_date]



    return today_news



@app.route('/news', methods=['GET'])
def get_stock_news():
    tickers = ['AAPL', 'GOOGL', 'MSFT']    
    news_data = scrape_stock_news(tickers)
    print("news data: ",news_data)
    return jsonify({'news_data': news_data})

if __name__ == '__main__':
    app.run(debug=True)
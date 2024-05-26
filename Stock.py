from flask import Flask, jsonify
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import sys
from flask_cors import CORS
from flask import request
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pandas as pd

app = Flask(__name__)
CORS(app)


def scrape_stock_news(tickers, search_type):
    finviz_url = 'https://finviz.com/quote.ashx?t='
    news_tables = {}

    current_date = datetime.now()
    sevenDays_ago = current_date - timedelta(days=7)
    current_date_str = current_date.strftime("%b-%d-%y")
    sevenDays_ago_str = sevenDays_ago.strftime("%b-%d-%y")

    try:
        url = finviz_url + tickers
        print(f"Processing {url}")  # 디버깅 메시지 추가
        req = Request(url=url, headers={'user-agent': 'my-app'})
        response = urlopen(req)
        html = BeautifulSoup(response, 'html.parser')
        news_table = html.find(id='news-table')
    
        if news_table is not None:
            news_tables[tickers] = news_table
    except Exception as e:
        print(f"Error processing {tickers}: {e}", file=sys.stderr)  # 오류 메시지 출력

    parsed_data = []
    sevenDays_news = []

    for ticker, news_table in news_tables.items():
        last_date = None  # 마지막으로 사용된 날짜를 저장하는 
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
                    date = current_date_str
                    time = datetime_info.replace("Today", "").strip()
                else:
                    date_time = datetime_info.split()
                    if len(date_time) == 2:
                        date, time = date_time
                    elif len(date_time) == 1:
                        time = date_time[0]
                    date = date if date else last_date  # 새로운 날짜가 없으면 마지막 날짜 사용

                last_date = date  # 현재 날짜를 마지막 날짜로 갱신
                parsed_data.append({
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

        today_news = [news for news in parsed_data if news['date'] == current_date_str]

        for news in parsed_data:
            article_date = datetime.strptime(news['date'], "%b-%d-%y")
            if sevenDays_ago <= article_date <= current_date:
                sevenDays_news.append(news)

    if search_type == 'today':
        return today_news
    elif search_type == 'last_7days':
        return sevenDays_news
    else:
        return parsed_data



@app.route('/news', methods=['GET'])
def get_stock_news():

    search_type = request.args.get('searchType')
    print("검색 유형 알아보는 곳: ", search_type)
    query = request.args.get('query', '')
    print("Heeeeeeeeeeeeeeeeeere", query)
    news_data = scrape_stock_news(query, search_type)

    totalScore = 0
    vader = SentimentIntensityAnalyzer()
    for news in news_data:
        scores = vader.polarity_scores(news['title'])
        news['sentiment'] = scores
        print("for loop score", scores)
        totalScore += scores['compound']

    if len(news_data) > 0:
        Average_Scores = totalScore / len(news_data)
    else:
        Average_Scores = 0
    print("total score print" , Average_Scores)
    print("here scoreeeeeeeeeeeeeeee", scores)

    print("news data: ",news_data)

    return jsonify({'news_data': news_data, 'Average_Score': Average_Scores})

if __name__ == '__main__':
    app.run(debug=True)
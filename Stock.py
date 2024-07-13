from flask import Flask, jsonify, request
from flask_cors import CORS
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import sys
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pandas as pd
import requests

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
        print(f"Processing {url}")
        req = Request(url=url, headers={'user-agent': 'my-app'})
        response = urlopen(req)
        html = BeautifulSoup(response, 'html.parser')
        news_table = html.find(id='news-table')
    
        if news_table is not None:
            news_tables[tickers] = news_table
    except Exception as e:
        print(f"Error processing {tickers}: {e}", file=sys.stderr)

    parsed_data = []
    sevenDays_news = []
    stock_price = []

    for row in html.select('.quote-price_wrapper'):
        try:
            price = row.select_one('.quote-price_wrapper_price').text

            dollar_change_element = row.select_one('.quote-price_wrapper_change tr:nth-of-type(1) td:nth-of-type(1)')
            dollar_change = dollar_change_element.text.strip() if dollar_change_element else "N/A"   

            if 'Dollar change' in dollar_change:
                dollar_change = dollar_change.split()[-1]

            change_percent_element = row.select_one('.quote-price_wrapper_change tr:nth-of-type(2) td:nth-of-type(1)')
            change_percent = change_percent_element.text.strip() if change_percent_element else "N/A"
        
            if 'Percentage change' in change_percent:
                change_percent = change_percent.split()[-1]

            change_percent = change_percent.replace('%', '').strip()

            stock_price.append({
                'price': price,
                'dollar_change' : dollar_change,
                'change_percent' : change_percent,
            })

        except AttributeError as e:
            print(f"Error parsing row: {e}")
            continue

    for ticker, news_table in news_tables.items():
        last_date = None
        for row in news_table.findAll('tr'):
            try:
                if row.a is None:
                    continue
                title = row.a.text
                links = row.a['href']
                datetime_info = row.td.text.strip()
                source = row.find('span').text.strip() if row.find('span') else 'No source'
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
                    date = date if date else last_date

                last_date = date
                parsed_data.append({
                    'ticker': ticker,
                    'date': date,
                    'time': time,
                    'title': title,
                    'source': source,
                    'links': links
                })
            except Exception as e:
                print(f"Error parsing data for {ticker}: {e}", file=sys.stderr)
                continue

        today_news = [news for news in parsed_data if news['date'] == current_date_str]

        for news in parsed_data:
            article_date = datetime.strptime(news['date'], "%b-%d-%y")
            if sevenDays_ago <= article_date <= current_date:
                sevenDays_news.append(news)

    if search_type == 'today':
        return today_news, stock_price
    elif search_type == 'last_7days':
        return sevenDays_news, stock_price
    else:
        return parsed_data, stock_price


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


@app.route('/news', methods=['GET'])
def get_stock_news():
    search_type = request.args.get('searchType')
    query = request.args.get('query', '')
    news_data, news_price = scrape_stock_news(query, search_type)

    totalScore = 0
    vader = SentimentIntensityAnalyzer()
    for news in news_data:
        scores = vader.polarity_scores(news['title'])
        news['sentiment'] = scores
        totalScore += scores['compound']

    if len(news_data) > 0:
        Average_Scores = totalScore / len(news_data)
    else:
        Average_Scores = 0

    print("hereeeeeeeeeeeeeeee news priceeeeeeeeee", news_price)

    return jsonify({'news_data': news_data, 'Average_Score': Average_Scores, 'news_price': news_price})


@app.route('/stock-info', methods=['GET'])
def get_stock_information():
    stock_info, forex_news_info, future_news_info, stats = scrape_finviz()
    return jsonify({'stock_info': stock_info, 'forex_news_info': forex_news_info, 'future_news_info': future_news_info, 'stats': stats})


if __name__ == '__main__':
    app.run(debug=True)
